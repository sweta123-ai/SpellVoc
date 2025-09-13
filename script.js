// DOM Elements
const userIcon = document.getElementById('userIcon');
const authSlide = document.getElementById('authSlide');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Authentication Slide Toggle
userIcon.addEventListener('click', () => {
    authSlide.classList.toggle('active');
});

// Close auth slide when clicking outside
document.addEventListener('click', (e) => {
    if (!authSlide.contains(e.target) && !userIcon.contains(e.target)) {
        authSlide.classList.remove('active');
    }
});

// Form Switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
            // Reset forms when switching
            form.reset();
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding form with a small delay to ensure smooth transition
        setTimeout(() => {
            const formType = tab.getAttribute('data-form');
            if (formType === 'login') {
                loginForm.classList.add('active');
            } else if (formType === 'register') {
                registerForm.classList.add('active');
            }
        }, 100);
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = document.getElementById('loginUserId').value;
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!userId || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Login attempt:', { userId, password });
    
    // For demo purposes, show success message
    alert('Login successful! (This is a demo)');
    
    // Clear form
    loginForm.reset();
});

// Add loading state to forms
function setLoadingState(form, isLoading) {
    const submitBtn = form.querySelector('.auth-submit');
    if (isLoading) {
        submitBtn.textContent = 'Loading...';
        submitBtn.disabled = true;
    } else {
        submitBtn.textContent = submitBtn.textContent === 'Loading...' ? 
            (form === loginForm ? 'Login' : 'Register') : 
            submitBtn.textContent;
        submitBtn.disabled = false;
    }
}

// Enhanced form submission with loading states
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    setLoadingState(loginForm, true);
    
    // Simulate API call
    setTimeout(() => {
        setLoadingState(loginForm, false);
        alert('Login successful! (This is a demo)');
        loginForm.reset();
    }, 1500);
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check if form is valid before submission
    if (!isRegisterFormValid()) {
        // Show specific error messages for missing fields
        const fullName = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const category = document.getElementById('registerCategory').value;
        const mode = document.getElementById('registerMode').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Show errors for empty required fields
        if (!fullName) showFieldError('registerName', 'Full Name is required');
        if (!email) showFieldError('registerEmail', 'Email is required');
        if (!phone) showFieldError('registerPhone', 'Phone Number is required');
        if (!category) showFieldError('registerCategory', 'Category is required');
        if (!mode) showFieldError('registerMode', 'Mode of Learning is required');
        if (!password) showFieldError('registerPassword', 'Password is required');
        if (!confirmPassword) showFieldError('confirmPassword', 'Confirm Password is required');
        
        return;
    }
    
    const fullName = document.getElementById('registerName').value;
    const message = document.getElementById('registerMessage').value;
    
    setLoadingState(registerForm, true);
    
    // Simulate API call
    setTimeout(() => {
        setLoadingState(registerForm, false);
        alert('Registration successful! Welcome to SpellVoc, ' + fullName + '!');
        registerForm.reset();
        // Clear all error messages
        clearAllErrors();
    }, 1500);
});

// Password Visibility Toggle
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('password-toggle') || e.target.closest('.password-toggle')) {
        const button = e.target.classList.contains('password-toggle') ? e.target : e.target.closest('.password-toggle');
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }
});

// Password Validation Functions
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const errors = [];
    
    if (password.length < minLength) {
        errors.push(`At least ${minLength} characters`);
    }
    if (!hasUpperCase) {
        errors.push('One uppercase letter');
    }
    if (!hasLowerCase) {
        errors.push('One lowercase letter');
    }
    if (!hasNumbers) {
        errors.push('One number');
    }
    if (!hasSpecialChar) {
        errors.push('One special character (!@#$%^&*)');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function showPasswordError(inputId, message) {
    const input = document.getElementById(inputId);
    const label = input.previousElementSibling;
    
    // Remove existing error message
    const existingError = label.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
    
    if (message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.style.marginLeft = '-15px';
        label.parentNode.insertBefore(errorDiv, input);
    }
}

function clearPasswordError(inputId) {
    const input = document.getElementById(inputId);
    const label = input.previousElementSibling;
    const existingError = label.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}

function showFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    const label = input.previousElementSibling;
    
    // Remove existing error message
    const existingError = label.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
    
    if (message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.style.marginLeft = '-15px';
        label.parentNode.insertBefore(errorDiv, input);
    }
}

function clearFieldError(inputId) {
    const input = document.getElementById(inputId);
    const label = input.previousElementSibling;
    const existingError = label.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
}

// Clear field errors when user starts typing
document.addEventListener('input', (e) => {
    const targetId = e.target.id;
    
    // Clear field errors when user starts typing (except password fields)
    if (targetId === 'registerName' || targetId === 'registerEmail' || 
        targetId === 'registerPhone' || targetId === 'registerCategory' || 
        targetId === 'registerMode') {
        clearFieldError(targetId);
    }
});

// Password validation on blur (when user leaves the field)
document.addEventListener('blur', (e) => {
    const targetId = e.target.id;
    
    // Validate password when user leaves password field
    if (targetId === 'registerPassword') {
        const password = e.target.value;
        if (password.length > 0) {
            const validation = validatePassword(password);
            if (!validation.isValid) {
                showPasswordError('registerPassword', `Password must contain: ${validation.errors.join(', ')}`);
            } else {
                clearPasswordError('registerPassword');
            }
        } else {
            clearPasswordError('registerPassword');
        }
    }
    
    // Check password matching when user leaves confirm password field
    if (targetId === 'confirmPassword') {
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = e.target.value;
        
        if (confirmPassword.length > 0 && password !== confirmPassword) {
            showPasswordError('confirmPassword', 'Passwords do not match');
        } else if (confirmPassword.length > 0 && password === confirmPassword) {
            clearPasswordError('confirmPassword');
        }
    }
}, true);

// Check if form is valid before submission
function isRegisterFormValid() {
    const fullName = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const category = document.getElementById('registerCategory').value;
    const mode = document.getElementById('registerMode').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Check required fields
    if (!fullName || !email || !phone || !category || !mode || !password || !confirmPassword) {
        return false;
    }
    
    // Check password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        return false;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        return false;
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Check phone format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return false;
    }
    
    return true;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close auth slide on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        authSlide.classList.remove('active');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect to sections
    const sections = document.querySelectorAll('section');
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
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Contact Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const getTouchBtn = document.getElementById('getTouchBtn');
    const contactFormWrapper = document.getElementById('contactFormWrapper');
    const contactForm = document.getElementById('contactForm');

    // Show form below button
    getTouchBtn.addEventListener('click', function() {
        contactFormWrapper.classList.toggle('active');
    });

    // Handle submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        contactFormWrapper.classList.remove('active');
    });
});

// Initialize particles.js background
window.addEventListener('DOMContentLoaded', function() {
    if (window.particlesJS && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.8, random: false },
                size: { value: 4, random: true },
                line_linked: { enable: true, distance: 140, color: '#ffffff', opacity: 0.8, width: 1 },
                move: { enable: true, speed: 2.2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.3 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
});

// Free Trial Flow
(function() {
    const ctaButton = document.querySelector('.cta-button');
    const modal = document.getElementById('trialModal');
    const backdrop = document.getElementById('trialBackdrop');
    const closeBtn = document.getElementById('trialClose');
    const form = document.getElementById('trialForm');
    const unlockedBanner = document.getElementById('trialUnlocked');

    function isTrialUnlocked() {
        return localStorage.getItem('spellvoc_trial_unlocked') === '1';
    }

    function setTrialUnlocked() {
        localStorage.setItem('spellvoc_trial_unlocked', '1');
        unlockedBanner.classList.add('active');
        setTimeout(() => unlockedBanner.classList.remove('active'), 3000);
        updateCourseButtons();
    }

    function openModal(prefillCourse) {
        const selectEl = document.getElementById('trialCourseSelect');
        const inputEl = document.getElementById('trialCourseInput');
        if (prefillCourse) {
            // Show read-only input with prefilled course
            inputEl.value = prefillCourse;
            inputEl.style.display = 'block';
            inputEl.readOnly = true;
            selectEl.style.display = 'none';
            selectEl.required = false;
            inputEl.required = true;
        } else {
            // Show dropdown for Explore path
            selectEl.value = '';
            selectEl.style.display = 'block';
            selectEl.required = true;
            inputEl.value = '';
            inputEl.style.display = 'none';
            inputEl.required = false;
        }
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    function updateCourseButtons() {
        const joinButtons = document.querySelectorAll('.join-btn');
        joinButtons.forEach(btn => {
            if (isTrialUnlocked()) {
                btn.textContent = 'Start Free Trial';
            } else {
                btn.textContent = 'Join Course';
            }
        });
    }

    // Hook CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', () => openModal());
    }

    // Hook course buttons to prefill course and open modal when locked
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.course-card');
            const title = card ? card.querySelector('.course-content h3')?.textContent.trim() : '';
            openModal(title);
        });
    });

    // Close handlers
    backdrop?.addEventListener('click', closeModal);
    closeBtn?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Handle submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('trialName').value.trim();
            const email = document.getElementById('trialEmail').value.trim();
            const phone = document.getElementById('trialPhone').value.trim();
            const selectEl = document.getElementById('trialCourseSelect');
            const inputEl = document.getElementById('trialCourseInput');
            const isInputMode = inputEl.style.display === 'block';
            const course = isInputMode ? inputEl.value : selectEl.value;

            if (!name || !email || !phone || !course) {
                alert('Please fill all fields.');
                return;
            }

            // Basic email/phone checks
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            const phoneRegex = /^[0-9\-\+\s]{7,15}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Simulate registration success
            closeModal();
            setTrialUnlocked();
            if (window.Swal) {
                const msg = isInputMode && course ? `You are registered for the free trial of “${course}”!` : 'You are registered for the free trial!';
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: msg,
                    confirmButtonColor: '#667eea'
                });
            } else {
                alert(isInputMode && course ? `You are registered for the free trial of ${course}!` : 'You are registered for the free trial!');
            }

            // Reset form for next time
            form.reset();
            selectEl.value = '';
            inputEl.value = '';
        });
    }

    // Initialize state
    updateCourseButtons();
})();

// Hook pricing Buy Now buttons
document.querySelectorAll('.pricing-card .signup-btn, .pricing-card .payment-btn, .pricing-card .buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.pricing-card');
        const planName = card?.querySelector('.card-header h3')?.textContent.trim() || 'Selected Plan';
        const priceText = card?.querySelector('.card-header .price')?.textContent.trim() || '';

        const paymentModal = document.getElementById('paymentModal');
        const paymentBackdrop = document.getElementById('paymentBackdrop');
        const paymentClose = document.getElementById('paymentClose');
        const paymentForm = document.getElementById('paymentForm');
        const selectedPlan = document.getElementById('selectedPlan');
        const planPrice = document.getElementById('planPrice');

        selectedPlan.value = planName;
        planPrice.value = priceText;

        function openPayment() {
            paymentModal.classList.add('active');
            paymentModal.setAttribute('aria-hidden', 'false');
        }
        function closePayment() {
            paymentModal.classList.remove('active');
            paymentModal.setAttribute('aria-hidden', 'true');
            try {
                document.getElementById('paymentForm')?.reset();
            } catch (e) {}
        }

        // One-time listeners
        paymentBackdrop?.addEventListener('click', closePayment, { once: true });
        paymentClose?.addEventListener('click', closePayment, { once: true });

        // Submit handler (button click to prevent native form navigation)
        const paymentSubmitBtn = document.getElementById('paymentSubmit');
        if (!paymentSubmitBtn) return;
        // Overwrite any previous handler to avoid duplicates
        paymentSubmitBtn.onclick = function onPay(ev) {
            ev.preventDefault();
            const name = document.getElementById('buyerName').value.trim();
            const email = document.getElementById('buyerEmail').value.trim();
            const phone = document.getElementById('buyerPhone').value.trim();
            const method = document.getElementById('paymentMethod').value;

            if (!name || !email || !phone || !method) {
                alert('Please fill all fields.');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            const phoneRegex = /^[0-9\-\+\s]{7,15}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Real Razorpay checkout if key is configured
            if (window.Razorpay && RAZORPAY_KEY_ID && RAZORPAY_KEY_ID !== 'YOUR_RAZORPAY_TEST_KEY_ID') {
                // Close the modal first as requested
                closePayment();
                const amountNumber = (priceText.replace(/[^0-9]/g,'') ? parseInt(priceText.replace(/[^0-9]/g,''), 10) : 0) * 100;
                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: amountNumber || 19900,
                    currency: 'INR',
                    name: 'SpellVoc',
                    description: `${planName} Purchase`,
                    prefill: { name, email, contact: phone },
                    notes: { plan: planName },
                    theme: { color: '#667eea' },
                    handler: function (response){
                        if (window.Swal) {
                            Swal.fire({ icon: 'success', title: 'Payment Successful', text: `Purchased ${planName}${priceText ? ' (' + priceText + ')' : ''}. Payment id: ${response.razorpay_payment_id}`, confirmButtonColor: '#667eea' });
                        }
                        try { paymentForm.reset(); } catch (e) {}
                    },
                    modal: { ondismiss: function(){ if (window.Swal) { Swal.fire({ icon: 'info', title: 'Payment Cancelled', text: 'You closed the payment window.' }); } try { paymentForm.reset(); } catch (e) {} } }
                };
                options.method = { upi: false, card: false, netbanking: false, wallet: false };
                if (method === 'upi') options.method.upi = true;
                if (method === 'card') options.method.card = true;
                if (method === 'netbanking') options.method.netbanking = true;
                const rzp = new Razorpay(options);
                rzp.open();
            } else {
                // Real payment not configured: show clear message (no test/mock)
                if (window.Swal) {
                    Swal.fire({ icon: 'error', title: 'Payment Not Configured', text: 'Please add your Razorpay TEST key id in script.js to enable real payments.' });
                }
                try { paymentForm.reset(); } catch (e) {}
                closePayment();
            }
        };

        openPayment();
    });
});

function openMockPayment(method, planName, priceText, { onDone } = {}) {
    if (window.Swal) {
        Swal.fire({
            icon: 'info',
            title: 'Test Payment',
            html: `<div style="text-align:left">Method: <b>${method || 'N/A'}</b><br/>Plan: <b>${planName}</b><br/>Amount: <b>${priceText || '—'}</b><br/><br/>This is a demo flow. Replace keys/server to enable real payments.</div>`,
            showCancelButton: true,
            confirmButtonText: 'Simulate Success',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#667eea'
        }).then(res => {
            if (res.isConfirmed) {
                Swal.fire({ icon: 'success', title: 'Payment Successful', text: `Purchased ${planName}${priceText ? ' (' + priceText + ')' : ''}.` });
                if (typeof onDone === 'function') onDone();
            }
        });
    } else {
        alert(`Test Payment for ${planName} ${priceText ? '(' + priceText + ')' : ''}`);
        if (typeof onDone === 'function') onDone();
    }
}

// Payment provider key (set this to your Razorpay TEST key id to enable real checkout)
const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_TEST_KEY_ID';

