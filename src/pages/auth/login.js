import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const loginStyles = {
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
  inputFocus: {
    borderColor: 'var(--primary)',
    boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.1)'
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
  buttonHover: {
    backgroundColor: 'var(--primary-dark)',
    transform: 'translateY(-2px)'
  },
  error: {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },
  roleSelector: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  roleButton: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '10px',
    border: '2px solid var(--gray-200)',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 500
  },
  roleButtonActive: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    borderColor: 'var(--primary)'
  },
  loading: {
    opacity: 0.7,
    pointerEvents: 'none'
  },
  successMessage: {
    color: '#059669',
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  }
};

export default function Login() {
  const router = useRouter();
  const { role } = router.query;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [selectedRole, setSelectedRole] = useState(role || 'student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (role) {
      setSelectedRole(role);
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleRoleToggle = (role) => {
    setSelectedRole(role);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (isSignup) {
        // Validate fields
        if (!formData.name || !formData.email || !formData.password || !selectedRole) {
          setError('All fields are required.');
          setLoading(false);
          return;
        }
        // Sign Up logic
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: selectedRole
          })
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess('Registration successful! Please log in.');
          setIsSignup(false);
          setFormData({ email: '', password: '', name: '' });
          setSelectedRole('student');
        } else {
          setError(data.message || 'Registration failed');
        }
      } else {
        // Login logic
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role: selectedRole })
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          if (selectedRole === 'student') {
            router.push('/institution/student-dashboard');
          } else if (selectedRole === 'teacher') {
            router.push('/institution/teacher-dashboard');
          } else {
            router.push('/dashboard');
          }
        } else {
          setError(data.message || 'Invalid credentials');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.container}>
      <Head>
        <title>{isSignup ? 'Sign Up' : 'Login'} - EduEquity AI</title>
        <meta name="description" content="Login or sign up to your EduEquity AI account" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={loginStyles.card}>
        <h1 style={loginStyles.title}>{isSignup ? 'Sign Up' : 'Welcome Back'}</h1>
        <div style={loginStyles.roleSelector}>
          <button
            type="button"
            style={{
              ...loginStyles.roleButton,
              ...(selectedRole === 'student' ? loginStyles.roleButtonActive : {}),
              backgroundColor: selectedRole === 'student' ? '#2563eb' : 'white',
              color: selectedRole === 'student' ? 'white' : '#374151',
              borderColor: selectedRole === 'student' ? '#2563eb' : 'var(--gray-200)'
            }}
            onClick={() => handleRoleToggle('student')}
          >
            Student
          </button>
          <button
            type="button"
            style={{
              ...loginStyles.roleButton,
              ...(selectedRole === 'teacher' ? loginStyles.roleButtonActive : {}),
              backgroundColor: selectedRole === 'teacher' ? '#2563eb' : 'white',
              color: selectedRole === 'teacher' ? 'white' : '#374151',
              borderColor: selectedRole === 'teacher' ? '#2563eb' : 'var(--gray-200)'
            }}
            onClick={() => handleRoleToggle('teacher')}
          >
            Teacher
          </button>
        </div>
        <form onSubmit={handleSubmit} style={loginStyles.form}>
          {isSignup && (
            <div style={loginStyles.inputGroup}>
              <label htmlFor="name" style={loginStyles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('name')}
                onBlur={handleInputBlur}
                style={{
                  ...loginStyles.input,
                  ...(focusedInput === 'name' ? loginStyles.inputFocus : {})
                }}
                required
              />
            </div>
          )}
          <div style={loginStyles.inputGroup}>
            <label htmlFor="email" style={loginStyles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('email')}
              onBlur={handleInputBlur}
              style={{
                ...loginStyles.input,
                ...(focusedInput === 'email' ? loginStyles.inputFocus : {})
              }}
              required
            />
          </div>
          <div style={loginStyles.inputGroup}>
            <label htmlFor="password" style={loginStyles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus('password')}
              onBlur={handleInputBlur}
              style={{
                ...loginStyles.input,
                ...(focusedInput === 'password' ? loginStyles.inputFocus : {})
              }}
              required
            />
          </div>
          {error && <div style={loginStyles.error}>{error}</div>}
          {success && <div style={loginStyles.successMessage}>{success}</div>}
          <button
            type="submit"
            style={{
              ...loginStyles.button,
              ...(loading ? loginStyles.loading : {}),
              ...(focusedInput ? loginStyles.buttonHover : {})
            }}
            disabled={loading}
          >
            {loading ? (isSignup ? 'Signing up...' : 'Logging in...') : (isSignup ? 'Sign Up' : 'Login')}
          </button>
        </form>
        <button
          type="button"
          style={{
            ...loginStyles.button,
            marginTop: '1rem',
            backgroundColor: '#4F46E5',
          }}
          onClick={() => router.push('/institution')}
        >
          University Module
        </button>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {isSignup ? (
            <>
              <span>Already have an account? </span>
              <a style={{ color: '#4F46E5', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setIsSignup(false)}>Login</a>
            </>
          ) : (
            <>
              <span>Don't have an account? </span>
              <a style={{ color: '#4F46E5', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setIsSignup(true)}>Sign Up</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 