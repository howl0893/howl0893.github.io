import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for file uploads

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

// Upload endpoint
app.post('/api/upload-to-drive', async (req, res) => {
  try {
    const { file, fileName, folderId } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({ error: 'File and fileName are required' });
    }

    // Initialize Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(file, 'base64');

    // Upload file to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : undefined,
    };

    const media = {
      mimeType: getMimeType(fileName),
      body: fileBuffer,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink, webContentLink',
    });

    // Make the file accessible (optional - remove if you want files private)
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    res.json({
      fileId: response.data.id,
      fileName: response.data.name,
      downloadUrl: response.data.webContentLink,
      viewUrl: response.data.webViewLink,
    });
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    res.status(500).json({
      error: 'Failed to upload file',
      message: error.message,
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
