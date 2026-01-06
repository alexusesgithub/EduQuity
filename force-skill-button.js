// Force create skill development button regardless of page structure

(function() {
    'use strict';
    
    function createSkillButton() {
        // Remove any existing buttons first
        const existing = document.querySelectorAll('#skill-development-btn, #floating-skill-btn');
        existing.forEach(btn => btn.remove());
        
        // Create main skill button
        const mainButton = document.createElement('button');
        mainButton.id = 'skill-development-btn';
        mainButton.innerHTML = '🎯 Skill Development';
        mainButton.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            border: none !important;
            padding: 12px 20px !important;
            border-radius: 25px !important;
            cursor: pointer !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
            z-index: 999999 !important;
            transition: all 0.3s ease !important;
            border: 2px solid white !important;
            display: block !important;
            visibility: visible !important;
        `;
        
        // Create floating button
        const floatingButton = document.createElement('div');
        floatingButton.id = 'floating-skill-btn';
        floatingButton.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 18px;">🎯</div>
                <div style="font-size: 9px; font-weight: bold; margin-top: 2px;">SKILLS</div>
            </div>
        `;
        floatingButton.style.cssText = `
            position: fixed !important;
            bottom: 80px !important;
            right: 20px !important;
            width: 60px !important;
            height: 60px !important;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
            color: white !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4) !important;
            z-index: 999998 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.3s ease !important;
            border: 2px solid white !important;
            visibility: visible !important;
        `;
        
        // Add click handlers
        function openSkillModal() {
            if (window.skillCoursesInstance) {
                window.skillCoursesInstance.openSkillCoursesModal();
            } else if (window.SkillDevelopmentCourses) {
                new window.SkillDevelopmentCourses().openSkillCoursesModal();
            } else {
                alert('Skill Development Courses will load shortly. Please try again in a moment.');
            }
        }
        
        mainButton.onclick = openSkillModal;
        floatingButton.onclick = openSkillModal;
        
        // Add hover effects
        mainButton.addEventListener('mouseenter', () => {
            mainButton.style.transform = 'scale(1.05)';
            mainButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        });
        
        mainButton.addEventListener('mouseleave', () => {
            mainButton.style.transform = 'scale(1)';
            mainButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        
        floatingButton.addEventListener('mouseenter', () => {
            floatingButton.style.transform = 'scale(1.1)';
        });
        
        floatingButton.addEventListener('mouseleave', () => {
            floatingButton.style.transform = 'scale(1)';
        });
        
        // Append to body
        document.body.appendChild(mainButton);
        document.body.appendChild(floatingButton);
        
        console.log('Skill Development buttons created successfully!');
    }
    
    // Try multiple times to ensure creation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSkillButton);
    } else {
        createSkillButton();
    }
    
    // Also try after a delay
    setTimeout(createSkillButton, 1000);
    setTimeout(createSkillButton, 3000);
    
})();
