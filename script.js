// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initChatSimulation();
    initTabSwitching();
    initSmoothScrolling();
    initScrollAnimations();
    initCTAButtons();
});

// Chat Simulation
function initChatSimulation() {
    const chatMessages = document.getElementById('chatMessages');
    
    const conversation = [
        {
            type: 'bot',
            message: "Hi! I'm the Jobnix AI Assistant. I'm here to help streamline your application process. What's your name?",
            delay: 1000
        },
        {
            type: 'user',
            message: "Hi, I'm Sarah Johnson",
            delay: 2500
        },
        {
            type: 'bot',
            message: "Nice to meet you, Sarah! I see you're applying for the Senior Marketing Manager position. Can you tell me about your experience in digital marketing?",
            delay: 4000
        },
        {
            type: 'user',
            message: "I have 8 years of experience in digital marketing, specializing in content strategy and social media campaigns.",
            delay: 6500
        },
        {
            type: 'bot',
            message: "That's great! Could you please upload your CV? I'll extract the relevant information and ask you some specific questions about your qualifications.",
            delay: 8500
        },
        {
            type: 'user',
            message: "📄 CV_Sarah_Johnson.pdf uploaded",
            delay: 10000
        },
        {
            type: 'bot',
            message: "Perfect! I've analyzed your CV. I notice you have experience with Google Analytics and Facebook Ads. Have you worked with programmatic advertising platforms?",
            delay: 12000
        },
        {
            type: 'user',
            message: "Yes, I've worked extensively with DV360 and The Trade Desk for programmatic campaigns.",
            delay: 14500
        },
        {
            type: 'bot',
            message: "Excellent! One more question - this role requires managing a team of 5+ people. Can you share your leadership experience?",
            delay: 16500
        },
        {
            type: 'user',
            message: "I currently manage a team of 7 marketing specialists and have been doing so for the past 3 years.",
            delay: 18500
        },
        {
            type: 'bot',
            message: "Thank you, Sarah! I've gathered all the necessary information. Your profile has been compiled and sent to the HR team. They'll review it within 24 hours. Good luck! 🎉",
            delay: 20500
        }
    ];
    
    let messageIndex = 0;
    
    function addMessage() {
        if (messageIndex >= conversation.length) {
            // Restart the conversation after a delay
            setTimeout(() => {
                chatMessages.innerHTML = '';
                messageIndex = 0;
                addMessage();
            }, 5000);
            return;
        }
        
        const msg = conversation[messageIndex];
        
        setTimeout(() => {
            // Show typing indicator for bot messages
            if (msg.type === 'bot') {
                showTypingIndicator();
                
                setTimeout(() => {
                    hideTypingIndicator();
                    displayMessage(msg.type, msg.message);
                    messageIndex++;
                    addMessage();
                }, 1500);
            } else {
                displayMessage(msg.type, msg.message);
                messageIndex++;
                addMessage();
            }
        }, msg.delay);
    }
    
    function displayMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = message;
        
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        const typing = chatMessages.querySelector('.typing');
        if (typing) {
            typing.remove();
        }
    }
    
    // Start the conversation
    addMessage();
}

// Tab Switching for Customer Types
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.pain-card, .benefit-card, .step, .customer-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// CTA Button Functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('Demo') || buttonText.includes('demo')) {
                showDemoModal();
            } else if (buttonText.includes('Features') || buttonText.includes('Learn More')) {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            } else if (buttonText.includes('Action')) {
                // Scroll to features section for "See It In Action"
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Demo Modal
function showDemoModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideInUp 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="margin-bottom: 20px;">
            <i class="fas fa-rocket" style="font-size: 3rem; color: #2563eb; margin-bottom: 20px;"></i>
            <h2 style="margin-bottom: 10px; color: #1e293b;">Request Your Demo</h2>
            <p style="color: #64748b; margin-bottom: 30px;">See how Jobnix can transform your hiring process. Fill out the form below and we'll get back to you within 24 hours.</p>
        </div>
        <form style="text-align: left;">
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Company Name</label>
                <input type="text" placeholder="Your Company" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Your Name</label>
                <input type="text" placeholder="John Doe" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Email</label>
                <input type="email" placeholder="john@company.com" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
            </div>
            <div style="margin-bottom: 30px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600; color: #374151;">Company Size</label>
                <select style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-1000 employees</option>
                    <option>1000+ employees</option>
                </select>
            </div>
            <div style="display: flex; gap: 10px;">
                <button type="submit" style="flex: 1; padding: 12px 24px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Request Demo</button>
                <button type="button" class="close-modal" style="padding: 12px 24px; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Cancel</button>
            </div>
        </form>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Close modal functionality
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Form submission
    modal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = modal.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            modal.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981; margin-bottom: 20px;"></i>
                    <h2 style="margin-bottom: 10px; color: #1e293b;">Demo Requested!</h2>
                    <p style="color: #64748b; margin-bottom: 30px;">Thank you for your interest in Jobnix. Our team will contact you within 24 hours to schedule your personalized demo.</p>
                    <button class="close-modal" style="padding: 12px 24px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Close</button>
                </div>
            `;
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
        }, 2000);
    });
    
    function closeModal() {
        overlay.style.animation = 'fadeOut 0.3s ease';
        modal.style.animation = 'slideOutDown 0.3s ease';
        
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }, 300);
    }
    
    // Add fadeOut animation
    style.textContent += `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(30px);
            }
        }
    `;
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effects to cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.pain-card, .benefit-card')) {
        const card = e.target.closest('.pain-card, .benefit-card');
        card.style.transform = 'translateY(-8px)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.pain-card, .benefit-card')) {
        const card = e.target.closest('.pain-card, .benefit-card');
        card.style.transform = 'translateY(0)';
    }
});

// Add a subtle parallax effect to the hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}
