import re
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class CareerResponse:
    category: str
    response: str
    resources: List[str]
    follow_up_questions: List[str]

class StudentCareerGuidanceChatbot:
    def __init__(self):
        self.response_templates = self._load_student_response_templates()
        self.career_keywords = self._load_student_career_keywords()
        self.greeting_message = "Hello! I'm your student career guidance assistant. I'm here to help you navigate your academic choices, internships, job search, and career planning. How can I assist you today?"
    
    def _load_student_career_keywords(self) -> Dict[str, List[str]]:
        return {
            "major_selection": ["major", "degree", "field of study", "academic program", "what to study"],
            "internships": ["internship", "intern", "summer program", "work experience", "co-op"],
            "first_job": ["entry level", "graduate job", "first job", "new grad", "after graduation"],
            "skills_development": ["skills", "learn", "develop", "improve", "certification", "training"],
            "student_resume": ["resume", "CV", "application", "portfolio", "experience"],
            "networking_students": ["networking", "connections", "alumni", "career fair", "linkedin"],
            "career_exploration": ["career path", "what career", "explore", "options", "future"],
            "graduate_school": ["grad school", "graduate school", "masters", "PhD", "further study"],
            "student_interviews": ["interview", "job interview", "behavioral questions", "campus recruiting"],
            "student_finances": ["salary", "pay", "budget", "student loans", "financial"],
            "campus_resources": ["career services", "campus", "university resources", "advisor"],
            "academic_planning": ["course selection", "classes", "academic", "semester", "schedule"]
        }
    
    def _load_student_response_templates(self) -> Dict[str, CareerResponse]:
        return {
            "major_selection": CareerResponse(
                category="Major & Academic Planning",
                response="Choosing the right major is crucial for your career success! Consider: 1) Your interests and passions, 2) Job market demand and growth, 3) Salary potential, 4) Required skills and coursework, 5) Talk to professionals in fields you're considering. Remember, many successful people work in fields different from their major - transferable skills matter!",
                resources=["University career counselors", "O*NET Interest Profiler", "Bureau of Labor Statistics", "LinkedIn alumni tool", "Informational interviews"],
                follow_up_questions=["What subjects do you enjoy most?", "What career outcomes are you hoping for?", "Have you spoken with your academic advisor?"]
            ),
            "internships": CareerResponse(
                category="Internship Search & Success",
                response="Internships are your gateway to career success! Start early - even freshmen can find opportunities. 1) Use your university's career portal, 2) Apply to structured programs (Google, Microsoft, etc.), 3) Reach out to local companies, 4) Consider virtual internships, 5) Don't overlook smaller companies. Quality over quantity - make each application count!",
                resources=["University career services", "Handshake", "LinkedIn", "Indeed", "Company websites", "WayUp"],
                follow_up_questions=["What field interests you for internships?", "When are you planning to intern?", "Do you need help with your application materials?"]
            ),
            "first_job": CareerResponse(
                category="Entry-Level Job Search",
                response="Landing your first job is exciting! Start your search 6-9 months before graduation. 1) Leverage career fairs and campus recruiting, 2) Apply to new grad programs at large companies, 3) Use your network (professors, internship contacts), 4) Consider contract-to-hire positions, 5) Be open to different locations. Your first job is a stepping stone, not your final destination!",
                resources=["Campus career fairs", "Company graduate programs", "LinkedIn", "Glassdoor", "AngelList for startups"],
                follow_up_questions=["What type of role are you targeting?", "Are you open to relocating?", "How is your job search going so far?"]
            ),
            "skills_development": CareerResponse(
                category="Student Skill Building",
                response="Building skills while in college gives you a competitive edge! Focus on: 1) Technical skills relevant to your field, 2) Soft skills like communication and leadership, 3) Digital literacy and data analysis, 4) Project management, 5) Learn through side projects, online courses, and student organizations. Document your learning journey!",
                resources=["Coursera", "edX", "LinkedIn Learning", "YouTube", "GitHub for coding projects", "Student clubs"],
                follow_up_questions=["What skills are you most interested in developing?", "Do you prefer hands-on or theoretical learning?", "What's your timeline for skill development?"]
            ),
            "student_resume": CareerResponse(
                category="Student Resume Building",
                response="Your student resume should highlight potential over experience! Include: 1) Relevant coursework and projects, 2) Internships and part-time work, 3) Leadership roles and extracurriculars, 4) Volunteer work, 5) Technical skills and certifications. Use action verbs and quantify achievements. Keep it to one page and tailor for each application!",
                resources=["University career services", "Resume templates", "Grammarly", "VMock resume review", "LinkedIn resume builder"],
                follow_up_questions=["What experiences do you want to highlight?", "Have you had your resume reviewed?", "What type of positions are you targeting?"]
            ),
            "networking_students": CareerResponse(
                category="Student Networking",
                response="Networking as a student is about building genuine relationships! 1) Start with your university alumni network, 2) Attend career fairs and industry events, 3) Join professional student organizations, 4) Connect with professors and guest speakers, 5) Use LinkedIn strategically. Remember: give before you receive, and follow up on connections!",
                resources=["LinkedIn", "Alumni directory", "Professional associations", "Career fairs", "Industry meetups", "University events"],
                follow_up_questions=["What industry professionals would you like to connect with?", "Are you comfortable with networking events?", "How active are you on LinkedIn?"]
            ),
            "career_exploration": CareerResponse(
                category="Career Path Exploration",
                response="Exploring careers is a journey of discovery! 1) Take career assessments to understand your interests, 2) Conduct informational interviews, 3) Job shadow professionals, 4) Research growth industries, 5) Consider emerging roles. Don't rush - it's okay to explore multiple paths. Many successful people change careers multiple times!",
                resources=["Career assessment tools", "O*NET", "Bureau of Labor Statistics", "Industry reports", "Professional associations", "Career exploration courses"],
                follow_up_questions=["What careers have caught your interest?", "What values are important in your future career?", "Have you done any informational interviews?"]
            ),
            "graduate_school": CareerResponse(
                category="Graduate School Planning",
                response="Graduate school is a significant investment - make sure it aligns with your goals! Consider: 1) Is an advanced degree required in your field? 2) ROI and earning potential, 3) Opportunity cost of not working, 4) Research vs. coursework focus, 5) Part-time vs. full-time options. Some fields benefit more from experience than additional education.",
                resources=["Graduate program websites", "GRE/GMAT prep", "Application guidelines", "Financial aid information", "Current grad students"],
                follow_up_questions=["What field are you considering for graduate study?", "What are your long-term career goals?", "Have you researched funding options?"]
            ),
            "student_interviews": CareerResponse(
                category="Student Interview Preparation",
                response="Interviews can be nerve-wracking, but preparation helps! 1) Research the company thoroughly, 2) Practice behavioral questions using STAR method, 3) Prepare examples from coursework, projects, and experiences, 4) Have thoughtful questions ready, 5) Practice with career services. Remember: they want you to succeed!",
                resources=["University career services", "Interview practice platforms", "Glassdoor interview reviews", "YouTube interview tips", "Mock interview tools"],
                follow_up_questions=["What type of interview are you preparing for?", "What examples best showcase your abilities?", "What aspects of interviewing concern you most?"]
            ),
            "general": CareerResponse(
                category="General Student Career Guidance",
                response="Your career journey as a student is just beginning! Focus on: 1) Building a strong foundation of skills and experiences, 2) Exploring different opportunities, 3) Building meaningful relationships, 4) Staying curious and adaptable, 5) Taking advantage of university resources. Remember, career paths are rarely linear - embrace the journey!",
                resources=["University career services", "Academic advisors", "Alumni network", "Career assessment tools", "Industry publications"],
                follow_up_questions=["What aspect of your career development would you like to focus on?", "What are your biggest concerns about your future career?", "How can I best support your career goals?"]
            )
        }
    
    def categorize_query(self, user_input: str) -> str:
        user_input_lower = user_input.lower()
        
        for category, keywords in self.career_keywords.items():
            if any(keyword in user_input_lower for keyword in keywords):
                return category
        
        return "general"
    
    def get_response(self, user_input: str) -> CareerResponse:
        category = self.categorize_query(user_input)
        return self.response_templates.get(category, self.response_templates["general"])
    
    def format_response(self, career_response: CareerResponse) -> str:
        formatted = f"**{career_response.category}**\n\n"
        formatted += f"{career_response.response}\n\n"
        formatted += "**Helpful Resources:**\n"
        formatted += "\n".join(f"• {resource}" for resource in career_response.resources)
        formatted += "\n\n**Follow-up Questions:**\n"
        formatted += "\n".join(f"• {question}" for question in career_response.follow_up_questions)
        return formatted
    
    def get_greeting(self) -> str:
        return self.greeting_message

# Example usage
if __name__ == "__main__":
    chatbot = StudentCareerGuidanceChatbot()
    
    print(chatbot.get_greeting())
    print("\n" + "="*50 + "\n")
    
    # Test with student career question
    test_query = "How do I choose the right major for my career goals?"
    response = chatbot.get_response(test_query)
    print(f"Query: {test_query}")
    print(chatbot.format_response(response))
