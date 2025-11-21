// Typing Effect Logic
const textElement = document.querySelector('.typing-text');
const words = ["Information Systems Student", "Freelance Admin Support", "Photo Editor", "PC Builder", "IT Suport"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChars = currentWord.substring(0, charIndex);
    
    textElement.textContent = currentChars;
    
    // Ganti kecepatan ngetik biar kerasa natural
    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        // Kalau udah selesai ngetik 1 kata, pause dulu
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Kalau udah kehapus semua, ganti kata berikutnya
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    
    setTimeout(typeEffect, typeSpeed);
}

// Jalankan efek pas halaman dimuat
document.addEventListener('DOMContentLoaded', typeEffect);

// Optional: Smooth Scroll untuk navigasi (kalau browser lama)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});