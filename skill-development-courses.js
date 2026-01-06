class SkillDevelopmentCourses {
    constructor() {
        this.courses = this.initializeCourses();
        this.init();
    }

    initializeCourses() {
        return [
            {
                id: 1,
                title: "Web Development Fundamentals",
                description: "Learn HTML, CSS, and JavaScript basics to build modern websites. Perfect for beginners who want to start their coding journey.",
                videoId: "UB1O30fR-EE" // FreeCodeCamp HTML/CSS course
            },
            {
                id: 2,
                title: "Data Analysis with Python", 
                description: "Master data analysis using Python, pandas, and visualization libraries. Essential skills for data science careers.",
                videoId: "r-uOLxNrNk8" // FreeCodeCamp Data Analysis course
            },
            {
                id: 3,
                title: "Digital Marketing Essentials",
                description: "Comprehensive guide to digital marketing including SEO, social media, and content marketing strategies.",
                videoId: "bixR-KIJKYM" // Digital Marketing course
            }
        ];
    }

    init() {
        this.createSkillCoursesInterface();
        this.bindEvents();
    }

    createSkillCoursesInterface() {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'skill-courses-container';
        modalContainer.innerHTML = `
            <div id="skill-courses-overlay" class="skill-courses-overlay">
                <div id="skill-courses-modal" class="skill-courses-modal">
                    <div class="skill-courses-header">
                        <h2>🎯 Skill Development Courses</h2>
                        <button id="skill-courses-close" class="skill-courses-close">&times;</button>
                    </div>
                    <div class="skill-courses-content">
                        <div id="courses-grid" class="courses-grid">
                            ${this.generateCoursesHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalContainer);
        this.addSkillCoursesStyles();
    }

    generateCoursesHTML() {
        return this.courses.map(course => `
            <div class="course-card">
                <div class="course-video">
                    <iframe 
                        src="https://www.youtube.com/embed/${course.videoId}" 
                        frameborder="0" 
                        allowfullscreen
                        title="${course.title}">
                    </iframe>
                </div>
                <div class="course-info">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <button class="btn-watch" data-video-id="${course.videoId}">
                        Watch Full Course
                    </button>
                </div>
            </div>
        `).join('');
    }

    addSkillCoursesStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .skill-courses-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 1000;
                overflow-y: auto;
            }
            
            .skill-courses-modal {
                background: white;
                width: 95%;
                max-width: 1000px;
                margin: 2% auto;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .skill-courses-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 12px 12px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .skill-courses-header h2 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
            }
            
            .skill-courses-close {
                background: none;
                border: none;
                color: white;
                font-size: 28px;
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s;
            }
            
            .skill-courses-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .skill-courses-content {
                padding: 20px;
                flex: 1;
                overflow-y: auto;
            }
            
            .courses-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 30px;
            }
            
            .course-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            
            .course-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
            
            .course-video {
                position: relative;
                width: 100%;
                height: 0;
                padding-bottom: 56.25%; /* 16:9 aspect ratio */
                background: #000;
            }
            
            .course-video iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            .course-info {
                padding: 20px;
            }
            
            .course-title {
                font-size: 20px;
                font-weight: 600;
                margin: 0 0 15px 0;
                color: #333;
            }
            
            .course-description {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .btn-watch {
                background: #667eea;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                font-size: 14px;
                transition: background 0.3s;
                width: 100%;
            }
            
            .btn-watch:hover {
                background: #5a6fd8;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .skill-courses-modal {
                    width: 98%;
                    margin: 1% auto;
                    max-height: 95vh;
                }
                
                .course-info {
                    padding: 15px;
                }
                
                .course-title {
                    font-size: 18px;
                }
                
                .course-description {
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Add click handlers to existing navigation links
        document.addEventListener('DOMContentLoaded', () => {
            // Try multiple times to catch dynamically rendered content
            setTimeout(() => this.attachNavigationHandlers(), 500);
            setTimeout(() => this.attachNavigationHandlers(), 1500);
            setTimeout(() => this.attachNavigationHandlers(), 3000);
        });

        // Close modal events
        document.addEventListener('click', (e) => {
            if (e.target.id === 'skill-courses-close' || e.target.id === 'skill-courses-overlay') {
                this.closeSkillCoursesModal();
            }
        });

        // Watch button events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-watch')) {
                const videoId = e.target.dataset.videoId;
                window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
            }
        });
    }

    attachNavigationHandlers() {
        const skillNavLink = document.getElementById('skill-courses-nav');
        if (skillNavLink && !skillNavLink.hasAttribute('data-handler-attached')) {
            skillNavLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSkillCoursesModal();
            });
            skillNavLink.setAttribute('data-handler-attached', 'true');
            console.log('Click handler attached to existing skill courses navigation link');
        }
    }

    openSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize the skill development courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.skillCoursesInstance = new SkillDevelopmentCourses();
});
            const scholarshipStyles = window.getComputedStyle(scholarshipsLink);
            skillLink.style.cssText = scholarshipStyles.cssText;
            skillLink.style.cursor = 'pointer';
            skillLink.style.transition = 'all 0.3s ease';
            
            // Add hover effect
            skillLink.addEventListener('mouseenter', () => {
                skillLink.style.color = '#667eea';
                skillLink.style.transform = 'translateY(-1px)';
            });
            
            skillLink.addEventListener('mouseleave', () => {
                skillLink.style.color = scholarshipStyles.color;
                skillLink.style.transform = 'translateY(0)';
            });
            
            // Add click handler
            skillLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSkillCoursesModal();
            });
            
            // Insert after scholarships link
            scholarshipsLink.parentNode.insertBefore(skillLink, scholarshipsLink.nextSibling);
            
            console.log('Skill Development Courses button added to navigation after Scholarships');
        } else {
            console.log('Scholarships link not found, creating fallback button');
            this.createFallbackButton();
        }
    }

    createFallbackButton() {
        // Create a prominent fallback button
        const fallbackButton = document.createElement('button');
        fallbackButton.innerHTML = '🎯 Skill Development Courses';
        fallbackButton.id = 'skill-development-btn';
        fallbackButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 999;
            transition: all 0.3s ease;
            border: 2px solid white;
        `;
        
        fallbackButton.addEventListener('click', () => this.openSkillCoursesModal());
        fallbackButton.addEventListener('mouseenter', () => {
            fallbackButton.style.transform = 'scale(1.05)';
            fallbackButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        });
        fallbackButton.addEventListener('mouseleave', () => {
            fallbackButton.style.transform = 'scale(1)';
            fallbackButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        
        document.body.appendChild(fallbackButton);
        console.log('Fallback Skill Development Courses button created');
    }

    openSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize the skill development courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.skillCoursesInstance = new SkillDevelopmentCourses();
});
            
            .btn-watch {
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                flex: 1;
                transition: background 0.3s;
            }
            
            .btn-watch:hover {
                background: #5a6fd8;
            }
            
            .btn-bookmark {
                background: white;
                color: #667eea;
                border: 2px solid #667eea;
                padding: 10px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s;
            }
            
            .btn-bookmark:hover {
                background: #667eea;
                color: white;
            }
            
            /* Video Modal Styles */
            .video-modal-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 1100;
            }
            
            .video-modal {
                background: white;
                width: 90%;
                max-width: 900px;
                margin: 3% auto;
                border-radius: 12px;
                overflow: hidden;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .video-modal-header {
                background: #333;
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .video-modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
            }
            
            .video-modal-content {
                padding: 20px;
            }
            
            .video-container {
                position: relative;
                width: 100%;
                height: 0;
                padding-bottom: 56.25%;
                margin-bottom: 20px;
            }
            
            .video-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 8px;
            }
            
            .video-course-info h4 {
                margin: 0 0 10px 0;
                color: #333;
            }
            
            .video-course-info p {
                color: #666;
                line-height: 1.6;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .skill-courses-modal {
                    width: 98%;
                    margin: 1% auto;
                    max-height: 95vh;
                }
                
                .courses-grid {
                    grid-template-columns: 1fr;
                }
                
                .courses-filter {
                    justify-content: center;
                }
                
                .course-actions {
                    flex-direction: column;
                }
                
                .video-modal {
                    width: 95%;
                    margin: 2% auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Close modal events
        document.addEventListener('click', (e) => {
            if (e.target.id === 'skill-courses-close' || e.target.id === 'skill-courses-overlay') {
                this.closeSkillCoursesModal();
            }
            if (e.target.id === 'video-modal-close' || e.target.id === 'video-modal-overlay') {
                this.closeVideoModal();
            }
        });

        // Filter events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.filterCourses(e.target.dataset.category);
                
                // Update active filter
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Video play events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('course-play-btn') || e.target.classList.contains('btn-watch') || e.target.closest('.course-play-btn')) {
                const button = e.target.closest('[data-video-id]') || e.target;
                const videoId = button.dataset.videoId;
                const courseId = button.dataset.courseId;
                this.openVideoModal(videoId, courseId);
            }
        });

        // Bookmark events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-bookmark')) {
                this.toggleBookmark(e.target.dataset.courseId);
            }
        });
    }

    openSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    openVideoModal(videoId, courseId) {
        const course = this.courses.find(c => c.id == courseId);
        const videoContainer = document.getElementById('video-container');
        const courseInfo = document.getElementById('video-course-info');
        
        // Create YouTube iframe
        videoContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    allowfullscreen 
                    allow="autoplay; encrypted-media">
            </iframe>
        `;
        
        // Update course info
        courseInfo.innerHTML = `
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <span class="course-level ${course.level.toLowerCase()}">${course.level}</span>
                <span style="background: #f1f3f4; padding: 4px 12px; border-radius: 15px; font-size: 12px;">
                    ${course.duration}
                </span>
                <span style="background: #f1f3f4; padding: 4px 12px; border-radius: 15px; font-size: 12px;">
                    ${course.category}
                </span>
            </div>
        `;
        
        document.getElementById('video-modal-title').textContent = course.title;
        document.getElementById('video-modal-overlay').style.display = 'block';
    }

    closeVideoModal() {
        document.getElementById('video-modal-overlay').style.display = 'none';
        document.getElementById('video-container').innerHTML = '';
    }

    filterCourses(category) {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    toggleBookmark(courseId) {
        // Simple bookmark functionality - you can enhance this with localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCourses') || '[]');
        const course = this.courses.find(c => c.id == courseId);
        
        if (bookmarks.includes(courseId)) {
            const index = bookmarks.indexOf(courseId);
            bookmarks.splice(index, 1);
            alert(`Removed "${course.title}" from bookmarks`);
        } else {
            bookmarks.push(courseId);
            alert(`Added "${course.title}" to bookmarks`);
        }
        
        localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarks));
    }
}

// Initialize the skill development courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.skillCoursesInstance = new SkillDevelopmentCourses();
});
            z-index: 999998;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            border: 3px solid white;
            animation: pulse 2s infinite;
        `;
        
        // Add pulsing animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        floatingBtn.onclick = () => this.openSkillCoursesModal();
        
        floatingBtn.addEventListener('mouseenter', () => {
            floatingBtn.style.transform = 'scale(1.1)';
            floatingBtn.style.animation = 'none';
        });
        
        floatingBtn.addEventListener('mouseleave', () => {
            floatingBtn.style.transform = 'scale(1)';
            floatingBtn.style.animation = 'pulse 2s infinite';
        });
        
        document.body.appendChild(floatingBtn);
    }

    openSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeSkillCoursesModal() {
        document.getElementById('skill-courses-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    openVideoModal(videoId, courseId) {
        const course = this.courses.find(c => c.id == courseId);
        const videoContainer = document.getElementById('video-container');
        const courseInfo = document.getElementById('video-course-info');
        
        // Create YouTube iframe
        videoContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    allowfullscreen 
                    allow="autoplay; encrypted-media">
            </iframe>
        `;
        
        // Update course info
        courseInfo.innerHTML = `
            <h4>${course.title}</h4>
            <p>${course.description}</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <span class="course-level ${course.level.toLowerCase()}">${course.level}</span>
                <span style="background: #f1f3f4; padding: 4px 12px; border-radius: 15px; font-size: 12px;">
                    ${course.duration}
                </span>
                <span style="background: #f1f3f4; padding: 4px 12px; border-radius: 15px; font-size: 12px;">
                    ${course.category}
                </span>
            </div>
        `;
        
        document.getElementById('video-modal-title').textContent = course.title;
        document.getElementById('video-modal-overlay').style.display = 'block';
    }

    closeVideoModal() {
        document.getElementById('video-modal-overlay').style.display = 'none';
        document.getElementById('video-container').innerHTML = '';
    }

    filterCourses(category) {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    toggleBookmark(courseId) {
        // Simple bookmark functionality - you can enhance this with localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCourses') || '[]');
        const course = this.courses.find(c => c.id == courseId);
        
        if (bookmarks.includes(courseId)) {
            const index = bookmarks.indexOf(courseId);
            bookmarks.splice(index, 1);
            alert(`Removed "${course.title}" from bookmarks`);
        } else {
            bookmarks.push(courseId);
            alert(`Added "${course.title}" to bookmarks`);
        }
        
        localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarks));
    }
}

// Initialize the skill development courses when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SkillDevelopmentCourses();
});
