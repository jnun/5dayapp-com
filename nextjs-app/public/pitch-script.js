// Password protection
const MAX_ATTEMPTS = 5;
let attempts = 0;

// Consolidated initialization
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication via API
    try {
        const response = await fetch('/api/auth');
        const data = await response.json();
        if (data.authenticated) {
            unlockContent();
            addAccessTimestamp();
        }
    } catch (error) {
        console.error('Auth check failed:', error);
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

async function checkPassword(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.querySelector('.btn-unlock');
    const enteredPassword = passwordInput.value;

    // Disable form during submission
    passwordInput.disabled = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Verifying...';

    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: enteredPassword }),
        });

        const data = await response.json();

        if (data.success) {
            unlockContent();
            addAccessTimestamp();
        } else {
            attempts++;

            if (attempts >= MAX_ATTEMPTS) {
                errorMessage.textContent = 'Too many failed attempts. Please refresh and try again.';
            } else {
                errorMessage.textContent = data.error || `Incorrect password. ${MAX_ATTEMPTS - attempts} attempts remaining.`;
                passwordInput.value = '';
                passwordInput.classList.add('shake');
                setTimeout(() => passwordInput.classList.remove('shake'), 500);
                passwordInput.disabled = false;
                submitButton.disabled = false;
                submitButton.textContent = 'Unlock';
            }
        }
    } catch (error) {
        errorMessage.textContent = 'Authentication failed. Please try again.';
        passwordInput.disabled = false;
        submitButton.disabled = false;
        submitButton.textContent = 'Unlock';
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
