import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

type ResponseData = {
  message: ChatMessage;
};

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Educational system prompt
const SYSTEM_PROMPT = `You are an AI education assistant designed to help students with their learning journey. Your primary functions include:

1. **Study Schedule Creation**: Help students create personalized study schedules based on their subjects, available time, and learning goals.

2. **Educational Resources**: Recommend appropriate learning materials, websites, books, and tools for various subjects.

3. **Learning Support**: Provide study tips, motivation, and guidance for effective learning strategies.

4. **Educational Games**: Suggest and guide students through educational games and activities for mental breaks.

5. **Subject-Specific Help**: Assist with questions related to mathematics, science, languages, history, computer science, and other academic subjects.

**Guidelines:**
- Always maintain an encouraging and supportive tone
- Focus on education equity and accessibility
- Provide practical, actionable advice
- Keep responses concise but informative
- Ask follow-up questions to better understand student needs
- Suggest concrete steps and resources when possible
- Promote healthy study habits and work-life balance

**Context**: You are part of an AI Education Equity System designed to provide equal access to quality educational support for all students regardless of their background or circumstances.

Remember to be helpful, encouraging, and educational in all your responses.`;

// Session storage for conversation history
let sessionStore = new Map<string, {
  conversationHistory: Array<{role: string, content: string}>;
  lastMessageTimestamp: number;
}>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      message: {
        role: 'assistant',
        content: 'Method not allowed',
        timestamp: new Date().toISOString(),
      }
    });
    return;
  }

  try {
    const { message } = req.body as { message: string };
    const sessionId = req.headers['x-session-id'] as string || 'default-session';
    
    console.log(`Processing message for session ${sessionId}: ${message}`);

    if (!message || message.trim().length === 0) {
      res.status(400).json({
        message: {
          role: 'assistant',
          content: 'Please provide a message.',
          timestamp: new Date().toISOString(),
        }
      });
      return;
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable is not set');
      res.status(500).json({
        message: {
          role: 'assistant',
          content: 'Sorry, the AI service is not properly configured. Please check the API key configuration.',
          timestamp: new Date().toISOString(),
        }
      });
      return;
    }
    
    // Initialize or retrieve conversation history
    if (!sessionStore.has(sessionId)) {
      sessionStore.set(sessionId, {
        conversationHistory: [],
        lastMessageTimestamp: Date.now(),
      });
    }
    
    const session = sessionStore.get(sessionId)!;
    session.lastMessageTimestamp = Date.now();
    
    // Add user message to conversation history
    session.conversationHistory.push({
      role: 'user',
      content: message
    });
    
    // Keep conversation history manageable (last 10 exchanges)
    if (session.conversationHistory.length > 20) {
      session.conversationHistory = session.conversationHistory.slice(-20);
    }

    try {
      // Initialize Gemini AI model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Prepare conversation context
      const conversationContext = session.conversationHistory
        .map(msg => `${msg.role === 'user' ? 'Student' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Create enhanced prompt with context
      const enhancedPrompt = `${SYSTEM_PROMPT}

Previous conversation:
${conversationContext}

Please respond to the student's latest message as their AI education assistant. Keep your response helpful, encouraging, and focused on their educational needs.`;

      console.log('Sending request to Gemini AI...');
      
      // Generate response using Gemini AI
      const result = await model.generateContent(enhancedPrompt);
      const response = await result.response;
      const responseText = response.text();

      console.log('Received response from Gemini AI:', responseText.substring(0, 100) + '...');

      // Add assistant response to conversation history
      session.conversationHistory.push({
        role: 'assistant',
        content: responseText
      });

      // Create response object
      const responseMessage: ChatMessage = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toISOString(),
      };
      
      res.status(200).json({ message: responseMessage });

    } catch (geminiError) {
      console.error('Gemini AI API Error:', geminiError);
      
      // Fallback response if Gemini API fails
      const fallbackResponse = generateFallbackResponse(message);
      
      session.conversationHistory.push({
        role: 'assistant',
        content: fallbackResponse
      });

      const responseMessage: ChatMessage = {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date().toISOString(),
      };
      
      res.status(200).json({ message: responseMessage });
    }

  } catch (error) {
    console.error('Error handling chatbot message:', error);
    res.status(500).json({
      message: {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString(),
      }
    });
  }
}

// Fallback response function for when Gemini API is unavailable
function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('schedule') || lowerMessage.includes('timetable') || lowerMessage.includes('plan')) {
    return "I'd be happy to help you create a study schedule! To get started, please tell me:\n\n1. What subjects are you studying?\n2. How many hours can you dedicate to studying daily?\n3. Do you have any specific goals or deadlines?\n\nWith this information, I can create a personalized schedule that balances your workload effectively.";
  }
  
  if (lowerMessage.includes('resource') || lowerMessage.includes('material') || lowerMessage.includes('help')) {
    return "I can recommend several excellent educational resources:\n\n• Khan Academy - Free comprehensive lessons across many subjects\n• Coursera - University-level courses from top institutions\n• MIT OpenCourseWare - Free course materials from MIT\n• Crash Course - Engaging video content on YouTube\n\nWhat specific subject are you looking for resources in?";
  }
  
  if (lowerMessage.includes('game') || lowerMessage.includes('break') || lowerMessage.includes('fun')) {
    return "Taking breaks with educational games is a great idea! Here are some options:\n\n• Memory games to improve recall\n• Math puzzles and word games\n• Quiz-style games for review\n• Interactive simulations for science concepts\n\nWould you like me to suggest specific games for any particular subject you're studying?";
  }
  
  return "Hello! I'm your AI education assistant. I'm here to help you with:\n\n• Creating personalized study schedules\n• Finding learning resources and materials\n• Providing study tips and motivation\n• Suggesting educational games for breaks\n• Answering questions about various subjects\n\nWhat would you like to work on today?";
}