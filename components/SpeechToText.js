// components/SpeechToText.js
'use client';

import { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsRecording(true);
      };

      recognitionInstance.onresult = (event) => {
        let resultText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            resultText += event.results[i][0].transcript + ' ';
          } else {
            resultText += event.results[i][0].transcript;
          }
        }
        setTranscript(resultText);

        if (resultText.toLowerCase().includes('stop recording')) {
          stopRecording();
          setTranscript(resultText.replace(/stop recording/gi, ''));
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error('Speech recognition not supported');
    }
  }, []);

  const startRecording = () => {
    if (recognition) {
      setTranscript('');
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className='flex flex-col items-center h-screen bg-gradient-to-br from-gray-800 to-gray-900'>
      <h1 className='text-white text-3xl md:text-5xl uppercase my-8'>
        Real-time Stt App
      </h1>

      <div className='flex space-x-4'>
        <button
          id='startBtn'
          onClick={startRecording}
          disabled={isRecording}
          className='flex items-center bg-red-600 text-white px-6 py-2 rounded-md shadow-lg hover:opacity-90 transition disabled:opacity-50'>
          {isRecording ? (
            <svg
              viewBox='0 0 100 100'
              className='w-6 h-6'>
              <circle
                cx='50'
                cy='50'
                r='40'
                stroke='#ccc'
                strokeWidth='5'
                fill='none'
              />
              <circle
                cx='50'
                cy='50'
                r='30'
                stroke='#ccc'
                strokeWidth='5'
                fill='none'>
                <animate
                  attributeName='r'
                  values='30; 25; 30'
                  dur='1.5s'
                  repeatCount='indefinite'
                />
              </circle>
              <circle
                cx='50'
                cy='50'
                r='5'
                fill='#ccc'
              />
            </svg>
          ) : (
            <span>Start Recording</span>
          )}
        </button>

        <button
          id='stopBtn'
          onClick={stopRecording}
          disabled={!isRecording}
          className='bg-indigo-900 text-white px-6 py-2 rounded-md shadow-lg hover:opacity-90 transition disabled:opacity-50'>
          Stop Recording
        </button>
      </div>

      <div
        id='result'
        className={`w-full max-w-4xl bg-white text-black mt-8 p-4 rounded-md shadow-lg ${
          !transcript && 'hidden'
        }`}>
        {transcript}
      </div>
    </div>
  );
};

export default SpeechToText;
