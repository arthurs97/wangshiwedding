// Password Protection for Static Site
// Note: Client-side protection can be bypassed, but this makes it reasonably difficult

(function() {
    'use strict';

    // Password hash (SHA-256 hash of your password)
    // To set a new password, hash it using: https://emn178.github.io/online-tools/sha256.html
    // Replace the hash below with your desired password's SHA-256 hash
    const PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // Default: "password"
    
    // Check if already authenticated in this session
    const isAuthenticated = () => {
        return sessionStorage.getItem('wedding_auth') === 'true';
    };

    // Hash a string using SHA-256
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Show password prompt
    function showPasswordPrompt() {
        const overlay = document.createElement('div');
        overlay.id = 'passwordOverlay';
        overlay.innerHTML = `
            <div class="password-prompt">
                <h2>Welcome</h2>
                <p>Please enter the password to view the wedding website</p>
                <input type="password" id="passwordInput" placeholder="Enter password" autofocus>
                <button id="passwordSubmit">Enter</button>
                <p class="password-error" id="passwordError" style="display: none; color: #d32f2f; margin-top: 1rem; font-size: 0.9rem;">Incorrect password. Please try again.</p>
            </div>
        `;
        document.body.appendChild(overlay);

        const input = document.getElementById('passwordInput');
        const submit = document.getElementById('passwordSubmit');
        const error = document.getElementById('passwordError');

        const checkPassword = async () => {
            const entered = input.value;
            const enteredHash = await sha256(entered);
            
            if (enteredHash === PASSWORD_HASH) {
                sessionStorage.setItem('wedding_auth', 'true');
                overlay.remove();
                showContent();
            } else {
                error.style.display = 'block';
                input.value = '';
                input.focus();
            }
        };

        submit.addEventListener('click', checkPassword);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    // Show the main content
    function showContent() {
        const mainContent = document.querySelector('.main-content');
        const nav = document.querySelector('.main-nav');
        const footer = document.querySelector('.site-footer');
        
        if (mainContent) mainContent.style.display = 'block';
        if (nav) nav.style.display = 'flex';
        if (footer) footer.style.display = 'block';
    }

    // Hide the main content
    function hideContent() {
        const mainContent = document.querySelector('.main-content');
        const nav = document.querySelector('.main-nav');
        const footer = document.querySelector('.site-footer');
        
        if (mainContent) mainContent.style.display = 'none';
        if (nav) nav.style.display = 'none';
        if (footer) footer.style.display = 'none';
    }

    // Initialize
    if (isAuthenticated()) {
        showContent();
    } else {
        hideContent();
        showPasswordPrompt();
    }
})();

