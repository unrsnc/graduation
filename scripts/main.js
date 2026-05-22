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
    // AUTOPLAY MUSIC WITH MOBILE BROWSER COMPATIBILITY
    // ============================================================
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
        const FADE_DURATION = 1800; // 1.8 seconds for smooth fade-in
        const DEFAULT_VOLUME = 0.50; // 50% default volume
        let hasAudioStarted = false; // Flag to prevent spam play()
        let fadeInAnimationId = null; // Track fade-in animation
        
        /**
         * Fade in audio volume smoothly using requestAnimationFrame
         * @param {HTMLAudioElement} audio - The audio element
         * @param {number} targetVolume - Target volume (0-1)
         * @param {number} duration - Duration in milliseconds
         */
        function fadeInVolume(audio, targetVolume, duration) {
            // Clear any existing fade animation
            if (fadeInAnimationId) {
                cancelAnimationFrame(fadeInAnimationId);
            }
            
            const startTime = performance.now();
            audio.volume = 0; // Start from silence
            
            function animate(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                audio.volume = progress * targetVolume;
                
                if (progress < 1) {
                    fadeInAnimationId = requestAnimationFrame(animate);
                } else {
                    fadeInAnimationId = null;
                    audio.volume = targetVolume;
                }
            }
            
            fadeInAnimationId = requestAnimationFrame(animate);
        }
        
        /**
         * Attempt to autoplay audio
         */
        function attemptAutoplay() {
            if (hasAudioStarted) return;
            
            bgAudio.muted = false;
            bgAudio.volume = 0;
            
            const playPromise = bgAudio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Autoplay successful
                        hasAudioStarted = true;
                        fadeInVolume(bgAudio, DEFAULT_VOLUME, FADE_DURATION);
                    })
                    .catch(() => {
                        // Autoplay blocked - set up fallback on user interaction
                        setupFallbackInteraction();
                    });
            } else {
                // Older browser without Promise support
                setupFallbackInteraction();
            }
        }
        
        /**
         * Setup fallback: play audio on first user interaction
         * Handles click, tap, and scroll events for maximum compatibility
         */
        function setupFallbackInteraction() {
            const interactionHandler = () => {
                if (hasAudioStarted) return;
                
                bgAudio.muted = false;
                bgAudio.volume = 0;
                
                bgAudio.play()
                    .then(() => {
                        hasAudioStarted = true;
                        fadeInVolume(bgAudio, DEFAULT_VOLUME, FADE_DURATION);
                    })
                    .catch(err => {
                        // If still fails, try unmuted approach
                        console.warn('Audio autoplay fallback failed:', err);
                    });
                
                // Remove listeners after first interaction
                document.removeEventListener('click', interactionHandler);
                document.removeEventListener('touchstart', interactionHandler);
                document.removeEventListener('scroll', interactionHandler);
            };
            
            // Multiple interaction triggers for better mobile compatibility
            document.addEventListener('click', interactionHandler, { once: false });
            document.addEventListener('touchstart', interactionHandler, { once: false });
            document.addEventListener('scroll', interactionHandler, { once: false });
        }
        
        /**
         * Detect page visibility and resume audio if needed
         * Handles tab switching and app backgrounding scenarios
         */
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && hasAudioStarted && bgAudio.paused) {
                bgAudio.play().catch(() => {
                    console.warn('Could not resume audio on visibility change');
                });
            }
        });
        
        /**
         * Initialize autoplay with proper timing for page load completion
         * Wait for DOM to be fully ready and images to load
         */
        if (document.readyState === 'loading') {
            // DOM still loading
            document.addEventListener('DOMContentLoaded', () => {
                // Give browser a bit more time to settle
                setTimeout(attemptAutoplay, 1500);
            });
        } else {
            // DOM already loaded
            setTimeout(attemptAutoplay, 1500);
        }
    }
});
