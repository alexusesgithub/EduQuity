import { useState, useEffect } from 'react';

type ScheduleView = 'day' | 'week' | 'month';
type TaskPriority = 'high' | 'medium' | 'low';

interface ScheduleTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  dateTime: Date;
  duration: number; // in minutes
  priority: TaskPriority;
  completed: boolean;
}

export default function ScheduleManager() {
  const [view, setView] = useState<ScheduleView>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<ScheduleTask[]>(sampleTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newTask, setNewTask] = useState<Partial<ScheduleTask>>({
    title: '',
    description: '',
    subject: '',
    dateTime: new Date(),
    duration: 60,
    priority: 'medium',
    completed: false,
  });

  // Animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (!newTask.title) return;
    
    const task: ScheduleTask = {
      id: Date.now().toString(),
      title: newTask.title || '',
      description: newTask.description || '',
      subject: newTask.subject || '',
      dateTime: newTask.dateTime || new Date(),
      duration: newTask.duration || 60,
      priority: newTask.priority as TaskPriority || 'medium',
      completed: false,
    };
    
    setTasks([...tasks, task]);
    setShowAddTask(false);
    setNewTask({
      title: '',
      description: '',
      subject: '',
      dateTime: new Date(),
      duration: 60,
      priority: 'medium',
      completed: false,
    });
  };

  // Filter tasks based on selected view and date
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.dateTime);
    const today = new Date(selectedDate);
    
    if (view === 'day') {
      return taskDate.getDate() === today.getDate() && 
             taskDate.getMonth() === today.getMonth() && 
             taskDate.getFullYear() === today.getFullYear();
    } else if (view === 'week') {
      // Get the week start (Sunday) and end (Saturday)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    } else if (view === 'month') {
      return taskDate.getMonth() === today.getMonth() && 
             taskDate.getFullYear() === today.getFullYear();
    }
    
    return false;
  });

  // Helper function to format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Helper function to format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    }).toLowerCase();
  };

  // Get priority color class
  const getPriorityColor = (priority: TaskPriority): string => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'medium':
        return 'bg-gradient-to-r from-amber-400 to-orange-400';
      case 'low':
        return 'bg-gradient-to-r from-emerald-400 to-teal-400';
      default:
        return 'bg-gray-500';
    }
  };

  // Get subject background color
  const getSubjectColor = (subject: string): string => {
    // Generate a consistent color based on the subject name
    const hash = subject.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const colors = [
      'from-blue-100 to-blue-200 text-blue-800',
      'from-purple-100 to-purple-200 text-purple-800',
      'from-green-100 to-green-200 text-green-800',
      'from-amber-100 to-amber-200 text-amber-800',
      'from-rose-100 to-rose-200 text-rose-800',
      'from-sky-100 to-sky-200 text-sky-800',
    ];
    return colors[hash % colors.length];
  };

  return (
    <div className={`h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-3 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">Schedule Manager</h2>
          <p className="text-gray-600 text-sm">Organize your study time efficiently</p>
        </div>
        <div className="flex flex-wrap space-x-2">
          <div className="flex p-1 bg-gray-100 rounded-lg shadow-inner">
            <button 
              onClick={() => setView('day')}
              className={`px-4 py-1.5 rounded-md transition-all duration-200 ${
                view === 'day' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-white hover:shadow-sm'
              }`}
            >
              Day
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-4 py-1.5 rounded-md transition-all duration-200 ${
                view === 'week' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-white hover:shadow-sm'
              }`}
            >
              Week
            </button>
            <button 
              onClick={() => setView('month')}
              className={`px-4 py-1.5 rounded-md transition-all duration-200 ${
                view === 'month' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-white hover:shadow-sm'
              }`}
            >
              Month
            </button>
          </div>
          <button 
            onClick={() => setShowAddTask(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-0.5 transition-transform"
          >
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Task
            </span>
          </button>
        </div>
      </div>

      {/* Date navigation */}
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm">
        <button 
          onClick={() => {
            const newDate = new Date(selectedDate);
            if (view === 'day') newDate.setDate(newDate.getDate() - 1);
            else if (view === 'week') newDate.setDate(newDate.getDate() - 7);
            else if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
            setSelectedDate(newDate);
          }}
          className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition-all hover:-translate-x-0.5 transform"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
        </button>
        
        <div className="font-semibold text-lg text-gray-800">
          {view === 'day' && formatDate(selectedDate)}
          {view === 'week' && (
            <div className="flex flex-col items-center">
              <span>Week of</span>
              <span className="text-blue-600">{formatDate(new Date(selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay())))}</span>
            </div>
          )}
          {view === 'month' && (
            <div className="bg-white px-4 py-2 rounded-lg shadow-inner">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          )}
        </div>
        
        <button 
          onClick={() => {
            const newDate = new Date(selectedDate);
            if (view === 'day') newDate.setDate(newDate.getDate() + 1);
            else if (view === 'week') newDate.setDate(newDate.getDate() + 7);
            else if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
            setSelectedDate(newDate);
          }}
          className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition-all hover:translate-x-0.5 transform"
        >
          <span className="flex items-center">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Tasks list */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-16 text-center">
            <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-3 text-lg">
              No tasks scheduled for this period.
            </p>
            <button 
              onClick={() => setShowAddTask(true)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              + Add a new task
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTasks.map((task, index) => (
              <div 
                key={task.id} 
                className={`p-4 hover:bg-blue-50 transition-colors duration-150 transform transition-transform animate-task-appear`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="w-5 h-5 rounded-full text-blue-500 border-gray-300 focus:ring-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center">
                        <h3 className={`font-medium text-lg mb-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {task.title}
                        </h3>
                        <div className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                          getPriorityColor(task.priority)} text-white shadow-sm`}
                        >
                          {task.priority}
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-700'}`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className={`px-3 py-1 rounded-md font-medium bg-gradient-to-r ${getSubjectColor(task.subject)}`}>
                          {task.subject}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(new Date(task.dateTime))}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatTime(new Date(task.dateTime))}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {task.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add New Task</h3>
              <button 
                onClick={() => setShowAddTask(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Task title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Task description"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={newTask.subject || ''}
                  onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="E.g., Math, Science, History"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newTask.dateTime ? new Date(newTask.dateTime).toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const currentTime = newTask.dateTime ? new Date(newTask.dateTime) : new Date();
                      date.setHours(currentTime.getHours(), currentTime.getMinutes());
                      setNewTask({...newTask, dateTime: date});
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newTask.dateTime ? 
                      `${String(new Date(newTask.dateTime).getHours()).padStart(2, '0')}:${String(new Date(newTask.dateTime).getMinutes()).padStart(2, '0')}` : 
                      ''
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const dateTime = newTask.dateTime ? new Date(newTask.dateTime) : new Date();
                      dateTime.setHours(hours, minutes);
                      setNewTask({...newTask, dateTime});
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newTask.duration || 60}
                    onChange={(e) => setNewTask({...newTask, duration: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="5"
                    step="5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTask.priority || 'medium'}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as TaskPriority})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                disabled={!newTask.title}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes task-appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-task-appear {
          animation: task-appear 0.3s ease-out forwards;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// Sample tasks for demonstration
const sampleTasks: ScheduleTask[] = [
  {
    id: '1',
    title: 'Math Homework',
    description: 'Complete algebra exercises 3-5',
    subject: 'Mathematics',
    dateTime: new Date(new Date().setHours(14, 0, 0, 0)),
    duration: 45,
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'History Reading',
    description: 'Read chapter 5 on World War II',
    subject: 'History',
    dateTime: new Date(new Date().setHours(16, 30, 0, 0)),
    duration: 60,
    priority: 'medium',
    completed: true,
  },
  {
    id: '3',
    title: 'Science Project Research',
    description: 'Gather information for the biology project',
    subject: 'Science',
    dateTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    duration: 90,
    priority: 'high',
    completed: false,
  },
  {
    id: '4',
    title: 'Language Practice',
    description: 'Practice Spanish verb conjugations',
    subject: 'Spanish',
    dateTime: new Date(new Date().setDate(new Date().getDate() + 2)),
    duration: 30,
    priority: 'low',
    completed: false,
  },
]; 