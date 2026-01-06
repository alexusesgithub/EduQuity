// Homepage Integration Script for EduEquity AI

document.addEventListener('DOMContentLoaded', function() {
    // Add Skill Development button to navigation or main action area
    addSkillDevelopmentButton();
    
    // Initialize the skill development courses modal
    if (window.SkillDevelopmentCourses) {
        new SkillDevelopmentCourses();
    }
    
    // Add click handler to existing skill courses nav link if it exists
    setTimeout(() => {
        const existingSkillLink = document.getElementById('skill-courses-nav');
        if (existingSkillLink) {
            existingSkillLink.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.skillCoursesInstance) {
                    window.skillCoursesInstance.openSkillCoursesModal();
                }
            });
        }
    }, 1000);
});

function addSkillDevelopmentButton() {
    // Check if skill courses link already exists in navigation
    if (document.getElementById('skill-courses-nav')) {
        console.log('Skill Development Courses link already exists in navigation');
        return;
    }
    
    // Method 1: Try to add to navigation bar
    if (addToNavigation()) return;
    
    // Method 2: Try to add to main button area
    if (addToMainButtons()) return;
    
    // Method 3: Create floating button as fallback
    createFloatingSkillButton();
}

function addToNavigation() {
    // Look for the header navigation
    const header = document.querySelector('header, .header, nav, .nav');
    if (!header) return false;
    
    // Find the scholarships link
    const navLinks = header.querySelectorAll('a');
    let scholarshipsLink = null;
    
    for (const link of navLinks) {
        if (link.textContent.toLowerCase().includes('scholarship')) {
            scholarshipsLink = link;
            break;
        }
    }
    
    if (scholarshipsLink) {
        // Create list item for React navigation structure
        const skillListItem = document.createElement('li');
        const skillLink = document.createElement('a');
        skillLink.href = '#skill-courses';
        skillLink.textContent = 'Skill Development Courses';
        skillLink.id = 'skill-courses-nav';
        skillLink.className = 'nav-link';
        
        // Copy styles from scholarships link
        skillLink.style.cssText = window.getComputedStyle(scholarshipsLink).cssText;
        skillLink.style.cursor = 'pointer';
        
        skillLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.skillCoursesInstance) {
                window.skillCoursesInstance.openSkillCoursesModal();
            }
        });
        
        skillListItem.appendChild(skillLink);
        
        // Insert after scholarships list item
        const scholarshipsListItem = scholarshipsLink.closest('li');
        if (scholarshipsListItem) {
            scholarshipsListItem.parentNode.insertBefore(skillListItem, scholarshipsListItem.nextSibling);
        } else {
            // Fallback: insert after scholarships link directly
            scholarshipsLink.parentNode.insertBefore(skillLink, scholarshipsLink.nextSibling);
        }
        
        console.log('Skill Development Courses link added to navigation');
        return true;
    }
    
    return false;
}

function addToMainButtons() {
    // Look for the main action buttons container
    const buttonSelectors = [
        '.login-buttons',
        '.main-buttons', 
        '.action-buttons',
        '.hero-buttons',
        '[class*="button"]'
    ];
    
    let buttonContainer = null;
    for (const selector of buttonSelectors) {
        buttonContainer = document.querySelector(selector);
        if (buttonContainer) break;
    }
    
    // If no container found, look for existing buttons and use their parent
    if (!buttonContainer) {
        const existingButtons = document.querySelectorAll('button');
        for (const btn of existingButtons) {
            if (btn.textContent.includes('Login') || btn.textContent.includes('Module')) {
                buttonContainer = btn.parentElement;
                break;
            }
        }
    }
    
    if (buttonContainer) {
        const skillButton = document.createElement('button');
        skillButton.id = 'skill-development-btn';
        skillButton.innerHTML = '🎯 Skill Development';
        
        // Try to match existing button styles
        const existingButton = buttonContainer.querySelector('button');
        if (existingButton) {
            skillButton.className = existingButton.className;
            const computedStyle = window.getComputedStyle(existingButton);
            
            // Copy relevant styles
            skillButton.style.cssText = `
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                border: none;
                padding: ${computedStyle.padding};
                border-radius: ${computedStyle.borderRadius};
                font-size: ${computedStyle.fontSize};
                font-weight: ${computedStyle.fontWeight};
                margin: ${computedStyle.margin};
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            `;
        } else {
            // Default styling
            skillButton.style.cssText = `
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                margin: 10px 5px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            `;
        }
        
        skillButton.addEventListener('click', function() {
            if (window.skillCoursesInstance) {
                window.skillCoursesInstance.openSkillCoursesModal();
            }
        });
        
        skillButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.4)';
        });
        
        skillButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.3)';
        });
        
        buttonContainer.appendChild(skillButton);
        return true;
    }
    
    return false;
}

function createFloatingSkillButton() {
    const floatingButton = document.createElement('div');
    floatingButton.id = 'floating-skill-btn';
    floatingButton.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 5px;">🎯</div>
            <div style="font-size: 11px; font-weight: 600;">Skill<br>Courses</div>
        </div>
    `;
    
    floatingButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 70px;
        height: 70px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        border: 3px solid white;
    `;
    
    floatingButton.addEventListener('click', function() {
        if (window.skillCoursesInstance) {
            window.skillCoursesInstance.openSkillCoursesModal();
        }
    });
    
    floatingButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.6)';
    });
    
    floatingButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
    });
    
    document.body.appendChild(floatingButton);
}

// Make the skill courses instance globally available
window.addEventListener('load', function() {
    if (window.SkillDevelopmentCourses && !window.skillCoursesInstance) {
        window.skillCoursesInstance = new SkillDevelopmentCourses();
    }
});
