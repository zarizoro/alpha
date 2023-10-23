document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded triggered");

let stars = document.getElementById('stars');
let Ella_Solo = document.getElementById('Ella_Solo');
let gajah = document.getElementById('gajah');     
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let btn2 = document.getElementById('btn2');
let bouncingArrowContainer = document.getElementById('bouncing-arrow-container');
let logo1 = document.getElementById('logo1');
let timer = document.getElementById('timer');
let mountains_front = document.getElementById('mountains_front');
let header = document.querySelector('header');


window.addEventListener('scroll', function () {
    let value = window.scrollY;
    stars.style.left = value * 0.25 + 'px';
    gajah.style.top = value * 0.5 + 'px';
    Ella_Solo.style.top = value * 0.6 + 'px';
    logo1.style.top = value * 0.8 + 'px';
    timer.style.top = `calc(50% + ${value * 0.8}px)`;

    mountains_behind.style.top = value * 0.5 + 'px';
    mountains_front.style.top = value * 0 + 'px';
    btn.style.marginTop = value * 1.5 + 'px';
    btn2.style.marginTop = value * 1.5 + 'px';
    let arrowContainerTop = value * 2.3 + 'px'
    bouncingArrowContainer.style.marginTop = arrowContainerTop;
    
    // Sticky header logic
    if (value > 0) {
        header.style.position = 'fixed';
        header.style.top = '0';
    } else {
        header.style.position = 'absolute';
        header.style.top = '0';
    }
});

// Get a reference to the "ELLA" logo
let ellaLogo = document.querySelector('.logo');

// Get a reference to the "About" section
let aboutSection = document.getElementById('About');

// Add a scroll event listener
window.addEventListener('scroll', function () {
    // Get the current scroll position
    let scrollPosition = window.scrollY;

    // Define the scroll position to show/hide the logo
    let showLogoPosition = aboutSection.offsetTop - 100; // Adjust the offset as needed

    // Toggle the visibility of the logo based on the scroll position
    if (scrollPosition >= showLogoPosition) {
        ellaLogo.style.display = 'block';
    } else {
        ellaLogo.style.display = 'none';
    }
});



// Function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Function to animate number count
function animateValue(id, start, end, duration, isPercentage = false) {
    const obj = document.getElementById(id);
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = formatNumber(Math.floor(progress * (end - start) + start));
        if (isPercentage) {
            obj.innerHTML += '%';
        }
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// Event listener for scroll
window.addEventListener('scroll', () => {
    const infoItems = document.querySelectorAll('.info-item p');
    infoItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            if (item.id === "taxCount") {
                animateValue(item.id, 0, parseInt(item.innerText), 2000, true); // true for percentage
            } else {
                animateValue(item.id, 0, parseInt(item.innerText.replace(/,/g, '')), 2000); // remove commas for calculation
            }
            item.id = ""; // Remove the id to prevent re-animation
        }
    });
});

const menuToggle = document.querySelector('.menu-toggle');
const navOverlay = document.querySelector('.nav-overlay');
const overlayLinks = document.querySelectorAll('.overlay-nav a');

menuToggle.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
});



overlayLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = event.target.getAttribute('href');
        
        // Check if the link has a fragment identifier
        if (targetId.startsWith('#')) {
            event.preventDefault();
            navOverlay.classList.remove('active');
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } else {
            // This will be executed for links that don't start with '#', like "Contact.html"
            navOverlay.classList.remove('active');
        }
    });
});






const faqItems = document.querySelectorAll('.faq-item');
    
faqItems.forEach(item => {
    item.addEventListener('click', function() {
        const clickedAnswer = this.querySelector('.faq-answer');
        
        // Hide all answers
        faqItems.forEach(innerItem => {
            const answer = innerItem.querySelector('.faq-answer');
            if (answer !== clickedAnswer) {
                answer.style.display = 'none';
            }
        });

        // Toggle the clicked answer
        if (clickedAnswer.style.display === 'block') {
            clickedAnswer.style.display = 'none';
        } else {
            clickedAnswer.style.display = 'block';
        }
    });
});

$(document).ready(function() {
    $('.about').hover(
        function() { // Mouse enter
            let video = $('.bg-video').get(0);
            video.play();
            video.style.opacity = "0.2";
        },
        function() { // Mouse leave
            let video = $('.bg-video').get(0);
            video.pause();
            video.currentTime = 0;  // Optional: This will rewind the video
            video.style.opacity = "0";
        }
    );
});

$(document).ready(function() {
    // Detect hover over any 'getting-started-content' section
    $('.getting-started-content').hover(
        function() { // Mouse enter
            $('.getting-started h2').addClass('heading-glow');  // Add glow effect to heading
        },
        function() { // Mouse leave
            $('.getting-started h2').removeClass('heading-glow');  // Remove glow effect from heading
        }
    );
});

const modal = document.getElementById("musicModal");
const btnWithMusic = document.getElementById("withMusic");
const btnWithoutMusic = document.getElementById("withoutMusic");
const close = document.getElementsByClassName("close")[0];

window.onload = () => {
    modal.style.display = "block";
}

btnWithMusic.onclick = () => {
    playMusic();
    modal.style.display = "none";
}

btnWithoutMusic.onclick = () => {
    modal.style.display = "none";
}

close.onclick = () => {
    modal.style.display = "none";
}

function playMusic() {
    let music = document.getElementById("backgroundMusic");
    
    // If the audio element doesn't exist, create it
    if (!music) {
        music = document.createElement("audio");
        music.id = "backgroundMusic";
        music.loop = true;

        const source = document.createElement("source");
        source.src = "audio/phonk.mp3";
        source.type = "audio/mpeg";

        music.appendChild(source);
        document.body.appendChild(music);
    }
    // SET MUSIC VOLUME
    music.volume = 0.3;

    // Play the music
    let playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Playback started!
        })
        .catch(error => {
            console.error("Playback failed:", error);
        });
    }
}

const videoElement = document.querySelector('.under');
const playButton = document.querySelector('.play-pause-button .fa-play');
const pauseButton = document.querySelector('.play-pause-button .fa-pause');
const video = document.querySelector('.under');

playButton.addEventListener('click', function() {
    videoElement.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
});

pauseButton.addEventListener('click', function() {
    videoElement.pause();
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
});

videoElement.addEventListener('ended', function() {
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.under');
    video.volume = 0.7; // This sets the video volume to 20% of its original volume
});

function countdown() {
    const now = new Date();
    
    const eventTimeUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 4, 0, 0); // 4am UTC which is 11am UTC+7

    if (now.getTime() + now.getTimezoneOffset() * 60 * 1000 > eventTimeUTC) {
        eventTimeUTC.setDate(eventTimeUTC.getDate() + 1);
    }

    const diff = eventTimeUTC - (now.getTime() + now.getTimezoneOffset() * 60 * 1000);

    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('hours').textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(countdown, 1000);


});

