import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState(''); // For stagger effect
  const [emailType, setEmailType] = useState('Internship'); // Default email type
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
  
  // Reference to the textarea for copying
  const outputTextareaRef = useRef(null);
  
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem('loginvalue') === 'true';

  useEffect(() => {
    localStorage.setItem('emailCount', count.toString());
  }, [count]);

  // Stagger effect implementation
  useEffect(() => {
    if (generatedOutput && isStaggering) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= generatedOutput.length) {
          setDisplayedOutput(generatedOutput.substring(0, currentIndex));
          currentIndex += 3; // Add 3 characters at a time for faster rendering
        } else {
          clearInterval(interval);
          setIsStaggering(false);
        }
      }, 10); // Speed of stagger effect
      
      return () => clearInterval(interval);
    }
  }, [generatedOutput, isStaggering]);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleOutputChange = (e) => {
    setGeneratedOutput(e.target.value);
    setDisplayedOutput(e.target.value); // Update displayed output directly when editing
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
          outputType: emailType // Send the selected email type to the backend
        },
      });

      const outputContent = response.data.reply?.choices?.[0]?.message?.content || '';
      
      if (outputContent) {
        setGeneratedOutput(outputContent);
        setDisplayedOutput(''); // Clear displayed output before staggering
        setIsStaggering(true); // Start stagger effect
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

    const newCount = count + 1;
    setCount(newCount);

    if (!isLoggedIn && newCount > 2) {
      nav('/login');
      return;
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
    <div className="min-h-screen bg-[#121212] text-gray-300 p-4 md:p-8">
      <div className="max-w-3xl mx-auto relative">
   
        <div className={`bg-[#121212] rounded-lg shadow-lg p-6 ${hasOutput ? 'z-10 mb-2' : 'mb-8'}`}>
        
          {!hasOutput && (
            <h1 className="text-5xl font-serif text-center mb-10 text-white">
              What do you want to craft?
            </h1>
          )}
          
          {hasOutput && (
            <div className="bg-[#121212] rounded-lg shadow-lg p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-3">
                  <button
                    onClick={toggleEditing}
                    className="text-white hover:text-blue-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="text-white hover:text-blue-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
                className={`w-full bg-[#121212] rounded-lg p-4 font-serif whitespace-pre-wrap text-gray-300 
                `}
                style={{ minHeight: '400px', resize: isEditing ? 'vertical' : 'none' }}
              />
              
              {isStaggering && (
                <div className="mt-2 text-sm text-blue-400">
                  Generating output...
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Type Selector */}
            <div className="flex items-center space-x-2">
              <select
                value={emailType}
                onChange={handleEmailTypeChange}
                className="bg-[#212121] border border-gray-700 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Internship">Internship Application</option>
                <option value="Followup">Follow-up Email</option>
                <option value="JobApplication">Job Application</option>
                <option value="Resignation">Resignation Letter</option>
                <option value="ThankYou">Thank You Email</option>
                <option value="Introduction">Introduction Email</option>
                <option value="RequestMeeting">Meeting Request</option>
              </select>
            </div>
            
            <div>
              <textarea
                id="prompt"
                name="prompt"
                placeholder={`Describe your ${emailType.toLowerCase()} email details...`}
                onChange={handleChange}
                value={prompt}
                required
                className={`w-full bg-[#212121] z-20 rounded-lg py-3 px-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${hasOutput ? 'h-24' : 'h-40'}`}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-white text-black font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out flex justify-center items-center"
              >
                {isGenerating ? (
                  <>
                    Generating...
                  </>
                ) : (
                  `Generate`
                )}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-900 bg-opacity-70 text-white rounded-lg p-4 mb-8 border border-red-800">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;