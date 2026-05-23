// js/dashboard.js - Handles fetching and rendering client data on the dashboard page.

document.addEventListener('DOMContentLoaded', () => {
    // Check if the current page is the dashboard
    if (!window.location.pathname.includes('dashboard.html')) return;

    // Requires mock DB functions from db-config.js
    if (typeof getMockDB === 'undefined') {
        app.notify('Database configuration missing. Cannot load dashboard data.', 'error');
        return;
    }
    
    // Ensure user is logged in before rendering
    if (!app.state.isLoggedIn) {
        app.notify('Access Denied. Redirecting to login.', 'error');
        setTimeout(() => window.location.href = 'login.html', 500);
        return;
    }
    
    // Set user name on the header
    document.getElementById('user-name').innerText = app.state.user.name || 'Client';
    
    // Render the Dashboard Data
    renderDashboard(app.state.user.id);
});

function renderDashboard(userId) {
    const mockDB = getMockDB();
    const clientJobs = mockDB.jobs.filter(job => job.client_id === userId);
    const clientAppointments = mockDB.appointments.filter(appt => appt.client_id === userId);
    
    // --- 1. Render Active Status ---
    const activeJob = clientJobs.find(job => job.status !== 'Completed');
    const statusContainer = document.getElementById('active-status-container');
    
    if (activeJob && statusContainer) {
        statusContainer.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-slate-800">Active Repair Status</h3>
                <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">${activeJob.status}</span>
            </div>
            
            <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-2xl">
                    <i class="fa-solid fa-car"></i>
                </div>
                <div>
                    <h4 class="font-bold text-lg">${activeJob.car}</h4>
                    <p class="text-slate-500 text-sm">Job #${activeJob.id} • ${activeJob.service}</p>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="relative pt-6">
                <div class="flex mb-2 items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span class="${activeJob.progress >= 20 ? 'text-brand-600' : ''}">Check-in</span>
                    <span class="${activeJob.progress >= 50 ? 'text-brand-600' : ''}">Diagnostic</span>
                    <span class="${activeJob.progress >= 70 ? 'text-brand-600' : ''}">Repairing</span>
                    <span class="${activeJob.progress >= 95 ? 'text-brand-600' : ''}">Ready</span>
                </div>
                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                    <div style="--progress-width: ${activeJob.progress}%" class="progress-bar-fill shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-600 transition-all duration-1000 ease-out"></div>
                </div>
                <p class="text-sm text-slate-500 italic text-right">Estimated completion: ${activeJob.eta}</p>
            </div>
        `;
    } else if(statusContainer) {
        statusContainer.innerHTML = '<p class="text-slate-500 text-center py-10">No active repairs currently in the shop. Book a service today!</p>';
    }

    // --- 2. Render Upcoming Appointments ---
    const upcomingAppt = clientAppointments[0];
    const upcomingContainer = document.getElementById('upcoming-appt-card');
    if (upcomingAppt && upcomingContainer) {
        upcomingContainer.querySelector('#appt-date').innerText = upcomingAppt.date;
        upcomingContainer.querySelector('#appt-time').innerText = upcomingAppt.time;
        upcomingContainer.querySelector('#appt-service').innerText = upcomingAppt.service;
        upcomingContainer.classList.remove('hidden');
    }
    
    // --- 3. Render Service History ---
    const historyContainer = document.getElementById('service-history');
    if (historyContainer) {
        // Only show completed jobs in history
        const completedJobs = clientJobs.filter(job => job.status === 'Completed');
        if (completedJobs.length > 0) {
            historyContainer.innerHTML = completedJobs.map(job => `
                <div class="flex justify-between items-center py-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition px-2 -mx-2 rounded-lg">
                    <div class="flex items-center space-x-4">
                        <i class="fa-solid fa-check-circle text-lg text-green-500"></i>
                        <div>
                            <p class="font-medium text-slate-800">${job.service}</p>
                            <p class="text-sm text-slate-500">${job.car} (Job #${job.id})</p>
                        </div>
                    </div>
                    <span class="text-sm font-semibold text-slate-600">${job.eta}</span>
                </div>
            `).join('');
        } else {
            historyContainer.innerHTML = '<p class="text-slate-500 text-center py-4">No completed service history found.</p>';
        }
    }
}