import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRightIcon } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Home = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [prompt, setPrompt] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [emailType, setEmailType] = useState('Internship');
  const [userEmail, setUserEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [hasOutput, setHasOutput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isStaggering, setIsStaggering] = useState(false);
  const [sending, setSending] = useState(false);
  const outputTextareaRef = useRef(null);
  const { user } = useUser();

  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem('loginvalue') === 'true';

  useEffect(() => {
    if (user) {
      setUserEmail(user?.primaryEmailAddress?.emailAddress || '');
    }
  }, [user]);

  useEffect(() => {
    if (generatedOutput && isStaggering) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= generatedOutput.length) {
          setDisplayedOutput(generatedOutput.substring(0, currentIndex));
          currentIndex += 3;
        } else {
          clearInterval(interval);
          setIsStaggering(false);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [generatedOutput, isStaggering]);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleOutputChange = (e) => {
    setGeneratedOutput(e.target.value);
    setDisplayedOutput(e.target.value);
  };

  const handleEmailTypeChange = (e) => {
    setEmailType(e.target.value);
    setGeneratedOutput('');
    setDisplayedOutput('');
    setHasOutput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    try {
      const response = await axios.post(`${backendURL}/main`, {
        input: {
          messages: prompt,
          outputType: emailType,
        },
      });
      const outputContent = response.data.content || '';
      if (outputContent) {
        setGeneratedOutput(outputContent);
        setDisplayedOutput('');
        setIsStaggering(true);
        setHasOutput(true);
      } else {
        setError('No content was generated. Please try again.');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (outputTextareaRef.current) {
      outputTextareaRef.current.select();
      navigator.clipboard.writeText(outputTextareaRef.current.value)
        .then(() => alert('Content copied to clipboard!'))
        .catch(err => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy to clipboard');
        });
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const SendEmail = async () => {
    if (!userEmail) {
      alert("Please enter a recipient email address.");
      return;
    }

    if (outputTextareaRef.current) {
      const content = outputTextareaRef.current.value;
      setSending(true);
      try {
        await axios.post(`${backendURL}/sendmail`, {
          email: userEmail,
          content,
        });
        alert("Email sent successfully!");
      } catch (err) {
        console.error("Failed to send email:", err);
        alert("Failed to send email. Please try again.");
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <div className="text-gray-800 p-4 md:p-8 min-h-screen items-center justify-center mx-auto flex">
      <div className="relative max-w-4xl mx-auto px-2 sm:px-4 md:px-6 z-10">
        <div className={`rounded-lg p-4 md:p-6 flex flex-col ${hasOutput ? 'z-10 mb-2' : 'mb-8'}`}>
          {!hasOutput && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-center mb-8 text-black">
              What do you want to create
            </h1>
          )}

          {hasOutput && (
            <div className="bg-[#cdcdcd] rounded-lg shadow-lg flex flex-col w-[900px] h-screen py-4 px-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <div className="flex space-x-3">
                  <button onClick={toggleEditing} className="text-white px-4 rounded-md py-2 bg-black flex items-center">
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                  <button onClick={copyToClipboard} className="text-white px-4 rounded-md py-2 bg-black flex items-center">
                    Copy
                  </button>
                  <button onClick={SendEmail} disabled={sending} className="text-white px-4 rounded-md py-2 bg-black flex items-center">
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>

              <textarea
                ref={outputTextareaRef}
                value={isEditing ? generatedOutput : (isStaggering ? displayedOutput : generatedOutput)}
                onChange={handleOutputChange}
                readOnly={!isEditing}
                className="w-full h-full bg-[#e6e6e6] rounded-lg p-4 font-sans text-black"
                style={{ minHeight: '300px', resize: isEditing ? 'vertical' : 'none' }}
              />
              {isStaggering && (
                <div className="mt-2 text-sm text-blue-400">Generating output...</div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <div className="relative">
              <textarea
                id="prompt"
                name="prompt"
                placeholder={`Describe your ${emailType.toLowerCase()} email details...`}
                onChange={handleChange}
                value={prompt}
                required
                className="w-full bg-white rounded-lg py-4 px-5 text-sm text-gray-900 placeholder-gray-500 h-32 sm:h-36 pr-20"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full absolute bottom-4 right-4 bg-black text-white text-sm shadow flex items-center justify-center"
                title="Generate"
              >
                <ArrowRightIcon />
              </button>

              <select
                value={emailType}
                onChange={handleEmailTypeChange}
                className="absolute bottom-3 left-3 bg-black text-gray-200 border border-gray-700 rounded-lg py-1 px-2 text-sm"
              >
                <option value="Internship">Internship</option>
                <option value="Followup">Follow-up Email</option>
                <option value="JobApplication">Job Application</option>
                <option value="Resignation">Resignation Letter</option>
                <option value="ThankYou">Thank You Email</option>
                <option value="Introduction">Introduction Email</option>
                <option value="RequestMeeting">Meeting Request</option>
              </select>
            </div>
          </form>

          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Recipient email (required)"
            className="mt-4 p-2 border rounded w-full text-sm"
          />

          {error && (
            <div className="mt-4 bg-red-800 w-fit h-fit py-2 px-4 text-white">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
