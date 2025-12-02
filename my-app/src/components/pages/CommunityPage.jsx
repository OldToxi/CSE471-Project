import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  const [postText, setPostText] = useState('');
  const [posts] = useState([
    {
      id: 1,
      author: 'Alimool Razi',
      authorImage: 'AR',
      time: '2 hours ago',
      content: 'Just completed an amazing trek to Sajek Valley! The sunrise view was absolutely breathtaking. Highly recommend visiting during winter season. 🏔️',
      likes: 24,
      comments: 5,
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      author: 'Zarin Raisa',
      authorImage: 'ZR',
      time: '5 hours ago',
      content: 'Explored the tea gardens of Sylhet yesterday. The fresh air and green hills were so refreshing! If anyone needs local guide recommendations, feel free to ask. ☕🌿',
      likes: 18,
      comments: 8,
      shares: 2,
      isLiked: true
    }
  ]);

  const handlePost = () => {
    if (postText.trim()) {
      console.log('Creating post:', postText);
      setPostText('');
    }
  };

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
          Community Posts
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280' }}>
          Share your travel stories and connect with fellow explorers
        </p>
      </div>

      {/* Create Post */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
        padding: '28px',
        marginBottom: '28px',
        border: '1px solid rgba(5, 150, 105, 0.1)',
        transition: 'all 0.3s'
      }}>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #059669, #0d9488)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
          }}>
            MH
          </div>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share your travel experience, tips, or photos..."
            style={{
              flex: 1,
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '14px 16px',
              fontSize: '15px',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              minHeight: '100px',
              transition: 'all 0.3s',
              backgroundColor: '#fafafa'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.backgroundColor = 'white';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = '#fafafa';
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handlePost}
            disabled={!postText.trim()}
            style={{
              backgroundColor: postText.trim() ? '#059669' : '#d1d5db',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '12px',
              border: 'none',
              cursor: postText.trim() ? 'pointer' : 'not-allowed',
              fontSize: '15px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s',
              boxShadow: postText.trim() ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (postText.trim()) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = postText.trim() ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none';
            }}
          >
            <Send size={18} strokeWidth={2.5} />
            Share Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map((post, index) => (
          <div key={post.id} style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            padding: '28px',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s',
            animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.07)';
            }}
          >
            {/* Post Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #059669, #0d9488)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
              }}>
                {post.authorImage}
              </div>
              <div>
                <h4 style={{ fontWeight: '700', color: '#1f2937', margin: 0, fontSize: '16px' }}>{post.author}</h4>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p style={{ color: '#374151', marginBottom: '20px', lineHeight: '1.7', fontSize: '15px' }}>{post.content}</p>

            {/* Post Actions */}
            <div style={{
              display: 'flex',
              gap: '28px',
              paddingTop: '20px',
              borderTop: '1px solid #f3f4f6'
            }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: post.isLiked ? '#ef4444' : '#6b7280',
                fontSize: '15px',
                fontWeight: '600',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = post.isLiked ? '#fee2e2' : '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Heart size={20} fill={post.isLiked ? '#ef4444' : 'none'} strokeWidth={2.5} />
                {post.likes} Likes
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '15px',
                fontWeight: '600',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <MessageCircle size={20} strokeWidth={2.5} />
                {post.comments} Comments
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '15px',
                fontWeight: '600',
                padding: '8px 12px',
                borderRadius: '8px',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Share2 size={20} strokeWidth={2.5} />
                {post.shares} Shares
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}