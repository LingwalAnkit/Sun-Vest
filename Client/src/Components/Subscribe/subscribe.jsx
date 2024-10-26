import React from 'react';
import { Card, Button } from 'antd';
import { Check } from 'lucide-react';

// Subscription plan data
const subscriptionPlans = [
  {
    name: 'Basic Plan',
    price: '499',
    period: 'month',
    description: 'Perfect for getting started with solar energy',
    features: [
      'Initial consultation',
      'Basic system design',
      'Standard installation',
      'Basic monitoring system',
      '1-year warranty'
    ],
    highlighted: false
  },
  {
    name: 'Pro Plan',
    price: '999',
    period: 'month',
    description: 'Ideal for homes and small businesses',
    features: [
      'Advanced consultation',
      'Custom system design',
      'Premium installation',
      'Advanced monitoring system',
      '5-year warranty',
      'Priority support',
      'Battery storage options'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '1999',
    period: 'month',
    description: 'Complete solution for large installations',
    features: [
      'Comprehensive consultation',
      'Enterprise system design',
      'Premium installation',
      'Real-time monitoring',
      '10-year warranty',
      '24/7 Priority support',
      'Advanced battery storage',
      'System integration'
    ],
    highlighted: false
  }
];

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 overflow-hidden">
      <div className=" px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Solar Plan</h1>
          <p className="text-xl text-gray-600">
            Select the perfect solar energy solution for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <Card 
              key={index} 
              title={plan.name}
              className={`relative ${
                plan.highlighted 
                  ? 'border-2 border-blue-500 shadow-xl' 
                  : 'border border-gray-200'
              }`}
              extra={
                plan.highlighted && (
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                )
              }
            >
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
                <p className="mt-2 text-gray-600">{plan.description}</p>
              </div>

              <div className="mt-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-center">
                <Button 
                  type="primary"
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
