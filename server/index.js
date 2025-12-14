import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { Readable } from 'stream';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware - CORS with more permissive settings for development and production
app.use(cors({
  origin: '*', // Allow all origins (you can restrict this to your frontend URL in production)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '100mb' })); // Increase limit for large file uploads
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Detect MIME type from file extension
const getMimeType = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'txt': 'text/plain',
    'zip': 'application/zip',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

// Get folder ID based on contact type
const getFolderId = (contactType) => {
  const folderMap = {
    'quote': process.env.GOOGLE_DRIVE_FOLDER_QUOTE,
    'apply': process.env.GOOGLE_DRIVE_FOLDER_APPLY,
    'general': process.env.GOOGLE_DRIVE_FOLDER_GENERAL,
  };
  const folderId = folderMap[contactType] || process.env.GOOGLE_DRIVE_FOLDER_ID;
  console.log(`getFolderId called with contactType: ${contactType}`);
  console.log(`Available folders:`, {
    quote: !!process.env.GOOGLE_DRIVE_FOLDER_QUOTE,
    apply: !!process.env.GOOGLE_DRIVE_FOLDER_APPLY,
    general: !!process.env.GOOGLE_DRIVE_FOLDER_GENERAL,
    default: !!process.env.GOOGLE_DRIVE_FOLDER_ID,
  });
  console.log(`Selected folder ID: ${folderId}`);
  return folderId;
};

// Upload endpoint
app.post('/api/upload-to-drive', async (req, res) => {
  try {
    console.log('Upload request received');
    const { file, fileName, folderId, contactType } = req.body;

    if (!file || !fileName) {
      console.error('Missing file or fileName:', { hasFile: !!file, fileName });
      return res.status(400).json({ error: 'File and fileName are required' });
    }

    console.log(`Uploading file: ${fileName}, size: ${file.length} bytes, contactType: ${contactType}`);

    // Check if credentials are set
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      console.error('Missing Google credentials:', {
        hasEmail: !!clientEmail,
        hasKey: !!privateKey,
      });
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Google Drive credentials are not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.',
      });
    }

    // Determine folder ID - use contactType-specific folder if available, otherwise use provided folderId or default
    const targetFolderId = contactType ? getFolderId(contactType) : (folderId || process.env.GOOGLE_DRIVE_FOLDER_ID);
    
    if (!targetFolderId) {
      console.error('No folder ID configured');
      return res.status(400).json({
        error: 'Folder ID required',
        message: 'No folder ID specified. Please set GOOGLE_DRIVE_FOLDER_ID or contact-type specific folders (GOOGLE_DRIVE_FOLDER_QUOTE, GOOGLE_DRIVE_FOLDER_APPLY, GOOGLE_DRIVE_FOLDER_GENERAL) in environment variables. The folder must be shared with your service account.',
      });
    }

    console.log(`Using folder ID: ${targetFolderId} for contact type: ${contactType || 'default'}`);
    console.log(`Service account email: ${clientEmail}`);

    // Initialize Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive',
      ],
      // Enable domain-wide delegation if needed (for Workspace)
      // subject: 'user@yourdomain.com', // Uncomment and set if using domain-wide delegation
    });

    const drive = google.drive({ version: 'v3', auth });

    // Try to verify the folder exists and is accessible
    // Note: For service accounts, folders must be shared. If verification fails, we'll still try to upload.
    let folderVerified = false;
    try {
      console.log(`Verifying access to folder: ${targetFolderId}`);
      const folderInfo = await drive.files.get({
        fileId: targetFolderId,
        fields: 'id, name, mimeType, permissions, capabilities',
        supportsAllDrives: true, // Important for Shared Drives
      });
      console.log(`Folder verified: ${folderInfo.data.name} (${folderInfo.data.id}), type: ${folderInfo.data.mimeType}`);
      folderVerified = true;
      
      // Check if service account has access and can write
      if (folderInfo.data.permissions) {
        const serviceAccountPerm = folderInfo.data.permissions.find(
          (perm) => perm.emailAddress === clientEmail
        );
        if (serviceAccountPerm) {
          console.log(`Service account ${clientEmail} found in permissions with role: ${serviceAccountPerm.role}`);
          const hasWriteAccess = ['writer', 'owner', 'organizer'].includes(serviceAccountPerm.role);
          if (!hasWriteAccess) {
            return res.status(400).json({
              error: 'Insufficient permissions',
              message: `Service account ${clientEmail} has '${serviceAccountPerm.role}' permission but needs 'Editor' (writer) permission to upload files. Please update the folder sharing settings.`,
              serviceAccountEmail: clientEmail,
              folderId: targetFolderId,
              currentRole: serviceAccountPerm.role,
            });
          }
        } else {
          console.warn(`Service account ${clientEmail} not found in folder permissions, but folder exists - will attempt upload anyway`);
        }
      }
      
      console.log(`✓ Folder access verified - service account can write to ${folderInfo.data.name}`);
    } catch (folderError) {
      console.warn('Folder verification failed:', folderError.message);
      console.warn('This might be okay if the folder is in a Shared Drive or has special sharing settings.');
      console.warn('Will attempt upload anyway - Google Drive API will provide the final error if folder is inaccessible.');
      // Don't return error here - let the upload attempt show the real error
    }

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(file, 'base64');

    // Convert buffer to stream (Google Drive API requires a stream)
    const fileStream = Readable.from(fileBuffer);

    // Upload file to Google Drive - MUST specify parents (folder) for service accounts
    const fileMetadata = {
      name: fileName,
      parents: [targetFolderId], // Required - service accounts must upload to shared folders
    };

    const media = {
      mimeType: getMimeType(fileName),
      body: fileStream,
    };

    console.log(`Attempting to upload to folder: ${targetFolderId}`);
    console.log(`File metadata:`, JSON.stringify(fileMetadata, null, 2));
    
    let response;
    try {
      response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, webContentLink',
        supportsAllDrives: true, // Required for Shared Drives
        supportsTeamDrives: true, // Legacy support for Team Drives
      });
      
      console.log(`Upload successful: ${response.data.name} (${response.data.id})`);
    } catch (uploadError) {
      console.error('Upload failed:', uploadError.message);
      console.error('Upload error response:', uploadError.response?.data || uploadError);
      
      // Check if it's the storage quota error
      if (uploadError.message && uploadError.message.includes('storage quota')) {
        return res.status(400).json({
          error: 'Service account storage quota limitation',
          message: `Service accounts created after April 15, 2025 do not have storage quota. You must use Shared Drives (Team Drives) in Google Workspace. The folder must be in a Shared Drive, and the service account must be added as a member of that Shared Drive.`,
          serviceAccountEmail: clientEmail,
          folderId: targetFolderId,
          solution: 'Create a Shared Drive in Google Workspace, add the service account as a member, and place your folders inside the Shared Drive. Then use those folder IDs.',
          troubleshooting: 'See GOOGLE_DRIVE_SHARED_DRIVE_SETUP.md for detailed instructions',
        });
      }
      throw uploadError; // Re-throw to be caught by outer catch
    }

    // Make the file accessible (optional - remove if you want files private)
    try {
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
      console.log(`File permissions set to public`);
    } catch (permError) {
      console.warn('Failed to set public permissions, but file uploaded:', permError.message);
    }

    res.json({
      fileId: response.data.id,
      fileName: response.data.name,
      downloadUrl: response.data.webContentLink,
      viewUrl: response.data.webViewLink,
    });
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    console.error('Error stack:', error.stack);
    
    // Provide more helpful error messages
    let errorMessage = error.message;
    if (error.message.includes('storage quota') || error.message.includes('Service Accounts do not have storage')) {
      errorMessage = `Service account cannot upload to this location. Please ensure: 1) The folder (${targetFolderId}) is shared with your service account email, 2) The service account has Editor permissions, 3) You're using a regular folder (not a Shared Drive unless you have Workspace admin setup).`;
    }
    
    res.status(500).json({
      error: 'Failed to upload file',
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      folderId: targetFolderId,
      serviceAccountEmail: clientEmail,
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
