// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {    // Initialize all functionality
    initMobileNavigation();
    initChatSimulation();
    initWorkflowAnimation();
    initTabSwitching();
    initSmoothScrolling();
    initScrollAnimations();
    initCTAButtons();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Chat Simulation
function initChatSimulation() {
    const chatMessages = document.getElementById('chatMessages');
    
    const conversation = [
        {
            type: 'bot',
            message: "Hi! I'm the EmployCase AI Assistant. I'm here to help streamline your application process. What's your name?",
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
        },        {
            type: 'bot',
            message: "That's great! Could you please upload your CV? I'll extract the relevant information and ask you some specific questions about your qualifications.",
            delay: 8500,
            showDropbox: true
        },        {
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
                    
                    // Show dropbox if this message requires it
                    if (msg.showDropbox) {
                        showDropbox();
                    } else {
                        messageIndex++;
                        addMessage();
                    }
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
    }    // Start the conversation
    addMessage();
    
    // Dropbox functionality
    function showDropbox() {
        const dropboxContainer = document.getElementById('dropboxContainer');
        const dropbox = document.getElementById('dropbox');
        
        dropboxContainer.style.display = 'block';
        
        // Simulate automatic file drop after 3 seconds
        setTimeout(() => {
            simulateFileUpload();
        }, 3000);
        
        // Add click and drag event listeners for interactivity
        dropbox.addEventListener('click', simulateFileUpload);
        dropbox.addEventListener('dragover', handleDragOver);
        dropbox.addEventListener('dragleave', handleDragLeave);
        dropbox.addEventListener('drop', handleDrop);
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        document.getElementById('dropbox').classList.add('dragover');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('dropbox').classList.remove('dragover');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        document.getElementById('dropbox').classList.remove('dragover');
        simulateFileUpload();
    }
    
    function simulateFileUpload() {
        const dropboxContent = document.querySelector('.dropbox-content');
        const uploadProgress = document.getElementById('uploadProgress');
        const uploadSuccess = document.getElementById('uploadSuccess');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        // Hide dropbox content and show progress
        dropboxContent.style.display = 'none';
        uploadProgress.style.display = 'block';
        
        // Animate progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random increment between 5-20
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Show success state
                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                    uploadSuccess.style.display = 'flex';
                    
                    // Hide dropbox and continue conversation after success
                    setTimeout(() => {
                        document.getElementById('dropboxContainer').style.display = 'none';
                        messageIndex++;
                        addMessage();
                    }, 2000);
                }, 500);
            }
            
            progressFill.style.width = progress + '%';
            progressText.textContent = `Uploading... ${Math.floor(progress)}%`;
            
            // Add pulse animation during upload
            if (progress < 100) {
                progressFill.style.animation = 'uploadPulse 1s ease-in-out infinite';
            } else {
                progressFill.style.animation = 'none';
            }
        }, 200);
    }
}

// Workflow Animation
function initWorkflowAnimation() {
    const workflowSection = document.querySelector('.workflow-animation');
    const stepButtons = document.querySelectorAll('.step-button');
    const playButton = document.getElementById('playWorkflow');
    const pauseButton = document.getElementById('pauseWorkflow');
    const resetButton = document.getElementById('resetWorkflow');
    
    let currentStep = -1;
    let isPlaying = false;
    let isScrollControlled = true;
    let animationTimeouts = [];
    let scrollTimeout = null; // Add throttling for scroll events
    
    // Ensure all steps are visible on load
    const ensureStepsVisible = () => {
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach(step => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0) scale(1)';
        });
    };
    
    // Set up scroll-based animation
    const setupScrollAnimation = () => {
        if (!workflowSection) return;
        
        // Ensure steps are visible on load
        ensureStepsVisible();
        
        window.addEventListener('scroll', handleScrollThrottled);
        handleScroll(); // Initial check
    };    
    // Throttled scroll handler for better performance
    const handleScrollThrottled = () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 10); // Small delay to throttle scroll events
    };

    const handleScroll = () => {
        if (!isScrollControlled) return;
        
        const rect = workflowSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        const windowCenter = (windowHeight / 2);
        
        // Show/hide scroll progress indicator
        const progressIndicator = document.getElementById('scrollProgress');
        if (progressIndicator) {
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                progressIndicator.classList.add('visible');
            } else {
                progressIndicator.classList.remove('visible');
            }
        }
        
        // Ensure all steps are visible when section is in view
        const workflowSteps = document.querySelectorAll('.workflow-step');
        if (rect.bottom > 0 && rect.top < windowHeight) {
            // Section is in view - make sure all steps are visible
            workflowSteps.forEach(step => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0) scale(1)';
            });
            
            // Calculate which step should be highlighted based on scroll position
            const scrollProgress = Math.max(0, Math.min(1, (windowCenter - rect.top) / sectionHeight));
            
            let newStep;
            if (scrollProgress <= 0.2) {
                newStep = 0;
            } else if (scrollProgress <= 0.4) {
                newStep = 1;
            } else if (scrollProgress <= 0.6) {
                newStep = 2;
            } else if (scrollProgress <= 0.8) {
                newStep = 3;
            } else {
                newStep = 4;
            }
            
            // Only update if step has changed
            if (newStep !== currentStep) {
                currentStep = newStep;
                updateTimelineProgress();
                updateStepButtons();
                updateScrollProgress();
                highlightCurrentStep(currentStep);
            }
        }
    };
    
    setupScrollAnimation();    
    // Step button functionality
    stepButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            isScrollControlled = false; // Disable scroll control when manually navigating
            goToStep(index);
            
            // Re-enable scroll control after a delay
            setTimeout(() => {
                isScrollControlled = true;
            }, 2000);
        });
    });
    
    // Playback controls
    if (playButton) {
        playButton.addEventListener('click', () => {
            isScrollControlled = false; // Switch to time-based animation
            playWorkflowAnimation();
        });
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            pauseWorkflowAnimation();
            isScrollControlled = true; // Return to scroll-based control
        });
    }
    
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            resetWorkflowAnimation();
            isScrollControlled = true; // Return to scroll-based control
        });
    }    
    function playWorkflowAnimation() {
        if (isPlaying) return;
        
        isPlaying = true;
        updatePlaybackControls();
          // Start from current step or beginning
        if (currentStep >= 5) {
            currentStep = 0;
            resetWorkflowAnimation();
        }
        
        playStep(currentStep);
    }
      function playStep(stepIndex) {
        if (stepIndex >= 5) {
            isPlaying = false;
            updatePlaybackControls();
            isScrollControlled = true; // Return to scroll control when done
            return;
        }
        
        currentStep = stepIndex;
        updateTimelineProgress();
        updateStepButtons();
        showScene(stepIndex);
        
        // Auto-advance to next step after delay (only in manual playback mode)
        if (!isScrollControlled) {
            const timeout = setTimeout(() => {
                if (isPlaying) {
                    playStep(stepIndex + 1);
                }
            }, 4000);
            
            animationTimeouts.push(timeout);
        }
    }
      function goToStep(stepIndex) {
        currentStep = stepIndex;
        updateTimelineProgress();
        updateStepButtons();
        updateScrollProgress();
        showScene(stepIndex);
    }
    function pauseWorkflowAnimation() {
        isPlaying = false;
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];
        updatePlaybackControls();
    }
      function resetWorkflowAnimation() {
        pauseWorkflowAnimation();
        currentStep = 0;
        updateTimelineProgress();
        updateStepButtons();
        updateScrollProgress();
          // Keep all workflow steps visible, just remove active state
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach(step => {
            step.classList.remove('active');
            // Ensure steps remain visible
            step.style.opacity = '1';
            step.style.transform = 'translateY(0) scale(1)';
        });
        
        // Clear dynamic content
        clearSceneContent();
        updatePlaybackControls();
        
        // Scroll to top of workflow section to reset scroll position
        if (workflowSection) {
            workflowSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }      function updateTimelineProgress() {
        const progressFill = document.querySelector('.timeline-fill');
        const markers = document.querySelectorAll('.timeline-marker');
        
        if (progressFill) {
            // Calculate smooth progress based on current step and scroll position
            const rect = workflowSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;
            const windowCenter = windowHeight / 2;
            
            if (rect.bottom > 0 && rect.top < windowHeight) {
                // Section is in view, calculate precise progress
                const scrollProgress = Math.max(0, Math.min(1, (windowCenter - rect.top) / sectionHeight));
                const progress = scrollProgress * 100;
                progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;            } else {
                // Section is out of view
                const progress = (currentStep / 4) * 100;
                progressFill.style.width = `${progress}%`;
            }
        }
        
        // Update marker states
        markers.forEach((marker, index) => {
            if (index <= currentStep) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    function updateStepButtons() {
        stepButtons.forEach((button, index) => {
            if (index === currentStep) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    function updatePlaybackControls() {
        if (playButton) playButton.style.display = isPlaying ? 'none' : 'flex';
        if (pauseButton) pauseButton.style.display = isPlaying ? 'flex' : 'none';
    }
    
    function updateScrollProgress() {
        const progressDots = document.querySelectorAll('.progress-dot');
        progressDots.forEach((dot, index) => {
            if (index === currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    function highlightCurrentStep(stepIndex) {
        // Keep all steps visible but highlight the current one
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach((step, index) => {
            step.classList.remove('active');
            if (index === stepIndex) {
                step.classList.add('active');
            }
        });
        
        // Start step-specific animations for the active step
        const targetStep = document.getElementById(`step${stepIndex + 1}`);
        if (targetStep) {
            switch(stepIndex) {
                case 0:
                    animateEngagementStep();
                    break;
                case 1:
                    animateExtractionStep();
                    break;
                case 2:
                    animateAnalysisStep();
                    break;
                case 3:
                    animateRankingStep();
                    break;
                case 4:
                    animateResultsStep();
                    break;
            }
        }
    }
    
    function showScene(stepIndex) {
        // Keep all workflow steps visible, just highlight the current one
        highlightCurrentStep(stepIndex);
    }
      function animateEngagementStep() {
        const chatArea = document.querySelector('#step1 .chat-area');
        if (!chatArea) return;
        
        // Clear previous messages
        chatArea.innerHTML = '';
        
        const messages = [
            { type: 'bot', text: 'Welcome! I\'m here to help with your application process.' },
            { type: 'user', text: 'Hi! I\'m interested in the Senior Developer position.' },
            { type: 'bot', text: 'Great! Please upload your CV and I\'ll analyze it for you.' }
        ];
        
        messages.forEach((msg, index) => {
            setTimeout(() => {
                const messageEl = document.createElement('div');
                messageEl.className = `chat-message ${msg.type}`;
                messageEl.textContent = msg.text;
                chatArea.appendChild(messageEl);
                chatArea.scrollTop = chatArea.scrollHeight;
            }, index * 1000);
        });
        
        // Show upload after messages
        setTimeout(() => {
            const uploadZone = document.querySelector('#step1 .upload-zone');
            if (uploadZone) {
                uploadZone.style.display = 'block';
                startUploadAnimation('#step1');
            }
        }, 3500);
    }
    
    function startUploadAnimation(stepSelector) {
        const progressFill = document.querySelector(`${stepSelector} .progress-fill`);
        if (progressFill) {
            progressFill.style.animation = 'progressFillMini 2s ease-out forwards';
        }
    }
    
    function animateExtractionStep() {
        // Animate the data transformation
        const cvLines = document.querySelectorAll('#step2 .cv-line');
        const dataFields = document.querySelectorAll('#step2 .data-field');
        
        // Reset and animate CV lines
        cvLines.forEach((line, index) => {
            line.style.animation = 'none';
            setTimeout(() => {
                line.style.animation = 'shimmer 1.5s ease-in-out infinite';
            }, index * 100);
        });
        
        // Animate data fields appearing
        dataFields.forEach((field, index) => {
            field.style.opacity = '0';
            field.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                field.style.transition = 'all 0.5s ease-out';
                field.style.opacity = '1';
                field.style.transform = 'translateX(0)';
            }, 1000 + (index * 200));
        });
        
        // Animate processing indicator
        const processingDots = document.querySelectorAll('#step2 .processing-dots span');
        processingDots.forEach((dot, index) => {
            dot.style.animation = `processingDot 1.5s ease-in-out infinite`;
            dot.style.animationDelay = `${index * 0.3}s`;
        });
    }
    
    function animateAnalysisStep() {
        // Animate neural network nodes
        const nodes = document.querySelectorAll('#step3 .neural-node');
        nodes.forEach((node, index) => {
            node.style.animation = 'none';
            setTimeout(() => {
                node.style.animation = 'nodeActivate 3s ease-in-out infinite';
            }, index * 300);
        });
        
        // Animate brain core
        const brainCore = document.querySelector('#step3 .brain-core');
        if (brainCore) {
            brainCore.style.animation = 'brainPulse 2s ease-in-out infinite';
        }
        
        // Animate metrics
        const metrics = document.querySelectorAll('#step3 .metric-item');
        metrics.forEach((metric, index) => {
            const metricFill = metric.querySelector('.metric-fill');
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(20px)';
            setTimeout(() => {
                metric.style.transition = 'all 0.6s ease-out';
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
                
                // Animate the progress bar
                if (metricFill) {
                    const percent = metricFill.getAttribute('data-percent');
                    setTimeout(() => {
                        metricFill.style.transform = `scaleX(${percent / 100})`;
                    }, 300);
                }
            }, 500 + (index * 150));
        });
    }
    
    function animateRankingStep() {
        // Animate kanban columns
        const kanbanColumns = document.querySelectorAll('#step4 .kanban-column');
        kanbanColumns.forEach((column, index) => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(20px)';
            setTimeout(() => {
                column.style.transition = 'all 0.6s ease-out';
                column.style.opacity = '1';
                column.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Animate candidate cards
        setTimeout(() => {
            const candidateCards = document.querySelectorAll('#step4 .candidate-card');
            candidateCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 100);
            });
        }, 600);
        
        // Add subtle hover effects
        setTimeout(() => {
            const cards = document.querySelectorAll('#step4 .candidate-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                });
            });
        }, 1000);
    }
    
    function animateResultsStep() {
        // Animate success icon
        const successIcon = document.querySelector('#step5 .success-icon');
        if (successIcon) {
            successIcon.style.animation = 'successPop 1s ease-out forwards';
        }
        
        // Animate summary stats
        const summaryStats = document.querySelectorAll('#step5 .summary-stats .stat-item');
        summaryStats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px) scale(0.9)';
            setTimeout(() => {
                stat.style.transition = 'all 0.8s ease-out';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0) scale(1)';
            }, 300 + (index * 200));
        });
        
        // Animate impact metrics
        const impactItems = document.querySelectorAll('#step5 .impact-item');
        impactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 1200 + (index * 150));
        });
        
        // Animate CTA button
        const ctaButton = document.querySelector('#step5 .cta-button');
        if (ctaButton) {
            ctaButton.style.opacity = '0';
            ctaButton.style.transform = 'translateY(20px)';
            setTimeout(() => {
                ctaButton.style.transition = 'all 0.8s ease-out';
                ctaButton.style.opacity = '1';
                ctaButton.style.transform = 'translateY(0)';
                ctaButton.style.animation = 'ctaPulse 2s ease-in-out infinite';
            }, 2000);
        }
    }
      function clearSceneContent() {
        // Reset all animations and content
        const chatArea = document.querySelector('#step1 .chat-area');
        if (chatArea) chatArea.innerHTML = '';
        
        const uploadZone = document.querySelector('#step1 .upload-zone');
        if (uploadZone) uploadZone.style.display = 'none';
        
        const progressFill = document.querySelector('#step1 .progress-fill');
        if (progressFill) {
            progressFill.style.animation = 'none';
            progressFill.style.width = '0%';
        }
        
        // Reset all workflow steps
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach(step => {
            step.classList.remove('active');
        });
    }
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
    <iframe class="airtable-embed" src="https://airtable.com/embed/appwNHbSZ3J4G9oE0/pagtkK4djKlZfeKLL/form" frameborder="0" onmousewheel="" width="100%" height="700" style="background: transparent; border: 1px solid #ccc;"></iframe>
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
                    <p style="color: #64748b; margin-bottom: 30px;">Thank you for your interest in EmployCase. Our team will contact you within 24 hours to schedule your personalized demo.</p>
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
