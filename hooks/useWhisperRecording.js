'use client';

import useWhisper from '@chengsokdara/use-whisper';

// try ro make you own audio npm

export const useWhisperRecording = (key) => {
  const { recording, transcript, startRecording, stopRecording } = useWhisper({
    apiKey: key,
    removeSilence: true,
    stopTimeout: 120000,
    streaming: true,
  });

  return {
    recording,
    transcript,
    startRecording,
    stopRecording,
  };
};

// ('use client');

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // Define the endpoint for the OpenAI Whisper API
// const WHISPER_API_URL = 'https://api.openai.com/v1/audio/transcriptions'; // Update the endpoint if needed

// export const useWhisperRecording = (apiKey) => {
//   const [recording, setRecording] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   let mediaRecorder;

//   const startRecording = async () => {
//     // Request microphone access
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     mediaRecorder = new MediaRecorder(stream);
//     const audioChunks = [];

//     mediaRecorder.ondataavailable = (event) => {
//       audioChunks.push(event.data);
//     };

//     mediaRecorder.onstop = async () => {
//       const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//       await transcribeAudio(audioBlob);
//     };

//     mediaRecorder.start();
//     setRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setRecording(false);
//     }
//   };

//   const transcribeAudio = async (audioBlob) => {
//     const formData = new FormData();
//     formData.append('file', audioBlob);
//     formData.append('model', 'whisper-1'); // Specify the model to use
//     formData.append('language', 'en'); // Optional: specify the language

//     try {
//       const response = await axios.post(WHISPER_API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Update the transcript state with the response
//       setTranscript(response.data.text);
//     } catch (error) {
//       console.error('Error transcribing audio:', error);
//       setTranscript(''); // Reset the transcript in case of error
//     }
//   };

//   return {
//     recording,
//     transcript,
//     startRecording,
//     stopRecording,
//   };
// };
