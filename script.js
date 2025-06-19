const nextBtn = document.getElementById("next-image");
const prevBtn = document.getElementById("prev-image");
const imageTitle = document.getElementById("image-title");
const playerImage = document.getElementById("player-image");


const active_page = document.querySelector(".active")
// Image list with titles
const images = [
    { src: './image3.jpg', title: 'First Image' },
    { src: './hero.jpg', title: 'Second Image' },
    { src: './image3.jpg', title: 'Third Image' }
];

let currentIndex = 0;

// Function to update image and title
function updateImage() {
    const current = images[currentIndex];
    playerImage.src = current.src;
    imageTitle.innerText = current.title;
}

// Event listeners
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

// Initialize with first image
updateImage();


//  ================================= JOBS TYPING ====================================

const my_jobs = document.getElementById("my-jobs");
function change_jobs() {
    const jobs = [
        'Web Developer',
        'Django Dev',
        'Network Engineer',
        'AI Developer'
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentJob = jobs[index];
        
        if (isDeleting) {
            charIndex--;
            my_jobs.innerText = currentJob.substring(0, charIndex);
        } else {
            charIndex++;
            my_jobs.innerText = currentJob.substring(0, charIndex);
        }

        // Typing speed
        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentJob.length) {
            // Pause before deleting
            typingSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next job and start typing
            isDeleting = false;
            index = (index + 1) % jobs.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect(); // Start the effect
}



change_jobs()


// themes

const dark_mode = document.getElementById("dark-mode");
const light_mode = document.getElementById("light-mode");
const body_theme = document.body;

// Function to apply theme based on mode
function applyTheme(theme) {
    if (theme === "dark") {
        dark_mode.style.display = "none";
        light_mode.style.display = "block";
        light_mode.style.float = "left";
        body_theme.classList.remove("light-theme");
        body_theme.classList.add("dark-theme");
    } else {
        light_mode.style.display = "none";
        dark_mode.style.display = "block";
        dark_mode.style.float = "right";
        body_theme.classList.remove("dark-theme");
        body_theme.classList.add("light-theme");
    }
}

// Event listeners
dark_mode.addEventListener("click", () => {
    localStorage.setItem("theme", "dark");
    applyTheme("dark");
});

light_mode.addEventListener("click", () => {
    localStorage.setItem("theme", "light");
    applyTheme("light");
});

// On page load: apply saved theme or default to light
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
});


//  <<< ====================== Project Bar in about section =========================== >>>
const success_project = document.querySelector("#project-success p");
let countStarted = false;

function updateCount() {
    let count = 0;
    const target = 30;

    function increment() {
        if (count <= target) {
            success_project.innerText = count + "+";
            count++;
            setTimeout(increment, 50); // Speed of counting
        }
    }

    increment();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countStarted) {
            countStarted = true;
            updateCount();
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Start observing
observer.observe(document.querySelector("#project-success"));



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<A B O U T>>>>>>>>>>>>>>>>>>
/**
 * Set the progress value of the circular progress bar
 * @param {number} percent - The progress percentage (0-100)
 */
function setProgress(percent) {
  // Find the progress circle element
  const circle = document.querySelector('.progress-ring-circle');
  const text = document.querySelector('.progress-text');
  
  if (!circle || !text) return;
  
  // Calculate the circumference
  const radius = circle.getAttribute('r');
  const circumference = 2 * Math.PI * radius;
  
  // Update the circle stroke offset based on percentage
  const offset = circumference - (percent / 100 * circumference);
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
  
  // Update the text with animation
  animateCounter(text, parseInt(text.textContent) || 0, percent);
}

/**
 * Animate the percentage counter
 * @param {Element} element - The element containing the percentage text
 * @param {number} start - Starting percentage
 * @param {number} end - Target percentage
 */
function animateCounter(element, start, end) {
  let current = start;
  const increment = end > start ? 1 : -1;
  const duration = 500; // ms
  const steps = Math.abs(end - start);
  const stepTime = steps > 0 ? duration / steps : duration;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = `${current}%`;
    
    if ((increment > 0 && current >= end) || 
        (increment < 0 && current <= end)) {
      element.textContent = `${end}%`;
      clearInterval(timer);
    }
  }, stepTime);
}

// Initialize with a starting value
