document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdownContent.style.display = '';
        }
    });
});

//faq//

document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        if (!isActive) {
            item.classList.add('active');
            item.nextElementSibling.style.display = 'block';
        }
    });
});

//faq//
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

//testimonial//



// nav bar 
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const servicesToggle = document.querySelector('.services-toggle');
    const servicesDropdown = document.querySelector('.services-dropdown');
    const closeNav = document.querySelector('.close-nav');

    // Toggle menu for mobile
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    closeNav.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });

    // Toggle services dropdown for both desktop and mobile
    servicesToggle.addEventListener('click', (e) => {
        e.preventDefault();
        servicesDropdown.classList.toggle('active');

        // Update arrow direction
        const arrow = servicesToggle.querySelector('i');
        if (servicesDropdown.classList.contains('active')) {
            arrow.style.transform = 'rotate(180deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }

        // Ensure dropdown content is fixed on screen
        if (window.innerWidth <= 768) {
            const dropdownContent = servicesDropdown.querySelector('.dropdown-content');
            dropdownContent.style.display = servicesDropdown.classList.contains('active') ? 'flex' : 'none';
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
