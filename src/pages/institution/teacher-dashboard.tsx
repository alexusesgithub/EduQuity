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

const TeacherDashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  // Sample classes data
  const [classes, setClasses] = useState([
    {
      id: 'class-1',
      name: 'Biology 101',
      section: 'A',
      schedule: 'MWF 10:00 AM - 11:30 AM',
      studentCount: 32,
      ungraded: 12,
      latestUpdateDate: '2023-12-10T14:30:00',
      color: 'bg-green-100'
    },
    {
      id: 'class-2',
      name: 'Advanced Biology',
      section: 'B',
      schedule: 'TTh 1:00 PM - 2:30 PM',
      studentCount: 24,
      ungraded: 5,
      latestUpdateDate: '2023-12-11T09:15:00',
      color: 'bg-blue-100'
    },
    {
      id: 'class-3',
      name: 'Biology Lab',
      section: 'C',
      schedule: 'F 2:00 PM - 5:00 PM',
      studentCount: 28,
      ungraded: 0,
      latestUpdateDate: '2023-12-09T16:45:00',
      color: 'bg-purple-100'
    }
  ]);
  
  // Lesson plans
  const [lessonPlans, setLessonPlans] = useState([
    {
      id: 'plan-1',
      classId: 'class-1',
      className: 'Biology 101',
      title: 'Introduction to Cell Biology',
      date: '2023-12-15',
      status: 'draft',
      objectives: [
        'Understand the basic structure of a cell',
        'Identify major cell organelles and their functions',
        'Compare and contrast plant and animal cells'
      ],
      materials: [
        'Textbook Chapter 3',
        'Cell Structure Handout',
        'Microscope Slides'
      ],
      activities: [
        'Lecture on cell structure (30 min)',
        'Group activity: Cell organelle identification (20 min)',
        'Microscope lab: Observing cell structures (40 min)'
      ],
      assessment: 'Quiz on cell structures and functions',
      homework: 'Complete worksheet on cell organelles and read Chapter 4'
    },
    {
      id: 'plan-2',
      classId: 'class-1',
      className: 'Biology 101',
      title: 'Cell Division and Mitosis',
      date: '2023-12-18',
      status: 'published',
      objectives: [
        'Understand the stages of the cell cycle',
        'Describe the process of mitosis',
        'Explain the importance of cell division in growth and repair'
      ],
      materials: [
        'Textbook Chapter 4',
        'Cell Division Slideshow',
        'Mitosis Modeling Kit'
      ],
      activities: [
        'Review of previous lesson (10 min)',
        'Lecture on cell cycle and mitosis (25 min)',
        'Video on mitosis visualization (15 min)',
        'Group activity: Modeling mitosis stages (40 min)'
      ],
      assessment: 'Mitosis stage identification quiz',
      homework: 'Complete mitosis diagram labeling and read Chapter 5'
    },
    {
      id: 'plan-3',
      classId: 'class-2',
      className: 'Advanced Biology',
      title: 'Gene Expression and Protein Synthesis',
      date: '2023-12-14',
      status: 'published',
      objectives: [
        'Understand the relationship between DNA, RNA, and proteins',
        'Describe the processes of transcription and translation',
        'Explain how gene expression is regulated'
      ],
      materials: [
        'Advanced Biology Textbook Chapter 7',
        'Protein Synthesis Animation',
        'Gene Expression Handout'
      ],
      activities: [
        'Discussion of pre-reading questions (15 min)',
        'Lecture on transcription and translation (30 min)',
        'Interactive animation demonstration (15 min)',
        'Small group problem-solving: Codon translation exercises (30 min)'
      ],
      assessment: 'Short answer questions on protein synthesis',
      homework: 'Complete gene expression regulation questions and prepare for lab next class'
    }
  ]);
  
  // New plan form state
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [newPlanData, setNewPlanData] = useState({
    classId: '',
    title: '',
    date: '',
    objectives: '',
    materials: '',
    activities: '',
    assessment: '',
    homework: ''
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPlanData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle new lesson plan submission
  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new lesson plan
    const newPlan = {
      id: `plan-${lessonPlans.length + 1}`,
      classId: newPlanData.classId,
      className: classes.find(c => c.id === newPlanData.classId)?.name || '',
      title: newPlanData.title,
      date: newPlanData.date,
      status: 'draft',
      objectives: newPlanData.objectives.split('\n').filter(o => o.trim() !== ''),
      materials: newPlanData.materials.split('\n').filter(m => m.trim() !== ''),
      activities: newPlanData.activities.split('\n').filter(a => a.trim() !== ''),
      assessment: newPlanData.assessment,
      homework: newPlanData.homework
    };
    
    // Add to lesson plans
    setLessonPlans(prev => [...prev, newPlan]);
    
    // Reset form
    setNewPlanData({
      classId: '',
      title: '',
      date: '',
      objectives: '',
      materials: '',
      activities: '',
      assessment: '',
      homework: ''
    });
    
    // Hide form
    setShowNewPlanForm(false);
  };
  
  // Publish lesson plan
  const publishPlan = (planId: string) => {
    setLessonPlans(prev => 
      prev.map(plan => 
        plan.id === planId
          ? { ...plan, status: 'published' }
          : plan
      )
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || user.role !== 'teacher') {
    // Redirect to login if not authenticated or not a teacher
    router.push('/institution/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Teacher Dashboard | Education Equity System</title>
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
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
                src="https://ui-avatars.com/api/?name=Teacher&background=random" 
                alt="Teacher" 
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm font-medium text-gray-700">{user.name || 'Teacher'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Lesson Plans Section */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Lesson Plans</h2>
                <button
                  onClick={() => setShowNewPlanForm(!showNewPlanForm)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                >
                  {showNewPlanForm ? 'Cancel' : '+ New Lesson Plan'}
                </button>
              </div>
              
              {showNewPlanForm && (
                <div className="p-6 border-b bg-gray-50">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Create New Lesson Plan</h3>
                  <form onSubmit={handleSubmitPlan}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="classId" className="block text-sm font-medium text-gray-700">
                          Class
                        </label>
                        <select
                          id="classId"
                          name="classId"
                          required
                          value={newPlanData.classId}
                          onChange={handleInputChange}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select a class</option>
                          {classes.map(cls => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name} - Section {cls.section}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Lesson Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          required
                          value={newPlanData.date}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Lesson Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          value={newPlanData.title}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">
                          Learning Objectives (one per line)
                        </label>
                        <textarea
                          id="objectives"
                          name="objectives"
                          rows={3}
                          required
                          value={newPlanData.objectives}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="- Understand...\n- Identify...\n- Apply..."
                        />
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="materials" className="block text-sm font-medium text-gray-700">
                          Materials Needed (one per line)
                        </label>
                        <textarea
                          id="materials"
                          name="materials"
                          rows={3}
                          value={newPlanData.materials}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="- Textbook Chapter 3\n- Handouts\n- Presentation slides"
                        />
                      </div>
                      
                      <div className="sm:col-span-6">
                        <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
                          Lesson Activities (one per line)
                        </label>
                        <textarea
                          id="activities"
                          name="activities"
                          rows={4}
                          required
                          value={newPlanData.activities}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="- Warm-up activity (10 min)\n- Lecture on topic (20 min)\n- Group discussion (15 min)"
                        />
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="assessment" className="block text-sm font-medium text-gray-700">
                          Assessment
                        </label>
                        <input
                          type="text"
                          name="assessment"
                          id="assessment"
                          value={newPlanData.assessment}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="Exit ticket, quiz, discussion, etc."
                        />
                      </div>
                      
                      <div className="sm:col-span-3">
                        <label htmlFor="homework" className="block text-sm font-medium text-gray-700">
                          Homework/Assignment
                        </label>
                        <input
                          type="text"
                          name="homework"
                          id="homework"
                          value={newPlanData.homework}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="Reading, worksheet, project work, etc."
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowNewPlanForm(false)}
                        className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Lesson Plan
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="divide-y">
                {lessonPlans.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No lesson plans created yet. Click "New Lesson Plan" to get started.
                  </div>
                ) : (
                  lessonPlans.map(plan => (
                    <div key={plan.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">{plan.title}</h3>
                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                              plan.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {plan.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {plan.className} • {formatDate(plan.date)}
                          </p>
                        </div>
                        
                        <div className="mt-2 md:mt-0 flex space-x-2">
                          {plan.status === 'draft' && (
                            <button
                              onClick={() => publishPlan(plan.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                            >
                              Publish
                            </button>
                          )}
                          <Link 
                            href={`/institution/lesson-plans/${plan.id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Objectives</h4>
                          <ul className="mt-1 list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {plan.objectives.slice(0, 2).map((objective, idx) => (
                              <li key={idx}>{objective}</li>
                            ))}
                            {plan.objectives.length > 2 && (
                              <li className="text-gray-500">+{plan.objectives.length - 2} more</li>
                            )}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Activities</h4>
                          <ul className="mt-1 list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {plan.activities.slice(0, 2).map((activity, idx) => (
                              <li key={idx}>{activity}</li>
                            ))}
                            {plan.activities.length > 2 && (
                              <li className="text-gray-500">+{plan.activities.length - 2} more</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
          
          {/* Sidebar (1/3 width on large screens) */}
          <div className="space-y-8">
            {/* Your Classes */}
            <section className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-medium text-gray-900">Your Classes</h2>
              </div>
              
              <div className="divide-y">
                {classes.map(cls => (
                  <div key={cls.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                    <Link 
                      href={`/institution/classes/${cls.id}`}
                      className="flex items-center mb-2"
                    >
                      <span className={`flex-shrink-0 w-3 h-3 rounded-full mr-2 ${cls.color}`}></span>
                      <span className="font-medium text-gray-900">{cls.name}</span>
                      <span className="ml-2 text-xs text-gray-500">Section {cls.section}</span>
                    </Link>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{cls.studentCount} students</span>
                      {cls.ungraded > 0 && (
                        <span className="text-amber-600 font-medium">
                          {cls.ungraded} ungraded
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500">
                      {cls.schedule}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t">
                <Link 
                  href="/institution/classes/create" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Create New Class
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
                  href="/institution/assignments/create"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Create Assignment</span>
                </Link>
                
                <Link 
                  href="/institution/gradebook"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Gradebook</span>
                </Link>
                
                <Link 
                  href="/institution/announcements/create"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Post Announcement</span>
                </Link>
                
                <Link 
                  href="/institution/resources/upload"
                  className="flex flex-col items-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Upload Resources</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard; 