/**
 * Mock Analytics Data
 * Business metrics, charts, and dashboard data
 */

export const mockAnalytics = {
  dashboard: {
    revenue: {
      current: 78500000,
      previous: 69800000,
      change: 12.5,
      trend: 'up',
      currency: 'USD'
    },
    orders: {
      current: 8432,
      previous: 7654,
      change: 10.2,
      trend: 'up'
    },
    customers: {
      active: 1247,
      new: 89,
      churn: 23,
      trend: 'up'
    },
    satisfaction: {
      score: 4.7,
      previous: 4.5,
      responses: 2341,
      nps: 68
    }
  },

  revenueByMonth: [
    { month: 'Jan', revenue: 65000000, orders: 7234 },
    { month: 'Feb', revenue: 68000000, orders: 7456 },
    { month: 'Mar', revenue: 71000000, orders: 7689 },
    { month: 'Apr', revenue: 69500000, orders: 7512 },
    { month: 'May', revenue: 73000000, orders: 7823 },
    { month: 'Jun', revenue: 75000000, orders: 8001 },
    { month: 'Jul', revenue: 72000000, orders: 7745 },
    { month: 'Aug', revenue: 76000000, orders: 8134 },
    { month: 'Sep', revenue: 74500000, orders: 7998 },
    { month: 'Oct', revenue: 77000000, orders: 8245 },
    { month: 'Nov', revenue: 76500000, orders: 8189 },
    { month: 'Dec', revenue: 78500000, orders: 8432 }
  ],

  topProducts: [
    {
      id: 'prod-001',
      name: 'Product A',
      category: 'Electronics',
      revenue: 12500000,
      units: 1234,
      growth: 18.5
    },
    {
      id: 'prod-002',
      name: 'Product B',
      category: 'Hardware',
      revenue: 9800000,
      units: 987,
      growth: 15.2
    },
    {
      id: 'prod-003',
      name: 'Product C',
      category: 'Software',
      revenue: 8200000,
      units: 756,
      growth: 22.1
    },
    {
      id: 'prod-004',
      name: 'Product D',
      category: 'Services',
      revenue: 7100000,
      units: 543,
      growth: 12.8
    },
    {
      id: 'prod-005',
      name: 'Product E',
      category: 'Accessories',
      revenue: 5900000,
      units: 432,
      growth: 9.3
    }
  ],

  customerSegments: [
    { segment: 'Enterprise', count: 437, revenue: 45000000, percentage: 35 },
    { segment: 'Mid-Market', count: 561, revenue: 28000000, percentage: 45 },
    { segment: 'SMB', count: 249, revenue: 12500000, percentage: 20 }
  ],

  returnsAnalysis: {
    totalReturns: 2500000,
    returnRate: 3.2,
    trend: -0.8,
    reasons: [
      { reason: 'Quality Issues', percentage: 35, amount: 875000 },
      { reason: 'Wrong Item', percentage: 25, amount: 625000 },
      { reason: 'Customer Changed Mind', percentage: 20, amount: 500000 },
      { reason: 'Damaged in Shipping', percentage: 15, amount: 375000 },
      { reason: 'Other', percentage: 5, amount: 125000 }
    ]
  },

  geographicData: [
    { country: 'United States', revenue: 35000000, customers: 487 },
    { country: 'Brazil', revenue: 12000000, customers: 234 },
    { country: 'Germany', revenue: 9500000, customers: 156 },
    { country: 'United Kingdom', revenue: 8200000, customers: 143 },
    { country: 'Japan', revenue: 6800000, customers: 98 },
    { country: 'Others', revenue: 7000000, customers: 129 }
  ]
};

export const mockChartData = {
  revenueTrend: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (2025)',
        data: [65, 68, 71, 69.5, 73, 75, 72, 76, 74.5, 77, 76.5, 78.5],
        borderColor: '#C8102E',
        backgroundColor: 'rgba(200, 16, 46, 0.1)'
      },
      {
        label: 'Revenue (2024)',
        data: [58, 61, 63, 62, 65, 67, 64, 68, 66, 69, 68, 70],
        borderColor: '#666',
        backgroundColor: 'rgba(102, 102, 102, 0.1)'
      }
    ]
  },

  categoryBreakdown: {
    labels: ['Electronics', 'Hardware', 'Software', 'Services', 'Accessories'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#C8102E',
        '#E94B3C',
        '#F47920',
        '#FDB913',
        '#6CC24A'
      ]
    }]
  }
};
