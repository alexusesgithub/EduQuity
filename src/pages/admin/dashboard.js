import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ExcelJS from 'exceljs';

const adminDashboardStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--gray-100)',
    padding: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--gray-800)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  th: {
    backgroundColor: 'var(--gray-100)',
    padding: '0.75rem',
    textAlign: 'left',
    borderBottom: '2px solid var(--gray-200)',
    fontWeight: 600
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid var(--gray-200)'
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  select: {
    padding: '0.5rem',
    borderRadius: '8px',
    border: '2px solid var(--gray-200)',
    marginBottom: '1rem',
    width: '100%'
  }
};

export default function AdminDashboard() {
  const router = useRouter();
  const [excelData, setExcelData] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedSheet, setSelectedSheet] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load available Excel files
    loadExcelFiles();
  }, []);

  const loadExcelFiles = async () => {
    try {
      const response = await fetch('/api/admin/files', {
        headers: {
          'x-admin-token': localStorage.getItem('admin_token')
        }
      });
      const data = await response.json();
      if (data.files && data.files.length > 0) {
        setSelectedFile(data.files[0]);
        loadExcelData(data.files[0]);
      }
    } catch (error) {
      console.error('Error loading Excel files:', error);
    }
  };

  const loadExcelData = async (filename) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/excel/${filename}`, {
        headers: {
          'x-admin-token': localStorage.getItem('admin_token')
        }
      });
      const data = await response.json();
      setExcelData(data);
      if (data.sheets && data.sheets.length > 0) {
        setSelectedSheet(data.sheets[0]);
      }
    } catch (error) {
      console.error('Error loading Excel data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const filename = e.target.value;
    setSelectedFile(filename);
    loadExcelData(filename);
  };

  const handleSheetChange = (e) => {
    setSelectedSheet(e.target.value);
    // TODO: In a more complete implementation, update the displayed data based on the selected sheet
  };

  if (!excelData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={adminDashboardStyles.container}>
      <Head>
        <title>Admin Dashboard - EduEquity AI</title>
        <meta name="description" content="Admin dashboard for viewing Excel data" />
      </Head>

      <header style={adminDashboardStyles.header}>
        <h1 style={adminDashboardStyles.title}>Admin Dashboard</h1>
        <button 
          style={adminDashboardStyles.button}
          onClick={() => {
            localStorage.removeItem('admin_token');
            router.push('/admin/login');
          }}
        >
          Logout
        </button>
      </header>

      <div style={adminDashboardStyles.grid}>
        <div style={adminDashboardStyles.card}>
          <h2 style={adminDashboardStyles.cardTitle}>Excel Files</h2>
          <select 
            value={selectedFile}
            onChange={handleFileChange}
            style={adminDashboardStyles.select}
          >
            {excelData.files?.map(file => (
              <option key={file} value={file}>{file}</option>
            ))}
          </select>

          <select 
            value={selectedSheet}
            onChange={handleSheetChange}
            style={adminDashboardStyles.select}
          >
            {excelData.sheets?.map(sheet => (
              <option key={sheet} value={sheet}>{sheet}</option>
            ))}
          </select>

          {loading ? (
            <div>Loading data...</div>
          ) : (
            <table style={adminDashboardStyles.table}>
              <thead>
                <tr>
                  {excelData.headers?.map(header => (
                    <th key={header} style={adminDashboardStyles.th}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.rows?.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} style={adminDashboardStyles.td}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
} 