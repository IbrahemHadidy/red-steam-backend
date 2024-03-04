import fs from 'fs';
import { google } from 'googleapis';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

// Load the credentials from the JSON key file
const keyFile = 'src/credentials/service-account-key.json';
const key = JSON.parse(fs.readFileSync(keyFile).toString());

// Authenticate with Google Drive API using service account credentials
const authClient = new google.auth.GoogleAuth({
  credentials: key,
  scopes: [
    'https://www.googleapis.com/auth/drive',
  ],
});

// Create a Google Drive API client
export const drive = google.drive({ version: 'v3', auth: authClient });

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Multer instance with configuration
export const upload = multer({
  storage: storage,
});

