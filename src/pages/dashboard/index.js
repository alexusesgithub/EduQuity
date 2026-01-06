import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const dashboardStyles = {
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
    gap: '2rem',
    marginBottom: '2rem'
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease'
  },
  cardHover: {
    transform: 'translateY(-5px)'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: 'var(--gray-800)'
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    borderBottom: '1px solid var(--gray-200)',
    transition: 'background-color 0.3s ease'
  },
  taskItemHover: {
    backgroundColor: 'var(--gray-50)'
  },
  checkbox: {
    marginRight: '1rem',
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  taskText: {
    flex: 1,
    fontSize: '0.95rem'
  },
  completedTask: {
    textDecoration: 'line-through',
    color: 'var(--gray-500)'
  },
  addTask: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '8px',
    border: '2px solid var(--gray-200)',
    fontSize: '0.95rem'
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
  buttonHover: {
    backgroundColor: 'var(--primary-dark)'
  },
  schedule: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.5rem'
  },
  day: {
    padding: '0.5rem',
    textAlign: 'center',
    border: '1px solid var(--gray-200)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  dayHover: {
    backgroundColor: 'var(--gray-50)'
  },
  selectedDay: {
    backgroundColor: 'var(--primary)',
    color: 'white'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--gray-200)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--primary)',
    transition: 'width 0.3s ease'
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!storedUser || !token) {
      router.push('/auth/login');
      return;
    }
    
    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'var(--gray-50)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid var(--gray-200)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Loading dashboard...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Dashboard - Mental health AI</title>
        <meta name="description" content="User dashboard" />
      </Head>

      <header style={{ 
        backgroundColor: 'var(--white)', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            EduEquity AI
          </h1>
          <nav>
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none', 
              gap: '2rem',
              alignItems: 'center'
            }}>
              <li>
                <span style={{ 
                  color: 'var(--gray-700)', 
                  fontWeight: 500
                }}>
                  Welcome, {user.name}
                </span>
              </li>
              <li>
                <a 
                  href="/chatbot" 
                  style={{ 
                    color: 'var(--primary)', 
                    fontWeight: 500,
                    textDecoration: 'none'
                  }}
                >
                  Chat Assistant
                </a>
              </li>
              <li>
                <button 
                  onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    router.push('/auth/login');
                  }}
                  style={{ 
                    backgroundColor: 'var(--gray-200)',
                    color: 'var(--gray-700)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto', 
        padding: '0 2rem' 
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ 
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              fontWeight: 600
            }}>
              Welcome to Your Dashboard
            </h2>
            <p style={{ marginBottom: '1.5rem' }}>
              You are logged in as a <strong>{user.role}</strong>.
            </p>
            <div style={{ 
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <a href="/dashboard/tasks" style={{ 
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-block'
              }}>
                View Tasks
              </a>
              <a href="/dashboard/progress" style={{ 
                backgroundColor: 'var(--secondary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-block'
              }}>
                Track Progress
              </a>
              <a href="/chatbot" style={{ 
                backgroundColor: 'var(--accent)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-block'
              }}>
                Chat Assistant
              </a>
            </div>
          </div>
          
          <div style={{ 
            background: 'white',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              fontWeight: 600
            }}>
              Quick Links
            </h2>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{ 
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📊</span> Your Analytics
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{ 
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📝</span> Task Manager
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="#" style={{ 
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📅</span> Calendar
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'var(--primary)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>⚙️</span> Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 