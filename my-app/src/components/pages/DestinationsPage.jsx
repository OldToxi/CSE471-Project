import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DestinationsPage() {
  const destinations = [
    {
      name: "Cox's Bazar",
      image: 'C:/Users/hp/.gemini/antigravity/brain/90c26e80-0ce4-477c-b208-a41a62dc2c77/coxs_bazar_beach_1764701426739.png',
      description: 'Discover the beauty and culture of the world\'s longest natural sea beach',
      badge: 'Beach Paradise'
    },
    {
      name: 'Sundarbans',
      image: 'C:/Users/hp/.gemini/antigravity/brain/90c26e80-0ce4-477c-b208-a41a62dc2c77/sundarbans_mangrove_1764701447298.png',
      description: 'Explore the largest mangrove forest and UNESCO World Heritage Site',
      badge: 'Wildlife Haven'
    },
    {
      name: 'Sylhet',
      image: 'C:/Users/hp/.gemini/antigravity/brain/90c26e80-0ce4-477c-b208-a41a62dc2c77/sylhet_tea_garden_1764701464203.png',
      description: 'Experience the serene beauty of rolling tea gardens and misty hills',
      badge: 'Tea Capital'
    },
    {
      name: 'Rangamati',
      image: 'C:/Users/hp/.gemini/antigravity/brain/90c26e80-0ce4-477c-b208-a41a62dc2c77/rangamati_hills_1764701482323.png',
      description: 'Discover scenic hills, lakes, and rich tribal culture',
      badge: 'Hill District'
    },
    {
      name: 'Sajek Valley',
      image: 'C:/Users/hp/.gemini/antigravity/brain/90c26e80-0ce4-477c-b208-a41a62dc2c77/sajek_valley_1764701498839.png',
      description: 'Witness breathtaking mountain peaks and cloud-covered valleys',
      badge: 'Mountain Peak'
    },
    {
      name: 'Saint Martin',
      image: 'C:/Users/hp/.gemini/antigravity/brain/90c26e80-0ce4-477c-b208-a41a62dc2c77/saint_martin_island_1764701515715.png',
      description: 'Relax on pristine coral island beaches with crystal clear waters',
      badge: 'Coral Island'
    }
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
          Popular Destinations
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>
          Explore the most beautiful places across Bangladesh
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '28px'
      }}>
        {destinations.map((dest, index) => (
          <div
            key={dest.name}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.05)',
              animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(5, 150, 105, 0.2)';
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            {/* Image Container */}
            <div style={{
              height: '240px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img
                src={dest.image}
                alt={dest.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />

              {/* Gradient Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
              }} />

              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#059669',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {dest.badge}
              </div>

              {/* Location Icon */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'white'
              }}>
                <MapPin size={18} strokeWidth={2.5} />
                <span style={{ fontWeight: '600', fontSize: '14px' }}>Bangladesh</span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '10px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                {dest.name}
              </h3>

              <p style={{
                color: '#6b7280',
                fontSize: '15px',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                {dest.description}
              </p>

              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#059669',
                fontWeight: '600',
                fontSize: '15px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'gap 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '12px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '8px';
                }}
              >
                Learn More
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}