import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaGraduationCap, 
  FaBook, 
  FaCalendarAlt, 
  FaChartBar, 
  FaBrain, 
  FaSignOutAlt,
  FaBell,
  FaTasks,
  FaClock
} from 'react-icons/fa';

// Mock data
const mockCourses = [
  { id: 1, name: 'Mathematics 101', progress: 65, nextLesson: 'Quadratic Equations' },
  { id: 2, name: 'Science Fundamentals', progress: 72, nextLesson: 'Cell Biology' },
  { id: 3, name: 'History & Culture', progress: 58, nextLesson: 'Renaissance Period' }
];

const mockAssignments = [
  { id: 1, title: 'Math Problem Set 3', course: 'Mathematics 101', due: '2 days', status: 'pending' },
  { id: 2, title: 'Science Lab Report', course: 'Science Fundamentals', due: 'Tomorrow', status: 'urgent' },
  { id: 3, title: 'History Essay', course: 'History & Culture', due: '5 days', status: 'pending' },
  { id: 4, title: 'Linear Algebra Quiz', course: 'Mathematics 101', due: 'Completed', status: 'completed' }
];

export default function StudentDashboard() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI response (would connect to OpenAI API in production)
    setTimeout(() => {
      setAiResponse(`Here's an explanation for "${aiPrompt}":\n\nQuadratic equations are algebraic expressions where the highest exponent of the variable is 2. The standard form is ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.\n\nTo solve these equations, you can use:\n1. Factoring\n2. Completing the square\n3. Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a\n\nWould you like me to explain any of these methods in more detail?`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white fixed inset-y-0 left-0 z-10 hidden md:flex flex-col">
        <div className="p-4 border-b border-secondary-dark">
          <div className="flex items-center space-x-2">
            <FaGraduationCap className="text-2xl" />
            <h1 className="text-xl font-bold">EduEquity AI</h1>
          </div>
          <p className="text-sm text-secondary-light mt-1">Student Dashboard</p>
        </div>
        
        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard/student" className="flex items-center px-4 py-3 bg-secondary-dark font-medium">
                <FaChartBar className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/courses" className="flex items-center px-4 py-3 hover:bg-secondary-dark">
                <FaBook className="mr-3" /> My Courses
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/assignments" className="flex items-center px-4 py-3 hover:bg-secondary-dark">
                <FaTasks className="mr-3" /> Assignments
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/schedule" className="flex items-center px-4 py-3 hover:bg-secondary-dark">
                <FaCalendarAlt className="mr-3" /> Schedule
              </Link>
            </li>
            <li>
              <Link href="/dashboard/student/ai-tutor" className="flex items-center px-4 py-3 hover:bg-secondary-dark">
                <FaBrain className="mr-3" /> AI Tutor
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-secondary-dark">
          <Link href="/auth/logout" className="flex items-center text-secondary-light hover:text-white">
            <FaSignOutAlt className="mr-2" /> Sign Out
          </Link>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-grow md:ml-64 p-4">
        <Head>
          <title>Student Dashboard - EduEquity AI</title>
        </Head>
        
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, Student!</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FaBell className="text-xl text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </button>
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-medium">
              JS
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card bg-secondary bg-opacity-10 border-l-4 border-secondary">
            <h3 className="font-semibold text-secondary">Overall Progress</h3>
            <p className="text-3xl font-bold mt-2">72%</p>
            <p className="text-sm text-gray-500 mt-1">↑ 5% from last week</p>
          </div>
          
          <div className="card bg-blue-100 border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-700">Study Time</h3>
            <p className="text-3xl font-bold mt-2">12.5 hrs</p>
            <p className="text-sm text-gray-500 mt-1">This week</p>
          </div>
          
          <div className="card bg-purple-100 border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-700">Achievements</h3>
            <p className="text-3xl font-bold mt-2">8</p>
            <p className="text-sm text-gray-500 mt-1">3 new this month</p>
          </div>
        </div>
        
        {/* AI Tutor Section */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaBrain className="text-secondary mr-2" /> AI Personal Tutor
          </h2>
          <form onSubmit={handleAISubmit}>
            <div className="mb-3">
              <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Ask a question or request help with a topic:
              </label>
              <input
                id="ai-prompt"
                type="text"
                className="input w-full"
                placeholder="E.g., Can you explain quadratic equations to me?"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-secondary"
              disabled={loading}
            >
              {loading ? 'Thinking...' : 'Get Help'}
            </button>
          </form>
          
          {aiResponse && (
            <div className="mt-4 bg-gray-50 p-4 rounded-md border">
              <h3 className="font-medium mb-2">AI Tutor:</h3>
              <p className="whitespace-pre-line text-gray-700">{aiResponse}</p>
            </div>
          )}
        </div>
        
        {/* Upcoming & Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Assignments */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Assignments</h2>
              <Link href="/dashboard/student/assignments" className="text-secondary text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <div className="divide-y divide-gray-200">
              {mockAssignments.map((assignment) => (
                <div key={assignment.id} className="py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{assignment.title}</h3>
                    <p className="text-sm text-gray-500">{assignment.course}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`mr-2 inline-flex px-2 py-1 text-xs rounded-full ${
                      assignment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      assignment.status === 'urgent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assignment.status === 'completed' ? 'Completed' : 
                       assignment.status === 'urgent' ? 'Urgent' : 'Pending'}
                    </span>
                    {assignment.status !== 'completed' && (
                      <span className="flex items-center text-sm">
                        <FaClock className="text-gray-400 mr-1" />
                        {assignment.due}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Course Progress */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Courses</h2>
              <Link href="/dashboard/student/courses" className="text-secondary text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-6">
              {mockCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{course.name}</h3>
                    <Link href={`/dashboard/student/courses/${course.id}`} className="text-secondary text-xs hover:underline">Continue Learning</Link>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-secondary h-3 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{course.progress}% complete</span>
                    <span className="text-gray-500">Next: {course.nextLesson}</span>
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