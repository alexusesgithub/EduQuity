import type { NextApiRequest, NextApiResponse } from 'next';

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

// Sample scholarship data - in a real app, this would come from a database
const scholarshipsData: Scholarship[] = [
  {
    id: 1,
    name: "Future Tech Leaders Scholarship",
    organization: "TechFoundation",
    amount: "$5,000",
    deadline: "2023-12-15",
    eligibility: ["Undergraduate", "Graduate", "US Citizen", "International"],
    gpa: 3.5,
    level: "Undergraduate",
    fields: ["Computer Science", "Engineering", "Information Technology"],
    description: "For students pursuing degrees in technology fields with demonstrated leadership potential.",
    link: "https://example.com/scholarship1"
  },
  {
    id: 2,
    name: "Global Humanities Grant",
    organization: "World Education Alliance",
    amount: "$3,000",
    deadline: "2024-01-30",
    eligibility: ["Undergraduate", "US Citizen", "International"],
    gpa: 3.0,
    level: "Undergraduate",
    fields: ["History", "Literature", "Philosophy", "Languages"],
    description: "Supporting students in humanities who are committed to global understanding and cooperation.",
    link: "https://example.com/scholarship2"
  },
  {
    id: 3,
    name: "Women in STEM Scholarship",
    organization: "ScienceFuture Foundation",
    amount: "$7,500",
    deadline: "2024-02-28",
    eligibility: ["Female", "Undergraduate", "Graduate", "US Citizen"],
    gpa: 3.2,
    level: "Any",
    fields: ["Biology", "Chemistry", "Physics", "Mathematics", "Engineering"],
    description: "Empowering women pursuing careers in science, technology, engineering, and mathematics.",
    link: "https://example.com/scholarship3"
  },
  {
    id: 4,
    name: "First Generation Achievers Fund",
    organization: "Education Access Network",
    amount: "$4,000",
    deadline: "2024-03-15",
    eligibility: ["First Generation", "Undergraduate", "US Citizen"],
    gpa: 3.0,
    level: "Undergraduate",
    fields: ["Any"],
    description: "Supporting first-generation college students across all academic disciplines.",
    link: "https://example.com/scholarship4"
  },
  {
    id: 5,
    name: "Healthcare Leaders of Tomorrow",
    organization: "MedPath Foundation",
    amount: "$6,000",
    deadline: "2024-01-15",
    eligibility: ["Undergraduate", "Graduate", "US Citizen", "International"],
    gpa: 3.5,
    level: "Any",
    fields: ["Medicine", "Nursing", "Public Health", "Healthcare Administration"],
    description: "For students dedicated to improving healthcare access and quality in underserved communities.",
    link: "https://example.com/scholarship5"
  },
  {
    id: 6,
    name: "Environmental Sustainability Grant",
    organization: "GreenFuture Initiative",
    amount: "$3,500",
    deadline: "2024-02-10",
    eligibility: ["Undergraduate", "Graduate", "US Citizen", "International"],
    gpa: 3.0,
    level: "Any",
    fields: ["Environmental Science", "Sustainability", "Ecology", "Conservation"],
    description: "Supporting students committed to environmental protection and sustainable development.",
    link: "https://example.com/scholarship6"
  },
  {
    id: 7,
    name: "Creative Arts Fellowship",
    organization: "Arts Forward Foundation",
    amount: "$2,500",
    deadline: "2024-03-30",
    eligibility: ["Undergraduate", "Graduate", "US Citizen", "International"],
    gpa: 3.0,
    level: "Any",
    fields: ["Fine Arts", "Music", "Theater", "Film", "Design"],
    description: "Nurturing the next generation of artists, performers, and creative professionals.",
    link: "https://example.com/scholarship7"
  },
  {
    id: 8,
    name: "Community Leadership Award",
    organization: "CivicAction Alliance",
    amount: "$4,500",
    deadline: "2024-01-20",
    eligibility: ["Undergraduate", "US Citizen"],
    gpa: 3.0,
    level: "Undergraduate",
    fields: ["Any"],
    description: "Recognizing students with exceptional commitment to community service and civic engagement.",
    link: "https://example.com/scholarship8"
  },
  // Indian scholarships
  {
    id: 9,
    name: "IIT Merit Scholarship",
    organization: "Ministry of Education, India",
    amount: "₹50,000",
    deadline: "2024-04-15",
    eligibility: ["Indian Citizen", "Undergraduate", "JEE Advanced"],
    gpa: 3.7,
    level: "Undergraduate",
    fields: ["Engineering", "Computer Science", "Technology"],
    description: "Merit-based scholarship for top performers in JEE Advanced seeking to attend Indian Institutes of Technology.",
    link: "https://example.com/scholarship-iit"
  },
  {
    id: 10,
    name: "Prime Minister's Research Fellowship",
    organization: "Government of India",
    amount: "₹80,000 monthly",
    deadline: "2024-05-30",
    eligibility: ["Indian Citizen", "PhD", "Graduate"],
    gpa: 3.5,
    level: "Graduate",
    fields: ["Science", "Technology", "Engineering", "Mathematics"],
    description: "Fellowship for doctoral students conducting innovative research at premier Indian institutions.",
    link: "https://example.com/pmrf"
  },
  {
    id: 11,
    name: "Tata Scholarship for Cornell University",
    organization: "Tata Education Trust",
    amount: "Full tuition",
    deadline: "2024-01-10",
    eligibility: ["Indian Citizen", "Undergraduate", "Financial Need"],
    gpa: 3.8,
    level: "Undergraduate",
    fields: ["Any"],
    description: "Need-based scholarship supporting talented Indian students seeking to study at Cornell University.",
    link: "https://example.com/tata-cornell"
  },
  {
    id: 12,
    name: "AICTE Pragati Scholarship for Girls",
    organization: "All India Council for Technical Education",
    amount: "₹50,000 annually",
    deadline: "2024-03-15",
    eligibility: ["Indian Citizen", "Female", "Undergraduate"],
    gpa: 3.0,
    level: "Undergraduate",
    fields: ["Engineering", "Technology", "Pharmacy", "Architecture"],
    description: "Supporting female students in technical education to promote women's participation in STEM fields.",
    link: "https://example.com/aicte-pragati"
  },
  {
    id: 13,
    name: "National Talent Scholarship",
    organization: "Department of Science and Technology, India",
    amount: "₹60,000 annually",
    deadline: "2024-02-28",
    eligibility: ["Indian Citizen", "Undergraduate", "KVPY Qualified"],
    gpa: 3.5,
    level: "Undergraduate",
    fields: ["Science", "Mathematics", "Biology", "Physics", "Chemistry"],
    description: "Scholarship for students who have qualified in the Kishore Vaigyanik Protsahan Yojana examination.",
    link: "https://example.com/kvpy-scholarship"
  },
  {
    id: 14,
    name: "Visvesvaraya PhD Scheme",
    organization: "Ministry of Electronics & IT",
    amount: "₹31,500 monthly",
    deadline: "2024-06-15",
    eligibility: ["Indian Citizen", "PhD", "Graduate"],
    gpa: 3.2,
    level: "Graduate",
    fields: ["Electronics", "IT", "Computer Science"],
    description: "PhD fellowship to enhance the number of PhDs in electronics, IT, and computer science sectors.",
    link: "https://example.com/visvesvaraya-phd"
  },
  {
    id: 15,
    name: "INSPIRE Scholarship",
    organization: "Department of Science & Technology",
    amount: "₹80,000 annually",
    deadline: "2024-03-31",
    eligibility: ["Indian Citizen", "Undergraduate", "Top 1% in Board Exams"],
    gpa: 3.7,
    level: "Undergraduate",
    fields: ["Science", "Basic Sciences", "Natural Sciences"],
    description: "Scholarship for students pursuing natural or basic sciences at the undergraduate level.",
    link: "https://example.com/inspire-scholarship"
  },
  {
    id: 16,
    name: "Central Sector Scholarship",
    organization: "Ministry of Education, India",
    amount: "₹12,000 annually",
    deadline: "2024-04-30",
    eligibility: ["Indian Citizen", "Undergraduate", "Financial Need"],
    gpa: 3.0,
    level: "Undergraduate",
    fields: ["Any"],
    description: "Merit-cum-means scholarship for students from low-income families pursuing higher education in India.",
    link: "https://example.com/central-sector"
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scholarship[] | { message: string }>
) {
  if (req.method === 'GET') {
    // Get query parameters
    const { 
      term, 
      level, 
      minGpa, 
      field, 
      eligibility 
    } = req.query;
    
    let filteredScholarships = [...scholarshipsData];
    
    // Apply filters if provided
    if (term) {
      const searchTerm = String(term).toLowerCase();
      filteredScholarships = filteredScholarships.filter(s => 
        s.name.toLowerCase().includes(searchTerm) || 
        s.organization.toLowerCase().includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (level) {
      const levelFilter = String(level);
      filteredScholarships = filteredScholarships.filter(s => 
        s.level === levelFilter || s.level === 'Any'
      );
    }
    
    if (minGpa) {
      const gpaFilter = parseFloat(String(minGpa));
      if (!isNaN(gpaFilter)) {
        filteredScholarships = filteredScholarships.filter(s => s.gpa <= gpaFilter);
      }
    }
    
    if (field) {
      const fieldFilter = String(field);
      filteredScholarships = filteredScholarships.filter(s => 
        s.fields.includes(fieldFilter) || s.fields.includes('Any')
      );
    }
    
    if (eligibility) {
      const eligibilityFilter = String(eligibility);
      filteredScholarships = filteredScholarships.filter(s => 
        s.eligibility.includes(eligibilityFilter)
      );
    }
    
    // Return filtered results
    res.status(200).json(filteredScholarships);
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
} 