from career_guidance_chatbot import StudentCareerGuidanceChatbot
from sample_questions import SampleQuestions
import json

class StudentCareerChatbotInterface:
    def __init__(self):
        self.chatbot = StudentCareerGuidanceChatbot()
        self.conversation_history = []
        
    def start_conversation(self):
        print(self.chatbot.get_greeting())
        print("\nCommands: 'quit' to exit, 'help' for guidance, 'samples' for example questions\n")
        
        while True:
            user_input = input("You: ").strip()
            
            if user_input.lower() == 'quit':
                print("Best of luck with your academic and career journey! 🎓")
                break
            elif user_input.lower() == 'help':
                self.show_help()
                continue
            elif user_input.lower() == 'samples':
                self.show_sample_questions()
                continue
            elif not user_input:
                print("Please enter a question or type 'help' for guidance.")
                continue
            
            # Get and display response
            response = self.chatbot.get_response(user_input)
            formatted_response = self.chatbot.format_response(response)
            
            print(f"\nCareer Assistant: {formatted_response}\n")
            
            # Store conversation
            self.conversation_history.append({
                "user_input": user_input,
                "category": response.category,
                "response": response.response
            })
    
    def show_help(self):
        print("\n🎓 I can help you with:")
        print("• Choosing your major and academic planning")
        print("• Finding and succeeding in internships")
        print("• Preparing for your first job search")
        print("• Building relevant skills while in college")
        print("• Creating student resumes and portfolios")
        print("• Networking and building professional relationships")
        print("• Exploring different career paths")
        print("• Making graduate school decisions")
        print("• Interview preparation and job applications")
        print("• Managing finances and student loans")
        print("• Using campus career resources effectively")
        print("\nJust ask naturally about any career or academic concerns!\n")
    
    def show_sample_questions(self):
        print("\n" + "="*60)
        print("📝 SAMPLE QUESTIONS FOR STUDENTS:")
        print("="*60)
        
        samples = SampleQuestions.get_all_samples()
        
        # Show a few examples from each category
        for category, questions in samples.items():
            print(f"\n🔹 {category.upper().replace('_', ' ')}:")
            for question in questions[:2]:  # Show first 2 questions
                print(f"   • {question}")
            if len(questions) > 2:
                print(f"   ... and {len(questions) - 2} more")
        
        print(f"\n💡 Just ask naturally about your career concerns!")
        print("="*60 + "\n")

if __name__ == "__main__":
    interface = StudentCareerChatbotInterface()
    interface.start_conversation()
        print("="*60 + "\n")
    
    def ask_random_question(self):
        category, question = SampleQuestions.get_random_question()
        print(f"\n🎲 Random question from {category.replace('_', ' ')}:")
        print(f"   \"{question}\"")
        print("\nFeel free to ask this question or use it as inspiration!\n")

if __name__ == "__main__":
    interface = ChatbotInterface()
    interface.start_conversation()
