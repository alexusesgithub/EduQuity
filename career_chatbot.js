class CareerGuidanceChatbot {
    constructor() {
        this.conversationHistory = [];
        this.isOpen = false;
        this.responses = this.initializeResponses();
        this.init();
    }

    initializeResponses() {
        return {
            greeting: "Hello! I'm your Career Guidance Assistant. I'm here to help you navigate your academic choices, internships, job search, and career planning. What would you like to discuss today?",
            
            keywords: {
                'major': {
                    response: "Choosing the right major is crucial for your career success! Consider your interests, job market demand, salary potential, and required skills. Many successful people work in fields different from their major - transferable skills matter! What specific aspect of major selection interests you?",
                    followUp: ["What subjects do you enjoy most?", "What career outcomes are you hoping for?", "Have you spoken with your academic advisor?"]
                },
                'internship': {
                    response: "Internships are your gateway to career success! Start early and use your university's career portal, apply to structured programs, and reach out to local companies. Quality over quantity - make each application count! Are you looking for internships in a specific field?",
                    followUp: ["What field interests you for internships?", "When are you planning to intern?", "Do you need help with application materials?"]
                },
                'job': {
                    response: "Landing your first job is exciting! Start your search 6-9 months before graduation. Leverage career fairs, apply to new grad programs, and use your network. Your first job is a stepping stone, not your final destination! What type of role are you targeting?",
                    followUp: ["What type of role interests you?", "Are you open to relocating?", "How is your job search progressing?"]
                },
                'skills': {
                    response: "Building skills while in college gives you a competitive edge! Focus on technical skills relevant to your field, soft skills like communication, and digital literacy. Learn through projects and document your journey! What skills are you most interested in developing?",
                    followUp: ["What skills interest you most?", "Do you prefer hands-on learning?", "What's your timeline for skill development?"]
                },
                'resume': {
                    response: "Your student resume should highlight potential over experience! Include relevant coursework, projects, internships, leadership roles, and volunteer work. Use action verbs and quantify achievements. Keep it to one page! What experiences do you want to highlight?",
                    followUp: ["What experiences should you highlight?", "Have you had your resume reviewed?", "What positions are you targeting?"]
                },
                'networking': {
                    response: "Networking as a student is about building genuine relationships! Start with your university alumni network, attend career fairs, join professional organizations, and connect with professors. Remember: give before you receive! What industry professionals would you like to connect with?",
                    followUp: ["What industry interests you for networking?", "Are you comfortable with networking events?", "How active are you on LinkedIn?"]
                },
                'salary': {
                    response: "Research market rates using salary websites, consider total compensation including benefits, and prepare for negotiations with data. Remember that salary often correlates with skills, experience, and value delivered. What field are you researching salaries for?",
                    followUp: ["What role/industry are you researching?", "What's your experience level?", "Are you preparing for a negotiation?"]
                }
            },
            
            fallback: "That's a great question! As your career counselor, I'd suggest exploring this further. Career development is a journey of continuous learning and growth. Could you tell me more about your specific situation or goals?"
        };
    }

    init() {
        this.createChatInterface();
        this.bindEvents();
    }

    createChatInterface() {
        // Create chatbot container
        const chatContainer = document.createElement('div');
        chatContainer.id = 'career-chatbot-container';
        chatContainer.innerHTML = `
            <div id="career-chatbot-overlay" class="chatbot-overlay">
                <div id="career-chatbot-modal" class="chatbot-modal">
                    <div class="chatbot-header">
                        <h3>🎓 Career Guidance Assistant</h3>
                        <button id="chatbot-close" class="chatbot-close">&times;</button>
                    </div>
                    <div id="chatbot-messages" class="chatbot-messages"></div>
                    <div class="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Ask me about your career..." />
                        <button id="chatbot-send">Send</button>
                    </div>
                    <div class="chatbot-suggestions">
                        <button class="suggestion-btn" data-text="How do I choose the right major?">Major Selection</button>
                        <button class="suggestion-btn" data-text="Help me find internships">Internships</button>
                        <button class="suggestion-btn" data-text="How do I write a resume?">Resume Help</button>
                        <button class="suggestion-btn" data-text="Career networking tips">Networking</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatContainer);
        this.addChatbotStyles();
    }

    addChatbotStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .chatbot-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            
            .chatbot-modal {
                background: white;
                width: 90%;
                max-width: 500px;
                height: 80%;
                max-height: 600px;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            
            .chatbot-header {
                background: #2c3e50;
                color: white;
                padding: 15px;
                border-radius: 10px 10px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .chatbot-header h3 {
                margin: 0;
                font-size: 16px;
            }
            
            .chatbot-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            .chatbot-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f8f9fa;
            }
            
            .message {
                margin-bottom: 15px;
                max-width: 80%;
            }
            
            .user-message {
                background: #007bff;
                color: white;
                padding: 10px 15px;
                border-radius: 20px 20px 5px 20px;
                margin-left: auto;
                text-align: right;
            }
            
            .bot-message {
                background: white;
                color: #333;
                padding: 10px 15px;
                border-radius: 20px 20px 20px 5px;
                border-left: 4px solid #2c3e50;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            
            .chatbot-input-container {
                padding: 15px;
                display: flex;
                gap: 10px;
                border-top: 1px solid #eee;
            }
            
            #chatbot-input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
            }
            
            #chatbot-send {
                background: #007bff;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
            }
            
            .chatbot-suggestions {
                padding: 10px 15px;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                border-top: 1px solid #eee;
            }
            
            .suggestion-btn {
                background: #e9ecef;
                border: none;
                padding: 8px 12px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 12px;
                transition: background 0.3s;
            }
            
            .suggestion-btn:hover {
                background: #007bff;
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Bind to existing chat assistant button
        document.addEventListener('DOMContentLoaded', () => {
            // Try different possible selectors for the chat button
            const possibleSelectors = [
                '#chat-assistant',
                '.chat-assistant',
                '[data-chat]',
                '.chatbot-btn',
                '#chatbot-button'
            ];
            
            let chatButton = null;
            for (const selector of possibleSelectors) {
                chatButton = document.querySelector(selector);
                if (chatButton) break;
            }
            
            // If no button found, create a fallback
            if (!chatButton) {
                chatButton = document.createElement('button');
                chatButton.textContent = '💬 Career Chat';
                chatButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 999; background: #007bff; color: white; border: none; padding: 15px; border-radius: 50px; cursor: pointer;';
                document.body.appendChild(chatButton);
            }
            
            chatButton.addEventListener('click', () => this.openChat());
        });

        // Close button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'chatbot-close' || e.target.id === 'career-chatbot-overlay') {
                this.closeChat();
            }
        });

        // Send message
        document.addEventListener('click', (e) => {
            if (e.target.id === 'chatbot-send') {
                this.sendMessage();
            }
        });

        // Enter key to send
        document.addEventListener('keypress', (e) => {
            if (e.target.id === 'chatbot-input' && e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Suggestion buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-btn')) {
                const text = e.target.getAttribute('data-text');
                document.getElementById('chatbot-input').value = text;
                this.sendMessage();
            }
        });
    }

    openChat() {
        document.getElementById('career-chatbot-overlay').style.display = 'flex';
        if (this.conversationHistory.length === 0) {
            this.addMessage(this.responses.greeting, 'bot');
        }
        document.getElementById('chatbot-input').focus();
    }

    closeChat() {
        document.getElementById('career-chatbot-overlay').style.display = 'none';
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Add to conversation history
        this.conversationHistory.push({ type: 'user', message: message });
        
        // Generate response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.conversationHistory.push({ type: 'bot', message: response });
        }, 500);
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for keywords
        for (const [keyword, data] of Object.entries(this.responses.keywords)) {
            if (lowerMessage.includes(keyword)) {
                return data.response;
            }
        }
        
        // Context-aware responses based on conversation history
        if (this.conversationHistory.length > 2) {
            return "Based on our conversation, I'd recommend focusing on building a comprehensive career plan. What specific step would you like to tackle first?";
        }
        
        return this.responses.fallback;
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CareerGuidanceChatbot();
});
