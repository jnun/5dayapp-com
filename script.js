// Smooth scroll behavior
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

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe feature cards and other elements
document.querySelectorAll('.feature-card, .step, .use-case').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');
        const formMessage = document.getElementById('form-message');

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
        };

        // Disable button and show loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        formMessage.className = 'form-message';

        try {
            // Create form data for Mailgun
            const mailgunData = new URLSearchParams();
            mailgunData.append('from', `${formData.name} <noreply@5dayapp.com>`);
            mailgunData.append('to', 'jason@upgrademedia.com');
            mailgunData.append('subject', `New Contact Form: ${formData.company || formData.name}`);
            mailgunData.append('text', `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message}
            `);
            mailgunData.append('h:Reply-To', formData.email);

            // Send via Mailgun API
            // NOTE: This file is deprecated. Use the Next.js app instead for secure API key handling.
            // See nextjs-app/ directory for the secure implementation.
            const response = await fetch('https://api.mailgun.net/v3/mail.5dayapp.com/messages', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa('api:YOUR_API_KEY_HERE')
                },
                body: mailgunData
            });

            if (response.ok) {
                formMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            formMessage.textContent = 'Failed to send message. Please try again or email us directly.';
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
});
