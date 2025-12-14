# Render Setup Instructions for Google Drive File Uploads

This guide will help you set up Google Drive file uploads on Render.

## Architecture

You'll have two services on Render:
1. **Backend API** - Handles file uploads to Google Drive
2. **Frontend** - Your React static site

## Step 1: Set Up Google Drive API

Follow the Google Drive setup steps from `GOOGLE_DRIVE_SETUP.md` (Steps 1-5) to:
- Create a Google Cloud project
- Enable Google Drive API
- Create a service account
- Download the service account JSON
- Share a Drive folder with the service account

## Step 2: Deploy Backend API on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" > "Web Service"
3. Connect your repository
4. Configure the service:
   - **Name**: `applied-ml-api` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Root Directory**: Leave empty (or set to root if needed)

5. Add Environment Variables:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `your-service-account@project-id.iam.gserviceaccount.com`
   - `GOOGLE_PRIVATE_KEY` = `"-----BEGIN PRIVATE KEY-----\n...your full private key...\n-----END PRIVATE KEY-----\n"`
   - `GOOGLE_DRIVE_FOLDER_ID` = `your-folder-id-here` (optional)

   **Important for GOOGLE_PRIVATE_KEY:**
   - Open the JSON file you downloaded
   - Copy the entire `private_key` value (including the quotes and `\n` characters)
   - Paste it exactly as shown in the JSON

6. Click "Create Web Service"
7. Wait for deployment and copy the service URL (e.g., `https://applied-ml-api.onrender.com`)

## Step 3: Deploy Frontend on Render

1. In Render Dashboard, click "New +" > "Static Site"
2. Connect your repository
3. Configure the service:
   - **Name**: `applied-ml-frontend` (or any name)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   - `VITE_API_URL` = `https://applied-ml-api.onrender.com` (use your actual backend URL from Step 2)
   - `VITE_EMAILJS_SERVICE_ID` = your EmailJS service ID
   - `VITE_EMAILJS_PUBLIC_KEY` = your EmailJS public key
   - `VITE_EMAILJS_TEMPLATE_ID_GENERAL` = your general template ID
   - `VITE_EMAILJS_TEMPLATE_ID_APPLY` = your apply template ID
   - `VITE_GOOGLE_DRIVE_FOLDER_ID` = your folder ID (optional, same as backend)

5. Click "Create Static Site"

## Step 4: Update Frontend Environment Variable

After the backend is deployed, update the frontend's `VITE_API_URL` to point to your backend service URL.

## Alternative: Single Service Setup

If you prefer to deploy everything together, you can:

1. Deploy the backend as a Web Service (follow Step 2)
2. Update your frontend's `vite.config.ts` to proxy API requests during development
3. For production, set `VITE_API_URL` to your backend URL

## Local Development

1. Create a `.env` file in the root:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...your full private key...\n-----END PRIVATE KEY-----\n"
   GOOGLE_DRIVE_FOLDER_ID=your-folder-id-here
   VITE_API_URL=http://localhost:3001
   ```

2. Start the backend:
   ```bash
   node server/index.js
   ```

3. Start the frontend (in another terminal):
   ```bash
   npm run dev
   ```

## Testing

1. Deploy both services to Render
2. Test the contact form with a file upload
3. Check your Google Drive folder to see if the file appears
4. Check the email you receive - it should include download links

## Troubleshooting

- **"Cannot connect to API"**: Make sure `VITE_API_URL` is set correctly in your frontend environment variables
- **"Permission denied"**: Verify you shared the Drive folder with the service account email
- **"Invalid credentials"**: Double-check that the private key includes all `\n` characters
- **CORS errors**: The backend includes CORS middleware, but if you see errors, check that the frontend URL is allowed

## Security Notes

- Never commit the service account JSON file to git
- The `.env` file should be in `.gitignore` (which it already is)
- The service account only has access to the specific folder you shared with it
- Render environment variables are encrypted at rest
