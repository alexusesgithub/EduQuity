import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Mock authentication function (to be replaced with real auth)
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate auth check
    const storedUser = localStorage?.getItem('institution_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  return { user, loading };
};

const InstitutionDashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeClasses, setActiveClasses] = useState([
    {
      id: 'class-1',
      name: 'Biology 101',
      teacher: 'Dr. Sarah Johnson',
      studentCount: 32,
      lastUpdated: '2023-12-10T14:30:00',
      nextDeadline: '2023-12-15T23:59:59',
      assignments: 3,
      announcementCount: 2,
    },
    {
      id: 'class-2',
      name: 'Advanced Mathematics',
      teacher: 'Prof. Michael Chen',
      studentCount: 24,
      lastUpdated: '2023-12-11T09:15:00',
      nextDeadline: '2023-12-14T23:59:59',
      assignments: 2,
      announcementCount: 1,
    },
    {
      id: 'class-3',
      name: 'World History',
      teacher: 'Ms. Emily Rodriguez',
      studentCount: 28,
      lastUpdated: '2023-12-09T16:45:00',
      nextDeadline: '2023-12-20T23:59:59',
      assignments: 1,
      announcementCount: 3,
    }
  ]);

  const [recentAnnouncements, setRecentAnnouncements] = useState([
    {
      id: 'ann-1',
      className: 'Biology 101',
      teacher: 'Dr. Sarah Johnson',
      date: '2023-12-10T14:30:00',
      content: 'Lab reports due this Friday. Please remember to include all required sections and proper citations.'
    },
    {
      id: 'ann-2',
      className: 'Advanced Mathematics',
      teacher: 'Prof. Michael Chen',
      date: '2023-12-11T09:15:00',
      content: 'Extra help session scheduled for Wednesday at 3:30 PM in Room 204.'
    },
    {
      id: 'ann-3',
      className: 'World History',
      teacher: 'Ms. Emily Rodriguez',
      date: '2023-12-09T16:45:00',
      content: 'Project groups have been assigned. Check your email for details and initial meeting suggestions.'
    }
  ]);

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    {
      id: 'dead-1',
      title: 'Lab Report Submission',
      className: 'Biology 101',
      dueDate: '2023-12-15T23:59:59'
    },
    {
      id: 'dead-2',
      title: 'Problem Set 7',
      className: 'Advanced Mathematics',
      dueDate: '2023-12-14T23:59:59'
    },
    {
      id: 'dead-3',
      title: 'Historical Analysis Essay',
      className: 'World History',
      dueDate: '2023-12-20T23:59:59'
    }
  ]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Get days remaining until deadline
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const deadline = new Date(dateString);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    router.push('/institution/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Institution Dashboard | Education Equity System</title>
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Institution Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link href="/institution/messages" className="text-gray-600 hover:text-gray-900">
              <span className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
              </span>
            </Link>
            <div className="flex items-center">
              <img 
                src="https://ui-avatars.com/api/?name=User&background=random" 
                alt="User" 
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{user.name || 'User'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Classes Section */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Your Classes</h2>
                <Link href="/institution/classes" className="text-sm text-blue-600 hover:text-blue-800">
                  View All &rarr;
                </Link>
              </div>
              
              <div className="divide-y">
                {activeClasses.map((cls) => (
                  <div key={cls.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <Link 
                          href={`/institution/classes/${cls.id}`}
                          className="text-lg font-medium text-blue-600 hover:text-blue-800"
                        >
                          {cls.name}
                        </Link>
                        <p className="text-sm text-gray-600">
                          {cls.teacher} • {cls.studentCount} students
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex space-x-2">
                        <Link 
                          href={`/institution/classes/${cls.id}/assignments`}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {cls.assignments} Assignments
                        </Link>
                        <Link 
                          href={`/institution/classes/${cls.id}/announcements`}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                        >
                          {cls.announcementCount} Announcements
                        </Link>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row md:justify-between text-xs text-gray-500">
                      <span>Last updated: {formatDate(cls.lastUpdated)}</span>
                      <span className="font-medium text-amber-600">
                        Next deadline: {formatDate(cls.nextDeadline)} 
                        ({getDaysRemaining(cls.nextDeadline)} days remaining)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t">
                <Link 
                  href="/institution/classes/join" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Join a Class
                </Link>
              </div>
            </section>
            
            {/* Recent Announcements */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Recent Announcements</h2>
              </div>
              
              <div className="divide-y">
                {recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{announcement.className}</span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{announcement.teacher}</span>
                        </div>
                        <p className="mt-1 text-gray-800">{announcement.content}</p>
                        <p className="mt-2 text-xs text-gray-500">{formatDate(announcement.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* Sidebar (1/3 width on large screens) */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h2>
              </div>
              
              <div className="divide-y">
                {upcomingDeadlines.map((deadline) => {
                  const daysRemaining = getDaysRemaining(deadline.dueDate);
                  let urgencyClass = 'text-green-600';
                  
                  if (daysRemaining <= 1) {
                    urgencyClass = 'text-red-600';
                  } else if (daysRemaining <= 3) {
                    urgencyClass = 'text-amber-600';
                  }
                  
                  return (
                    <div key={deadline.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{deadline.title}</p>
                          <p className="text-sm text-gray-600">{deadline.className}</p>
                        </div>
                        <div className={`text-sm font-medium ${urgencyClass}`}>
                          {daysRemaining} days
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Due: {formatDate(deadline.dueDate)}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t">
                <Link 
                  href="/institution/calendar" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Full Calendar &rarr;
                </Link>
              </div>
            </section>
            
            {/* Quick Actions */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              
              <div className="p-6 grid grid-cols-2 gap-4">
                <Link 
                  href="/institution/assignments/submit"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Submit Assignment</span>
                </Link>
                
                <Link 
                  href="/institution/resources"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Learning Resources</span>
                </Link>
                
                <Link 
                  href="/institution/discussion"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Discussion Forums</span>
                </Link>
                
                <Link 
                  href="/institution/grades"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">View Grades</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstitutionDashboard; 