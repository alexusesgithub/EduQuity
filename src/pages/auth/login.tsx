import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { FaChalkboardTeacher, FaGraduationCap, FaArrowLeft } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const { role } = router.query;
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (role === 'teacher' || role === 'student') {
      setActiveRole(role);
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to your authentication API
    console.log(`Logging in as ${activeRole} with:`, { email, password });
    
    // Redirect based on role
    if (activeRole === 'teacher') {
      router.push('/dashboard/teacher');
    } else {
      router.push('/dashboard/student');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Login - EduEquity AI</title>
      </Head>
      
      <div className="p-4">
        <Link href="/" className="inline-flex items-center text-primary hover:underline">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            {activeRole ? `${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Login` : 'Login to EduEquity AI'}
          </h1>
          
          {!activeRole ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600 mb-4">Please select your role</p>
              <button 
                onClick={() => setActiveRole('teacher')}
                className="w-full p-4 border rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-50 transition"
              >
                <FaChalkboardTeacher className="text-primary text-xl" />
                <span className="font-medium">I'm a Teacher</span>
              </button>
              
              <button 
                onClick={() => setActiveRole('student')}
                className="w-full p-4 border rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-50 transition"
              >
                <FaGraduationCap className="text-secondary text-xl" />
                <span className="font-medium">I'm a Student</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button type="submit" className="btn btn-primary w-full">
                  Sign in
                </button>
              </div>
              
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => setActiveRole(null)}
                  className="text-gray-600 hover:underline text-sm"
                >
                  Change role
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 