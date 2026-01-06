import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Mock users
  const mockUsers = {
    student: {
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
      name: 'Test Student'
    },
    teacher: {
      email: 'teacher@example.com',
      password: 'password123',
      role: 'teacher',
      name: 'Test Teacher'
    }
  };

  const user = mockUsers[role];
  if (!user || user.email !== email || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (user.role !== role) {
    return res.status(401).json({ message: 'Role mismatch' });
  }

  // Success: redirect based on role
  return res.status(200).json({
    message: 'Login successful',
    redirect: role === 'student' ? '/institution/student-dashboard' : '/institution/teacher-dashboard',
    user: {
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
} 