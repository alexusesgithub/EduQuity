import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Add scroll animation for cards
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));
    
    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript basics to build modern websites. Perfect for beginners who want to start their coding journey.",
      videoId: "UB1O30fR-EE"
    },
    {
      id: 2,
      title: "Data Analysis with Python", 
      description: "Master data analysis using Python, pandas, and visualization libraries. Essential skills for data science careers.",
      videoId: "r-uOLxNrNk8"
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      description: "Comprehensive guide to digital marketing including SEO, social media, and content marketing strategies.",
      videoId: "bixR-KIJKYM"
    }
  ];

  const featuresSectionStyles = {
    padding: '4rem 2rem',
    backgroundColor: 'var(--gray-50)',
    position: 'relative',
    zIndex: 1
  };

  const featuresGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  };

  const featureCardStyles = {
    background: 'white',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    zIndex: 3,
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)'
    }
  };

  const featureIconStyles = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary-light), var(--primary))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    fontSize: '2rem',
    color: 'white'
  };

  const featureTitleStyles = {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 600
  };

  const featureDescriptionStyles = {
    color: 'var(--gray-600)'
  };

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Learning',
      description: 'Personalized learning experiences based on individual student needs and progress through advanced machine learning algorithms'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Advanced analytics to monitor student growth and identify areas for improvement with real-time visualization and insights'
    },
    {
      icon: '⏱️',
      title: 'Focus Timer',
      description: 'Boost productivity with our Pomodoro-style focus timer. Alternate between focused work sessions and breaks to maximize learning efficiency.'
    },
    {
      icon: '🎓',
      title: 'Scholarship Finder',
      description: 'Discover scholarships tailored to your profile. Our finder helps you locate and apply for financial aid opportunities based on your qualifications.'
    },
    {
      icon: '👨‍🏫',
      title: 'Staff Dashboard',
      description: 'Comprehensive tools for staff to manage sessions, track progress, and personalize learning plans for each student'
    },
    {
      icon: '🏫',
      title: 'Institution Integration',
      description: 'Flexible framework that adapts to your institution\'s specific needs, curriculum, and existing technical infrastructure'
    }
  ];

  return (
    <div className={isLoaded ? 'fade-in' : ''} style={{ opacity: isLoaded ? 1 : 0 }}>
      <Head>
        <title>AI Education Equity System</title>
        <meta name="description" content="AI-powered education platform" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header style={{ 
        backgroundColor: 'var(--white)', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        padding: '1.2rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <h1 className="gradient-text" style={{ 
            fontSize: '1.8rem',
            fontWeight: 700,
          }}>
            EduEquity AI
          </h1>
          <nav>
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none', 
              gap: '2rem' 
            }}>
              <li>
                <a href="/auth/login" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  Login
                </a>
              </li>
              <li>
                <a href="/chatbot" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  Chat Assistant
                </a>
              </li>
              <li>
                <a href="/focus-timer" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  Focus Timer
                </a>
              </li>
              <li>
                <a href="/scholarship-finder" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  Scholarships
                </a>
              </li>
              <li>
                <a href="/internships.html" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  Internships
                </a>
              </li>
              <li>
                <button onClick={() => setShowSkillModal(true)} style={{ 
                  color: 'var(--gray-700)', 
                  background: 'none',
                  border: 'none',
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }} className="nav-link">
                  Skill Development Courses
                </button>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" style={{ 
                  color: 'var(--gray-700)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }} className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', 
          color: 'var(--white)', 
          padding: '8rem 0 6rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Abstract shapes */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            top: '-100px',
            right: '-100px',
          }}></div>
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            bottom: '-50px',
            left: '10%',
          }}></div>
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div className={`slide-up ${isLoaded ? 'visible' : ''}`} style={{ 
              textAlign: 'center',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
              transform: isLoaded ? 'translateY(0)' : 'translateY(30px)'
            }}>
              <h2 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 700,
                marginBottom: '1.5rem',
                lineHeight: 1.2
              }}>
                Empowering Education <br/>Through AI
              </h2>
              <p style={{ 
                fontSize: '1.25rem', 
                maxWidth: '800px', 
                margin: '0 auto 3rem',
                opacity: 0.9
              }}>
                An intelligent platform designed to provide equitable learning 
                experiences for all students, powered by cutting-edge AI technology
              </p>
              <div className="btn-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1200px',
                margin: '0 auto 2rem',
                padding: '0 1rem'
              }}>
                <a href="/auth/login?role=student" className="btn" style={{ 
                  backgroundColor: 'var(--white)', 
                  color: 'var(--primary)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  minHeight: '52px'
                }}>
                  🎓 Student Login
                </a>
                <a href="/auth/login?role=staff" className="btn" style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--white)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  minHeight: '52px'
                }}>
                  👨‍🏫 Staff Login
                </a>
                <a href="/institution" className="btn" style={{ 
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  minHeight: '52px'
                }}>
                  🏫 University Module
                </a>
                <a href="/internships.html" className="btn" style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'var(--white)',
                  border: '2px solid var(--white)',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  minHeight: '52px',
                  backdropFilter: 'blur(10px)'
                }}>
                  💼 Explore Internships
                </a>
                <a href="/interview-prep" className="btn interview-prep-btn" style={{ 
                  background: 'linear-gradient(135deg, #14B8A6, #10B981)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  minHeight: '52px',
                  border: 'none'
                }} 
                onMouseOver={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #0F766E, #059669)';
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 10px 20px rgba(20, 184, 166, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #14B8A6, #10B981)';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}>
                  🎯 Interview Prep
                </a>
              </div>
              
              <div className="glass" style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                <span style={{ fontWeight: 500 }}>🎓 Trusted by</span>
                <strong>50+ educational institutions</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={featuresSectionStyles}>
          <div style={featuresGridStyles}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  ...featureCardStyles,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${index * 0.1}s`
                }}
              >
                <div style={featureIconStyles}>{feature.icon}</div>
                <h3 style={featureTitleStyles}>{feature.title}</h3>
                <p style={featureDescriptionStyles}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section style={{
          padding: '5rem 0',
          background: 'linear-gradient(135deg, var(--primary-dark), var(--accent))',
          color: 'white',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>
              Ready to Transform Education?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              opacity: 0.9
            }}>
              Join the community of forward-thinking educators and students using AI to achieve educational equity.
            </p>
            <a href="/auth/login" className="btn" style={{
              backgroundColor: 'white',
              color: 'var(--primary-dark)',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              Get Started Today
            </a>
          </div>
        </section>
      </main>

      <footer style={{ 
        backgroundColor: 'var(--gray-900)', 
        color: 'var(--white)', 
        padding: '4rem 0 2rem'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h2 className="gradient-text" style={{ 
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1.5rem'
            }}>
              EduEquity AI
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              maxWidth: '500px',
              margin: '0 auto 2rem',
              color: 'var(--gray-400)'
            }}>
              Harnessing the power of artificial intelligence to create equitable educational opportunities for all.
            </p>
            <ul style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              listStyle: 'none', 
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <li><a href="#" style={{ color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">Home</a></li>
              <li><a href="#" style={{ color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">About</a></li>
              <li><a href="#" style={{ color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">Features</a></li>
              <li><a href="#" style={{ color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">Pricing</a></li>
              <li><a href="#" style={{ color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.3s ease' }} className="footer-link">Contact</a></li>
            </ul>
            <div style={{
              width: '100%',
              height: '1px',
              background: 'var(--gray-800)',
              margin: '1rem 0 2rem'
            }}></div>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
              © {new Date().getFullYear()} EduEquity AI. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Skill Development Courses Modal */}
      {showSkillModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          overflowY: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            width: '95%',
            maxWidth: '1000px',
            margin: '2% auto',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
                🎯 Skill Development Courses
              </h2>
              <button 
                onClick={() => setShowSkillModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '28px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'none'}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: '20px',
              flex: 1,
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '30px'
              }}>
                {courses.map(course => (
                  <div key={course.id} style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}>
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 0,
                      paddingBottom: '56.25%' // 16:9 aspect ratio
                    }}>
                      <iframe 
                        src={`https://www.youtube.com/embed/${course.videoId}`}
                        frameBorder="0" 
                        allowFullScreen
                        title={course.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%'
                        }}
                      />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        margin: '0 0 15px 0',
                        color: '#333'
                      }}>
                        {course.title}
                      </h3>
                      <p style={{
                        color: '#666',
                        fontSize: '16px',
                        lineHeight: 1.6,
                        marginBottom: '20px'
                      }}>
                        {course.description}
                      </p>
                      <button
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${course.videoId}`, '_blank')}
                        style={{
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '14px',
                          transition: 'background 0.3s',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#5a6fd8'}
                        onMouseLeave={(e) => e.target.style.background = '#667eea'}
                      >
                        Watch Full Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s ease;
        }
        
        .nav-link:hover {
          color: var(--primary);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .footer-link:hover {
          color: var(--white);
        }
        
        @media (max-width: 768px) {
          .skill-courses-modal {
            width: 98% !important;
            margin: 1% auto !important;
            max-height: 95vh !important;
          }
        }
      `}</style>
    </div>
  );
}