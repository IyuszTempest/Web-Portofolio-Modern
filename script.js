// --- Animasi Teks Mengetik (jika sudah ada, biarkan saja) ---
// Contoh:
// const typedTextSpan = document.querySelector(".typing-text");
// ... (logika teks mengetik Anda)


// --- Logika untuk Animasi Scroll ---

document.addEventListener("DOMContentLoaded", () => {
    // Pilih semua elemen yang ingin dianimasikan
    const animatedElements = document.querySelectorAll('.section-padding');

    // Opsi untuk Intersection Observer
    // threshold: 0.1 berarti callback akan dijalankan saat 10% elemen terlihat
    const observerOptions = {
        root: null, // null berarti viewport browser
        rootMargin: '0px',
        threshold: 0.1
    };

    // Buat observer baru
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen masuk ke viewport
            if (entry.isIntersecting) {
                // Tambahkan class 'is-visible' untuk memicu animasi CSS
                entry.target.classList.add('is-visible');
                // Hentikan pengamatan pada elemen ini setelah animasi berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Mulai amati setiap elemen yang dipilih
    animatedElements.forEach(el => observer.observe(el));
});
