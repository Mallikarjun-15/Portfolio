/* ==========================================================================
   Mallikarjun Ratkal Portfolio JS Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. HERO TYPING ANIMATION (Only on index.html)
    // ==========================================
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const roles = [
            "Aspiring Artificial Intelligence & Machine Learning Engineer",
            "Software Developer",
            "Full Stack Web Enthusiast",
            "Mobile App Developer"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 75;
        let pauseTime = 1800;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 35;
            } else {
                typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 75;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = pauseTime;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 800);
    }

    // ==========================================
    // 2. STICKY NAVIGATION BAR & BACK-TO-TOP BUTTON
    // ==========================================
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        if (header) {
            if (scrollPos > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        if (backToTopBtn) {
            if (scrollPos > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 3. 3-LINE MENU DRAWER NAVIGATION
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const navDrawer = document.getElementById('nav-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerCloseBtn = document.getElementById('drawer-close');
    const drawerLinksList = document.getElementById('drawer-links');

    function openDrawer() {
        if (navDrawer && drawerBackdrop) {
            navDrawer.classList.add('open');
            drawerBackdrop.classList.add('active');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDrawer() {
        if (navDrawer && drawerBackdrop) {
            navDrawer.classList.remove('open');
            drawerBackdrop.classList.remove('active');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

    if (drawerLinksList) {
        const links = drawerLinksList.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });
    }

    // ==========================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL (SCROLL SPY)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const drawerItems = document.querySelectorAll('.drawer-link-item');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 160;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                drawerItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    if (sections.length > 0) {
        window.addEventListener('scroll', scrollSpy);
    }

    // ==========================================
    // 5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ==========================================
    // 6. CONTACT FORM VALIDATION & LOCAL STORAGE
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const alertSuccess = document.getElementById('form-alert-success');
    const alertError = document.getElementById('form-alert-error');

    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        function validateField(input, validationFn, groupSelector) {
            const isValid = validationFn(input.value.trim());
            const formGroup = document.getElementById(groupSelector);
            if (isValid) {
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.add('error');
            }
            return isValid;
        }

        function isValidEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        }

        if (nameInput) nameInput.addEventListener('input', () => validateField(nameInput, val => val.length > 0, 'group-name'));
        if (emailInput) emailInput.addEventListener('input', () => validateField(emailInput, isValidEmail, 'group-email'));
        if (subjectInput) subjectInput.addEventListener('input', () => validateField(subjectInput, val => val.length > 0, 'group-subject'));
        if (messageInput) messageInput.addEventListener('input', () => validateField(messageInput, val => val.length >= 10, 'group-message'));

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = validateField(nameInput, val => val.length > 0, 'group-name');
            const isEmailValid = validateField(emailInput, isValidEmail, 'group-email');
            const isSubjectValid = validateField(subjectInput, val => val.length > 0, 'group-subject');
            const isMessageValid = validateField(messageInput, val => val.length >= 10, 'group-message');

            const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

            if (alertSuccess) alertSuccess.style.display = 'none';
            if (alertError) alertError.style.display = 'none';

            if (isFormValid) {
                const submission = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim(),
                    timestamp: new Date().toISOString()
                };

                let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
                submissions.push(submission);
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

                if (alertSuccess) {
                    alertSuccess.style.display = 'flex';
                    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => {
                        alertSuccess.style.display = 'none';
                    }, 5000);
                }

                contactForm.reset();
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.classList.remove('error'));
                
            } else {
                if (alertError) {
                    alertError.style.display = 'flex';
                    alertError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }

});
