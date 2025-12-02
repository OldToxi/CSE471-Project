import React from 'react';
import { Award, Gift, Star, TrendingUp, Sparkles } from 'lucide-react';

export default function RewardsPage() {
  const userPoints = 750;
  const currentTier = 'Silver';
  const nextTier = 'Gold';
  const pointsToNextTier = 250;
  const progress = (userPoints / 1000) * 100; // Progress to Gold (1000 points)

  const rewards = [
    { id: 1, name: '10% discount on agency packages', points: 500, unlocked: true },
    { id: 2, name: 'Free local guide booking (1 per quarter)', points: 750, unlocked: true },
    { id: 3, name: 'Premium badge on profile', points: 750, unlocked: true },
    { id: 4, name: 'Early access to sponsored events', points: 1000, unlocked: false },
    { id: 5, name: 'Exclusive travel recommendations', points: 1000, unlocked: false }
  ];

  const recentActivities = [
    { id: 1, action: 'Posted a trip review', points: 50, date: '2 days ago' },
    { id: 2, action: 'Completed Sylhet trip', points: 100, date: '1 week ago' },
    { id: 3, action: 'Joined community event', points: 25, date: '2 weeks ago' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '12px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Travel Points & Rewards
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>
          Earn points, unlock tiers, and enjoy exclusive benefits
        </p>
      </div>

      {/* Points Card */}
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24, #f97316)',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.3)',
        padding: '40px',
        color: 'white',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
        animation: 'scaleIn 0.5s ease-out'
      }}>
        {/* Animated Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
          animation: 'spin 20s linear infinite',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
          <div>
            <h3 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '8px', fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              {userPoints} <span style={{ fontSize: '24px' }}>Points</span>
            </h3>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)'
            }}>
              <Star size={16} fill="white" />
              <span style={{ fontWeight: '600' }}>{currentTier} Tier Member</span>
            </div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.25)',
            padding: '16px',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            animation: 'float 4s ease-in-out infinite'
          }}>
            <Award size={40} strokeWidth={2} />
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '24px',
            height: '16px',
            overflow: 'hidden',
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #ffffff, #fef3c7)',
              borderRadius: '24px',
              height: '100%',
              width: `${progress}%`,
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'shimmer 2s infinite'
              }} />
            </div>
          </div>
        </div>
        <p style={{ fontSize: '15px', color: '#fff7ed', fontWeight: '500', position: 'relative', zIndex: 1 }}>
          {pointsToNextTier} points to unlock {nextTier} Tier benefits
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
        {/* Available Rewards */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          padding: '32px',
          border: '1px solid rgba(0,0,0,0.05)',
          animation: 'slideUp 0.5s ease-out 0.1s both'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: '#f0fdf4',
              color: '#059669'
            }}>
              <Gift size={24} strokeWidth={2.5} />
            </div>
            <h4 style={{ fontWeight: '700', color: '#1f2937', margin: 0, fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>Available Rewards</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {rewards.map((reward, index) => (
              <div
                key={reward.id}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: reward.unlocked ? '#f0fdf4' : '#f9fafb',
                  border: `1px solid ${reward.unlocked ? '#bbf7d0' : '#f3f4f6'}`,
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (reward.unlocked) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: reward.unlocked ? '#047857' : '#9ca3af',
                    flex: 1,
                    marginRight: '12px'
                  }}>
                    {reward.name}
                  </p>
                  {reward.unlocked ? (
                    <div style={{
                      backgroundColor: '#fef3c7',
                      padding: '4px',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" />
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: '#e5e7eb',
                      padding: '4px',
                      borderRadius: '50%'
                    }}>
                      <Star size={16} color="#9ca3af" />
                    </div>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: reward.unlocked ? '#059669' : '#9ca3af', fontWeight: '500' }}>
                  {reward.points} points {reward.unlocked ? '• Unlocked' : '• Locked'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          padding: '32px',
          border: '1px solid rgba(0,0,0,0.05)',
          animation: 'slideUp 0.5s ease-out 0.2s both'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: '#eff6ff',
              color: '#3b82f6'
            }}>
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
            <h4 style={{ fontWeight: '700', color: '#1f2937', margin: 0, fontSize: '20px', fontFamily: 'Poppins, sans-serif' }}>Recent Activity</h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                    {activity.action}
                  </p>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#059669',
                    backgroundColor: '#d1fae5',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    +{activity.points}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b' }}>{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How to Earn Points */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
        borderRadius: '24px',
        padding: '32px',
        marginTop: '32px',
        border: '1px solid #bbf7d0',
        animation: 'slideUp 0.5s ease-out 0.3s both'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Sparkles size={20} color="#059669" />
          <h4 style={{ fontWeight: '700', color: '#065f46', fontSize: '20px', fontFamily: 'Poppins, sans-serif', margin: 0 }}>How to Earn Points</h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { action: 'Complete a trip', points: 100 },
            { action: 'Write a review', points: 50 },
            { action: 'Join an event', points: 25 },
            { action: 'Share a post', points: 10 },
            { action: 'Invite a friend', points: 30 }
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 4px rgba(5, 150, 105, 0.05)'
            }}>
              <span style={{ color: '#374151', fontSize: '14px', fontWeight: '500' }}>{item.action}</span>
              <span style={{ color: '#059669', fontWeight: '700', fontSize: '14px' }}>{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}