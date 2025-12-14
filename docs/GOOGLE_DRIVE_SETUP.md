# Google Drive Setup Instructions

This guide will help you set up Google Drive file uploads for your contact forms.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

## Step 2: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `applied-ml-file-uploader` (or any name you prefer)
   - Click "Create and Continue"
   - Skip the optional steps and click "Done"

## Step 3: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file (keep it secure - this contains sensitive credentials)

## Step 4: Share Google Drive Folder with Service Account

1. Open the JSON file you downloaded
2. Copy the `client_email` value (looks like: `your-service-account@project-id.iam.gserviceaccount.com`)
3. Go to your Google Drive
4. Create a folder for storing uploaded files (e.g., "Contact Form Uploads")
5. Right-click the folder > "Share"
6. Paste the service account email address
7. Give it "Editor" permissions
8. Click "Send" (you don't need to notify the service account)

## Step 5: Get Folder ID (Optional)

If you want files to go to a specific folder:

1. Open the folder in Google Drive
2. Look at the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
3. Copy the `FOLDER_ID_HERE` part

## Step 6: Configure Your Deployment Platform

For deployment platform-specific instructions, see:
- **Render**: See `RENDER_SETUP.md` for detailed Render deployment steps
- **Other platforms**: Set the environment variables as shown below in your platform's dashboard

## Step 7: Update Your Local .env File

For local development, add these to your `.env` file:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...your full private key...\n-----END PRIVATE KEY-----\n"
VITE_GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here
```

**Note:** The `VITE_GOOGLE_DRIVE_FOLDER_ID` is optional - if not set, files will be uploaded to the root of the service account's Drive.

## Testing

1. Deploy your backend API and frontend to your hosting platform (see `RENDER_SETUP.md` for Render)
2. Test the contact form with a file upload
3. Check your Google Drive folder to see if the file appears

## Troubleshooting

- **"Permission denied"**: Make sure you shared the Drive folder with the service account email
- **"Invalid credentials"**: Double-check that the private key includes all `\n` characters
- **"Files not appearing"**: Check your backend API logs in your hosting platform dashboard
- **"Cannot connect to API"**: Verify that `VITE_API_URL` is set correctly in your frontend environment variables

## Security Notes

- Never commit the service account JSON file to git
- The `.env` file should be in `.gitignore` (which it already is)
- The service account only has access to the specific folder you shared with it
