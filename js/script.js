// Collapsible Experience Timeline
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    const expandBtns = document.querySelectorAll('.expand-btn');

    // Handle expand/collapse button clicks
    expandBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering other click events

            const timelineContent = this.closest('.timeline-content');
            const isCurrentlyExpanded = !timelineContent.classList.contains('collapsed');

            // Collapse all other items first
            timelineItems.forEach(item => {
                if (item !== timelineContent) {
                    item.classList.add('collapsed');
                }
            });

            // Toggle the current item
            if (isCurrentlyExpanded) {
                timelineContent.classList.add('collapsed');
            } else {
                timelineContent.classList.remove('collapsed');
            }
        });
    });

    // Optional: Click on header to toggle (in addition to button)
    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-header');
        if (header) {
            header.addEventListener('click', function(e) {
                // Don't trigger if clicking on the button itself
                if (!e.target.classList.contains('expand-btn') && !e.target.closest('.expand-btn')) {
                    const btn = this.querySelector('.expand-btn');
                    if (btn) {
                        btn.click(); // Trigger the button click
                    }
                }
            });
        }
    });

    // Close expanded items when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideTimeline = e.target.closest('.timeline-content');
        if (!isClickInsideTimeline) {
            timelineItems.forEach(item => {
                item.classList.add('collapsed');
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Ensure proper collapsed state on resize
        if (window.innerWidth <= 768) {
            // On mobile, you might want different behavior
            // For now, just ensure consistency
            timelineItems.forEach(item => {
                if (item.classList.contains('collapsed')) {
                    item.classList.add('collapsed');
                }
            });
        }
    });

    // Prevent body scroll when hovering over expanded content on mobile
    timelineItems.forEach(item => {
        const details = item.querySelector('.timeline-details');

        if (details) {
            details.addEventListener('touchstart', function(e) {
                // Allow native scrolling within the details container
                e.stopPropagation();
            });

            details.addEventListener('touchmove', function(e) {
                // Prevent page scroll when scrolling within details
                if (this.scrollHeight > this.clientHeight) {
                    e.stopPropagation();
                }
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}

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

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        this.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    });
});

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Enhanced form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        setTimeout(() => {
            this.reset();
            submitButton.textContent = '✓ Message Sent!';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Page load animations
window.addEventListener('load', () => {
    // Fade in page content
    document.body.style.opacity = '1';

    // Animate skill tags on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill cards for animation
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
