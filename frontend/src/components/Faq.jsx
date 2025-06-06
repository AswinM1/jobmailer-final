import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

// inside your component...
const faqs = [
  {
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
  }
];

const [openIndex, setOpenIndex] = useState(null);

const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};


{/* FAQ Section */}
<div className="mt-24 mb-12">
  <h2 className="text-3xl font-serif italic text-white text-center mb-12">Frequently Asked Questions</h2>

  <div className="space-y-4 max-w-4xl mx-auto">
    {faqs.map((faq, index) => (
      <div key={index} className="bg-neutral-900 rounded-xl shadow-md">
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full flex items-center justify-between px-6 py-4 text-left text-white focus:outline-none"
        >
          <span className="text-lg font-medium font-serif italic">{faq.question}</span>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-300 ${
              openIndex === index ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`px-6 pt-0 pb-4 text-gray-400 text-sm transition-all duration-300 overflow-hidden ${
            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {faq.answer}
        </div>
      </div>
    ))}
  </div>
</div>
