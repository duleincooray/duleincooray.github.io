// --- TYPEWRITER EFFECT ---
const typewriterElement = document.getElementById('typewriter');
const phrases = [
    "I build things for the web.",
    "A passionate AI enthusiast.",
    "A full-stack developer."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    let text = '';

    if (isDeleting) {
        text = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        text = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (typewriterElement) {
        typewriterElement.textContent = text;
    }
    
    let typeSpeed = 150;
    if (isDeleting) {
        typeSpeed /= 2; // Faster when deleting
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at the end of a phrase
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    setTimeout(type, typeSpeed);
}

// Start the effect after the page loads
document.addEventListener('DOMContentLoaded', type);


// --- MOBILE MENU TOGGLE ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// --- FADE-IN SECTIONS ON SCROLL ---
const sections = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// --- SMOOTH SCROLL FOR NAV LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // Close mobile menu on link click
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});
