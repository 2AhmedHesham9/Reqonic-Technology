// Services Page Functionality
class ServicesManager {
    constructor() {
        this.currentService = 'individual';
        this.swiper = null;
        this.init();
    }

    init() {
        this.setupServiceTabs();
        this.initSwiper();
        this.setupEventListeners();
    }

    setupServiceTabs() {
        const individualTab = document.getElementById('individualTab');
        const corporateTab = document.getElementById('corporateTab');
        const servicesTitle = document.getElementById('servicesTitle');
        const servicesSubtitle = document.getElementById('servicesSubtitle');

        if (individualTab) {
            individualTab.addEventListener('click', () => {
                this.switchService('individual');
            });
        }

        if (corporateTab) {
            corporateTab.addEventListener('click', () => {
                this.switchService('corporate');
            });
        }
    }

    switchService(serviceType) {
        this.currentService = serviceType;
        
        // Update tab states
        const individualTab = document.getElementById('individualTab');
        const corporateTab = document.getElementById('corporateTab');
        
        if (serviceType === 'individual') {
            individualTab.classList.add('active');
            individualTab.classList.remove('btn-outline-light');
            individualTab.classList.add('btn-light');
            
            corporateTab.classList.remove('active');
            corporateTab.classList.remove('btn-light');
            corporateTab.classList.add('btn-outline-light');
        } else {
            corporateTab.classList.add('active');
            corporateTab.classList.remove('btn-outline-light');
            corporateTab.classList.add('btn-light');
            
            individualTab.classList.remove('active');
            individualTab.classList.remove('btn-light');
            individualTab.classList.add('btn-outline-light');
        }

        // Update content
        this.updateServiceContent(serviceType);
        
        // Filter swiper slides
        this.filterSwiperSlides(serviceType);
    }

    updateServiceContent(serviceType) {
        const servicesTitle = document.getElementById('servicesTitle');
        const servicesSubtitle = document.getElementById('servicesSubtitle');

        const translations = {
            individual: {
                title: 'Personal IT Solutions',
                subtitle: 'Tailored technology services for your personal and professional needs'
            },
            corporate: {
                title: 'Enterprise Solutions',
                subtitle: 'Scalable IT infrastructure and services for your business growth'
            }
        };

        const content = translations[serviceType];
        
        if (servicesTitle) {
            servicesTitle.textContent = content.title;
        }
        if (servicesSubtitle) {
            servicesSubtitle.textContent = content.subtitle;
        }
    }

    filterSwiperSlides(serviceType) {
        if (this.swiper) {
            const slides = document.querySelectorAll('.swiper-slide');
            slides.forEach((slide, index) => {
                const slideService = slide.getAttribute('data-service');
                if (slideService === serviceType) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
            
            this.swiper.update();
            this.swiper.slideTo(0);
        }
    }

    initSwiper() {
        if (typeof Swiper !== 'undefined') {
            this.swiper = new Swiper('.servicesSwiper', {
                modules: [Swiper.Navigation, Swiper.Pagination, Swiper.Autoplay],
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 1,
                    }
                },
                on: {
                    init: () => {
                        this.filterSwiperSlides(this.currentService);
                    }
                }
            });
        }
    }

    setupEventListeners() {
        // Add any additional event listeners here
        window.addEventListener('resize', debounce(() => {
            if (this.swiper) {
                this.swiper.update();
            }
        }, 250));
    }
}

// Initialize services manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServicesManager();
});

// Utility function for debouncing
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
