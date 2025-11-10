// DOM Elements
const userIcon = document.getElementById('userIcon');
const authSlide = document.getElementById('authSlide');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const otpResetForm = document.getElementById('otpResetForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Authentication Slide Toggle
userIcon.addEventListener('click', () => {
    // Close hamburger menu if open
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Toggle auth slide
    authSlide.classList.toggle('active');
    
    // Always show login form by default when opening auth slide
    if (authSlide.classList.contains('active')) {
        // Hide all forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        // Remove active from all tabs
        authTabs.forEach(tab => tab.classList.remove('active'));
        // Show login form and activate login tab
        const loginTab = document.querySelector('[data-form="login"]');
        if (loginTab) {
            loginTab.classList.add('active');
        }
        loginForm.classList.add('active');
    }
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

// Forgot Password Link Handler
document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            // Show forgot password form
            forgotPasswordForm.classList.add('active');
        });
    }

    // Back to Login Links
    const backToLoginLinks = document.querySelectorAll('.back-to-login');
    backToLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide all forms
            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });
            // Show login form and activate login tab
            document.querySelector('[data-form="login"]').classList.add('active');
            loginForm.classList.add('active');
        });
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    // Close auth slide if open
    authSlide.classList.remove('active');
    
    // Toggle hamburger menu
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
        const href = this.getAttribute('href');
        // Ignore bare '#'
        if (!href || href === '#') return;
        e.preventDefault();
        try {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } catch (_) {
            // Invalid selector; ignore
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
document.addEventListener('DOMContentLoaded', function () {
    const getTouchBtn = document.getElementById('getTouchBtn');
    const contactFormWrapper = document.getElementById('contactFormWrapper');
    const contactForm = document.getElementById('contactForm');

    // Show form below button
    getTouchBtn.addEventListener('click', function () {
        contactFormWrapper.classList.toggle('active');
    });

    //Handle submission
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !phone || !subject || !message) {
            if (window.Swal) {
                await Swal.fire({ icon: 'error', title: 'Missing fields', text: 'Please fill in all fields', confirmButtonColor: '#667eea' });
            } else { alert('Please fill in all fields'); }
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (window.Swal) { await Swal.fire({ icon: 'error', title: 'Invalid email', text: 'Please enter a valid email address', confirmButtonColor: '#667eea' }); }
            else { alert('Please enter a valid email address'); }
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            if (window.Swal) { await Swal.fire({ icon: 'error', title: 'Invalid phone', text: 'Please enter a valid 10-digit phone number', confirmButtonColor: '#667eea' }); }
            else { alert('Please enter a valid 10-digit phone number'); }
            return;
        }

        // Send via Web3Forms
        let delivered = false;
        try {
            const out = await sendContactViaWeb3Forms({ name, email, phone, subject, message });
            delivered = !!out.sent;
        } catch (err) {
            delivered = false;
        }

        if (window.Swal) {
            if (delivered) {
                await Swal.fire({ icon: 'success', title: 'Message sent', text: 'Thank you! We will get back to you soon.', confirmButtonColor: '#667eea' });
            } else {
                await Swal.fire({ icon: 'warning', title: 'Message saved', text: 'We could not email automatically. Please verify Web3Forms key or try again later.', confirmButtonColor: '#667eea' });
            }
        } else {
            alert(delivered ? 'Thank you for your message! We will get back to you soon.' : 'Submitted, but email could not be sent automatically.');
        }
        contactForm.reset();
        contactFormWrapper.classList.remove('active');
    });


});

// Initialize particles.js background
window.addEventListener('DOMContentLoaded', function () {
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
(function () {
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
    // Also mirror reservation flow: add pending immediately and try to persist to backend
    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const card = e.target.closest('.course-card');
            const title = card ? card.querySelector('.course-content h3')?.textContent.trim() : '';
            if (title) {
                // Save locally first, then attempt backend
                try { addPendingTrial(title); } catch(_) {}
                try {
                    await apiFetch('/api/trials', { method: 'POST', body: { courseTitle: title } });
                    try { removePendingTrial(title); } catch(_) {}
                } catch (err) {
                    console.warn('[TRIAL][STORE][DEFER]', err?.message);
                }
            }
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

            // Save locally first, then attempt backend like reservations
            try { addPendingTrial(course); } catch(_) {}
            setTimeout(async () => {
                try {
                    await apiFetch('/api/trials', { method: 'POST', body: { courseTitle: course } });
                    try { removePendingTrial(course); } catch(_) {}
                } catch (err) {
                    console.warn('[TRIAL][STORE][DEFER]', err?.message);
                }
            }, 0);

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

// Payment provider key (set this to your Razorpay TEST key id to enable real checkout)
const RAZORPAY_KEY_ID = 'YOUR_RAZORPAY_TEST_KEY_ID';

// EmailJS configuration (set your own public key and service/template ids to enable email)
const EMAILJS_PUBLIC_KEY = '6e95802d-c0ca-4728-afaa-68207eff1334';
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const RESERVATION_NOTIFY_EMAIL = 'swetasiprapanda3@gmail.com';

// Optional fallback IDs if you used EmailJS defaults
const EMAILJS_FALLBACK_SERVICE_ID = 'service_default';
const EMAILJS_FALLBACK_TEMPLATE_ID = 'template_reservation';

// Optional: Google Apps Script webhook URL (set to your deployed web app URL)
const RESERVATION_WEBHOOK_URL = '';

// Web3Forms configuration
const WEB3FORMS_ACCESS_KEY = '17dd5cd4-e555-4d78-9009-8a4e09f41e9f';
const WEB3FORMS_TO_EMAIL = 'spellvoc1997@gmail.com';

async function sendReservationViaWeb3Forms({ name, email, phone, planName, priceText, startDate }) {
    if (!WEB3FORMS_ACCESS_KEY) return { sent: false, reason: 'no_access_key' };
    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                to: WEB3FORMS_TO_EMAIL,
                subject: `New Seat Reservation: ${planName}`,
                from_name: name,
                from_email: email,
                name,
                email,
                phone,
                selected_plan: planName,
                plan_price: priceText || 'N/A',
                start_date: startDate,
                message: `Seat reserved for ${planName}${priceText ? ' (' + priceText + ')' : ''}.\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Start: ${startDate}`
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.success === false)) {
            console.error('Web3Forms error:', res.status, data);
            return { sent: false, reason: 'http_' + res.status, data };
        }
        return { sent: true };
    } catch (err) {
        console.error('Web3Forms request failed:', err);
        return { sent: false, reason: 'network_error', error: err };
    }
}

async function sendContactViaWeb3Forms({ name, email, phone, subject, message }) {
    if (!WEB3FORMS_ACCESS_KEY) return { sent: false, reason: 'no_access_key' };
    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                to: WEB3FORMS_TO_EMAIL,
                subject: `SpellVoc Contact: ${subject || 'General Query'}`,
                from_name: name,
                from_email: email,
                name,
                email,
                phone,
                message
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.success === false)) return { sent: false, reason: 'http_' + res.status, data };
        return { sent: true };
    } catch (err) {
        return { sent: false, reason: 'network_error', error: err };
    }
}

// Generic notifier for auth events (register/login) via Web3Forms
async function sendAuthEventViaWeb3Forms({ type, name, email, phone }) {
    if (!WEB3FORMS_ACCESS_KEY) return { sent: false, reason: 'no_access_key' };
    const safeType = (type || 'auth').toUpperCase();
    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                to: WEB3FORMS_TO_EMAIL,
                subject: `SpellVoc: ${safeType} success`,
                from_name: name || 'SpellVoc',
                from_email: email || 'no-reply@spellvoc.local',
                name,
                email,
                phone,
                message: `${safeType} event captured for ${name || email || 'user'}`
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.success === false)) return { sent: false, reason: 'http_' + res.status, data };
        return { sent: true };
    } catch (err) {
        return { sent: false, reason: 'network_error', error: err };
    }
}

async function sendReservationToWebhook({ name, email, phone, planName, priceText, startDate }) {
    if (!RESERVATION_WEBHOOK_URL) return { sent: false, reason: 'no_webhook' };
    try {
        const res = await fetch(RESERVATION_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: RESERVATION_NOTIFY_EMAIL,
                name,
                email,
                phone,
                plan: planName,
                price: priceText,
                startDate
            })
        });
        if (!res.ok) {
            const text = await res.text();
            console.error('Webhook error:', res.status, text);
            return { sent: false, reason: 'http_' + res.status };
        }
        return { sent: true };
    } catch (err) {
        console.error('Webhook request failed:', err);
        return { sent: false, reason: 'network_error', error: err };
    }
}

// API helper - Dynamic API base URL for development and production
// ⚠️ IMPORTANT: 
// Option 1: If frontend and backend are on same server (deployed together) → Keep BACKEND_URL as null
// Option 2: If backend is separate → Set BACKEND_URL to your backend URL (e.g., 'https://spellvoc-backend.onrender.com')
// See SIMPLE_DEPLOYMENT_GUIDE.md for instructions
const BACKEND_URL = null; // Keep null if frontend+backend are together, or set backend URL if separate

const API_BASE = (() => {
    // If BACKEND_URL is explicitly set, use it (for production)
    if (BACKEND_URL) {
        return BACKEND_URL;
    }
    // Check if we're in development (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:4000';
    }
    // In production without BACKEND_URL set - show helpful error
    console.error('⚠️ BACKEND_URL not configured! Please set it in script.js after deploying your backend.');
    console.error('📖 See BACKEND_DEPLOYMENT_GUIDE.md for instructions.');
    // Still try same origin as fallback
    return window.location.origin;
})();

async function apiFetch(path, { method = 'GET', body } = {}) {
    const opts = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    };
    if (body) opts.body = JSON.stringify(body);
    const url = `${API_BASE}${path}`;
    console.log('[API][REQUEST]', method, url, body || null);
    
    try {
        const res = await fetch(url, opts);
        let data = null;
        try { data = await res.json(); } catch (_) { }
        console.log('[API][RESPONSE]', method, url, res.status, data);
        
        if (!res.ok) {
            const msg = (data && (data.error || data.message)) || `HTTP ${res.status}`;
            throw new Error(msg);
        }
        return data;
    } catch (err) {
        // If it's a network error and we're in production without BACKEND_URL, show helpful message
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
            if (!BACKEND_URL && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                console.error('❌ Cannot connect to backend. Please deploy your backend and set BACKEND_URL in script.js');
                console.error('📖 See BACKEND_DEPLOYMENT_GUIDE.md for step-by-step instructions.');
            }
        }
        throw err;
    }
}

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
        if (planPrice) planPrice.value = priceText; // planPrice removed in Option B, guard existence

        function openPayment() {
            paymentModal.classList.add('active');
            paymentModal.setAttribute('aria-hidden', 'false');
        }
        function closePayment() {
            paymentModal.classList.remove('active');
            paymentModal.setAttribute('aria-hidden', 'true');
            try {
                document.getElementById('paymentForm')?.reset();
            } catch (e) { }
        }

        // One-time listeners
        paymentBackdrop?.addEventListener('click', closePayment, { once: true });
        paymentClose?.addEventListener('click', closePayment, { once: true });

        // Submit handler for Reserve Seat (no gateway)
        const paymentSubmitBtn = document.getElementById('paymentSubmit');
        if (!paymentSubmitBtn) return;
        paymentSubmitBtn.onclick = async function onReserve(ev) {
            ev.preventDefault();
            const name = document.getElementById('buyerName').value.trim();
            const email = document.getElementById('buyerEmail').value.trim();
            const phone = document.getElementById('buyerPhone').value.trim();
            const startDate = document.getElementById('buyerStartDate')?.value || '';

            if (!name || !email || !phone || !startDate) {
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

            // 1) Web3Forms (primary)
            let delivered = false;
            const web3Res = await sendReservationViaWeb3Forms({ name, email, phone, planName, priceText, startDate });
            delivered = web3Res.sent;

            // 2) If Web3Forms fails, try webhook (if set)
            if (!delivered) {
                const webhookResult = await sendReservationToWebhook({ name, email, phone, planName, priceText, startDate });
                delivered = webhookResult.sent;
            }

            if (!delivered && window.Swal) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Note',
                    text: 'Reservation saved. Notification could not be emailed automatically. Configure Web3Forms or add a webhook URL.',
                    confirmButtonColor: '#667eea'
                });
            }

            // Success UX
            if (window.Swal) {
                Swal.fire({
                    icon: 'success',
                    title: 'Seat Reserved',
                    text: `Your seat for ${planName}${priceText ? ' (' + priceText + ')' : ''} is reserved for 48 hours. We will contact you to complete enrollment.`,
                    confirmButtonColor: '#667eea'
                });
            } else {
                alert(`Seat reserved for ${planName}${priceText ? ' (' + priceText + ')' : ''}. We'll contact you soon.`);
            }
            try { paymentForm.reset(); } catch (e) { }
            closePayment();
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

// Prefer backend: intercept register/login submissions before previous demo handlers
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        // Capture first and stop demo handlers
        e.preventDefault();
        e.stopImmediatePropagation();
        clearAllErrors?.();
        const fullName = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const phone = document.getElementById('registerPhone').value.trim();
        const password = document.getElementById('registerPassword').value;
        if (!fullName || !email || !phone || !password) {
            alert('Please fill all required fields');
            return;
        }
        try {
            const out = await apiFetch('/api/auth/register', { method: 'POST', body: { fullName, email, phone, password } });
            console.log('[REGISTER][OK]', out);
            if (window.Swal) Swal.fire({ icon: 'success', title: 'Registered', text: `Welcome, ${out.fullName}` });
            registerForm.reset();
            try { await syncPendingSelections(); } catch(e) { console.warn('[SYNC][ERR]', e?.message); }
            authSlide?.classList.remove('active');
            // Notify via Web3Forms
            try { await sendAuthEventViaWeb3Forms({ type: 'register', name: out.fullName || fullName, email, phone }); } catch(_) {}
        } catch (err) {
            console.error('[REGISTER][ERR]', err);
            alert(`Register failed: ${err.message}`);
        }
    }, true);
}

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const emailOrId = document.getElementById('loginUserId').value.trim();
        const password = document.getElementById('loginPassword').value;
        // Treat loginUserId as email for backend
        try {
            const out = await apiFetch('/api/auth/login', { method: 'POST', body: { email: emailOrId, password } });
            console.log('[LOGIN][OK]', out);
            localStorage.setItem('last_login_email', emailOrId);
            if (window.Swal) {
                Swal.fire({ icon: 'success', title: 'Login successful', timer: 800, showConfirmButton: false });
            }
            authSlide?.classList.remove('active');
            // Sync any pending selections (trials/reservations) saved pre-login
            try { await syncPendingSelections(); } catch(e) { console.warn('[SYNC][ERR]', e?.message); }
            // Notify via Web3Forms
            try { await sendAuthEventViaWeb3Forms({ type: 'login', name: out?.fullName, email: emailOrId }); } catch(_) {}
            setTimeout(() => { window.location.href = `${API_BASE}/dashboard.html`; }, 300);
        } catch (err) {
            console.error('[LOGIN][ERR]', err);
            alert(`Login failed: ${err.message}`);
        }
    }, true);
}

// Forgot Password via OTP - Step 1: send OTP
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const email = document.getElementById('forgotEmail').value.trim();

        if (!email) { alert('Please enter your email address'); return; }

        try {
            await apiFetch('/api/auth/forgot-password-otp', { method: 'POST', body: { email } });
            if (window.Swal) {
                await Swal.fire({ icon: 'success', title: 'OTP sent', text: 'Check your email for the 6-digit code', timer: 2200, showConfirmButton: false });
            } else { alert('OTP sent to your email'); }
            // Show OTP form and prefill email
            document.getElementById('otpEmail').value = email;
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            otpResetForm.classList.add('active');
        } catch (err) {
            console.error('[FORGOT_PASSWORD_OTP][ERR]', err);
            alert(`Failed to send OTP: ${err.message}`);
        }
    }, true);
}

// Step 2: verify OTP and reset password (auto-login on success)
if (otpResetForm) {
    otpResetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const email = document.getElementById('otpEmail').value.trim();
        const otp = document.getElementById('otpCode').value.trim();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmNewPassword').value;

        if (!email || !otp || !newPassword || !confirmPassword) { alert('Please fill in all fields'); return; }
        if (!/^\d{6}$/.test(otp)) { alert('Enter the 6-digit OTP'); return; }
        if (newPassword !== confirmPassword) { alert('Passwords do not match'); return; }
        if (newPassword.length < 8) { alert('Password must be at least 8 characters long'); return; }

        try {
            const result = await apiFetch('/api/auth/reset-password-otp', { method: 'POST', body: { email, otp, newPassword } });
            console.log('[RESET_PASSWORD_OTP][OK]', result);
            if (window.Swal) {
                await Swal.fire({ icon: 'success', title: 'Password updated', text: 'Logging you in…', timer: 1200, showConfirmButton: false });
            }
            // On success, backend set cookies. Redirect to dashboard
            authSlide?.classList.remove('active');
            setTimeout(() => { window.location.href = `${API_BASE}/dashboard.html`; }, 300);
        } catch (err) {
            console.error('[RESET_PASSWORD_OTP][ERR]', err);
            alert(`Failed to reset: ${err.message}`);
        }
    }, true);
}

// Local persistence for pre-login selections
function getPendingTrials() {
    try { return JSON.parse(localStorage.getItem('pending_trials') || '[]'); } catch { return []; }
}
function setPendingTrials(list) {
    localStorage.setItem('pending_trials', JSON.stringify(list));
}
function addPendingTrial(courseTitle) {
    const list = getPendingTrials();
    list.push({ courseTitle, ts: Date.now() });
    setPendingTrials(list);
    console.log('[TRIAL][PENDING][ADDED]', courseTitle);
}

function removePendingTrial(courseTitle) {
    const list = getPendingTrials().filter(t => (t.courseTitle || '').trim() !== (courseTitle || '').trim());
    setPendingTrials(list);
}

function getPendingReservations() {
    try { return JSON.parse(localStorage.getItem('pending_reservations') || '[]'); } catch { return []; }
}
function setPendingReservations(list) {
    localStorage.setItem('pending_reservations', JSON.stringify(list));
}
function addPendingReservation(item) {
    const list = getPendingReservations();
    list.push({ ...item, ts: Date.now() });
    setPendingReservations(list);
    console.log('[RESERVATION][PENDING][ADDED]', item);
}

async function syncPendingSelections() {
    // Sync trials
    const trials = getPendingTrials();
    for (const t of trials) {
        try {
            await apiFetch('/api/trials', { method: 'POST', body: { courseTitle: t.courseTitle } });
            console.log('[TRIAL][PENDING][SYNCED]', t.courseTitle);
        } catch (e) {
            console.warn('[TRIAL][PENDING][SYNC_ERR]', t.courseTitle, e.message);
        }
    }
    if (trials.length) setPendingTrials([]);

    // Sync reservations
    const resv = getPendingReservations();
    for (const r of resv) {
        try {
            await apiFetch('/api/reservations', { method: 'POST', body: { planName: r.planName, startDate: r.startDate, priceText: r.priceText || '' } });
            console.log('[RESERVATION][PENDING][SYNCED]', r);
        } catch (e) {
            console.warn('[RESERVATION][PENDING][SYNC_ERR]', r, e.message);
        }
    }
    if (resv.length) setPendingReservations([]);
}

// Local persistence for pre-login selections
function getPendingTrials() {
    try { return JSON.parse(localStorage.getItem('pending_trials') || '[]'); } catch { return []; }
}
function setPendingTrials(list) {
    localStorage.setItem('pending_trials', JSON.stringify(list));
}
function addPendingTrial(courseTitle) {
    const list = getPendingTrials();
    list.push({ courseTitle, ts: Date.now() });
    setPendingTrials(list);
    console.log('[TRIAL][PENDING][ADDED]', courseTitle);
}

function getPendingReservations() {
    try { return JSON.parse(localStorage.getItem('pending_reservations') || '[]'); } catch { return []; }
}
function setPendingReservations(list) {
    localStorage.setItem('pending_reservations', JSON.stringify(list));
}
function addPendingReservation(item) {
    const list = getPendingReservations();
    list.push({ ...item, ts: Date.now() });
    setPendingReservations(list);
    console.log('[RESERVATION][PENDING][ADDED]', item);
}

async function syncPendingSelections() {
    // Sync trials
    const trials = getPendingTrials();
    for (const t of trials) {
        try {
            await apiFetch('/api/trials', { method: 'POST', body: { courseTitle: t.courseTitle } });
            console.log('[TRIAL][PENDING][SYNCED]', t.courseTitle);
        } catch (e) {
            console.warn('[TRIAL][PENDING][SYNC_ERR]', t.courseTitle, e.message);
        }
    }
    if (trials.length) setPendingTrials([]);

    // Sync reservations
    const resv = getPendingReservations();
    for (const r of resv) {
        try {
            await apiFetch('/api/reservations', { method: 'POST', body: { planName: r.planName, startDate: r.startDate, priceText: r.priceText || '' } });
            console.log('[RESERVATION][PENDING][SYNCED]', r);
        } catch (e) {
            console.warn('[RESERVATION][PENDING][SYNC_ERR]', r, e.message);
        }
    }
    if (resv.length) setPendingReservations([]);
}

// Hook into trial registration to also store on backend
(function enhanceTrialFlow() {
    const form = document.getElementById('trialForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
        // Let existing handler run, but also attempt backend store after it toggles UI
        setTimeout(async () => {
            try {
                const inputEl = document.getElementById('trialCourseInput');
                const selectEl = document.getElementById('trialCourseSelect');
                const isInputMode = inputEl && inputEl.style.display === 'block';
                const courseTitle = isInputMode ? inputEl.value : (selectEl?.value || '');
                if (!courseTitle) return;
                await apiFetch('/api/trials', { method: 'POST', body: { courseTitle } });
                console.log('[TRIAL][STORE][OK]', courseTitle);
            } catch (err) {
                console.warn('[TRIAL][STORE][ERR] Stored locally to sync after login.', err.message);
                const inputEl = document.getElementById('trialCourseInput');
                const selectEl = document.getElementById('trialCourseSelect');
                const isInputMode = inputEl && inputEl.style.display === 'block';
                const courseTitle = isInputMode ? inputEl.value : (selectEl?.value || '');
                if (courseTitle) addPendingTrial(courseTitle);
            }
        }, 0);
    });
})();

// Replace reservation email flow with backend reservation first, keep web3forms as secondary
// Find existing payment submit handler and enhance it where we already hooked earlier
// We will detect the button by id and wrap the onclick after it's assigned
(function enhanceReservationFlow() {
    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'paymentSubmit') {
            // no-op: our main handler is set in pricing button click; we augment there
        }
    });
})();

// Update the existing pricing click handler augmentation to call backend before web3forms
// (Locate the handler we created earlier and modify inside)
// Note: Below we overwrite the onReserve function binding by reassigning after definition
(function patchPricingHandler() {
    const bindButtons = () => {
        document.querySelectorAll('.pricing-card .signup-btn, .pricing-card .payment-btn, .pricing-card .buy-btn').forEach(btn => {
            // If already bound by us, skip
            if (btn.dataset.backendWired === '1') return;
            btn.dataset.backendWired = '1';
            btn.addEventListener('click', () => {
                // After modal opens, rebind submit to call backend first
                setTimeout(() => {
                    const paymentSubmitBtn = document.getElementById('paymentSubmit');
                    if (!paymentSubmitBtn) return;
                    const planNameEl = document.getElementById('selectedPlan');
                    const priceHeader = btn.closest('.pricing-card')?.querySelector('.card-header .price');
                    const priceText = priceHeader?.textContent?.trim() || '';
                    paymentSubmitBtn.onclick = async function (ev) {
                        ev.preventDefault();
                        const name = document.getElementById('buyerName').value.trim();
                        const email = document.getElementById('buyerEmail').value.trim();
                        const phone = document.getElementById('buyerPhone').value.trim();
                        const startDate = document.getElementById('buyerStartDate')?.value || '';
                        const planName = planNameEl?.value || 'Selected Plan';
                        if (!name || !email || !phone || !startDate) { alert('Please fill all fields.'); return; }
                        // 1) Try to create reservation on backend (like register/login)
                        try {
                            const out = await apiFetch('/api/reservations', { method: 'POST', body: { planName, startDate, priceText } });
                            console.log('[RESERVATION][OK]', out);
                        } catch (err) {
                            console.warn('[RESERVATION][ERR] Stored locally to sync after login.', err.message);
                            addPendingReservation({ planName, startDate, priceText });
                        }
                        // 2) Notify via Web3Forms (mirror register/login notify flow)
                        let delivered = false;
                        try {
                            const web3Res = await sendReservationViaWeb3Forms({ name, email, phone, planName, priceText, startDate });
                            delivered = !!web3Res?.sent;
                        } catch (e) {
                            delivered = false;
                        }
                        // 3) Fallback to webhook if configured
                        if (!delivered) {
                            try {
                                const webhookResult = await sendReservationToWebhook({ name, email, phone, planName, priceText, startDate });
                                delivered = !!webhookResult?.sent;
                            } catch (_) {}
                        }
                        // 4) Optional heads-up if email could not be delivered
                        if (!delivered && window.Swal) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Note',
                                text: 'Reservation saved. Notification email could not be sent automatically. Configure Web3Forms or add a webhook URL.',
                                confirmButtonColor: '#667eea'
                            });
                        }
                        // 5) Continue existing success UI
                        if (window.Swal) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Seat Reserved',
                                text: `Your seat for ${planName}${priceText ? ' (' + priceText + ')' : ''} is reserved for 48 hours. We will contact you to complete enrollment.`,
                                confirmButtonColor: '#667eea'
                            });
                        } else {
                            alert(`Seat reserved for ${planName}${priceText ? ' (' + priceText + ')' : ''}. We'll contact you soon.`);
                        }
                        try { document.getElementById('paymentForm')?.reset(); } catch (e) { }
                        const paymentModal = document.getElementById('paymentModal');
                        paymentModal?.classList.remove('active');
                        paymentModal?.setAttribute('aria-hidden', 'true');
                    };
                }, 50);
            });
        });
    };
    bindButtons();
})();


// Testimonial videos: click to play/pause, unmute, pause others
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const videos = Array.from(document.querySelectorAll('.testimonial-video'));
        if (!videos.length) return;

        function pauseOthers(except) {
            videos.forEach(v => {
                if (v !== except) {
                    try { v.pause(); } catch (e) { }
                }
            });
        }

        videos.forEach(video => {
            // Start paused and muted off for user interaction; sound on when user clicks to play
            video.pause();
            video.muted = false;
            video.controls = true; // ensure fullscreen and native controls available

            // Toggle play/pause on click area
            video.addEventListener('click', async function (e) {
                try {
                    if (video.paused) {
                        pauseOthers(video);
                        video.muted = false;
                        await video.play();
                    } else {
                        video.pause();
                    }
                } catch (err) {
                    // Autoplay restrictions should not apply since it's user gesture, ignore
                }
            });

            // When playing, ensure others are paused and unmute
            video.addEventListener('play', function () {
                pauseOthers(video);
                video.muted = false;
            });

            // Optional: keyboard space/enter to toggle when focused
            video.addEventListener('keydown', async function (ev) {
                if (ev.code === 'Space' || ev.code === 'Enter') {
                    ev.preventDefault();
                    if (video.paused) {
                        pauseOthers(video);
                        video.muted = false;
                        try { await video.play(); } catch (e) { }
                    } else {
                        video.pause();
                    }
                }
            });
        });
    });
})();