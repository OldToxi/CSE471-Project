import React, { useState } from 'react';
import { Calendar, Users, MapPin, Plus, UserPlus, ArrowRight } from 'lucide-react';

export default function GroupEventsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const [events] = useState([
    {
      id: 1,
      name: 'Cox\'s Bazar Beach Trip',
      date: '2024-12-15',
      location: 'Cox\'s Bazar',
      organizer: 'Alimool Razi',
      participants: 8,
      maxParticipants: 15,
      status: 'open',
      description: 'Join us for a 3-day beach adventure! We\'ll explore the longest sea beach in the world.'
    },
    {
      id: 2,
      name: 'Sylhet Tea Garden Tour',
      date: '2024-12-20',
      location: 'Sylhet',
      organizer: 'Zarin Raisa',
      participants: 12,
      maxParticipants: 12,
      status: 'full',
      description: 'Experience the serene beauty of tea gardens. Includes local guide and transportation.'
    }
  ]);

  const handleCreateEvent = () => {
    if (eventName && eventDate && eventLocation) {
      console.log('Creating event:', { eventName, eventDate, eventLocation });
      setShowCreateForm(false);
      setEventName('');
      setEventDate('');
      setEventLocation('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{
            fontSize: '42px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '8px',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Group Events & Tours
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Join exciting group adventures or organize your own
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '14px 28px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '600',
            fontSize: '15px',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(5, 150, 105, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
          }}
        >
          <Plus size={20} strokeWidth={2.5} />
          Create Event
        </button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          padding: '32px',
          marginBottom: '32px',
          animation: 'slideDown 0.3s ease-out',
          border: '1px solid rgba(5, 150, 105, 0.1)'
        }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px', fontFamily: 'Poppins, sans-serif' }}>
            Create New Group Event
          </h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                style={{
                  padding: '14px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                style={{
                  padding: '14px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <input
                type="text"
                placeholder="Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                style={{
                  padding: '14px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#059669'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={() => setShowCreateForm(false)}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '15px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '15px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.2)';
                }}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div style={{ display: 'grid', gap: '24px' }}>
        {events.map((event, index) => (
          <div key={event.id} style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            padding: '32px',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s',
            animation: `slideUp 0.5s ease-out ${index * 0.15}s both`
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
                    {event.name}
                  </h3>
                  <div style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    backgroundColor: event.status === 'open' ? '#d1fae5' : '#fee2e2',
                    color: event.status === 'open' ? '#047857' : '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'currentColor',
                      display: 'inline-block'
                    }} />
                    {event.status === 'open' ? 'Open' : 'Full'}
                  </div>
                </div>
                <p style={{ color: '#4b5563', fontSize: '16px', marginBottom: '20px', lineHeight: '1.6', maxWidth: '800px' }}>
                  {event.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', color: '#6b7280', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                      <Calendar size={18} color="#4b5563" />
                    </div>
                    <span style={{ fontWeight: '500' }}>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                      <MapPin size={18} color="#4b5563" />
                    </div>
                    <span style={{ fontWeight: '500' }}>{event.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ padding: '8px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                      <Users size={18} color="#4b5563" />
                    </div>
                    <span style={{ fontWeight: '500' }}>{event.participants}/{event.maxParticipants} participants</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', paddingTop: '24px', borderTop: '1px solid #f3f4f6' }}>
              <button
                disabled={event.status === 'full'}
                style={{
                  backgroundColor: event.status === 'open' ? '#059669' : '#e5e7eb',
                  color: event.status === 'open' ? 'white' : '#9ca3af',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: event.status === 'open' ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s',
                  boxShadow: event.status === 'open' ? '0 4px 12px rgba(5, 150, 105, 0.2)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (event.status === 'open') {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = event.status === 'open' ? '0 4px 12px rgba(5, 150, 105, 0.2)' : 'none';
                }}
              >
                <UserPlus size={18} strokeWidth={2.5} />
                {event.status === 'open' ? 'Join Event' : 'Event Full'}
              </button>
              <button style={{
                backgroundColor: 'white',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                View Details
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}