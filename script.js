// Language and Theme Management
class AppManager {
    constructor() {
        this.language = localStorage.getItem('language') || 'en';
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupLanguage();
        this.setupEventListeners();
        this.setupAnimations();
    }

    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        
        // Apply saved theme
        if (this.theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'bi bi-sun';
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'bi bi-moon';
        }

        // Theme toggle functionality
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        
        if (this.theme === 'light') {
            this.theme = 'dark';
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'bi bi-sun';
        } else {
            this.theme = 'light';
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'bi bi-moon';
        }
        
        localStorage.setItem('theme', this.theme);
    }

    setupLanguage() {
        const languageToggle = document.getElementById('languageToggle');
        const languageText = document.getElementById('languageText');
        
        // Apply saved language
        this.updateLanguageContent();
        
        // Language toggle functionality
        if (languageToggle) {
            languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }

    toggleLanguage() {
        this.language = this.language === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', this.language);
        this.updateLanguageContent();
    }

    updateLanguageContent() {
        const languageText = document.getElementById('languageText');
        const body = document.body;
        
        if (this.language === 'ar') {
            body.setAttribute('dir', 'rtl');
            body.setAttribute('lang', 'ar');
            if (languageText) languageText.textContent = 'English';
        } else {
            body.setAttribute('dir', 'ltr');
            body.setAttribute('lang', 'en');
            if (languageText) languageText.textContent = 'العربية';
        }
        
        // Update content based on language
        this.updateTextContent();
    }

    updateTextContent() {
        const currentTranslations = window.translations[this.language];
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations[key]) {
                element.innerHTML = currentTranslations[key];
            }
        });
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Form handling
        this.setupFormHandling();
    }

    setupFormHandling() {
        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            this.showNotification('Message sent successfully!', 'success');
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .hero-content, .hero-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppManager();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for use in other scripts
window.AppManager = AppManager;
