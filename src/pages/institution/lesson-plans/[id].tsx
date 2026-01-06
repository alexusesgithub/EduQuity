import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Mock lesson plan data - in a real app, this would come from an API
const lessonPlansData = [
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
    homework: 'Complete worksheet on cell organelles and read Chapter 4',
    notes: 'Ensure microscopes are calibrated before class. Have extra handouts available for students who forget theirs.',
    standards: [
      'LS1.A: Structure and Function',
      'Science Practice 2: Developing and Using Models'
    ]
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
    homework: 'Complete mitosis diagram labeling and read Chapter 5',
    notes: 'Make sure to review key concepts from previous lesson on cell structure before introducing mitosis.',
    standards: [
      'LS1.B: Growth and Development of Organisms',
      'Science Practice 1: Asking Questions and Defining Problems',
      'Science Practice 4: Analyzing and Interpreting Data'
    ]
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
    homework: 'Complete gene expression regulation questions and prepare for lab next class',
    notes: 'Students typically struggle with the concept of RNA splicing. Allocate extra time to explain this process if needed.',
    standards: [
      'LS1.A: Structure and Function',
      'LS3.A: Inheritance of Traits',
      'Science Practice 6: Constructing Explanations'
    ]
  }
];

const LessonPlanDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [lessonPlan, setLessonPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Fetch lesson plan data
  useEffect(() => {
    if (id) {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        const plan = lessonPlansData.find(p => p.id === id);
        if (plan) {
          setLessonPlan(plan);
          setFormData(plan);
        } else {
          setError('Lesson plan not found');
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);
  
  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle list changes (objectives, materials, etc.)
  const handleListChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const value = e.target.value;
    const list = value.split('\n').filter(item => item.trim() !== '');
    setFormData(prev => ({
      ...prev,
      [field]: list
    }));
  };
  
  // Handle save
  const handleSave = () => {
    // In a real app, this would send the updated data to an API
    setLessonPlan(formData);
    setEditMode(false);
  };
  
  // Handle publishing
  const handlePublish = () => {
    // In a real app, this would call an API to update the status
    const updatedPlan = { ...lessonPlan, status: 'published' };
    setLessonPlan(updatedPlan);
    setFormData(updatedPlan);
  };
  
  if (loading) {
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
          <Link href="/institution/teacher-dashboard" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  if (!lessonPlan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{lessonPlan.title} | Lesson Plan</title>
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Lesson Plan Details</h1>
          <Link 
            href="/institution/teacher-dashboard" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-xl font-medium text-gray-900 mr-3">
                {editMode ? 'Edit Lesson Plan' : lessonPlan.title}
              </h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                lessonPlan.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {lessonPlan.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <div className="flex space-x-3">
              {!editMode && (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150"
                  >
                    Edit
                  </button>
                  
                  {lessonPlan.status !== 'published' && (
                    <button
                      onClick={handlePublish}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
                    >
                      Publish
                    </button>
                  )}
                </>
              )}
              
              {editMode && (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 transition ease-in-out duration-150"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {editMode ? (
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                    Class
                  </label>
                  <input
                    type="text"
                    name="className"
                    id="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
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
                    rows={4}
                    value={formData.objectives.join('\n')}
                    onChange={(e) => handleListChange(e, 'objectives')}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="materials" className="block text-sm font-medium text-gray-700">
                    Materials Needed (one per line)
                  </label>
                  <textarea
                    id="materials"
                    name="materials"
                    rows={4}
                    value={formData.materials.join('\n')}
                    onChange={(e) => handleListChange(e, 'materials')}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
                    Lesson Activities (one per line)
                  </label>
                  <textarea
                    id="activities"
                    name="activities"
                    rows={5}
                    value={formData.activities.join('\n')}
                    onChange={(e) => handleListChange(e, 'activities')}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="assessment" className="block text-sm font-medium text-gray-700">
                    Assessment
                  </label>
                  <input
                    type="text"
                    name="assessment"
                    id="assessment"
                    value={formData.assessment}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="homework" className="block text-sm font-medium text-gray-700">
                    Homework/Assignment
                  </label>
                  <input
                    type="text"
                    name="homework"
                    id="homework"
                    value={formData.homework}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Teacher Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="standards" className="block text-sm font-medium text-gray-700">
                    Standards Addressed (one per line)
                  </label>
                  <textarea
                    id="standards"
                    name="standards"
                    rows={3}
                    value={formData.standards ? formData.standards.join('\n') : ''}
                    onChange={(e) => handleListChange(e, 'standards')}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lesson Information</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Class</dt>
                        <dd className="mt-1 text-gray-900">{lessonPlan.className}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Date</dt>
                        <dd className="mt-1 text-gray-900">{formatDate(lessonPlan.date)}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  {/* Objectives */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Objectives</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {lessonPlan.objectives.map((objective: string, idx: number) => (
                        <li key={idx} className="text-gray-700">{objective}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Lesson Flow */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lesson Activities</h3>
                    <ol className="list-decimal pl-5 space-y-4">
                      {lessonPlan.activities.map((activity: string, idx: number) => (
                        <li key={idx} className="text-gray-700">
                          <p>{activity}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  {/* Assessment & Homework */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment & Homework</h3>
                    <dl className="grid grid-cols-1 gap-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Assessment</dt>
                        <dd className="mt-1 text-gray-900">{lessonPlan.assessment}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Homework</dt>
                        <dd className="mt-1 text-gray-900">{lessonPlan.homework}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {/* Materials */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 mb-3">Materials Needed</h3>
                    <ul className="list-disc pl-5 space-y-1 text-blue-700">
                      {lessonPlan.materials.map((material: string, idx: number) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Teacher Notes */}
                  {lessonPlan.notes && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-yellow-800 mb-3">Teacher Notes</h3>
                      <p className="text-yellow-700">{lessonPlan.notes}</p>
                    </div>
                  )}
                  
                  {/* Standards */}
                  {lessonPlan.standards && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Standards Addressed</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {lessonPlan.standards.map((standard: string, idx: number) => (
                          <li key={idx}>{standard}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="bg-white p-4 border rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Actions</h3>
                    <div className="space-y-3">
                      <Link 
                        href={`/institution/lesson-plans/${lessonPlan.id}/resources`}
                        className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Manage Resources
                      </Link>
                      <Link 
                        href={`/institution/lesson-plans/${lessonPlan.id}/share`}
                        className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Share with Students
                      </Link>
                      <button 
                        onClick={() => window.print()}
                        className="block w-full text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Print Lesson Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlanDetailPage; 