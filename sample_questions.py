class SampleQuestions:
    """
    Collection of sample questions students can ask the career guidance chatbot
    """
    
    @staticmethod
    def get_all_samples():
        return {
            "major_selection": [
                "How do I choose the right major for my career goals?",
                "Is it too late to change my major in junior year?",
                "What can I do with a liberal arts degree?",
                "Should I double major or minor in something?",
                "How do I know if my major has good job prospects?",
                "What's the difference between similar majors like CS and IT?"
            ],
            
            "internships": [
                "How do I find internships as a freshman?",
                "What if I can't find paid internships?",
                "How many internships should I do before graduating?",
                "Can I get an internship with no experience?",
                "How do I make the most of my internship experience?",
                "What should I do if I didn't get any internship offers?"
            ],
            
            "first_job": [
                "How do I find entry-level jobs after graduation?",
                "What salary should I expect as a new graduate?",
                "How important is my GPA for getting hired?",
                "Should I take any job offer or wait for the right one?",
                "How do I compete with experienced candidates?",
                "What if I graduate without a job lined up?"
            ],
            
            "skills_development": [
                "What skills should I learn while still in college?",
                "How do I build technical skills outside of class?",
                "Should I focus on hard skills or soft skills?",
                "What programming languages should I learn as a beginner?",
                "How can I improve my communication and presentation skills?",
                "What certifications are worth getting as a student?"
            ],
            
            "student_resume": [
                "How do I write a resume with no work experience?",
                "Should I include my GPA on my resume?",
                "How do I describe class projects on my resume?",
                "What extracurricular activities should I include?",
                "How long should a student resume be?",
                "Should I create different resumes for different types of jobs?"
            ],
            
            "networking_students": [
                "How do I network as an introverted student?",
                "Should I connect with alumni on LinkedIn?",
                "How do I approach professors for career advice?",
                "What should I do at career fairs?",
                "How do I maintain relationships with internship supervisors?",
                "Is it okay to ask classmates' parents for career advice?"
            ],
            
            "career_exploration": [
                "How do I figure out what career I want?",
                "What if I'm interested in multiple different fields?",
                "How do I explore careers without committing to them?",
                "Should I do informational interviews as a student?",
                "How do I know if a career is right for me?",
                "What if my parents want me to pursue a different career?"
            ],
            
            "graduate_school": [
                "Should I go to graduate school right after undergrad?",
                "How do I decide between working and grad school?",
                "What's the ROI of getting a master's degree?",
                "How do I choose between different graduate programs?",
                "Can I work while pursuing a graduate degree?",
                "How do I prepare for graduate school applications?"
            ],
            
            "student_interviews": [
                "How do I prepare for my first job interview?",
                "What should I wear to a college recruiting interview?",
                "How do I answer 'tell me about yourself' as a student?",
                "What questions should I ask recruiters at career fairs?",
                "How do I handle questions about my lack of experience?",
                "What should I expect in a campus interview vs. on-site interview?"
            ],
            
            "student_finances": [
                "How do I negotiate salary as a new graduate?",
                "Should I negotiate my first job offer?",
                "What benefits are most important for new graduates?",
                "How do I manage student loans while job searching?",
                "Should I take unpaid internships if I have student debt?",
                "How much should I save from my first job?"
            ],
            
            "campus_resources": [
                "How do I make the most of my career services office?",
                "Should I join professional student organizations?",
                "How can I get involved in research as an undergraduate?",
                "What campus leadership opportunities look good to employers?",
                "How do I find mentors while in college?",
                "Should I study abroad if I want to work domestically?"
            ],
            
            "remote_learning": [
                "How has remote learning affected my job prospects?",
                "How do I network when classes are online?",
                "Can I do virtual internships?",
                "How do I stand out when everything is virtual?",
                "Should I mention my online learning experience in interviews?",
                "How do I build relationships with professors in online classes?"
            ]
        }
    
    @staticmethod
    def get_random_question():
        import random
        all_samples = SampleQuestions.get_all_samples()
        category = random.choice(list(all_samples.keys()))
        question = random.choice(all_samples[category])
        return category, question
    
    @staticmethod
    def get_questions_by_year():
        """Get questions organized by student year level"""
        return {
            "freshman": [
                "How do I choose the right major?",
                "What extracurriculars should I join?",
                "How early should I start thinking about internships?",
                "Should I get a part-time job while studying?"
            ],
            "sophomore": [
                "How do I find my first internship?",
                "Should I consider changing my major?",
                "What skills should I start developing?",
                "How do I build a professional network?"
            ],
            "junior": [
                "How do I secure a summer internship?",
                "Should I start applying for full-time jobs?",
                "How do I decide between graduate school and working?",
                "What should I include on my resume?"
            ],
            "senior": [
                "How do I navigate the job search process?",
                "When should I start applying for full-time positions?",
                "How do I negotiate my first job offer?",
                "What if I don't have a job lined up at graduation?"
            ]
        }
    
    @staticmethod
    def display_sample_questions():
        samples = SampleQuestions.get_all_samples()
        
        print("🎓 STUDENT CAREER GUIDANCE - SAMPLE QUESTIONS")
        print("=" * 60)
        
        for category, questions in samples.items():
            print(f"\n📚 {category.upper().replace('_', ' ')}:")
            for i, question in enumerate(questions, 1):
                print(f"   {i}. {question}")
        
        print("\n" + "=" * 60)
        print("💡 TIP: These questions are tailored for students at all levels!")
        print("Ask naturally about your academic and career concerns.")
        
        # Show year-specific questions
        print("\n🎯 QUESTIONS BY YEAR LEVEL:")
        year_questions = SampleQuestions.get_questions_by_year()
        for year, questions in year_questions.items():
            print(f"\n{year.capitalize()}:")
            for question in questions:
                print(f"   • {question}")

if __name__ == "__main__":
    SampleQuestions.display_sample_questions()
