import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaBook, 
  FaCalendarAlt, 
  FaChartBar, 
  FaBrain, 
  FaSignOutAlt,
  FaBell
} from 'react-icons/fa';

// Mock data
const mockStudents = [
  { id: 1, name: 'John Doe', performance: 85, lastActivity: '2 hours ago', status: 'On track' },
  { id: 2, name: 'Jane Smith', performance: 92, lastActivity: '1 day ago', status: 'Excelling' },
  { id: 3, name: 'Mike Johnson', performance: 68, lastActivity: '3 hours ago', status: 'Needs help' },
  { id: 4, name: 'Sarah Williams', performance: 76, lastActivity: '4 hours ago', status: 'Improving' },
  { id: 5, name: 'David Brown', performance: 60, lastActivity: '2 days ago', status: 'At risk' },
];

const mockCourses = [
  { id: 1, name: 'Mathematics 101', students: 24, progress: 65 },
  { id: 2, name: 'Science Fundamentals', students: 18, progress: 72 },
  { id: 3, name: 'History & Culture', students: 22, progress: 58 }
];

export default function TeacherDashboard() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI response (would connect to OpenAI API in production)
    setTimeout(() => {
      setAiResponse(`Here are some personalized suggestions based on "${aiPrompt}":\n\n1. Consider adjusting the pace for students who are falling behind\n2. Offer additional resources for advanced topics\n3. Implement collaborative learning activities to boost engagement\n4. Schedule one-on-one sessions with at-risk students`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white fixed inset-y-0 left-0 z-10 hidden md:flex flex-col">
        <div className="p-4 border-b border-primary-dark">
          <div className="flex items-center space-x-2">
            <FaChalkboardTeacher className="text-2xl" />
            <h1 className="text-xl font-bold">EduEquity AI</h1>
          </div>
          <p className="text-sm text-primary-light mt-1">Teacher Dashboard</p>
        </div>
        
        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard/teacher" className="flex items-center px-4 py-3 bg-primary-dark font-medium">
                <FaChartBar className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/teacher/students" className="flex items-center px-4 py-3 hover:bg-primary-dark">
                <FaUserGraduate className="mr-3" /> Students
              </Link>
            </li>
            <li>
              <Link href="/dashboard/teacher/courses" className="flex items-center px-4 py-3 hover:bg-primary-dark">
                <FaBook className="mr-3" /> Courses
              </Link>
            </li>
            <li>
              <Link href="/dashboard/teacher/schedule" className="flex items-center px-4 py-3 hover:bg-primary-dark">
                <FaCalendarAlt className="mr-3" /> Schedule
              </Link>
            </li>
            <li>
              <Link href="/dashboard/teacher/ai-tools" className="flex items-center px-4 py-3 hover:bg-primary-dark">
                <FaBrain className="mr-3" /> AI Tools
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-primary-dark">
          <Link href="/auth/logout" className="flex items-center text-primary-light hover:text-white">
            <FaSignOutAlt className="mr-2" /> Sign Out
          </Link>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-grow md:ml-64 p-4">
        <Head>
          <title>Teacher Dashboard - EduEquity AI</title>
        </Head>
        
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, Professor!</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FaBell className="text-xl text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              PT
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card bg-primary bg-opacity-10 border-l-4 border-primary">
            <h3 className="font-semibold text-primary">Total Students</h3>
            <p className="text-3xl font-bold mt-2">86</p>
            <p className="text-sm text-gray-500 mt-1">↑ 5% from last month</p>
          </div>
          
          <div className="card bg-green-100 border-l-4 border-green-500">
            <h3 className="font-semibold text-green-700">Average Performance</h3>
            <p className="text-3xl font-bold mt-2">78%</p>
            <p className="text-sm text-gray-500 mt-1">↑ 2% from last month</p>
          </div>
          
          <div className="card bg-yellow-100 border-l-4 border-yellow-500">
            <h3 className="font-semibold text-yellow-700">At-Risk Students</h3>
            <p className="text-3xl font-bold mt-2">12</p>
            <p className="text-sm text-gray-500 mt-1">↓ 3% from last month</p>
          </div>
        </div>
        
        {/* AI Assistant Section */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaBrain className="text-primary mr-2" /> AI Teaching Assistant
          </h2>
          <form onSubmit={handleAISubmit}>
            <div className="mb-3">
              <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Ask for suggestions or insights:
              </label>
              <input
                id="ai-prompt"
                type="text"
                className="input w-full"
                placeholder="E.g., How can I improve engagement in my science class?"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Get AI Insights'}
            </button>
          </form>
          
          {aiResponse && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md border">
              <h3 className="font-medium mb-2">AI Suggestions:</h3>
              <p className="whitespace-pre-line text-gray-700">{aiResponse}</p>
            </div>
          )}
        </div>
        
        {/* Recent Students & Course Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Students Table */}
          <div className="card overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Student Activity</h2>
              <Link href="/dashboard/teacher/students" className="text-primary text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Student</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Performance</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">Last active: {student.lastActivity}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.performance >= 80 ? 'bg-green-500' : 
                            student.performance >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${student.performance}%` }}
                        />
                      </div>
                      <p className="text-sm mt-1">{student.performance}%</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        student.status === 'Excelling' ? 'bg-green-100 text-green-800' :
                        student.status === 'On track' ? 'bg-blue-100 text-blue-800' :
                        student.status === 'Improving' ? 'bg-yellow-100 text-yellow-800' :
                        student.status === 'Needs help' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Course Progress */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Course Progress</h2>
              <Link href="/dashboard/teacher/courses" className="text-primary text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-6">
              {mockCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{course.name}</h3>
                    <span className="text-sm text-gray-500">{course.students} students</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Overall progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 