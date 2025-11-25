document.addEventListener("DOMContentLoaded", () => {
    // --- Animasi Teks Mengetik (jika sudah ada, biarkan saja) ---
    // Contoh:
    // const typedTextSpan = document.querySelector(".typing-text");
    // ... (logika teks mengetik Anda)

    // --- Logika untuk Animasi Scroll (Intersection Observer) ---
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

    // --- Background Blur on Scroll ---
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Jika scroll lebih dari 50px, mulai efek blur dan gelap
            if (scrollPosition > 50) {
                overlay.classList.add('is-scrolled');
            } else {
                overlay.classList.remove('is-scrolled');
            }
        });
    }

    // --- Language Switcher ---
    const langToggle = document.getElementById('lang-toggle');
    const setLanguage = (lang) => {
        // Set language attribute on <html> tag
        document.documentElement.lang = lang;

        // Translate all elements with data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                // Gunakan innerHTML karena beberapa teks mungkin mengandung tag HTML seperti <span>
                element.innerHTML = translations[lang][key];
            }
        });

        // Translate meta tags and title
        const trans = translations[lang];
        if (trans) {
            document.title = trans.pageTitle;
            document.querySelector('meta[name="description"]').setAttribute('content', trans.metaDescription);
            document.querySelector('meta[property="og:title"]').setAttribute('content', trans.ogTitle);
            document.querySelector('meta[property="og:description"]').setAttribute('content', trans.ogDescription);
            document.querySelector('meta[name="twitter:title"]').setAttribute('content', trans.twitterTitle);
            document.querySelector('meta[name="twitter:description"]').setAttribute('content', trans.twitterDescription);
        }

        // Update toggle state
        langToggle.checked = (lang === 'id');

        // Save language preference
        localStorage.setItem('language', lang);
    };

    langToggle.addEventListener('change', () => {
        const newLang = langToggle.checked ? 'id' : 'en';
        setLanguage(newLang);
    });

    const savedLang = localStorage.getItem('language') || 'id';
    // Menunggu sebentar agar layout stabil sebelum mengukur lebar tombol
    // Untuk toggle, tidak perlu timeout
    setLanguage(savedLang);
});
