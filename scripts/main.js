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
    
    // Autoplay background music with fade-in effect
    const bgAudio = document.getElementById('bg-audio');
    
    // Function to play audio with fade-in volume
    function playAudioWithFadeIn() {
        bgAudio.muted = false;
        bgAudio.volume = 0; // Start with muted volume
        
        const playPromise = bgAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started successfully
                // Fade in the volume over 2 seconds
                const fadeInDuration = 2000; // 2 seconds
                const startTime = Date.now();
                const maxVolume = 0.5; // Set max volume to 50%
                
                const fadeInInterval = setInterval(() => {
                    const elapsedTime = Date.now() - startTime;
                    const progress = Math.min(elapsedTime / fadeInDuration, 1);
                    bgAudio.volume = progress * maxVolume;
                    
                    if (progress === 1) {
                        clearInterval(fadeInInterval);
                    }
                }, 50);
            }).catch(error => {
                // Autoplay was blocked by browser
                console.log('Autoplay blocked. Fallback: Audio will play on user interaction.');
                bgAudio.muted = false;
                bgAudio.volume = 0.5;
                // Set up play on first user interaction
                const startAudioOnInteraction = () => {
                    bgAudio.play().catch(err => console.log('Audio play failed:', err));
                    document.removeEventListener('click', startAudioOnInteraction);
                    document.removeEventListener('touchstart', startAudioOnInteraction);
                };
                document.addEventListener('click', startAudioOnInteraction);
                document.addEventListener('touchstart', startAudioOnInteraction);
            });
        }
    }
    
    // Start autoplay after 2-3 seconds
    setTimeout(() => {
        playAudioWithFadeIn();
    }, 2500); // 2.5 seconds delay for page load completion
});
