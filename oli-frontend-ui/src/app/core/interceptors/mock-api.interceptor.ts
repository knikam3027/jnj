/**
 * Mock API Interceptor
 * Intercepts HTTP requests and returns mock data when useMockData is enabled
 * Use this for frontend development without backend
 */

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_DATA } from '../data/mock';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only mock if enabled in environment
  if (!environment.useMockData) {
    return next(req);
  }

  const url = req.url;
  
  // Simulate network delay (300-800ms)
  const networkDelay = Math.random() * 500 + 300;

  // AUTH ENDPOINTS
  // POST /api/auth/login
  if (url.includes('/auth/login') && req.method === 'POST') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: {
          user: MOCK_DATA.users[0],
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        }
      }
    })).pipe(delay(networkDelay));
  }

  // POST /api/auth/register
  if (url.includes('/auth/register') && req.method === 'POST') {
    const body = req.body as any;
    return of(new HttpResponse({
      status: 201,
      body: {
        success: true,
        data: {
          user: {
            id: '3',
            email: body?.email || 'newuser@example.com',
            name: body?.name || 'New User',
            avatar: ''
          },
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now()
        }
      }
    })).pipe(delay(networkDelay));
  }

  // POST /api/auth/refresh
  if (url.includes('/auth/refresh') && req.method === 'POST') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: {
          accessToken: 'mock-access-token-refreshed-' + Date.now()
        }
      }
    })).pipe(delay(networkDelay));
  }

  // POST /api/auth/logout
  if (url.includes('/auth/logout') && req.method === 'POST') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        message: 'Logged out successfully'
      }
    })).pipe(delay(networkDelay));
  }

  // USER ENDPOINTS
  // GET /api/users/profile
  if (url.includes('/users/profile') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.users[0]
      }
    })).pipe(delay(networkDelay));
  }

  // PUT /api/users/profile
  if (url.includes('/users/profile') && req.method === 'PUT') {
    const body = req.body as any;
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: {
          ...MOCK_DATA.users[0],
          ...body
        },
        message: MOCK_DATA.successMessages.profileUpdated
      }
    })).pipe(delay(networkDelay));
  }

  // GET /api/users/settings
  if (url.includes('/users/settings') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.settings
      }
    })).pipe(delay(networkDelay));
  }

  // PUT /api/users/settings
  if (url.includes('/users/settings') && req.method === 'PUT') {
    const body = req.body as any;
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: {
          ...MOCK_DATA.settings,
          ...body
        },
        message: MOCK_DATA.successMessages.settingsSaved
      }
    })).pipe(delay(networkDelay));
  }

  // CHAT ENDPOINTS
  // GET /api/chat/sessions
  if (url.includes('/chat/sessions') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.chatSessions
      }
    })).pipe(delay(networkDelay));
  }

  // GET /api/chat/sessions/:id
  if (url.match(/\/chat\/sessions\/\d+/) && req.method === 'GET') {
    const sessionId = url.split('/').pop();
    const session = MOCK_DATA.chatSessions.find(s => s.id === sessionId);
    
    if (session) {
      return of(new HttpResponse({
        status: 200,
        body: {
          success: true,
          data: session
        }
      })).pipe(delay(networkDelay));
    } else {
      return of(new HttpResponse({
        status: 404,
        body: {
          success: false,
          error: MOCK_DATA.errorResponses.notFound
        }
      })).pipe(delay(networkDelay));
    }
  }

  // POST /api/chat/sessions
  if (url.includes('/chat/sessions') && req.method === 'POST') {
    const body = req.body as any;
    const newSession = {
      id: String(MOCK_DATA.chatSessions.length + 1),
      title: body?.title || 'New Chat Session',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };
    
    return of(new HttpResponse({
      status: 201,
      body: {
        success: true,
        data: newSession,
        message: MOCK_DATA.successMessages.sessionCreated
      }
    })).pipe(delay(networkDelay));
  }

  // POST /api/chat/sessions/:id/messages
  if (url.match(/\/chat\/sessions\/\d+\/messages/) && req.method === 'POST') {
    const body = req.body as any;
    const sessionId = url.split('/')[4];
    const userMessage = {
      id: 'msg-' + Date.now(),
      content: body?.message || '',
      sender: 'user',
      timestamp: new Date().toISOString(),
      isEditable: true
    };

    // Simulate AI response
    const botMessage = {
      id: 'msg-' + (Date.now() + 1),
      content: generateMockAIResponse(body?.message || ''),
      sender: 'bot',
      timestamp: new Date(Date.now() + 2000).toISOString(),
      isEditable: false
    };

    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: {
          userMessage,
          botMessage
        }
      }
    })).pipe(delay(networkDelay + 1500)); // Extra delay for "AI thinking"
  }

  // DELETE /api/chat/sessions/:id
  if (url.match(/\/chat\/sessions\/\d+$/) && req.method === 'DELETE') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        message: MOCK_DATA.successMessages.sessionDeleted
      }
    })).pipe(delay(networkDelay));
  }

  // GET /api/analytics/dashboard
  if (url.includes('/analytics/dashboard') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.analytics.dashboard
      }
    })).pipe(delay(networkDelay));
  }

  // GET /api/help/topics
  if (url.includes('/help/topics') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.helpTopics
      }
    })).pipe(delay(networkDelay));
  }

  // GET /api/settings/languages
  if (url.includes('/settings/languages') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.languages
      }
    })).pipe(delay(networkDelay));
  }

  // GET /api/settings/themes
  if (url.includes('/settings/themes') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        success: true,
        data: MOCK_DATA.themes
      }
    })).pipe(delay(networkDelay));
  }

  // If no mock route matched, pass through to real backend
  console.warn('⚠️ No mock route found for:', req.method, url);
  return next(req);
};

/**
 * Generate mock AI responses based on user input
 */
function generateMockAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();

  // Casual conversation responses
  if (lowerMessage.match(/^(hi|hello|hey|hii|heyy)$/)) {
    return MOCK_DATA.aiResponses.casualGreeting;
  }

  if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u') || lowerMessage.includes('what\'s up') || lowerMessage.includes('whats up')) {
    return MOCK_DATA.aiResponses.howAreYou;
  }

  if (lowerMessage.match(/^(thanks|thank you|thx|ty)$/)) {
    return MOCK_DATA.aiResponses.thanks;
  }

  // Initial greetings with more text
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi there') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
    return MOCK_DATA.aiResponses.greeting;
  }

  // Business data queries
  if (lowerMessage.includes('revenue') || lowerMessage.includes('sales')) {
    return MOCK_DATA.aiResponses.revenue;
  }

  if (lowerMessage.includes('customer') || lowerMessage.includes('client')) {
    return MOCK_DATA.aiResponses.customer;
  }

  if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('refus')) {
    return MOCK_DATA.aiResponses.returns;
  }

  if (lowerMessage.includes('order') || lowerMessage.includes('purchase')) {
    return MOCK_DATA.aiResponses.orders;
  }

  if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
    return MOCK_DATA.aiResponses.inventory;
  }

  if (lowerMessage.includes('performance') || lowerMessage.includes('dashboard') || lowerMessage.includes('metric')) {
    return MOCK_DATA.aiResponses.performance;
  }

  if (lowerMessage.includes('forecast') || lowerMessage.includes('prediction') || lowerMessage.includes('future')) {
    return MOCK_DATA.aiResponses.forecast;
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    return MOCK_DATA.aiResponses.help;
  }

  // Default response for unmatched queries
  return `I understand you're asking about "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}". 

Based on our current data analysis:

• **Key Metric 1**: Performance indicator showing positive trend (+15.2%)
• **Key Metric 2**: Volume increased to 2,453 units this quarter
• **Key Metric 3**: Efficiency rating at 87.5%

**Insights:**
The data suggests steady growth with some areas for optimization. Our AI models predict continued improvement if current trends maintain.

**Recommendations:**
1. Monitor key performance indicators weekly
2. Focus on top-performing segments
3. Address identified bottlenecks

Would you like me to dive deeper into any specific aspect?`;
}
