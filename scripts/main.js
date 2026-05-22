// This file contains JavaScript code for the graduation congratulations website.
// It may include functionality such as interactive elements, animations, or any dynamic content that enhances the user experience.

document.addEventListener('DOMContentLoaded', () => {
    const messages = [
    ];

    const messageContainer = document.getElementById('congratulation-messages');
    if (messageContainer) {
        messages.forEach(message => {
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            messageContainer.appendChild(messageElement);
        });
    }

    const celebrateButton = document.getElementById('celebrate-button');
    if (celebrateButton) {
        celebrateButton.addEventListener('click', () => {
            alert("Let's celebrate your achievement!");
        });
    }

    const paragraphs = document.querySelectorAll("#messages p");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    paragraphs.forEach(p => observer.observe(p));

    // Modal gambar galeri
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    const galleryImgs = document.querySelectorAll("#gallery img");
    const profileImg = document.querySelector(".profile-img");

    // Fungsi untuk membuka modal
    const openModal = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.textContent = this.alt;
        // Reduce toggle switch z-index when modal opens
        const toggleContainer = document.querySelector('.dark-mode-toggle-container');
        if (toggleContainer) {
            toggleContainer.classList.add('modal-open');
        }
    };

    galleryImgs.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", openModal);
    });

    // Tambahkan modal untuk gambar profil
    if (profileImg) {
        profileImg.style.cursor = "pointer";
        profileImg.addEventListener("click", openModal);
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
        // Restore toggle switch z-index when modal closes
        const toggleContainer = document.querySelector('.dark-mode-toggle-container');
        if (toggleContainer) {
            toggleContainer.classList.remove('modal-open');
        }
    };

    // Tutup modal jika klik di luar gambar
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            // Restore toggle switch z-index when modal closes
            const toggleContainer = document.querySelector('.dark-mode-toggle-container');
            if (toggleContainer) {
                toggleContainer.classList.remove('modal-open');
            }
        }
    };

    // Flower fall animation
    const flowerContainer = document.querySelector('.flower-container');
    const flowerEmojis = ['🌸','🌺','💐','🌷','🌻'];
    function createFlower() {
        const flower = document.createElement('span');
        flower.className = 'flower';
        flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = (3 + Math.random() * 2) + 's';
        flower.style.fontSize = (28 + Math.random() * 16) + 'px';
        flowerContainer.appendChild(flower);
        setTimeout(() => flower.remove(), 5000);
    }
    setInterval(createFlower, 600);

    // Dark mode toggle - modern switch
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleContainer = document.querySelector('.dark-mode-toggle-container');
    
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // ============================================================
    // MOBILE-OPTIMIZED AUTOPLAY AUDIO SYSTEM
    // ============================================================
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
        const FADE_DURATION = 1500; // 1.5 seconds smooth fade
        const DEFAULT_VOLUME = 0.35; // 35% default volume
        let audioInitialized = false;
        let userHasInteracted = false;
        let fadeInAnimationId = null;
        
        // Ensure proper audio attributes
        bgAudio.preload = 'auto';
        bgAudio.autoplay = false; // We'll handle this manually
        
        /**
         * Smooth volume fade-in using requestAnimationFrame
         */
        function fadeInAudio(targetVolume) {
            if (fadeInAnimationId) cancelAnimationFrame(fadeInAnimationId);
            
            const startTime = performance.now();
            bgAudio.volume = 0;
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / FADE_DURATION, 1);
                bgAudio.volume = progress * targetVolume;
                
                if (progress < 1) {
                    fadeInAnimationId = requestAnimationFrame(animate);
                }
            }
            fadeInAnimationId = requestAnimationFrame(animate);
        }
        
        /**
         * Try muted autoplay first (most mobile browsers allow this)
         */
        function tryMutedAutoplay() {
            if (audioInitialized) return;
            
            bgAudio.muted = true;
            bgAudio.volume = 0;
            
            const playPromise = bgAudio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        audioInitialized = true;
                        // Unmute on first user interaction
                        if (!userHasInteracted) {
                            setupInteractionUnmute();
                        }
                    })
                    .catch(() => {
                        // Muted autoplay also failed, setup full fallback
                        setupInteractionUnmute();
                    });
            }
        }
        
        /**
         * Setup unmute and fade-in on first user interaction
         */
        function setupInteractionUnmute() {
            const unmute = () => {
                if (userHasInteracted) return;
                userHasInteracted = true;
                
                bgAudio.muted = false;
                bgAudio.volume = 0;
                
                // Try to play if not already playing
                if (bgAudio.paused) {
                    bgAudio.play().catch(err => {
                        console.warn('Audio play failed:', err);
                    });
                }
                
                fadeInAudio(DEFAULT_VOLUME);
                
                // Clean up listeners
                ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'].forEach(event => {
                    document.removeEventListener(event, unmute);
                });
            };
            
            // Multiple event types for better mobile coverage
            ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'].forEach(event => {
                document.addEventListener(event, unmute, { passive: true });
            });
        }
        
        /**
         * Resume audio when page becomes visible again
         */
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && audioInitialized && bgAudio.paused) {
                bgAudio.play().catch(() => {});
            }
        });
        
        /**
         * Handle audio errors gracefully
         */
        bgAudio.addEventListener('error', () => {
            console.warn('Audio element error - may be unsupported format');
        });
        
        /**
         * Initialize on page load
         */
        const initAudio = () => {
            // Delay slightly to ensure audio element is fully ready
            setTimeout(() => {
                tryMutedAutoplay();
                // Also setup interaction just in case
                if (!audioInitialized) {
                    setupInteractionUnmute();
                }
            }, 500);
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAudio);
        } else {
            initAudio();
        }
        
        // Also initialize on window load for extra safety
        window.addEventListener('load', () => {
            if (!audioInitialized) {
                setTimeout(tryMutedAutoplay, 300);
            }
        });
    }
});
