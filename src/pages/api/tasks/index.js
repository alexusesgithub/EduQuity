import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      const userDataFile = path.join(process.cwd(), 'data', `${userId}_data.xlsx`);
      
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(userDataFile);
      
      const tasksSheet = workbook.getWorksheet('Tasks');
      const tasks = [];
      
      tasksSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Skip header row
          tasks.push({
            id: row.getCell('id').value,
            title: row.getCell('title').value,
            description: row.getCell('description').value,
            dueDate: row.getCell('dueDate').value,
            status: row.getCell('status').value,
            priority: row.getCell('priority').value,
            createdAt: row.getCell('createdAt').value
          });
        }
      });

      res.status(200).json({ tasks });
    } catch (error) {
      console.error('Error loading tasks:', error);
      res.status(500).json({ message: 'Error loading tasks' });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { title, userId } = req.body;
      const userDataFile = path.join(process.cwd(), 'data', `${userId}_data.xlsx`);
      
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(userDataFile);
      
      const tasksSheet = workbook.getWorksheet('Tasks');
      const newTask = {
        id: tasksSheet.rowCount,
        title,
        description: '',
        dueDate: new Date().toISOString(),
        status: 'pending',
        priority: 'medium',
        createdAt: new Date().toISOString()
      };

      tasksSheet.addRow(newTask);
      await workbook.xlsx.writeFile(userDataFile);

      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ message: 'Error adding task' });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 