import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const { id } = req.query;
      const { completed } = req.body;
      const userId = req.headers['x-user-id'];

      const userDataFile = path.join(process.cwd(), 'data', `${userId}_data.xlsx`);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(userDataFile);

      const tasksSheet = workbook.getWorksheet('Tasks');
      let taskRow = null;

      // Find the task row
      tasksSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1 && row.getCell('id').value === parseInt(id)) {
          taskRow = row;
        }
      });

      if (!taskRow) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Update task status
      taskRow.getCell('status').value = completed ? 'completed' : 'pending';
      await workbook.xlsx.writeFile(userDataFile);

      // Update progress in Progress sheet
      const progressSheet = workbook.getWorksheet('Progress');
      const today = new Date().toISOString().split('T')[0];
      let progressRow = null;

      // Find or create today's progress row
      progressSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1 && row.getCell('date').value === today) {
          progressRow = row;
        }
      });

      if (!progressRow) {
        progressRow = progressSheet.addRow({
          date: today,
          tasksCompleted: 0,
          studyHours: 0,
          productivityScore: 0,
          notes: ''
        });
      }

      // Update tasks completed count
      const completedTasks = tasksSheet.getRows(2, tasksSheet.rowCount - 1)
        .filter(row => row.getCell('status').value === 'completed').length;
      
      progressRow.getCell('tasksCompleted').value = completedTasks;
      
      // Calculate productivity score
      const totalTasks = tasksSheet.rowCount - 1;
      const productivityScore = Math.round((completedTasks / totalTasks) * 100);
      progressRow.getCell('productivityScore').value = productivityScore;

      await workbook.xlsx.writeFile(userDataFile);

      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Error updating task' });
    }
  }
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 