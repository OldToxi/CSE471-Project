import React, { useState } from 'react';
import { UserPlus, Users, Check, X, MessageCircle } from 'lucide-react';

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const [friendRequests] = useState([
    { id: 1, name: 'Tasnim Rahman', mutualFriends: 5, image: 'TR' },
    { id: 2, name: 'Ahnaf Rivan', mutualFriends: 3, image: 'AR' }
  ]);

  const [friends] = useState([
    { id: 1, name: 'Alimool Razi', trips: 8, image: 'AR', lastActive: '2 hours ago' },
    { id: 2, name: 'Zarin Raisa', trips: 12, image: 'ZR', lastActive: 'Online' }
  ]);

  const [suggestions] = useState([
    { id: 1, name: 'Fahim Ahmed', mutualFriends: 7, image: 'FA' },
    { id: 2, name: 'Nusrat Jahan', mutualFriends: 4, image: 'NJ' }
  ]);

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
            Your Travel Network
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Connect with fellow travelers and build your community
          </p>
        </div>
        <button style={{
          backgroundColor: '#059669',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
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
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
          }}
        >
          <UserPlus size={20} strokeWidth={2.5} />
          Find Friends
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', borderBottom: '2px solid #f3f4f6', overflowX: 'auto' }}>
        {['all', 'requests', 'suggestions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '14px 28px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '15px',
              color: activeTab === tab ? '#059669' : '#9ca3af',
              borderBottom: activeTab === tab ? '3px solid #059669' : 'none',
              marginBottom: '-2px',
              transition: 'all 0.3s',
              borderRadius: '8px 8px 0 0',
              backgroundColor: activeTab === tab ? '#f0fdf4' : 'transparent'
            }}
          >
            {tab === 'all' && 'All Friends'}
            {tab === 'requests' && `Requests (${friendRequests.length})`}
            {tab === 'suggestions' && 'Suggestions'}
          </button>
        ))}
      </div>

      {/* Friend Requests Tab */}
      {activeTab === 'requests' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {friendRequests.map((request, index) => (
            <div key={request.id} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              padding: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid rgba(5, 150, 105, 0.1)',
              flexWrap: 'wrap',
              gap: '16px',
              animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #059669, #0d9488)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                }}>
                  {request.image}
                </div>
                <div>
                  <h4 style={{ fontWeight: '700', color: '#1f2937', margin: 0, fontSize: '18px' }}>{request.name}</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>
                    {request.mutualFriends} mutual friends
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Check size={18} strokeWidth={2.5} />
                  Accept
                </button>
                <button style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fecaca';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fee2e2';
                  }}
                >
                  <X size={18} strokeWidth={2.5} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Friends Tab */}
      {activeTab === 'all' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {friends.map((friend, index) => (
            <div key={friend.id} style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              padding: '28px',
              textAlign: 'center',
              border: '1px solid rgba(5, 150, 105, 0.1)',
              transition: 'all 0.3s',
              animation: `scaleIn 0.5s ease-out ${index * 0.1}s both`
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(5, 150, 105, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #059669, #0d9488)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '28px',
                margin: '0 auto 16px',
                boxShadow: '0 8px 16px rgba(5, 150, 105, 0.3)',
                border: '4px solid white'
              }}>
                {friend.image}
              </div>
              <h4 style={{ fontWeight: '700', color: '#1f2937', margin: '0 0 6px 0', fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>{friend.name}</h4>
              <p style={{ fontSize: '13px', color: '#10b981', margin: '0 0 12px 0', fontWeight: '600' }}>{friend.lastActive}</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0' }}>
                {friend.trips} trips completed
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  backgroundColor: '#f0fdf4',
                  color: '#059669',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '2px solid #bbf7d0',
                  cursor: 'pointer',
                  flex: 1,
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#059669';
                  }}
                >
                  View Profile
                </button>
                <button style={{
                  backgroundColor: '#f0fdf4',
                  color: '#059669',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '2px solid #bbf7d0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdf4';
                    e.currentTarget.style.color = '#059669';
                  }}
                >
                  <MessageCircle size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {suggestions.map((person, index) => (
            <div key={person.id} style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              padding: '28px',
              textAlign: 'center',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s',
              animation: `scaleIn 0.5s ease-out ${index * 0.1}s both`
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9ca3af, #6b7280)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '28px',
                margin: '0 auto 16px',
                boxShadow: '0 8px 16px rgba(107, 114, 128, 0.3)',
                border: '4px solid white'
              }}>
                {person.image}
              </div>
              <h4 style={{ fontWeight: '700', color: '#1f2937', margin: '0 0 12px 0', fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>{person.name}</h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0' }}>
                {person.mutualFriends} mutual friends
              </p>
              <button style={{
                backgroundColor: '#059669',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                }}
              >
                <UserPlus size={18} strokeWidth={2.5} />
                Add Friend
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}