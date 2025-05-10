import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState(''); // For stagger effect
  const [emailType, setEmailType] = useState('Internship'); // Default email type
  const [userEmail, setUserEmail] = useState(''); // New state for user email
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('emailCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [renderReact, setRenderReact] = useState(false);
  const [hasOutput, setHasOutput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isStaggering, setIsStaggering] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // New state for current time

  // Reference to the textarea for copying
  const outputTextareaRef = useRef(null);

  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem('loginvalue') === 'true';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString()); // Update time every second
    }, 1000);

    return () => clearInterval(timer); // Clear interval on unmount
  }, []);

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
  setRenderReact(false);

  try {
    const response = await axios.post('http://localhost:3000/main', {
      input: {
        messages: prompt,
        outputType: emailType,
      },
    });

    const outputContent = response.data.content || ''; // ✅ Fixed here

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
      // Select the text in the textarea
      outputTextareaRef.current.select();
      
      // Copy the text to clipboard
      navigator.clipboard.writeText(outputTextareaRef.current.value)
        .then(() => {
          alert('Content copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy to clipboard');
        });
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
     <div className="bg-neutral-950 text-gray-300 p-4 md:p-8 min-h-screen">
  <div className="absolute inset-0 flex justify-end pointer-events-none z-0">
    <div className="w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[radial-gradient(circle,_rgba(253,186,116,0.4)_0%,_transparent_70%)] rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-4xl mx-auto px-2 sm:px-4 md:px-6 z-10">
    <div className="w-full flex justify-center mt-6">
      <p className="bg-orange-500 shadow-lg shadow-orange-600/50 hover:scale-110 transition-all duration-200 w-fit px-4 py-2 font-sans font-medium rounded-full text-white text-sm">
        {currentTime}
      </p>
    </div>

    <div className={`rounded-lg p-4 md:p-6 ${hasOutput ? 'z-10 mb-2' : 'mb-8'}`}>
      {!hasOutput && (
        <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-sans text-center mb-8 font-extralight text-white">
          What do you want to <span className='italic font-serif'>craft</span>
        </h1>
      )}

      {hasOutput && (
        <div className="bg-[#121212] rounded-lg shadow-lg p-6 sm:p-8 mt-6 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex space-x-3">
              <button onClick={toggleEditing} className="text-white hover:text-blue-300 flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button onClick={copyToClipboard} className="text-white hover:text-blue-300 flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
          </div>

          <textarea
            ref={outputTextareaRef}
            value={isEditing ? generatedOutput : (isStaggering ? displayedOutput : generatedOutput)}
            onChange={handleOutputChange}
            readOnly={!isEditing}
            className="w-full bg-[#121212] rounded-lg p-4 font-serif whitespace-pre-wrap text-gray-300"
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
            className="w-full bg-[#212121] z-20 rounded-lg py-4 px-5 text-sm text-gray-200 placeholder-gray-500 h-32 sm:h-36 pr-20"
          />

        <button
  type="submit"
  className="w-8 h-8 rounded-full absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-700 text-white text-sm shadow z-30"
  title="Generate"
/>

          <select
            value={emailType}
            onChange={handleEmailTypeChange}
            className="absolute bottom-3 left-3 bg-[#212121] border border-gray-700 rounded-lg py-1 px-2 text-sm text-gray-200"
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

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}
    </div>
  </div>
</div>

<div className="fixed top-0 left-0 z-50">
  <Sidebar />
</div>

    </div>
  );
};

export default Home;
