import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [formData, setFormData] = useState({
    senderName: '',
    senderJobTitle: '',
    recipientName: '',
    recipientCompany: '',
    emailPurpose: '',
    customMessage: '',
    ResumeLink: '',
  });

  const [generatedEmail, setGeneratedEmail] = useState('');
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('emailCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const nav = useNavigate();

  const isLoggedIn = localStorage.getItem('loginvalue') === 'true';

  useEffect(() => {
    localStorage.setItem('emailCount', count.toString());
  }, [count]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/main', {
        input: formData,
      });

      const emailText = response.data.reply?.choices?.[0]?.message?.content || 'No email generated';
      setGeneratedEmail(emailText);
    } catch (error) {
      console.error('Error generating email:', error);

    }

    const newCount = count + 1;
    setCount(newCount);

    if (!isLoggedIn && newCount > 2) {
      nav('/login');
      return;
    }
  };

  const sendEmail = () => {
    const subject = encodeURIComponent('Subject of the Email');
    const body = encodeURIComponent(generatedEmail);
    const recipient = encodeURIComponent(formData.recipientName + '@' + formData.recipientCompany);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen  text-white p-4 md:p-8"  style={{  background:'linear-gradient(to bottom,#000 20%,#4521A1  65%)'}}>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-black  rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="senderName" className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                placeholder="Your Name"
                onChange={handleChange}
                required
                className="w-full bg-black  border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="senderJobTitle" className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                id="senderJobTitle"
                name="senderJobTitle"
                placeholder="Your Job Title"
                onChange={handleChange}
                required
                className="w-full bg-black border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium mb-1">Recipient's Name</label>
              <input
                type="text"
                id="recipientName"
                name="recipientName"
                placeholder="Recipient's Name"
                onChange={handleChange}
                required
                className="w-full bg-black border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="recipientCompany" className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                id="recipientCompany"
                name="recipientCompany"
                placeholder="Recipient's Company"
                onChange={handleChange}
                required
                className="w-full bg-black  border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="ResumeLink" className="block text-sm font-medium mb-1">Your Resume</label>
            <input
              type="url"
              id="ResumeLink"
              name="ResumeLink"
              placeholder="Resume URL"
              onChange={handleChange}
              required
              className="w-full bg-black  border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="emailPurpose" className="block text-sm font-medium mb-1">Email Purpose</label>
            <select
              id="emailPurpose"
              name="emailPurpose"
              onChange={handleChange}
              required
              className="w-full bg-black  border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            >
              <option value="">Select Purpose</option>
              <option value="job_inquiry">Job Inquiry</option>
              <option value="follow_up">Follow-Up</option>
              <option value="offer">Job Offer</option>
            </select>
          </div>
          <div className="mt-6">
            <label htmlFor="customMessage" className="block text-sm font-medium mb-1">Custom Message (optional)</label>
            <textarea
              id="customMessage"
              name="customMessage"
              placeholder="Custom Message"
              onChange={handleChange}
              className="w-full bg-black border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent h-32"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-white hover:bg-neutral-200 text-black font-semibold py-2 px-1 rounded-md transition duration-300 ease-in-out"
            >
              Generate Email
            </button>
          </div>
        </form>

        {generatedEmail && <div className="bg-black  rounded-lg shadow-lg p-6">
         
          <pre className=" p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-sm">
            {!generatedEmail || "Something went wrong...... "}
          </pre>
          {generatedEmail && (
            <button
              onClick={sendEmail}
              className="mt-4 bg-white hover:bg-neutral-200 text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Send Email
            </button>
          )}
        </div>
    }
      </div>
    </div>
  );
};

export default Home;

