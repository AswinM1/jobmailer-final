import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for trying out our services',
      features: [
        'Generate 3 emails per day',
        'Basic email types',
        'Copy to clipboard',
        'Edit generated content'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'For professionals and frequent users',
      features: [
        'Unlimited email generations',
        'All email types',
        'Priority response time',
        'Save templates',
        'Custom signatures',
        'Advanced editing tools'
      ],
      buttonText: 'Subscribe Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 29.99, yearly: 299.99 },
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Analytics dashboard',
        'Dedicated support'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const calculateYearlyDiscount = (monthlyPrice, yearlyPrice) => {
    if (monthlyPrice === 0) return 0;
    const annualMonthlyRate = yearlyPrice / 12;
    const discountPercent = ((monthlyPrice - annualMonthlyRate) / monthlyPrice) * 100;
    return Math.round(discountPercent);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-300 p-6 md:p-8" >
      <div className="absolute flex justify-end items-center pointer-events-none z-0">
        <div className="w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(253,186,116,0.4)_0%,_transparent_70%)] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get access to our email generation tools with a plan that works for you
          </p>
          <div className="mt-8 flex items-center justify-center">
            <span className={`mr-3 ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBillingPeriod}
              className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-orange-500 shadow-lg transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-green-400 text-sm ml-1">(Save 15%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, index) => {
            const currentPrice = plan.price[billingPeriod];
            const discount = calculateYearlyDiscount(plan.price.monthly, plan.price.yearly);

            return (
              <div
                key={index}
                className={`bg-gradient-to-b from-black to-neutral-950 bg-opacity-70 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 ${
                  plan.popular ? 'border-2 border-orange-500 shadow-orange-700/50 relative' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-orange-700 to-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${currentPrice}</span>
                    <span className="text-gray-400">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                    {billingPeriod === 'yearly' && discount > 0 && (
                      <div className="text-green-400 text-sm mt-1">Save {discount}% vs monthly</div>
                    )}
                  </div>

                  <div className="border-t border-gray-700 my-6 pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-[#212121]">
                  <SignedIn>
                    <button
                      className="w-full py-3 px-4 rounded-full text-white font-semibold transition duration-300 bg-gradient-to-r from-orange-700 to-orange-500 hover:opacity-90"
                    >
                      {plan.buttonText}
                    </button>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton>
                      <button
                        className="w-full py-3 px-4 rounded-full text-white font-semibold transition duration-300 bg-gradient-to-r from-orange-700 to-orange-500 hover:opacity-90"
                      >
                        {plan.name === 'Free' ? plan.buttonText : 'Sign In to Subscribe'}
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 mb-12">
          
          <h2 className="text-3xl font-serif italic text-white text-center mb-12">Frequently Asked Questions</h2>
          

          <div className="grid md:grid-cols-2 gap-8">
            {[{
              question: "How does the email generation work?",
              answer: "Our service uses AI to create professional emails based on your input. Simply provide the details of what you need, and we'll generate a well-crafted email for you to use or customize."
            },
            {
              question: "Can I change plans later?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will be applied at the beginning of your next billing cycle."
            },
            {
              question: "Is there a limit to how many emails I can generate?",
              answer: "Free users can generate up to 3 emails per day. Pro and Enterprise subscribers enjoy unlimited generations."
            },
            {
              question: "How do I cancel my subscription?",
              answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
            }].map((faq, index) => (
              <div key={index} className="bg-gradient-to-b from-orange-600   rounded-xl p-6">
                <h3 className="text-xl font-serif italic text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
            <div className="absolute  flex justify-center items-center pointer-events-none z-0">
        <div className="w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(253,186,116,0.4)_0%,_transparent_70%)] rounded-full blur-3xl"></div>
      </div>
          <div className="bg-neutral-950 rounded-2xl p-8 md:p-12">

            <h2 className="text-3xl font-serif italic text-white mb-4">Ready to get started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who save time with our email generation tools.
            </p>
            <SignedOut>
              <SignInButton>
                <button className="bg-gradient-to-t from-orange-700 to-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 hover:opacity-90">
                  Sign Up Now
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link to="/">
                <button className="bg-gradient-to-t from-orange-700 to-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 hover:opacity-90">
                  Try It Now
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
