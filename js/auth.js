// js/auth.js - Handles client authentication and state persistence (uses main.js for UI/Notifications)

app.AUTH_KEY = 'car_service_client_auth';

// ===================================
// 1. Initial State Check
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const storedState = localStorage.getItem(app.AUTH_KEY);
    if (storedState) {
        try {
            const authState = JSON.parse(storedState);
            app.state = {
                isLoggedIn: authState.isLoggedIn,
                user: authState.user || { name: 'Client' }
            };
            app.updateAuthUI(app.state.isLoggedIn, app.state.user.name);
        } catch (error) {
            console.error("Error parsing stored auth state:", error);
            app.logout(); 
        }
    } else {
        app.updateAuthUI(false);
    }
});


// ===================================
// 2. Core Auth Functions
// ===================================

app.handleLogin = function(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const btn = form.querySelector('button');

    if (!email || !password) {
        app.notify('Please enter both email and password.', 'error');
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Signing In...';
    btn.disabled = true;

    // --- MOCK LOGIN LOGIC ---
    setTimeout(() => {
        if (email === 'demo@client.com' && password === 'password') {
            app.state.isLoggedIn = true;
            app.state.user = { id: 'user-123', name: 'Akhil Sharma', email: email };
            
            localStorage.setItem(app.AUTH_KEY, JSON.stringify(app.state));
            
            app.updateAuthUI(true, app.state.user.name);
            app.notify(`Welcome back, ${app.state.user.name}!`);
            
            window.location.href = 'dashboard.html';

        } else {
            app.notify('Invalid credentials. Use demo@client.com / password.', 'error');
        }

        btn.innerHTML = 'Sign In securely';
        btn.disabled = false;
    }, 1500);
};

app.handleRegister = function(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#reg-email').value;
    const password = form.querySelector('#reg-password').value;
    const confirmPassword = form.querySelector('#confirm-password').value;
    const name = form.querySelector('#name').value;
    const btn = form.querySelector('button');

    if (!name || !email || password !== confirmPassword || password.length < 6) {
        app.notify('Please fill all fields correctly. Passwords must match and be 6+ chars.', 'error');
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Registering...';
    btn.disabled = true;

    // --- MOCK REGISTRATION LOGIC ---
    setTimeout(() => {
        app.notify(`Success! Account created for ${email}. Please sign in.`);
        form.reset();
        window.location.href = 'login.html'; 
        
        btn.innerHTML = 'Create Account';
        btn.disabled = false;
    }, 2000);
};


app.logout = function() {
    app.state.isLoggedIn = false;
    app.state.user = {};
    localStorage.removeItem(app.AUTH_KEY);
    app.updateAuthUI(false);
    app.notify('Logged out successfully.', 'info');
    window.location.href = 'index.html'; 
};

// --- ADMIN LOGIN LOGIC ---
app.handleAdminLogin = function(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const btn = form.querySelector('button');

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying...';
    btn.disabled = true;

    setTimeout(() => {
        if (email === 'admin@wrench.com' && password === 'adminpass') {
            localStorage.setItem('isAdminLoggedIn', 'true');
            app.notify('Admin access granted!');
            window.location.href = 'admin-panel.html';
        } else {
            app.notify('Invalid Admin Credentials. Use admin@wrench.com / adminpass.', 'error');
            btn.innerHTML = 'Sign In as Admin';
            btn.disabled = false;
        }
    }, 1000);
};