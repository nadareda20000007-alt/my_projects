document.addEventListener('DOMContentLoaded', () => {
    // 1. HERO IMAGE ANIMATION
    const heroImageWrapper = document.getElementById('heroImageWrapper');
    if (heroImageWrapper) {
        setTimeout(() => {
            heroImageWrapper.classList.add('animate-in');
        }, 200);
    }

    // 2. MOBILE NAVBAR MENU LOGIC
    const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
    const menuOpenButton = document.querySelector("#menu-open-button");
    const menuCloseButton = document.querySelector("#menu-close-button");

    if (menuOpenButton) {
        menuOpenButton.addEventListener("click", () => {
            document.body.classList.toggle("show-mobile-menu");
        });
    }

    if (menuCloseButton) {
        menuCloseButton.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    }

    if (navbarLinks) {
        navbarLinks.forEach((link) => {
            link.addEventListener("click", () => {
                document.body.classList.remove("show-mobile-menu");
            });
        });
    }
});


// 3. SCROLL blur ANIMATION FOR SECTIONS
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});




// 4. SMOOTH SCROLLING FOR ANCHOR LINKS
function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Hook it up to all nav/anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
            e.preventDefault();
            const headerOffset = 90; // match your header height
            const targetY = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
            smoothScrollTo(targetY, 1200); // 1200ms = 1.2s, adjust for speed
        }
    });
});



// 5. FADE-IN ANIMATION FOR ROADMAP STEPS (repeats every time)
const roadmapSteps = document.querySelectorAll('.roadmap-step');

if (roadmapSteps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.3 });

    roadmapSteps.forEach(step => stepObserver.observe(step));
}


// 6. FADE-IN ANIMATION FOR SECTIONS (repeats every time)
const fadeSections = document.querySelectorAll('.fade-section');

if (fadeSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => sectionObserver.observe(section));
}



 // ==========================================
    // 1. FORM SUBMISSION LOGIC
    // ==========================================
    const form = document.getElementById('form');
    
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    form.reset();
                } else {
                    alert("Error: " + data.message);
                }

            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }







