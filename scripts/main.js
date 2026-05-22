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
    // MODERN MUSIC PLAYER CONTROL - PLAY/PAUSE WITH BUTTON
    // ============================================================
    const bgAudio = document.getElementById('bg-audio');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicIcon = document.querySelector('.music-icon');
    
    if (bgAudio && musicToggleBtn) {
        const DEFAULT_VOLUME = 0.50; // 50% default volume
        let isPlaying = false;
        
        // Set default volume
        bgAudio.volume = DEFAULT_VOLUME;
        
        /**
         * Toggle play/pause and update button state
         */
        function toggleMusic() {
            if (bgAudio.paused) {
                bgAudio.play()
                    .then(() => {
                        isPlaying = true;
                        updateButtonState();
                    })
                    .catch(err => {
                        console.warn('Failed to play audio:', err);
                    });
            } else {
                bgAudio.pause();
                isPlaying = false;
                updateButtonState();
            }
        }
        
        /**
         * Update button appearance based on play state
         */
        function updateButtonState() {
            if (isPlaying) {
                musicToggleBtn.classList.add('playing');
                //musicIcon.textContent = '⏸️';
            } else {
                musicToggleBtn.classList.remove('playing');
               // musicIcon.textContent = '▶️';
            }
        }
        
        /**
         * Sync button state with audio element
         */
        bgAudio.addEventListener('play', () => {
            isPlaying = true;
            updateButtonState();
        });
        
        bgAudio.addEventListener('pause', () => {
            isPlaying = false;
            updateButtonState();
        });
        
        /**
         * Button click handler
         */
        musicToggleBtn.addEventListener('click', toggleMusic);
        
        /**
         * Keyboard shortcut (spacebar to toggle music)
         */
        document.addEventListener('keydown', (e) => {
            // Only toggle if not typing in an input/textarea
            if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                e.preventDefault();
                toggleMusic();
            }
        });
        
        /**
         * Resume audio when page becomes visible again
         */
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && isPlaying && bgAudio.paused) {
                bgAudio.play().catch(() => {});
            }
        });
        
        /**
         * Initialize button state (paused by default)
         */
        updateButtonState();
    }
});
