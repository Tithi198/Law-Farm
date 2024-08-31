
const timezones = [
    { region: "Pacific Time - US & Canada", offset: -7 },
    { region: "Mountain Time - US & Canada", offset: -6 },
    { region: "Central Time - US & Canada", offset: -5 },
    { region: "Eastern Time - US & Canada", offset: -4 },
    { region: "Alaska Time", offset: -8 },
    { region: "Asia/Dhaka", offset: 6 },
    { region: "Greenwich Mean Time", offset: 0 },
    { region: "Central European Time", offset: 2 },
    // Add more time zones as needed
];

let currentOffset = 6; // Default to Asia/Dhaka (GMT+6)
let selectedDate = new Date();

const timezoneList = document.getElementById("timezoneList");
const selectedTimezoneDisplay = document.getElementById("selectedTimezone");
const timezoneDropdown = document.getElementById("timezoneDropdown");
const timezoneSearch = document.getElementById("timezoneSearch");
const currentMonthDisplay = document.getElementById("currentMonth");
const daysContainer = document.getElementById("daysContainer");
const timeFormatToggle = document.getElementById("timeFormatToggle");
const prevMonthButton = document.querySelector('.prev-month');
const nextMonthButton = document.querySelector('.next-month');

// Populate the days in the calendar based on the selected date
function populateDays(date) {
    daysContainer.innerHTML = '';
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Fill the blank days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<span class="empty"></span>`;
    }

    // Fill the days of the month
    for (let i = 1; i <= lastDate; i++) {
        const daySpan = document.createElement('span');
        daySpan.textContent = i;

        if (i === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()) {
            daySpan.classList.add('selected');
        }

        daySpan.addEventListener('click', () => {
            selectedDate.setDate(i);
            selectedDate.setMonth(date.getMonth());
            selectedDate.setFullYear(date.getFullYear());

            // Re-render the days to reflect the selected date
            populateDays(date);
        });

        daysContainer.appendChild(daySpan);
    }
}

// Update the calendar to show the selected month and timezone
function updateCalendar(timezone) {
    const utc = selectedDate.getTime() + (selectedDate.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * timezone.offset));

    const month = localTime.toLocaleString('default', { month: 'long' });
    const year = localTime.getFullYear();
    currentMonthDisplay.textContent = `${month} ${year}`;

    const hours = localTime.getHours();
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    const timeFormat = timeFormatToggle.checked ? '24h' : 'am/pm';
    let timeString = '';

    if (timeFormat === '24h') {
        timeString = `${hours}:${minutes}`;
    } else {
        const period = hours >= 12 ? 'pm' : 'am';
        const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        timeString = `${hour12}:${minutes}${period}`;
    }

    selectedTimezoneDisplay.innerHTML = `🌍 ${timezone.region} (${timeString}) ▼`;

    populateDays(selectedDate);
}

// Toggle the dropdown visibility
function toggleDropdown() {
    timezoneDropdown.style.display = timezoneDropdown.style.display === 'block' ? 'none' : 'block';
}

// Filter the timezones based on the search input
function filterTimezones() {
    const searchValue = timezoneSearch.value.toLowerCase();
    timezoneList.innerHTML = "";
    const filteredTimezones = timezones.filter(tz => 
        tz.region.toLowerCase().includes(searchValue)
    );
    filteredTimezones.forEach(tz => {
        const timezoneDiv = document.createElement("div");
        timezoneDiv.innerHTML = `<span>${tz.region}</span><span>${getTimezoneTime(tz.offset)}</span>`;
        timezoneDiv.addEventListener("click", () => {
            updateCalendar(tz);
            toggleDropdown();
        });
        timezoneList.appendChild(timezoneDiv);
    });
}

// Get the current time for a specific timezone offset
function getTimezoneTime(offset) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (3600000 * offset));

    const hours = localTime.getHours();
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    const timeFormat = timeFormatToggle.checked ? '24h' : 'am/pm';
    let timeString = '';

    if (timeFormat === '24h') {
        timeString = `${hours}:${minutes}`;
    } else {
        const period = hours >= 12 ? 'pm' : 'am';
        const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        timeString = `${hour12}:${minutes}${period}`;
    }

    return timeString;
}

// Handle the time format toggle (am/pm and 24h)
function formatTimeToggle() {
    filterTimezones(); // Re-filter to update the displayed time format
    updateCalendar(timezones.find(tz => tz.offset === currentOffset));
}

// Navigate to the previous month
function showPreviousMonth() {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    updateCalendar(timezones.find(tz => tz.offset === currentOffset));
}

// Navigate to the next month
function showNextMonth() {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    updateCalendar(timezones.find(tz => tz.offset === currentOffset));
}

// Event listeners
timezoneSearch.addEventListener("input", filterTimezones);
selectedTimezoneDisplay.addEventListener("click", toggleDropdown);
timeFormatToggle.addEventListener("change", formatTimeToggle);
prevMonthButton.addEventListener("click", showPreviousMonth);
nextMonthButton.addEventListener("click", showNextMonth);

// Initial population of timezones and calendar
filterTimezones();
updateCalendar(timezones.find(tz => tz.region === "Asia/Dhaka"));


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
