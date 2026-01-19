// Main JavaScript for Wedding Website
// Vanilla JavaScript only - no frameworks

(function() {
    'use strict';

    // ============================================
    // Hamburger Menu Toggle
    // ============================================
    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        let overlay = document.querySelector('.nav-overlay');

        // Create overlay if it doesn't exist
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        function toggleMenu() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        }

        function closeMenu() {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', closeMenu);

            // Close menu when clicking nav links (mobile)
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // Only close on mobile (when menu is a sidebar)
                    if (window.innerWidth < 768) {
                        closeMenu();
                    }
                });
            });

            // Close menu on window resize if switching to desktop view
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    closeMenu();
                }
            });
        }
    }

    // ============================================
    // Hamburger Menu Toggle
    // ============================================
    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        let overlay = document.querySelector('.nav-overlay');

        // Create overlay if it doesn't exist
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        function toggleMenu() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        }

        function closeMenu() {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', closeMenu);

            // Close menu when clicking nav links (mobile)
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // Only close on mobile (when menu is a sidebar)
                    if (window.innerWidth < 768) {
                        closeMenu();
                    }
                });
            });

            // Close menu on window resize if switching to desktop view
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    closeMenu();
                }
            });
        }
    }

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FAQ Accordion Functionality
    // ============================================
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    
                    // Close all other FAQ items (optional - remove if you want multiple open)
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            const otherQuestion = otherItem.querySelector('.faq-question');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-icon');
                            if (otherQuestion && otherAnswer) {
                                otherQuestion.setAttribute('aria-expanded', 'false');
                                otherAnswer.style.maxHeight = null;
                                if (otherIcon) {
                                    otherIcon.textContent = '+';
                                }
                            }
                        }
                    });
                    
                    // Toggle current item
                    if (isExpanded) {
                        this.setAttribute('aria-expanded', 'false');
                        answer.style.maxHeight = null;
                        if (icon) icon.textContent = '+';
                    } else {
                        this.setAttribute('aria-expanded', 'true');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (icon) icon.textContent = '−';
                    }
                });
            }
        });
    }

    // Initialize hamburger menu and FAQ when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initHamburgerMenu();
            initFAQ();
        });
    } else {
        initHamburgerMenu();
        initFAQ();
    }

    // ============================================
    // Photo Gallery Functionality
    // ============================================
    let galleryImages = [];
    let currentGalleryIndex = 0;

    function initGallery() {
        // Collect all gallery images
        const galleryItems = document.querySelectorAll('.gallery-item img');
        galleryImages = Array.from(galleryItems).map(img => ({
            src: img.src,
            alt: img.alt || 'Gallery image'
        }));

        // Hide placeholder and show open button if images exist
        const placeholder = document.querySelector('.gallery-placeholder');
        const openBtn = document.getElementById('galleryOpenBtn');
        
        if (galleryImages.length > 0) {
            if (placeholder) placeholder.style.display = 'none';
            if (openBtn) openBtn.style.display = 'block';
        } else {
            if (placeholder) placeholder.style.display = 'block';
            if (openBtn) openBtn.style.display = 'none';
        }

        // Open gallery modal
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('galleryModalImage');
        const galleryCurrent = document.getElementById('galleryCurrent');
        const galleryTotal = document.getElementById('galleryTotal');
        const closeBtn = document.getElementById('galleryClose');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');

        if (!modal || !modalImage) return;

        // Update gallery counter
        if (galleryTotal) {
            galleryTotal.textContent = galleryImages.length;
        }

        function openModal(index) {
            if (galleryImages.length === 0) return;
            currentGalleryIndex = index;
            updateModalImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }

        function updateModalImage() {
            if (galleryImages.length === 0) return;
            const image = galleryImages[currentGalleryIndex];
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            if (galleryCurrent) {
                galleryCurrent.textContent = currentGalleryIndex + 1;
            }
        }

        function nextImage() {
            if (galleryImages.length === 0) return;
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            updateModalImage();
        }

        function prevImage() {
            if (galleryImages.length === 0) return;
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            updateModalImage();
        }

        // Event listeners
        if (openBtn) {
            openBtn.addEventListener('click', () => openModal(0));
        }

        // Click on gallery items to open modal
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }

        // Close modal on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowLeft') {
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                }
            }
        });

        // Touch/swipe support for mobile gallery preview
        let touchStartX = 0;
        let touchEndX = 0;
        const galleryScroll = document.getElementById('galleryScroll');
        
        if (galleryScroll) {
            galleryScroll.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            galleryScroll.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - scroll right
                        galleryScroll.scrollBy({ left: 200, behavior: 'smooth' });
                    } else {
                        // Swipe right - scroll left
                        galleryScroll.scrollBy({ left: -200, behavior: 'smooth' });
                    }
                }
            }
        }
    }

    // Initialize gallery when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }

    // ============================================
    // Hide Image Placeholder if Image Exists
    // ============================================
    function checkWelcomeImage() {
        const img = document.getElementById('welcomeImage');
        const placeholder = document.getElementById('imagePlaceholder');
        
        if (img && placeholder) {
            img.onerror = function() {
                // Image failed to load, show placeholder
                this.style.display = 'none';
                placeholder.style.display = 'block';
            };
            img.onload = function() {
                // Image loaded successfully, hide placeholder
                placeholder.style.display = 'none';
                this.style.display = 'block';
            };
            // Trigger check
            if (img.complete) {
                img.onload();
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkWelcomeImage);
    } else {
        checkWelcomeImage();
    }

    // ============================================
    // Sticky Navigation on Scroll
    // ============================================
    function initStickyNav() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > scrollThreshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStickyNav);
    } else {
        initStickyNav();
    }
})();

