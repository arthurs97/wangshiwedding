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

    function loadGalleryFromJSON() {
        // Try to load from embedded script tag first (works with file:// protocol)
        const embeddedScript = document.getElementById('gallery-metadata');
        if (embeddedScript) {
            try {
                const photos = JSON.parse(embeddedScript.textContent);
                return Promise.resolve(photos);
            } catch (error) {
                console.warn('Could not parse embedded gallery metadata:', error);
            }
        }
        
        // Fallback: try to fetch from JSON file (works with http/https)
        return fetch('assets/images/gallery/metadata.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Metadata file not found');
                }
                return response.json();
            })
            .catch(error => {
                console.warn('Could not load gallery metadata:', error);
                // Fallback: try to load images from directory structure
                return null;
            });
    }

    function renderGalleryItems(photos) {
        const galleryScroll = document.getElementById('galleryScroll');
        const placeholder = document.getElementById('galleryPlaceholder');
        
        if (!galleryScroll) return;
        
        // Clear existing content
        galleryScroll.innerHTML = '';
        
        if (!photos || photos.length === 0) {
            if (placeholder) {
                placeholder.innerHTML = '<p>No photos found. Add photos to <code>assets/images/gallery/</code> directory and run the metadata extraction script.</p>';
                placeholder.style.display = 'block';
            }
            return;
        }
        
        // Hide placeholder once photos are loaded
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        // Sort photos by sequence (ascending, with 0 as first)
        const sortedPhotos = [...photos].sort((a, b) => {
            const seqA = a.sequence !== undefined ? a.sequence : 999;
            const seqB = b.sequence !== undefined ? b.sequence : 999;
            return seqA - seqB;
        });
        
        // Create gallery items from JSON data
        sortedPhotos.forEach((photo, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-index', index);
            
            const img = document.createElement('img');
            img.src = photo.path;
            img.alt = photo.filename;
            img.loading = 'lazy';
            
            // Create caption container
            const caption = document.createElement('div');
            caption.className = 'gallery-item-caption';
            
            // Add date if available
            if (photo.date) {
                const dateEl = document.createElement('div');
                dateEl.className = 'gallery-caption-date';
                dateEl.textContent = photo.date;
                caption.appendChild(dateEl);
            }
            
            // Add location if available
            if (photo.location) {
                const locationEl = document.createElement('div');
                locationEl.className = 'gallery-caption-location';
                locationEl.textContent = photo.location;
                caption.appendChild(locationEl);
            }
            
            galleryItem.appendChild(img);
            if (caption.children.length > 0) {
                galleryItem.appendChild(caption);
            }
            galleryScroll.appendChild(galleryItem);
        });
        
        // Update gallery images array (use sorted order)
        galleryImages = sortedPhotos.map(photo => ({
            src: photo.path,
            alt: photo.filename,
            date: photo.date,
            location: photo.location
        }));
    }

    function initGallery() {
        // Keep placeholder showing "Loading gallery..." initially
        const placeholder = document.getElementById('galleryPlaceholder');
        if (placeholder) {
            placeholder.innerHTML = '<p>Loading gallery...</p>';
            placeholder.style.display = 'block';
        }
        
        // Load gallery from JSON metadata
        loadGalleryFromJSON().then(photos => {
            if (photos) {
                renderGalleryItems(photos);
            } else {
                // Fallback: try to collect from existing DOM elements
                const galleryItems = document.querySelectorAll('.gallery-item img');
                galleryImages = Array.from(galleryItems).map(img => ({
                    src: img.src,
                    alt: img.alt || 'Gallery image',
                    date: null,
                    location: null
                }));
            }

            // Hide placeholder and show open button if images exist
            const openBtn = document.getElementById('galleryOpenBtn');
            
            if (galleryImages.length > 0) {
                if (placeholder) placeholder.style.display = 'none';
                if (openBtn) openBtn.style.display = 'block';
            } else {
                // Only show instructions if we've confirmed there are no photos
                if (placeholder) {
                    placeholder.innerHTML = '<p>No photos found. Add photos to <code>assets/images/gallery/</code> directory and run the metadata extraction script.</p>';
                    placeholder.style.display = 'block';
                }
                if (openBtn) openBtn.style.display = 'none';
            }
            
            // Initialize modal functionality
            initGalleryModal();
        });
    }

    function initGalleryModal() {
        // Open gallery modal
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('galleryModalImage');
        const galleryCurrent = document.getElementById('galleryCurrent');
        const galleryTotal = document.getElementById('galleryTotal');
        const galleryDate = document.getElementById('galleryDate');
        const galleryLocation = document.getElementById('galleryLocation');
        const closeBtn = document.getElementById('galleryClose');
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        const openBtn = document.getElementById('galleryOpenBtn');

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
            
            if (!image) return;
            
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            
            if (galleryCurrent) {
                galleryCurrent.textContent = currentGalleryIndex + 1;
            }
            
            // Update metadata
            const metadataContainer = document.getElementById('galleryMetadata');
            if (!metadataContainer) {
                console.warn('Metadata container not found');
                return;
            }
            
            let hasMetadata = false;
            
            // Update date
            if (galleryDate) {
                if (image.date) {
                    galleryDate.textContent = image.date;
                    galleryDate.style.display = 'block';
                    hasMetadata = true;
                } else {
                    galleryDate.textContent = '';
                    galleryDate.style.display = 'none';
                }
            }
            
            // Update location
            if (galleryLocation) {
                if (image.location && typeof image.location === 'string' && image.location !== 'null' && image.location.trim() !== '') {
                    galleryLocation.textContent = image.location;
                    galleryLocation.style.display = 'block';
                    hasMetadata = true;
                } else {
                    galleryLocation.textContent = '';
                    galleryLocation.style.display = 'none';
                }
            }
            
            // Show/hide the entire metadata container
            metadataContainer.style.display = hasMetadata ? 'block' : 'none';
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

        // Click on gallery items to open modal (use event delegation for dynamically created items)
        const galleryScrollContainer = document.getElementById('galleryScroll');
        if (galleryScrollContainer) {
            galleryScrollContainer.addEventListener('click', function(e) {
                const galleryItem = e.target.closest('.gallery-item');
                if (galleryItem) {
                    const index = parseInt(galleryItem.getAttribute('data-index'), 10);
                    if (!isNaN(index)) {
                        openModal(index);
                    }
                }
            });
        }

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

