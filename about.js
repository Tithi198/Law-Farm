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
