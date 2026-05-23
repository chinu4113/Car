// js/admin.js - Handles logic for the protected Admin Dashboard (Mock Data)

document.addEventListener('DOMContentLoaded', () => {
    // Only proceed if running on the admin-panel page
    if (!window.location.pathname.includes('admin-panel.html')) return;
    
    // Check for admin session token (set in auth.js)
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        app.notify('Admin Session Expired. Please log in.', 'error');
        setTimeout(() => window.location.href = 'admin-login.html', 500);
        return;
    }
    
    // Load Admin Data
    renderAdminPanel();
    
    // Attach event listeners for actions
    document.getElementById('admin-logout-btn')?.addEventListener('click', adminLogout);
});

function renderAdminPanel() {
    const mockDB = getMockDB();
    // Filter out completed jobs to show 'Today\'s Schedule'
    const todayJobs = mockDB.jobs.filter(job => job.status !== 'Completed');
    const allAppointments = mockDB.appointments;

    // --- Render Today's Schedule ---
    const scheduleBody = document.getElementById('schedule-body');
    if (scheduleBody) {
        scheduleBody.innerHTML = todayJobs.map(job => `
            <tr class="border-b hover:bg-slate-50 transition">
                <td class="px-6 py-4 font-medium text-slate-900">${job.id}</td>
                <td class="px-6 py-4">${job.car} (Client ID: ${job.client_id})</td>
                <td class="px-6 py-4">${job.service}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-semibold rounded-full 
                        ${job.status === 'Repairing' ? 'bg-blue-100 text-blue-700' : job.status === 'Awaiting Approval' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}">
                        ${job.status}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <select class="p-1 border rounded text-sm bg-white" onchange="updateJobStatus('${job.id}', this.value)">
                        <option value="${job.status}">${job.status} (Current)</option>
                        <option value="Diagnostic">Diagnostic</option>
                        <option value="Repairing">Repairing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Awaiting Approval">Awaiting Approval</option>
                        <option value="Completed">Complete</option>
                    </select>
                </td>
            </tr>
        `).join('');
    }

    // --- Render Upcoming Appointments ---
    const apptBody = document.getElementById('appointment-body');
    if (apptBody) {
        apptBody.innerHTML = allAppointments.map(appt => `
            <li class="p-4 bg-white rounded-lg shadow-sm mb-3 border border-slate-100">
                <div class="flex justify-between items-center">
                    <p class="font-semibold text-slate-800">${appt.service}</p>
                    <button class="text-xs text-brand-600 hover:text-brand-800" onclick="alert('Confirm appointment with Client ID: ${appt.client_id}')">Confirm</button>
                </div>
                <p class="text-sm text-slate-600 mt-1">${appt.date} at ${appt.time}</p>
            </li>
        `).join('');
    }
}

// MOCK: Function to simulate status update
window.updateJobStatus = function(jobId, newStatus) {
    const mockDB = getMockDB();
    const job = mockDB.jobs.find(j => j.id === jobId);
    if (job) {
        job.status = newStatus;
        app.notify(`Job ${jobId} status updated to: ${newStatus}`, 'info');
        // Re-render to see immediate change
        renderAdminPanel(); 
    }
};

function adminLogout() {
    localStorage.removeItem('isAdminLoggedIn');
    app.notify('Admin logged out.', 'info');
    window.location.href = 'admin-login.html';
}