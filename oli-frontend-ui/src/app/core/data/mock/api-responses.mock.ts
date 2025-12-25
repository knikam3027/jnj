/**
 * Mock API Responses
 * Predefined responses for various scenarios
 */

export const mockAIResponses = {
  revenue: `Based on the latest data, our total revenue for Q4 2025 is $78.5M, representing a 12.3% increase compared to Q3. Key drivers include:

1. Enterprise segment growth (+18%)
2. New product launches (+$4.2M)
3. Geographic expansion (+$2.8M)

Would you like more detailed breakdown by product category?`,

  customer: `Our current customer base includes 1,247 active clients across 23 countries. Top segments:

- Enterprise (35%)
- Mid-market (45%)
- SMB (20%)

Customer satisfaction score: 4.6/5.0
Net Promoter Score (NPS): 68

Is there a specific customer segment you'd like to analyze?`,

  returns: `Returns analysis for 2025:

- Total returns: $2.5M (3.2% of revenue)
- Return rate trend: Decreasing (-0.8% vs 2024)
- Main reasons:
  1. Quality issues (35%)
  2. Wrong item (25%)
  3. Changed mind (20%)
  4. Damaged (15%)
  5. Other (5%)

Would you like recommendations to reduce return rates?`,

  orders: `Order statistics for December 2025:

- Total orders: 8,432
- Average order value: $892
- Order completion rate: 94.2%
- Average processing time: 2.3 days

Top products:
1. Product A (1,234 orders)
2. Product B (987 orders)
3. Product C (756 orders)

Need more details on any specific metric?`,

  inventory: `Current inventory status:

**Overall Health:** 87/100 (Good)

**Stock Levels:**
- In Stock: 2,345 SKUs (78%)
- Low Stock: 456 SKUs (15%)
- Out of Stock: 234 SKUs (7%)

**Top Moving Items:**
1. Product A - 567 units/week
2. Product B - 432 units/week
3. Product C - 389 units/week

**Alerts:**
⚠️ 12 items below reorder point
⚠️ 5 items with high demand variance

Would you like details on any specific category?`,

  performance: `Performance dashboard - December 2025:

**Key Metrics:**
📈 Sales Growth: +15.2% MoM
💰 Revenue: $12.8M
👥 Active Users: 8,947 (+8%)
⭐ Customer Satisfaction: 4.7/5

**Operational Efficiency:**
- Order fulfillment: 94.2%
- Average response time: 2.3 hours
- First contact resolution: 87%

**Areas of Focus:**
1. Reduce response time to < 2 hours
2. Improve FCoR to 90%
3. Expand to 3 new markets

Anything specific you'd like to explore?`,

  forecast: `Q1 2026 Forecast Analysis:

**Revenue Projection:** $85.2M (+8.5% vs Q4 2025)

**Confidence Level:** 87%

**Key Assumptions:**
- Seasonal demand patterns hold
- No major market disruptions
- Current growth trajectory continues
- 2 new product launches succeed

**Risk Factors:**
⚠️ Supply chain uncertainties (15% impact)
⚠️ Market competition (10% impact)
⚠️ Economic conditions (8% impact)

**Best Case:** $92.4M (+16%)
**Worst Case:** $78.9M (+0.5%)

Would you like scenario planning details?`,

  help: `I can help you with:

📊 **Business Analytics**
- Revenue & sales analysis
- Customer insights
- Product performance
- Order trends

💼 **Operational Data**
- Returns & refunds
- Inventory status
- Shipping metrics
- Cost analysis

📈 **Forecasting**
- Sales predictions
- Demand planning
- Trend analysis

🔍 **Custom Queries**
- Ask specific questions about your data
- Get detailed breakdowns
- Compare time periods
- Identify patterns

Just ask me anything about your business data!`,

  greeting: `Hi there! 👋 I'm doing great, thanks for asking! How can I assist you today?

Feel free to ask me about:
• Revenue and sales data
• Customer insights
• Inventory status
• Orders and trends
• Business forecasting

What's on your mind?`,

  casualGreeting: `Hey! How are you doing? 😊

I'm here to help with any questions about your business data. Just let me know what you need!`,

  howAreYou: `I'm doing great, thanks for asking! 🙂 How about you? 

By the way, I'm here whenever you need insights on your business data. What would you like to know?`,

  thanks: `You're welcome! Happy to help anytime. 😊

If you have any other questions, just ask!`
};

export const mockErrorResponses = {
  notFound: `I couldn't find specific data for that query. Could you please:

1. Rephrase your question
2. Be more specific about the time period
3. Specify the product/category
4. Check if you have access to that data

Would you like to try a different query?`,

  serverError: `I'm experiencing temporary difficulties processing your request. Please try again in a moment.

If the problem persists, contact support.`,

  unauthorized: `You don't have permission to access this data. Please contact your administrator to request access.`,

  timeout: `The request is taking longer than expected. This might be due to:

- Complex data processing
- High system load
- Network connectivity issues

Would you like to try a simpler query or wait a bit longer?`
};

export const mockSuccessMessages = {
  sessionCreated: 'New chat session created successfully!',
  sessionDeleted: 'Chat session deleted successfully.',
  profileUpdated: 'Your profile has been updated.',
  settingsSaved: 'Settings saved successfully.',
  feedbackSubmitted: 'Thank you for your feedback!',
  exportComplete: 'Data exported successfully.'
};
