// This file contains JavaScript code for the graduation congratulations website.
// It may include functionality such as interactive elements, animations, or any dynamic content that enhances the user experience.

document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        "Congratulations on your graduation!",
        "Your hard work has paid off!",
        "The tassel was worth the hassle!",
        "Cheers to your next adventure!",
        "You did it! Celebrate your success!"
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

    galleryImgs.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.textContent = this.alt;
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Tutup modal jika klik di luar gambar
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
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

    // Dark mode toggle
    const darkModeBtn = document.getElementById('darkModeToggle');
    darkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            darkModeBtn.textContent = "☀️ Light Mode";
        } else {
            darkModeBtn.textContent = "🌙 Dark Mode";
        }
    });

    // Play background music
    document.getElementById('playMusic').onclick = function() {
        var audio = document.getElementById('bg-audio');
        audio.muted = false;
        audio.play();
        this.style.display = 'none';
    };
});
