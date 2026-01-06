import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify admin token
    const adminToken = req.headers['x-admin-token'];
    if (!adminToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create data directory if it doesn't exist
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
      console.error('Error creating data directory:', error);
    }

    // Read the data directory
    const files = await fs.readdir(DATA_DIR);
    
    // Filter for Excel files
    const excelFiles = files.filter(file => 
      file.endsWith('.xlsx') && !file.startsWith('~$') // Exclude temporary Excel files
    );

    res.status(200).json({ files: excelFiles });
  } catch (error) {
    console.error('Error reading Excel files:', error);
    res.status(500).json({ message: 'Error reading Excel files' });
  }
} 