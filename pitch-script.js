// Password protection
// Change this to your desired password
const CORRECT_PASSWORD = 'faith2025';

// Max login attempts
const MAX_ATTEMPTS = 5;
let attempts = 0;

// Session storage key
const SESSION_KEY = 'pitch_authenticated';

// Check if already authenticated in this session
window.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = sessionStorage.getItem(SESSION_KEY);

    if (isAuthenticated === 'true') {
        unlockContent();
    }
});

function checkPassword(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const enteredPassword = passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password
        sessionStorage.setItem(SESSION_KEY, 'true');
        unlockContent();
    } else {
        // Incorrect password
        attempts++;

        if (attempts >= MAX_ATTEMPTS) {
            errorMessage.textContent = 'Too many failed attempts. Please contact the administrator.';
            passwordInput.disabled = true;
            document.querySelector('.btn-unlock').disabled = true;
        } else {
            errorMessage.textContent = `Incorrect password. ${MAX_ATTEMPTS - attempts} attempts remaining.`;
            passwordInput.value = '';
            passwordInput.classList.add('shake');
            setTimeout(() => {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }

    return false;
}

function unlockContent() {
    const passwordGate = document.getElementById('password-gate');
    const protectedContent = document.getElementById('protected-content');

    // Fade out password gate
    passwordGate.style.opacity = '0';
    passwordGate.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        passwordGate.style.display = 'none';
        protectedContent.style.display = 'block';

        // Animate content in
        setTimeout(() => {
            protectedContent.style.opacity = '1';
        }, 50);
    }, 500);
}

// Add shake animation for incorrect password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }

    .shake {
        animation: shake 0.5s;
        border-color: var(--error-color) !important;
    }

    .protected-content {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// Smooth scroll for any internal links
document.addEventListener('DOMContentLoaded', () => {
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
});

// Prevent right-click and certain keyboard shortcuts to protect content
document.addEventListener('DOMContentLoaded', () => {
    const protectedContent = document.getElementById('protected-content');

    if (protectedContent) {
        // Disable right-click on protected content
        protectedContent.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Disable certain keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'U')
            ) {
                e.preventDefault();
                return false;
            }
        });
    }
});

// Add watermark with timestamp
window.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = sessionStorage.getItem(SESSION_KEY);

    if (isAuthenticated === 'true') {
        const footer = document.querySelector('.pitch-footer .container');
        if (footer) {
            const accessInfo = document.createElement('div');
            accessInfo.style.cssText = 'text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2); font-size: 0.75rem; color: rgba(255,255,255,0.5);';
            accessInfo.textContent = `Document accessed on: ${new Date().toLocaleString()}`;
            footer.appendChild(accessInfo);
        }
    }
});
