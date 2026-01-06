import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const interviewCategories = {
    technical: {
      title: 'Technical Interview',
      icon: '💻',
      questions: [
        {
          question: 'What is the difference between let, const, and var in JavaScript?',
          answer: 'var is function-scoped and can be redeclared, let is block-scoped and cannot be redeclared, const is block-scoped, cannot be redeclared, and cannot be reassigned.',
          tips: 'Focus on scope differences and practical use cases.'
        },
        {
          question: 'Explain the concept of closures in JavaScript.',
          answer: 'A closure is when a function has access to variables from its outer scope even after the outer function has returned. It allows data privacy and creates function factories.',
          tips: 'Provide a simple example to demonstrate your understanding.'
        },
        {
          question: 'What is the difference between SQL and NoSQL databases?',
          answer: 'SQL databases are relational, use structured schema, and support ACID properties. NoSQL databases are non-relational, have flexible schemas, and are designed for scalability.',
          tips: 'Mention specific examples like MySQL vs MongoDB.'
        }
      ]
    },
    behavioral: {
      title: 'Behavioral Interview',
      icon: '🤝',
      questions: [
        {
          question: 'Tell me about a time when you had to work with a difficult team member.',
          answer: 'Use the STAR method: Situation, Task, Action, Result. Focus on your communication skills and problem-solving approach.',
          tips: 'Be honest but constructive, show how you learned from the experience.'
        },
        {
          question: 'Describe a project you\'re proud of.',
          answer: 'Choose a project that showcases your technical skills and impact. Explain the problem, your solution, and the results.',
          tips: 'Quantify your impact with numbers when possible.'
        },
        {
          question: 'Where do you see yourself in 5 years?',
          answer: 'Show ambition while staying realistic. Connect your goals to the company\'s mission and growth opportunities.',
          tips: 'Research the company and mention how this role fits your career path.'
        }
      ]
    },
    hr: {
      title: 'HR Interview',
      icon: '👥',
      questions: [
        {
          question: 'Why do you want to work for our company?',
          answer: 'Research the company\'s values, mission, and recent achievements. Connect them to your career goals and personal values.',
          tips: 'Show genuine interest and avoid generic answers.'
        },
        {
          question: 'What are your salary expectations?',
          answer: 'Research market rates for the position. Provide a range and express flexibility based on the total compensation package.',
          tips: 'Be prepared to justify your expectations with your qualifications.'
        },
        {
          question: 'Do you have any questions for us?',
          answer: 'Always have thoughtful questions prepared about the role, team culture, growth opportunities, and company direction.',
          tips: 'This shows your genuine interest and helps you evaluate the opportunity.'
        }
      ]
    }
  };

  const nextQuestion = () => {
    const maxQuestions = interviewCategories[selectedCategory].questions.length;
    setCurrentQuestion((prev) => (prev + 1) % maxQuestions);
    setShowAnswer(false);
  };

  const prevQuestion = () => {
    const maxQuestions = interviewCategories[selectedCategory].questions.length;
    setCurrentQuestion((prev) => (prev - 1 + maxQuestions) % maxQuestions);
    setShowAnswer(false);
  };

  return (
    <>
      <Head>
        <title>Interview Preparation | EduEquity AI</title>
        <meta name="description" content="Prepare for your next interview with our comprehensive practice questions and expert tips." />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem'
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            🎯 Interview Preparation
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Master your interview skills with our comprehensive practice questions and expert guidance
          </p>
        </header>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <a 
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              fontWeight: '600'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            🏠 Back to Home
          </a>
        </div>

        {/* Category Selection */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(interviewCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key);
                setCurrentQuestion(0);
                setShowAnswer(false);
              }}
              style={{
                padding: '1rem 2rem',
                backgroundColor: selectedCategory === key 
                  ? 'linear-gradient(135deg, #14B8A6, #10B981)' 
                  : 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== key) {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== key) {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              {interviewCategories[selectedCategory].title}
            </h2>
            <p style={{
              color: '#6B7280',
              fontSize: '1rem'
            }}>
              Question {currentQuestion + 1} of {interviewCategories[selectedCategory].questions.length}
            </p>
          </div>

          <div style={{
            backgroundColor: '#F3F4F6',
            padding: '2rem',
            borderRadius: '15px',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              color: '#1F2937',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Question:
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#374151',
              lineHeight: '1.6'
            }}>
              {interviewCategories[selectedCategory].questions[currentQuestion].question}
            </p>
          </div>

          {showAnswer && (
            <div style={{
              backgroundColor: '#E6FFFA',
              border: '2px solid #14B8A6',
              padding: '2rem',
              borderRadius: '15px',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                color: '#065F46',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Sample Answer:
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#047857',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {interviewCategories[selectedCategory].questions[currentQuestion].answer}
              </p>
              <div style={{
                backgroundColor: '#F0FDF4',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #BBF7D0'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  color: '#15803D',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  💡 Pro Tip:
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#166534',
                  lineHeight: '1.5'
                }}>
                  {interviewCategories[selectedCategory].questions[currentQuestion].tips}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              style={{
                padding: '1rem 2rem',
                background: showAnswer 
                  ? 'linear-gradient(135deg, #EF4444, #DC2626)' 
                  : 'linear-gradient(135deg, #14B8A6, #10B981)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {showAnswer ? '🙈 Hide Answer' : '👁️ Show Answer'}
            </button>

            <button
              onClick={prevQuestion}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4B5563';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#6B7280';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ⬅️ Previous
            </button>

            <button
              onClick={nextQuestion}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4B5563';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#6B7280';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Next ➡️
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div style={{
          maxWidth: '800px',
          margin: '3rem auto 0',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#1F2937',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: '700'
          }}>
            🌟 General Interview Tips
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{ color: '#1E40AF', marginBottom: '0.5rem', fontWeight: '600' }}>
                🕒 Before the Interview
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Research the company, practice common questions, prepare your portfolio, and plan your route.
              </p>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{ color: '#059669', marginBottom: '0.5rem', fontWeight: '600' }}>
                💬 During the Interview
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Listen actively, ask clarifying questions, use the STAR method, and show enthusiasm.
              </p>
            </div>
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{ color: '#DC2626', marginBottom: '0.5rem', fontWeight: '600' }}>
                📧 After the Interview
              </h4>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Send a thank-you email within 24 hours, reflect on your performance, and follow up appropriately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}