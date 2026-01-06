import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Mock authentication hook
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching user data from localStorage
    const userData = localStorage.getItem('institutionUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);
  
  return { user, loading };
};

// Sample classes data
const classesData = [
  {
    id: 'class-1',
    name: 'Biology 101',
    teacher: 'Dr. Smith',
    schedule: 'MWF 10:00 AM - 11:30 AM',
    nextClass: '2023-12-15T10:00:00',
    progress: 68,
    assignments: [
      { id: 'asgn-1', title: 'Cell Structure Worksheet', dueDate: '2023-12-16', status: 'pending' },
      { id: 'asgn-2', title: 'Lab Report: Microscope Observations', dueDate: '2023-12-18', status: 'pending' }
    ]
  },
  {
    id: 'class-2',
    name: 'Advanced Mathematics',
    teacher: 'Prof. Johnson',
    schedule: 'TTh 1:00 PM - 2:30 PM',
    nextClass: '2023-12-14T13:00:00',
    progress: 72,
    assignments: [
      { id: 'asgn-3', title: 'Calculus Problem Set 7', dueDate: '2023-12-15', status: 'submitted' },
      { id: 'asgn-4', title: 'Group Project: Mathematical Modeling', dueDate: '2023-12-20', status: 'in-progress' }
    ]
  },
  {
    id: 'class-3',
    name: 'World History',
    teacher: 'Ms. Parker',
    schedule: 'MWF 2:00 PM - 3:30 PM',
    nextClass: '2023-12-15T14:00:00',
    progress: 85,
    assignments: [
      { id: 'asgn-5', title: 'Research Paper: Ancient Civilizations', dueDate: '2023-12-17', status: 'pending' }
    ]
  }
];

// Sample announcements
const announcementsData = [
  {
    id: 'ann-1',
    className: 'Biology 101',
    title: 'Lab Session Canceled',
    content: 'The lab session scheduled for Friday has been canceled due to maintenance. We will reschedule for next week.',
    date: '2023-12-13T09:30:00',
    read: false
  },
  {
    id: 'ann-2',
    className: 'Advanced Mathematics',
    title: 'Extra Help Session',
    content: 'I will be holding an extra help session on Tuesday at 4:00 PM for anyone struggling with differential equations.',
    date: '2023-12-12T15:45:00',
    read: true
  },
  {
    id: 'ann-3',
    className: 'Institution',
    title: 'Holiday Schedule',
    content: 'Remember that classes will be dismissed early on December 22 for the holiday break. Regular schedule resumes on January 5.',
    date: '2023-12-10T11:15:00',
    read: true
  }
];

const StudentDashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [classes, setClasses] = useState(classesData);
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('classes');
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Format date with time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Get all upcoming assignments across classes
  useEffect(() => {
    if (classes.length > 0) {
      const allAssignments = classes.flatMap(cls => 
        cls.assignments.map(assignment => ({
          ...assignment,
          className: cls.name,
          classId: cls.id,
          daysRemaining: getDaysRemaining(assignment.dueDate)
        }))
      );
      
      // Sort by due date (ascending) and filter out submitted assignments
      const upcoming = allAssignments
        .filter(a => a.status !== 'submitted')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      
      setUpcomingAssignments(upcoming);
    }
  }, [classes]);
  
  // Mark announcement as read
  const markAnnouncementAsRead = (announcementId: string) => {
    setAnnouncements(prev => 
      prev.map(ann => 
        ann.id === announcementId 
          ? { ...ann, read: true } 
          : ann
      )
    );
  };
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If no user logged in, redirect to login
  if (!user) {
    // In a real app, we would use useEffect to handle this to avoid React warnings about rendering during render
    router.push('/institution/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Student Dashboard | Education Equity System</title>
        <meta name="description" content="Manage your classes and assignments" />
      </Head>
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative" title="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Badge for unread notifications */}
              {announcements.some(a => !a.read) && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </div>
            
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://randomuser.me/api/portraits/women/28.jpg"
                alt="User avatar"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 truncate">
                {user.name || 'Student User'}
              </span>
            </div>
            
            <button
              onClick={() => {
                localStorage.removeItem('institutionUser');
                router.push('/institution/login');
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {/* Tab navigation */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('classes')}
                  className={`${
                    activeTab === 'classes'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  My Classes
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`${
                    activeTab === 'assignments'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Assignments
                </button>
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`${
                    activeTab === 'announcements'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm relative`}
                >
                  Announcements
                  {announcements.some(a => !a.read) && (
                    <span className="absolute top-3 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>
              </nav>
            </div>
            
            {/* Classes Tab */}
            {activeTab === 'classes' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">My Classes</h2>
                <div className="space-y-6">
                  {classes.map(cls => (
                    <div key={cls.id} className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{cls.name}</h3>
                            <p className="text-sm text-gray-500">{cls.teacher}</p>
                            <p className="text-sm text-gray-500 mt-1">{cls.schedule}</p>
                          </div>
                          <Link
                            href={`/institution/classes/${cls.id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View Class
                          </Link>
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-700">Course Progress</h4>
                            <span className="text-sm font-medium text-gray-700">{cls.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-600 rounded-full"
                              style={{ width: `${cls.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Upcoming Assignments</h4>
                          {cls.assignments.length > 0 ? (
                            <ul className="space-y-2">
                              {cls.assignments.map(assignment => (
                                <li key={assignment.id} className="flex justify-between">
                                  <span className="text-sm text-gray-600">{assignment.title}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    assignment.status === 'submitted' 
                                      ? 'bg-green-100 text-green-800' 
                                      : getDaysRemaining(assignment.dueDate) <= 1
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {assignment.status === 'submitted' 
                                      ? 'Submitted' 
                                      : `Due ${formatDate(assignment.dueDate)}`}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">No upcoming assignments</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">All Assignments</h2>
                
                {upcomingAssignments.length > 0 ? (
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assignment
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Class
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {upcomingAssignments.map((assignment) => (
                          <tr key={assignment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{assignment.className}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${
                                assignment.daysRemaining <= 1 ? 'text-red-600 font-medium' : 'text-gray-500'
                              }`}>
                                {formatDate(assignment.dueDate)}
                                {assignment.daysRemaining <= 1 && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Soon!
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                assignment.status === 'submitted' 
                                  ? 'bg-green-100 text-green-800' 
                                  : assignment.status === 'in-progress'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {assignment.status === 'submitted' 
                                  ? 'Submitted' 
                                  : assignment.status === 'in-progress'
                                    ? 'In Progress'
                                    : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link 
                                href={`/institution/assignments/${assignment.id}`}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-gray-500">No pending assignments. Great job!</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Announcements</h2>
                
                {announcements.length > 0 ? (
                  <div className="space-y-4">
                    {announcements.map(announcement => (
                      <div 
                        key={announcement.id} 
                        className={`bg-white shadow rounded-lg overflow-hidden border-l-4 ${
                          announcement.read ? 'border-gray-300' : 'border-blue-500'
                        }`}
                        onClick={() => markAnnouncementAsRead(announcement.id)}
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className={`font-medium ${
                                announcement.read ? 'text-gray-700' : 'text-gray-900'
                              }`}>
                                {announcement.title}
                                {!announcement.read && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    New
                                  </span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                From: {announcement.className} • {formatDateTime(announcement.date)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm text-gray-600">{announcement.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-gray-500">No announcements at this time.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next class widget */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg text-white p-6">
              <h3 className="font-medium mb-4">Next Scheduled Class</h3>
              {classes.length > 0 && (
                <div>
                  <p className="text-xl font-bold mb-1">{classes[0].name}</p>
                  <p className="mb-3">{formatDateTime(classes[0].nextClass)}</p>
                  <Link
                    href={`/institution/classes/${classes[0].id}`}
                    className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded text-sm font-medium hover:bg-opacity-30 transition-colors"
                  >
                    Join Class
                  </Link>
                </div>
              )}
            </div>
            
            {/* Upcoming deadlines */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
              {upcomingAssignments.slice(0, 3).length > 0 ? (
                <ul className="space-y-3">
                  {upcomingAssignments.slice(0, 3).map(assignment => (
                    <li key={assignment.id} className="flex items-start">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        assignment.daysRemaining <= 1 
                          ? 'bg-red-100 text-red-600'
                          : assignment.daysRemaining <= 3
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className="text-xs font-medium">{assignment.daysRemaining}d</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{assignment.title}</p>
                        <p className="text-xs text-gray-500">{assignment.className}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No upcoming deadlines</p>
              )}
            </div>
            
            {/* Quick actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/institution/calendar"
                  className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Calendar</span>
                </Link>
                <Link
                  href="/institution/messages"
                  className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-xs">Messages</span>
                </Link>
                <Link
                  href="/institution/resources"
                  className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs">Resources</span>
                </Link>
                <Link
                  href="/institution/grades"
                  className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-xs">Grades</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard; 