// js/utils/db-config.js
// MOCK DATABASE for prototype persistence (uses in-memory structure)

const MOCK_DB = {
    // Mock data structures for the prototype
    jobs: [
        { id: 'J4923', client_id: 'user-123', car: '2019 Toyota Camry', service: 'Brake Service', status: 'Repairing', progress: 70, eta: '4:30 PM Today' },
        { id: 'J5001', client_id: 'user-123', car: '2015 Honda Civic', service: 'Oil Change', status: 'Completed', progress: 100, eta: 'Yesterday' },
        { id: 'J5002', client_id: 'user-456', car: '2022 Ford F-150', service: 'Transmission Flush', status: 'Awaiting Approval', progress: 30, eta: 'Tomorrow' }
    ],
    appointments: [
        { date: 'Oct 24, 2025', time: '10:00 AM', service: 'Oil Change & Rotation', client_id: 'user-123' },
        { date: 'Oct 25, 2025', time: '11:00 AM', service: 'Diagnostic Check', client_id: 'user-456' }
    ]
};

// Expose the mock database globally for other JS files to use
const getMockDB = () => MOCK_DB;

// NOTE: In a live environment, this file would be replaced by actual Firebase setup.