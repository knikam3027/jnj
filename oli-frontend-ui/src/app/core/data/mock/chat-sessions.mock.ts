/**
 * Mock Chat Sessions Data
 * Simulates chat conversations and message history
 */

export const mockChatSessions = [
  {
    id: '1',
    title: 'How much money is lost in the returns and refus...',
    createdAt: '2025-12-24T09:30:00.000Z',
    updatedAt: '2025-12-24T09:30:00.000Z',
    messages: [
      {
        id: 'msg1',
        content: 'How much money is lost in the returns and refusals?',
        sender: 'user',
        timestamp: '2025-12-24T09:30:00.000Z',
        isEditable: true
      },
      {
        id: 'msg2',
        content: 'Based on our latest analysis, approximately $2.5M is lost annually due to returns and refusals. This represents about 3.2% of total revenue.\n\nKey breakdown:\n- Product returns: $1.8M (72%)\n- Order refusals: $700K (28%)\n\nMain causes include:\n1. Quality issues (35%)\n2. Wrong product delivered (25%)\n3. Customer changed mind (20%)\n4. Damaged in shipping (15%)\n5. Other (5%)',
        sender: 'bot',
        timestamp: '2025-12-24T09:30:15.000Z',
        isEditable: false
      }
    ]
  },
  {
    id: '2',
    title: 'Are there certain customers that usually over-ord...',
    createdAt: '2025-12-24T09:32:00.000Z',
    updatedAt: '2025-12-24T09:32:00.000Z',
    messages: [
      {
        id: 'msg3',
        content: 'Are there certain customers that usually over-order and then have a high number of returns?',
        sender: 'user',
        timestamp: '2025-12-24T09:32:00.000Z',
        isEditable: true
      },
      {
        id: 'msg4',
        content: 'Yes – 18% of customers (top 50) account for 22% of returned units and have an average returns per order ratio 4× company median.\n\nExample metric: customers flagged "high over-order" = orders with return_rate_per_customer > 40% and avg_order_size > X units.',
        sender: 'bot',
        timestamp: '2025-12-24T09:32:15.000Z',
        isEditable: false
      }
    ]
  },
  {
    id: '3',
    title: 'Revenue forecast Q1 2026',
    createdAt: '2025-12-20T14:20:00.000Z',
    updatedAt: '2025-12-20T14:20:00.000Z',
    messages: [
      {
        id: 'msg5',
        content: "What's the revenue forecast for Q1 2026?",
        sender: 'user',
        timestamp: '2025-12-20T14:20:00.000Z',
        isEditable: true
      },
      {
        id: 'msg6',
        content: 'Based on current trends and historical data, the Q1 2026 revenue forecast is $78.5M, representing a 12% increase YoY.\n\nFactors considered:\n- Seasonal demand patterns\n- New product launches\n- Market expansion\n- Historical growth rates',
        sender: 'bot',
        timestamp: '2025-12-20T14:20:18.000Z',
        isEditable: false
      }
    ]
  }
];
