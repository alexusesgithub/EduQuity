import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const adminLoginStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 1
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--gray-700)'
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '2px solid var(--gray-200)',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '1rem',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  error: {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  }
};

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={adminLoginStyles.container}>
      <Head>
        <title>Admin Login - EduEquity AI</title>
        <meta name="description" content="Admin login page" />
      </Head>

      <div style={adminLoginStyles.card}>
        <h1 style={adminLoginStyles.title}>Admin Login</h1>
        <form onSubmit={handleSubmit} style={adminLoginStyles.form}>
          <div style={adminLoginStyles.inputGroup}>
            <label htmlFor="username" style={adminLoginStyles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              style={adminLoginStyles.input}
              required
            />
          </div>

          <div style={adminLoginStyles.inputGroup}>
            <label htmlFor="password" style={adminLoginStyles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              style={adminLoginStyles.input}
              required
            />
          </div>

          {error && <div style={adminLoginStyles.error}>{error}</div>}

          <button
            type="submit"
            style={{
              ...adminLoginStyles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
} 