// js/main.js - Global UI/UX functions and core application utilities

const app = {
    // Authentication state placeholder (actual state management is handled in auth.js)
    state: { isLoggedIn: false, user: {} },

    // Initialize the application
    init: function() {
        // 1. Ensure the toast container exists in the DOM
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        // 2. Attach event listener to mobile menu button
        const mobileBtn = document.getElementById('mobile-menu-button');
        if (mobileBtn) {
            mobileBtn.addEventListener('click', app.toggleMenu);
        }

        const loginDropdown = document.getElementById('login-dropdown');
        const loginMenu = document.getElementById('login-menu');
        if (loginDropdown && loginMenu) {
            loginDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
                loginMenu.classList.toggle('hidden');
            });
            document.addEventListener('click', function() {
                loginMenu.classList.add('hidden');
            });
        }

        // Note: Initial Auth check is handled by auth.js's DOMContentLoaded listener
    },

    // ===================================
    // 1. UI Utility: Toast Notifications
    // ===================================
    /**
     * Displays a non-blocking notification toast.
     * @param {string} message - The text to display.
     * @param {string} type - 'success' (default), 'error', or 'info'.
     */
    notify: function(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast transition';
        
        let iconHTML = '';
        let iconClass = 'text-brand-600'; 
        
        if (type === 'error') iconClass = 'text-red-600';
        else if (type === 'success') iconClass = 'text-green-600';
        
        // Select icon based on type
        const iconName = type === 'success' ? 'fa-check-circle' : 
                         type === 'error' ? 'fa-circle-exclamation' : 
                         'fa-circle-info';
        
        iconHTML = `<i class="fa-solid ${iconName} text-xl mr-3 ${iconClass}"></i>`;
        
        toast.innerHTML = `${iconHTML}<span class="font-medium text-slate-800">${message}</span>`;
        
        container.appendChild(toast);
        
        // Trigger slide-in animation
        requestAnimationFrame(() => toast.classList.add('show'));

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300); // Wait for slide-out transition
        }, 3000);
    },

    // ===================================
    // 2. UI Utility: Navigation & Menu
    // ===================================
    /**
     * Toggles the mobile navigation menu.
     */
    toggleMenu: function() {
        const menu = document.getElementById('mobile-menu');
        const icon = document.getElementById('mobile-menu-button')?.querySelector('i');

        if (!menu) return;

        if (menu.classList.contains('hidden')) {
            // Open Menu
            menu.classList.remove('hidden');
            setTimeout(() => menu.classList.add('open'), 10); 
            if (icon) icon.classList.replace('fa-bars', 'fa-times');
        } else {
            // Close Menu
            menu.classList.remove('open');
            setTimeout(() => menu.classList.add('hidden'), 300); // Wait for transition
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        }
    },

    /**
     * Updates the navigation bar based on login state.
     * @param {boolean} isLoggedIn - Status of authentication.
     * @param {string} name - User's name for the avatar (optional).
     */
    updateAuthUI: function(isLoggedIn, name = 'Client') {
        const guestNav = document.getElementById('nav-guest');
        const userNav = document.getElementById('nav-user');
        const avatar = document.getElementById('user-avatar');

        // Only proceed if nav elements exist on this page
        if (!guestNav || !userNav) return;

        if(isLoggedIn) {
            // Show User Nav, Hide Guest Nav
            guestNav.classList.add('hidden');
            userNav.classList.remove('hidden');
            userNav.classList.add('flex'); // Restore flex layout
            
            // Update avatar with user initial using placeholder service
            if (avatar) {
                const initial = name.charAt(0).toUpperCase();
                avatar.src = `https://placehold.co/32x32/6366f1/ffffff?text=${initial}`;
            }
        } else {
            // Show Guest Nav, Hide User Nav
            guestNav.classList.remove('hidden');
            userNav.classList.add('hidden');
            userNav.classList.remove('flex');
        }
    }
};

// Initialize App when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());
