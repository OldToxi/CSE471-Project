// ============================================
// REAL AI CHATBOT - Google Gemini API
// ============================================

// 🔑 GET YOUR FREE API KEY: https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyA1t1OPURDdJIEPmhllF2c4d_iFrOuiRUg';

const SYSTEM_PROMPT = `You are an enthusiastic AI travel assistant for PothChola, a Bangladesh travel platform.

Your capabilities:
1. Suggest destinations in Bangladesh (Cox's Bazar, Sundarbans, Sylhet, Rangamati, Sajek Valley, Saint Martin, Bandarban, Chittagong Hill Tracts)
2. Explain platform features:
   - Friends: Connect with travelers, send requests, view activities
   - Community: Share posts, photos, comment, react
   - Group Events: Create/join group tours, collaborative planning
   - Rewards: Earn points (trips, reviews, posts), unlock Bronze/Silver/Gold tiers
   - Interactive Maps: District exploration, weather, safety insights
   - My Trips: Track travel history and timeline
3. Provide travel tips, weather info, safety updates
4. Guide users through navigation
5. Answer questions about Bangladesh tourism

Be friendly, concise (2-4 sentences), and helpful. Focus on Bangladesh destinations.`;

// Main AI Response Function
export const getAIResponse = async (userMessage, conversationHistory = []) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('⚠️ Gemini API key not set. Using fallback responses.');
    return getFallbackResponse(userMessage);
  }

  try {
    const recentHistory = conversationHistory.slice(-5);
    const conversationText = recentHistory
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n');

    const fullPrompt = `${SYSTEM_PROMPT}

${conversationText ? `Previous conversation:\n${conversationText}\n\n` : ''}User: ${userMessage}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract AI response
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiMessage) {
      throw new Error('No response from Gemini');
    }

    return aiMessage;

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    return getFallbackResponse(userMessage);
  }
};

// Fallback Responses (when API is unavailable)
const getFallbackResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // Destination queries
  if (msg.includes('beach') || msg.includes('cox')) {
    return "Cox's Bazar is Bangladesh's most popular beach destination! It has the world's longest natural sea beach (120km). Best time to visit: November-March. ";
  }

  if (msg.includes('hill') || msg.includes('sajek') || msg.includes('bandarban')) {
    return "For hills, check out Sajek Valley, Bandarban, and Rangamati! These spots offer stunning mountain views, tribal culture, and cool weather. Perfect for trekking! ";
  }

  if (msg.includes('sundarbans') || msg.includes('mangrove')) {
    return "The Sundarbans is the world's largest mangrove forest and home to Royal Bengal Tigers! Best visited October-March. Book a guided boat tour for safety. ";
  }

  if (msg.includes('sylhet') || msg.includes('tea')) {
    return "Sylhet is famous for tea gardens, Ratargul Swamp Forest, and Jaflong! The lush green landscapes are breathtaking year-round. ";
  }

  // Platform features
  if (msg.includes('friend') || msg.includes('connect')) {
    return "Use the Friends feature to connect with fellow travelers! Send friend requests, view their trips, and plan adventures together. Check the Friends tab in the navigation! ";
  }

  if (msg.includes('community') || msg.includes('post')) {
    return "Share your travel stories in the Community! Post photos, write reviews, comment on others' posts, and get inspired. It's like Instagram for Bangladesh travel! ";
  }

  if (msg.includes('group') || msg.includes('event')) {
    return "Create or join Group Events to travel with others! Plan group tours, split costs, and make new friends. Perfect for solo travelers looking for company! ";
  }

  if (msg.includes('reward') || msg.includes('point')) {
    return "Earn Reward Points by posting trips, writing reviews, and attending events! Unlock Bronze, Silver, and Gold tiers for exclusive perks. Check your progress in Profile! ";
  }

  if (msg.includes('map')) {
    return "Use our Interactive Maps to explore all 64 districts! View weather forecasts, safety ratings, and popular attractions. Click on any district to learn more! ";
  }

  // General queries
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hello!  I'm your PothChola travel assistant! Ask me about Bangladesh destinations, platform features, or travel tips. How can I help you today?";
  }

  if (msg.includes('help') || msg.includes('what can you do')) {
    return "I can help you with: 1) Destination recommendations (beaches, hills, forests), 2) Platform features (Friends, Community, Events, Rewards), 3) Travel tips and navigation. What interests you?";
  }

  // Default response
  return "I'm here to help with Bangladesh travel! Ask me about destinations like Cox's Bazar, Sundarbans, or Sylhet, or learn about platform features like Friends, Community, and Rewards! ";
};

// Export fallback for testing
export { getFallbackResponse };
