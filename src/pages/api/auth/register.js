import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.xlsx');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, role, name } = req.body;

    // Create data directory if it doesn't exist
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });

    // Create or load workbook
    let workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.readFile(USERS_FILE);
    } catch (error) {
      // If file doesn't exist, create new workbook with headers
      const worksheet = workbook.addWorksheet('Users');
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Email', key: 'email', width: 40 },
        { header: 'Password', key: 'password', width: 30 },
        { header: 'Role', key: 'role', width: 15 },
        { header: 'Created At', key: 'createdAt', width: 20 },
        { header: 'Last Login', key: 'lastLogin', width: 20 }
      ];
    }

    const worksheet = workbook.getWorksheet('Users');
    
    // Check if user already exists
    const existingUser = worksheet.getRows(2, worksheet.rowCount - 1)
      .find(row => row.getCell('email').value === email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Add new user
    const newUser = {
      id: worksheet.rowCount,
      name,
      email,
      password: password, // In production, hash the password
      role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    worksheet.addRow(newUser);

    // Save workbook
    await workbook.xlsx.writeFile(USERS_FILE);

    // Create user-specific productivity data file
    const userDataFile = path.join(process.cwd(), 'data', `${email.replace('@', '_')}_data.xlsx`);
    const userWorkbook = new ExcelJS.Workbook();
    
    // Add Tasks worksheet
    const tasksSheet = userWorkbook.addWorksheet('Tasks');
    tasksSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Title', key: 'title', width: 40 },
      { header: 'Description', key: 'description', width: 60 },
      { header: 'Due Date', key: 'dueDate', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Priority', key: 'priority', width: 15 },
      { header: 'Created At', key: 'createdAt', width: 20 }
    ];

    // Add Schedule worksheet
    const scheduleSheet = userWorkbook.addWorksheet('Schedule');
    scheduleSheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Title', key: 'title', width: 40 },
      { header: 'Start Time', key: 'startTime', width: 20 },
      { header: 'End Time', key: 'endTime', width: 20 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Notes', key: 'notes', width: 60 }
    ];

    // Add Progress worksheet
    const progressSheet = userWorkbook.addWorksheet('Progress');
    progressSheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Tasks Completed', key: 'tasksCompleted', width: 15 },
      { header: 'Study Hours', key: 'studyHours', width: 15 },
      { header: 'Productivity Score', key: 'productivityScore', width: 15 },
      { header: 'Notes', key: 'notes', width: 60 }
    ];

    await userWorkbook.xlsx.writeFile(userDataFile);

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
} 