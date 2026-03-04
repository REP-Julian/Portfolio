        // Initialize Lucide Icons
        lucide.createIcons();

        // 1. Theme Toggle Logic
        const htmlDoc = document.documentElement;
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

        function toggleTheme() {
            htmlDoc.classList.toggle('dark');
        }

        themeToggleBtn.addEventListener('click', toggleTheme);
        themeToggleMobileBtn.addEventListener('click', toggleTheme);

        // 2. Mobile Menu Logic
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function openMobileMenu() {
            mobileMenu.classList.remove('translate-x-full');
        }

        function closeMobileMenu() {
            mobileMenu.classList.add('translate-x-full');
        }

        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMenuBtn.addEventListener('click', closeMobileMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

        // 3. Login Modal Logic (Replaces alert)
        const loginModal = document.getElementById('login-modal');

        function toggleLoginModal() {
            loginModal.classList.toggle('active');
        }

        function handleLogin(event) {
            event.preventDefault();
            // Just close and show a small success message for the mockup
            toggleLoginModal();
            
            // Re-create a temporary aesthetic toast notification
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform translate-y-20';
            toast.innerText = 'Login feature mockup triggered successfully!';
            document.body.appendChild(toast);
            
            setTimeout(() => toast.style.transform = 'translateY(0)', 10);
            setTimeout(() => {
                toast.style.transform = 'translateY(20px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // Close modal if clicking outside the card
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) toggleLoginModal();
        });

        // 4. Showcase Image Modal
        const showcaseCards = document.querySelectorAll('.showcase-card');
        const showcaseModal = document.getElementById('showcase-modal');
        const showcaseModalImage = document.getElementById('showcase-modal-image');
        const closeShowcaseModalBtn = document.getElementById('close-showcase-modal');

        function openShowcaseModal(imageSource, imageAlt) {
            showcaseModalImage.src = imageSource;
            showcaseModalImage.alt = imageAlt || 'Enlarged showcase image';
            showcaseModal.classList.remove('hidden');
            showcaseModal.classList.add('flex');
        }

        function closeShowcaseModal() {
            showcaseModal.classList.add('hidden');
            showcaseModal.classList.remove('flex');
        }

        if (showcaseCards.length > 0 && showcaseModal && closeShowcaseModalBtn) {
            showcaseCards.forEach((card) => {
                const cardImage = card.querySelector('.showcase-image');
                if (!cardImage) {
                    return;
                }

                card.addEventListener('click', () => {
                    openShowcaseModal(cardImage.src, cardImage.alt);
                });

                card.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openShowcaseModal(cardImage.src, cardImage.alt);
                    }
                });
            });

            closeShowcaseModalBtn.addEventListener('click', closeShowcaseModal);

            showcaseModal.addEventListener('click', (event) => {
                if (event.target === showcaseModal) {
                    closeShowcaseModal();
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !showcaseModal.classList.contains('hidden')) {
                    closeShowcaseModal();
                }
            });
        }

        // 5. Scroll Spy (Highlight active nav link)
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link:not(.mobile-link)');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // If scroll is past a certain point of the section
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // 6. Progress Bar Animation via Intersection Observer
        const skillItems = document.querySelectorAll('.skill-item');

        const observerOptions = {
            threshold: 0.5 // Trigger when 50% of the element is visible
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fillElement = entry.target.querySelector('.progress-fill');
                    const targetWidth = entry.target.getAttribute('data-target');
                    // Small timeout ensures transition applies smoothly
                    setTimeout(() => {
                        fillElement.style.width = targetWidth + '%';
                    }, 100);
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        skillItems.forEach(item => {
            skillObserver.observe(item);
        });
