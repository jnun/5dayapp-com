// Password protection
const CORRECT_PASSWORD = 'faith2025';
const MAX_ATTEMPTS = 5;
const SESSION_KEY = 'pitch_authenticated';
let attempts = 0;

// Consolidated initialization
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem(SESSION_KEY);
    if (isAuthenticated === 'true') {
        unlockContent();
        addAccessTimestamp();
    }

    // Setup smooth scroll for internal links
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

    // Content protection
    const protectedContent = document.getElementById('protected-content');
    if (protectedContent) {
        // Disable right-click
        protectedContent.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Disable dev tools shortcuts
        document.addEventListener('keydown', (e) => {
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

function checkPassword(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const enteredPassword = passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        unlockContent();
        addAccessTimestamp();
    } else {
        attempts++;

        if (attempts >= MAX_ATTEMPTS) {
            errorMessage.textContent = 'Too many failed attempts. Please refresh and try again.';
            passwordInput.disabled = true;
            document.querySelector('.btn-unlock').disabled = true;
        } else {
            errorMessage.textContent = `Incorrect password. ${MAX_ATTEMPTS - attempts} attempts remaining.`;
            passwordInput.value = '';
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
        }
    }

    return false;
}

function unlockContent() {
    const passwordGate = document.getElementById('password-gate');
    const protectedContent = document.getElementById('protected-content');

    passwordGate.style.opacity = '0';
    passwordGate.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        passwordGate.style.display = 'none';
        protectedContent.style.display = 'block';
        setTimeout(() => protectedContent.style.opacity = '1', 50);
    }, 500);
}

function addAccessTimestamp() {
    const footer = document.querySelector('.pitch-footer .container');
    if (footer && !footer.querySelector('.access-timestamp')) {
        const accessInfo = document.createElement('div');
        accessInfo.className = 'access-timestamp';
        accessInfo.style.cssText = 'text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2); font-size: 0.75rem; color: rgba(255,255,255,0.5);';
        accessInfo.textContent = `Document accessed: ${new Date().toLocaleString()}`;
        footer.appendChild(accessInfo);
    }
}

// Add animations via CSS injection (cleaner than inline)
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
