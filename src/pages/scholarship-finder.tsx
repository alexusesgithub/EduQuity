import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Scholarship = {
  id: number;
  name: string;
  organization: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  gpa: number;
  level: string;
  fields: string[];
  description: string;
  link: string;
};

const ScholarshipFinder = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    level: '',
    minGpa: '',
    field: '',
    eligibility: '',
    country: ''
  });

  // All unique fields for filter options (populated after data is loaded)
  const [allFields, setAllFields] = useState<string[]>([]);
  const [allLevels, setAllLevels] = useState<string[]>([]);
  const [allEligibility, setAllEligibility] = useState<string[]>([]);
  
  // Fetch scholarships from API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/scholarships');
        
        if (!response.ok) {
          throw new Error('Failed to fetch scholarships');
        }
        
        const data = await response.json();
        setScholarships(data);
        setFilteredScholarships(data);
        
        // Extract unique values for filters
        setAllFields(Array.from(new Set(data.flatMap((s: Scholarship) => s.fields))));
        setAllLevels(Array.from(new Set(data.map((s: Scholarship) => s.level))));
        setAllEligibility(Array.from(new Set(data.flatMap((s: Scholarship) => s.eligibility))));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching scholarships:', err);
        setError('Failed to load scholarships. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchScholarships();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...scholarships];
    
    // Search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(term) || 
        s.organization.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
      );
    }
    
    // Level filter
    if (filters.level) {
      result = result.filter(s => 
        s.level === filters.level || s.level === 'Any'
      );
    }
    
    // GPA filter
    if (filters.minGpa) {
      const minGpa = parseFloat(filters.minGpa);
      result = result.filter(s => s.gpa <= minGpa);
    }
    
    // Field of study filter
    if (filters.field) {
      result = result.filter(s => 
        s.fields.includes(filters.field) || s.fields.includes('Any')
      );
    }
    
    // Eligibility filter
    if (filters.eligibility) {
      result = result.filter(s => 
        s.eligibility.includes(filters.eligibility)
      );
    }
    
    // Country filter (specifically for Indian scholarships)
    if (filters.country === 'india') {
      result = result.filter(s => 
        s.eligibility.includes('Indian Citizen') || 
        s.organization.toLowerCase().includes('india') ||
        s.name.toLowerCase().includes('india')
      );
    }
    
    setFilteredScholarships(result);
  }, [filters, scholarships]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      level: '',
      minGpa: '',
      field: '',
      eligibility: '',
      country: ''
    });
  };

  // Format date from YYYY-MM-DD to MMM DD, YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Scholarship Finder | Education Equity System</title>
      </Head>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Scholarship Finder</h1>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Find Scholarships</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Search scholarships..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <select
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Any Level</option>
                {allLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your GPA
              </label>
              <input
                type="number"
                name="minGpa"
                value={filters.minGpa}
                onChange={handleFilterChange}
                placeholder="Enter your GPA"
                min="0"
                max="4.0"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <select
                name="field"
                value={filters.field}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Any Field</option>
                {allFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility
              </label>
              <select
                name="eligibility"
                value={filters.eligibility}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Any Eligibility</option>
                {allEligibility.map(elig => (
                  <option key={elig} value={elig}>{elig}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country Focus
              </label>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">All Countries</option>
                <option value="india">Indian Colleges & Students</option>
                <option value="us">US Colleges & Students</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-right">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Available Scholarships</h2>
            <span className="text-gray-600">
              Showing {filteredScholarships.length} of {scholarships.length} scholarships
            </span>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-gray-600">Loading scholarships...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : filteredScholarships.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No scholarships match your current filters. Try adjusting your criteria.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredScholarships.map(scholarship => (
                <div key={scholarship.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-3">
                    <h3 className="text-lg font-bold text-blue-600">{scholarship.name}</h3>
                    <div className="text-green-600 font-bold">{scholarship.amount}</div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-700">{scholarship.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-gray-600 text-sm">Organization:</span>
                      <p className="font-medium">{scholarship.organization}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Deadline:</span>
                      <p className="font-medium">{formatDate(scholarship.deadline)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Min. GPA:</span>
                      <p className="font-medium">{scholarship.gpa.toFixed(1)}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-gray-600 text-sm">Fields of Study:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {scholarship.fields.map(field => (
                        <span 
                          key={field} 
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-gray-600 text-sm">Eligibility:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {scholarship.eligibility.map(elig => (
                        <span 
                          key={elig} 
                          className={`inline-block text-xs px-2 py-1 rounded ${
                            elig === 'Indian Citizen' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {elig}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <a 
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipFinder; 