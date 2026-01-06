import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

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

    const { filename } = req.query;
    
    // Security check - prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ message: 'Invalid filename' });
    }
    
    const filePath = path.join(DATA_DIR, filename);

    // Create data directory if it doesn't exist
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (error) {
      console.error('Error creating data directory:', error);
    }

    // Verify file exists and is an Excel file
    try {
      await fs.access(filePath);
      if (!filename.endsWith('.xlsx')) {
        return res.status(400).json({ message: 'Invalid file type' });
      }
    } catch (error) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Read Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Get all sheets
    const sheets = workbook.worksheets.map(worksheet => worksheet.name);

    // Get the first sheet's data
    const worksheet = workbook.getWorksheet(1);
    const headers = [];
    const rows = [];

    // Get headers
    worksheet.getRow(1).eachCell((cell) => {
      headers.push(cell.value);
    });

    // Get data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const rowData = [];
        row.eachCell((cell) => {
          rowData.push(cell.value);
        });
        rows.push(rowData);
      }
    });

    res.status(200).json({
      files: await fs.readdir(DATA_DIR).then(files => 
        files.filter(file => file.endsWith('.xlsx') && !file.startsWith('~$'))
      ),
      sheets,
      headers,
      rows
    });
  } catch (error) {
    console.error('Error reading Excel file:', error);
    res.status(500).json({ message: 'Error reading Excel file' });
  }
} 