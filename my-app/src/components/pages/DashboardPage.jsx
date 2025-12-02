import React from 'react';

export default function DashboardPage() {
    return (
        <div style={{ padding: '40px' }}>
            <h1>User Dashboard</h1>
            <p>Welcome to your personal travel hub. (Module 3.1 - Nijaf)</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>Recent Activity</div>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>Saved Places</div>
                <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>Upcoming Trips</div>
            </div>
        </div>
    );
}
