import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // In production, use environment variables and proper password hashing
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // In production, use proper JWT token generation
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      res.status(200).json({ 
        message: 'Login successful',
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
} 