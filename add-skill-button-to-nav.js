(function() {
    'use strict';
    
    function addSkillButtonToNav() {
        // Find the navigation container
        const nav = document.querySelector('nav') || document.querySelector('.nav') || document.querySelector('header nav');
        
        if (!nav) {
            console.log('Navigation not found, trying alternative approach...');
            addSkillButtonAlternative();
            return;
        }
        
        // Find the "Scholarships" link
        const navLinks = nav.querySelectorAll('a');
        let scholarshipsLink = null;
        
        for (const link of navLinks) {
            if (link.textContent.trim().toLowerCase().includes('scholarship')) {
                scholarshipsLink = link;
                break;
            }
        }
        
        if (scholarshipsLink) {
            // Create the skill courses link
            const skillLink = document.createElement('a');
            skillLink.href = '#skill-courses';
            skillLink.textContent = 'Skill Courses';
            
            // Copy styles from scholarships link
            const scholarshipStyles = window.getComputedStyle(scholarshipsLink);
            skillLink.style.cssText = `
                color: ${scholarshipStyles.color};
                text-decoration: ${scholarshipStyles.textDecoration};
                font-size: ${scholarshipStyles.fontSize};
                font-weight: ${scholarshipStyles.fontWeight};
                font-family: ${scholarshipStyles.fontFamily};
                padding: ${scholarshipStyles.padding};
                margin: ${scholarshipStyles.margin};
                display: ${scholarshipStyles.display};
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            // Add hover effect
            skillLink.addEventListener('mouseenter', function() {
                this.style.color = '#667eea';
                this.style.transform = 'translateY(-2px)';
            });
            
            skillLink.addEventListener('mouseleave', function() {
                this.style.color = scholarshipStyles.color;
                this.style.transform = 'translateY(0)';
            });
            
            // Add click handler
            skillLink.addEventListener('click', function(e) {
                e.preventDefault();
                openSkillCoursesModal();
            });
            
            // Insert after scholarships link
            scholarshipsLink.parentNode.insertBefore(skillLink, scholarshipsLink.nextSibling);
            
            console.log('Skill Courses link added to navigation successfully!');
        } else {
            console.log('Scholarships link not found, trying alternative approach...');
            addSkillButtonAlternative();
        }
    }
    
    function addSkillButtonAlternative() {
        // Try to add to the button area (Student Login, Staff Login, University Module)
        const buttonContainer = document.querySelector('.login-buttons') || 
                               document.querySelector('.main-buttons') ||
                               document.querySelector('[class*="button"]')?.parentElement;
        
        if (buttonContainer) {
            const skillButton = document.createElement('button');
            skillButton.innerHTML = '🎯 Skill Courses';
            skillButton.style.cssText = `
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                margin: 0 10px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            `;
            
            skillButton.addEventListener('click', openSkillCoursesModal);
            skillButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
            });
            skillButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
            });
            
            buttonContainer.appendChild(skillButton);
            console.log('Skill Courses button added to button container!');
        } else {
            // Fallback: create a prominent button
            createFallbackButton();
        }
    }
    
    function createFallbackButton() {
        const fallbackButton = document.createElement('div');
        fallbackButton.innerHTML = '🎯 Skill Courses';
        fallbackButton.style.cssText = `
            position: fixed;
            top: 50px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 999999;
            transition: all 0.3s ease;
            border: 2px solid white;
        `;
        
        fallbackButton.addEventListener('click', openSkillCoursesModal);
        fallbackButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        });
        fallbackButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        
        document.body.appendChild(fallbackButton);
        console.log('Fallback Skill Courses button created!');
    }
    
    function openSkillCoursesModal() {
        // Try to open the skill courses modal
        if (window.skillCoursesInstance && window.skillCoursesInstance.openSkillCoursesModal) {
            window.skillCoursesInstance.openSkillCoursesModal();
        } else if (window.SkillDevelopmentCourses) {
            const instance = new window.SkillDevelopmentCourses();
            instance.openSkillCoursesModal();
        } else {
            // If modal not available, create a simple alert for now
            alert('Skill Development Courses feature is loading. Please ensure skill-development-courses.js is included in your HTML.');
        }
    }
    
    // Wait for DOM and try multiple times
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSkillButtonToNav);
    } else {
        addSkillButtonToNav();
    }
    
    // Also try after a delay to ensure all elements are loaded
    setTimeout(addSkillButtonToNav, 500);
    setTimeout(addSkillButtonToNav, 1500);
    
})();
