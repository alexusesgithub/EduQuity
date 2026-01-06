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

// Sample class data
const classesData = [
  {
    id: 'class-1',
    name: 'Biology 101',
    description: 'An introduction to biology covering cell structure, genetics, evolution, and ecology.',
    teacher: 'Dr. Smith',
    teacherId: 'teacher-1',
    schedule: 'MWF 10:00 AM - 11:30 AM',
    room: 'Science Building, Room 305',
    startDate: '2023-09-05',
    endDate: '2023-12-20',
    students: 28,
    materials: [
      { id: 'mat-1', title: 'Cell Structure Diagrams', type: 'pdf', dateAdded: '2023-09-10' },
      { id: 'mat-2', title: 'Introduction to Genetics', type: 'presentation', dateAdded: '2023-09-15' },
      { id: 'mat-3', title: 'Lab Safety Guidelines', type: 'document', dateAdded: '2023-09-05' },
      { id: 'mat-4', title: 'Microscope Techniques Video', type: 'video', dateAdded: '2023-09-18' }
    ],
    assignments: [
      { id: 'asgn-1', title: 'Cell Structure Worksheet', dueDate: '2023-12-16', status: 'open' },
      { id: 'asgn-2', title: 'Lab Report: Microscope Observations', dueDate: '2023-12-18', status: 'open' }
    ],
    announcements: [
      { 
        id: 'ann-1', 
        title: 'Lab Session Canceled', 
        content: 'The lab session scheduled for Friday has been canceled due to maintenance. We will reschedule for next week.',
        date: '2023-12-13T09:30:00'
      }
    ],
    lessonPlans: [
      { 
        id: 'plan-1', 
        title: 'Introduction to Cell Biology', 
        date: '2023-12-15',
        status: 'upcoming'
      },
      { 
        id: 'plan-2', 
        title: 'Cell Division and Mitosis', 
        date: '2023-12-18',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'class-2',
    name: 'Advanced Mathematics',
    description: 'Advanced topics in mathematics including calculus, differential equations, and linear algebra.',
    teacher: 'Prof. Johnson',
    teacherId: 'teacher-2',
    schedule: 'TTh 1:00 PM - 2:30 PM',
    room: 'Math Building, Room 201',
    startDate: '2023-09-05',
    endDate: '2023-12-20',
    students: 22,
    materials: [
      { id: 'mat-5', title: 'Calculus Formulas', type: 'pdf', dateAdded: '2023-09-08' },
      { id: 'mat-6', title: 'Differential Equations Guide', type: 'document', dateAdded: '2023-09-20' }
    ],
    assignments: [
      { id: 'asgn-3', title: 'Calculus Problem Set 7', dueDate: '2023-12-15', status: 'open' },
      { id: 'asgn-4', title: 'Group Project: Mathematical Modeling', dueDate: '2023-12-20', status: 'open' }
    ],
    announcements: [
      { 
        id: 'ann-2', 
        title: 'Extra Help Session', 
        content: 'I will be holding an extra help session on Tuesday at 4:00 PM for anyone struggling with differential equations.',
        date: '2023-12-12T15:45:00'
      }
    ],
    lessonPlans: [
      { 
        id: 'plan-3', 
        title: 'Multivariable Calculus', 
        date: '2023-12-14',
        status: 'upcoming'
      }
    ]
  }
];

const ClassPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading: authLoading } = useAuth();
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');

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
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  // Fetch class data
  useEffect(() => {
    if (id) {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        const foundClass = classesData.find(c => c.id === id);
        if (foundClass) {
          setClassData(foundClass);
        } else {
          setError('Class not found');
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'presentation':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 100 2h4a1 1 0 100-2H3zm0 4a1 1 0 100 2h4a1 1 0 100-2H3zm0 4a1 1 0 100 2h4a1 1 0 100-2H3zm10-7a1 1 0 00-1 1v5a1 1 0 001 1h4a1 1 0 001-1V9a1 1 0 00-1-1h-4z" clipRule="evenodd" />
          </svg>
        );
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  // Check if user is teacher
  const isTeacher = () => {
    return user && user.role === 'teacher';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">{error}</h1>
          <Link href="/institution/dashboard" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/institution/login');
    return null;
  }

  if (!classData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{classData.name} | Class Details</title>
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
            <p className="text-sm text-gray-500">{classData.schedule} • {classData.room}</p>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              href={isTeacher() ? "/institution/teacher-dashboard" : "/institution/student-dashboard"} 
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
            
            {isTeacher() && (
              <Link 
                href={`/institution/classes/${id}/manage`}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500"
              >
                Manage Class
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`${
                activeTab === 'materials'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Materials
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
            {isTeacher() && (
              <button
                onClick={() => setActiveTab('lesson-plans')}
                className={`${
                  activeTab === 'lesson-plans'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Lesson Plans
              </button>
            )}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Class Description */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Course Description</h2>
                <p className="text-gray-600">{classData.description}</p>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Instructor</h3>
                    <p className="mt-1 text-sm text-gray-900">{classData.teacher}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Students Enrolled</h3>
                    <p className="mt-1 text-sm text-gray-900">{classData.students}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(classData.startDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(classData.endDate)}</p>
                  </div>
                </div>
              </div>
              
              {/* Announcements */}
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Announcements</h2>
                  {isTeacher() && (
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      + New Announcement
                    </button>
                  )}
                </div>
                
                {classData.announcements.length > 0 ? (
                  <div className="space-y-4">
                    {classData.announcements.map((announcement: any) => (
                      <div key={announcement.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-blue-800">{announcement.title}</h3>
                          <span className="text-xs text-blue-600">{formatDateTime(announcement.date)}</span>
                        </div>
                        <p className="mt-2 text-sm text-blue-700">{announcement.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No announcements at this time.</p>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Upcoming Activities */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming</h2>
                
                <div className="space-y-4">
                  {/* Next Lesson */}
                  {classData.lessonPlans.length > 0 && (
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="text-xs text-gray-500">NEXT LESSON</p>
                      <p className="font-medium text-gray-900">{classData.lessonPlans[0].title}</p>
                      <p className="text-sm text-gray-600">{formatDate(classData.lessonPlans[0].date)}</p>
                    </div>
                  )}
                  
                  {/* Next Assignment */}
                  {classData.assignments.length > 0 && (
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <p className="text-xs text-gray-500">ASSIGNMENT DUE</p>
                      <p className="font-medium text-gray-900">{classData.assignments[0].title}</p>
                      <p className="text-sm text-gray-600">{formatDate(classData.assignments[0].dueDate)}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    {isTeacher() ? "Contact Students" : "Contact Instructor"}
                  </button>
                  
                  <Link
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Syllabus
                  </Link>
                  
                  {!isTeacher() && (
                    <Link
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Check Grades
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Materials Tab */}
        {activeTab === 'materials' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Course Materials</h2>
              {isTeacher() && (
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500">
                  Upload Material
                </button>
              )}
            </div>
            
            <div className="p-6">
              {classData.materials.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {classData.materials.map((material: any) => (
                    <li key={material.id} className="py-4 flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {getFileIcon(material.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{material.title}</p>
                        <p className="text-sm text-gray-500 truncate">Added {formatDate(material.dateAdded)}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No materials have been uploaded yet.</p>
              )}
            </div>
          </div>
        )}
        
        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Assignments</h2>
              {isTeacher() && (
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500">
                  Create Assignment
                </button>
              )}
            </div>
            
            <div className="p-6">
              {classData.assignments.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {classData.assignments.map((assignment: any) => (
                    <li key={assignment.id} className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{assignment.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">Due {formatDate(assignment.dueDate)}</p>
                        </div>
                        <div className="flex space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            assignment.status === 'open' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : assignment.status === 'submitted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {assignment.status === 'open' 
                              ? 'Open' 
                              : assignment.status === 'submitted'
                                ? 'Submitted'
                                : 'Graded'}
                          </span>
                          
                          <Link
                            href={`/institution/assignments/${assignment.id}`}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            {isTeacher() ? "Manage" : "View"}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No assignments have been posted yet.</p>
              )}
            </div>
          </div>
        )}
        
        {/* Lesson Plans Tab (Teachers only) */}
        {activeTab === 'lesson-plans' && isTeacher() && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Lesson Plans</h2>
              <Link
                href="/institution/lesson-plans/create"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500"
              >
                Create Lesson Plan
              </Link>
            </div>
            
            <div className="p-6">
              {classData.lessonPlans.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {classData.lessonPlans.map((plan: any) => (
                    <li key={plan.id} className="py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{plan.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">Scheduled for {formatDate(plan.date)}</p>
                        </div>
                        <div className="flex space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            plan.status === 'upcoming' 
                              ? 'bg-blue-100 text-blue-800' 
                              : plan.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {plan.status === 'upcoming' 
                              ? 'Upcoming' 
                              : plan.status === 'published'
                                ? 'Published'
                                : 'Draft'}
                          </span>
                          
                          <Link
                            href={`/institution/lesson-plans/${plan.id}`}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No lesson plans have been created yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClassPage; 