//nav bar 
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const closeNav = document.querySelector('.close-nav');

    // Toggle menu for mobile
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    closeNav.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });

    // Toggle services dropdown for both desktop and mobile
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');

        // Toggle arrow direction and content visibility
        const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
        if (servicesDropdown.classList.contains('active')) {
            dropdownToggle.classList.add('active');
            dropdownContent.style.display = 'flex';
            dropdownToggle.style.transform = 'rotate(180deg)'; // Arrow up
        } else {
            dropdownToggle.classList.remove('active');
            dropdownContent.style.display = 'none';
            dropdownToggle.style.transform = 'rotate(0deg)'; // Arrow down
        }
    });

    // Handle screen resizing
    window.addEventListener('resize', () => {
        const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
        if (window.innerWidth > 768) {
            dropdownContent.style.display = servicesDropdown.classList.contains('active') ? 'flex' : 'none';
        } else {
            dropdownContent.style.display = 'none';
        }
    });
});
//nav//




document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

//testimonial//

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 2,
        },
    }
});





    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });

        function validateForm() {
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            return isValid;
        }
    }

    

    // Sticky header
    const header = document.querySelector('header');
    if (header) {
        const sticky = header.offsetTop;
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > sticky) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Load more functionality for services
    const loadMoreBtns = document.querySelectorAll('.load-more');
    loadMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceType = this.dataset.serviceType;
            const hiddenServices = document.querySelectorAll(`.${serviceType}-service.hidden`);
            hiddenServices.forEach(service => service.classList.remove('hidden'));
            this.style.display = 'none';
        });
    });
});

