'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import Image from 'next/image';
import VisaInterview from '@/components/core/visaInterview';
// import Footer from '@/components/atoms/footer';
import { useApiCall } from '@/hooks/useApiCall';
import Header from '@/components/Header';
import VisaInterviewTwo from '@/components/core/visaInterviewTwo';

interface Question {
  questionNumber: number;
  question: string;
  questionCategory: string;
}

interface Params {
  id: string;
}

const DynamicPage = ({ params }: { params: Params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [checkingPermissions, setCheckingPermissions] = useState<boolean>(true);

  const [baseInterviewQuestions, setBaseInterviewQuestions] = useState<
    Question[]
  >([]);

  const [isAccess, setIsAccess] = useState<{
    video: boolean;
    audio: boolean;
  }>({
    video: false,
    audio: false,
  });
  const hasFetchedRef = useRef(false); // Ref to track if questions have been fetched

  const { callApi } = useApiCall();

  const { id } = params;

  // Fetch base questions
  const getBaseQuestions = async () => {
    try {
      setCheckingPermissions(true);
      const resData1 = await callApi('/api/get-questions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const arr = JSON.parse(resData1?.result);
      const baseInterviewQuestionsArr = arr.balancedInterviewQuestionsArr;

      // Update the state with the base questions array
      setBaseInterviewQuestions(baseInterviewQuestionsArr);

      setCheckingPermissions(false);
    } catch (error) {
      // If API call fails, use the default base questions
      setCheckingPermissions(true);
      setBaseInterviewQuestions([
        {
          questionNumber: 1,
          question: 'What university are you planning to attend?',
          questionCategory: 'universityAndStudyPlans',
        },
        {
          questionNumber: 2,
          question: "What was your GPA during your bachelor's degree?",
          questionCategory: 'academicsHistory',
        },
        {
          questionNumber: 3,
          question: 'Who will be paying for your education?',
          questionCategory: 'studentFinances',
        },
        {
          questionNumber: 4,
          question: 'What is your current job title?',
          questionCategory: 'workExperience',
        },
        {
          questionNumber: 5,
          question: 'Do you plan to work in the USA after graduating?',
          questionCategory: 'postGraduationPlans',
        },
        {
          questionNumber: 6,
          question: 'Why did you choose this university?',
          questionCategory: 'universityAndStudyPlans',
        },
        {
          questionNumber: 7,
          question: 'What funds will be used to pay for your studies?',
          questionCategory: 'studentFinances',
        },
        {
          questionNumber: 8,
          question: 'Why did you take a gap year?',
          questionCategory: 'workExperience',
        },
        {
          questionNumber: 9,
          question: 'Do you have any scholarship?',
          questionCategory: 'otherQuestions',
        },
      ]);
      setCheckingPermissions(false);

      console.error('Failed to fetch data:', error);
    }
  };

  console.log(baseInterviewQuestions, 'baseInterviewQuestions');

  useEffect(() => {
    checkPermissions();

    if (id && !hasFetchedRef.current) {
      getBaseQuestions();
      hasFetchedRef.current = true; // Set the ref to true after fetching
    }
  }, [id]);

  // Function to check the permission state of devices (camera and microphone)
  const checkPermissions = async () => {
    try {
      // Check microphone permission
      const audioPermission = await navigator.permissions.query({
        name: 'microphone' as any,
      }); // Casting to 'any' to avoid type error
      setIsAccess((prevState) => ({
        ...prevState,
        audio: audioPermission.state === 'granted', // If microphone access is granted
      }));

      // Check camera permission
      const videoPermission = await navigator.permissions.query({
        name: 'camera' as any,
      }); // Casting to 'any' to avoid type error
      setIsAccess((prevState) => ({
        ...prevState,
        video: videoPermission.state === 'granted', // If camera access is granted
      }));
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  // Function to request permission to access microphone and camera
  const requestPermission = async () => {
    setLoading(true);
    try {
      // Request access to microphone
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Update the state based on access
      setIsAccess((prevState) => ({
        ...prevState,
        audio: true,
      }));

      // Stop the stream after checking permission
      audioStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Permission denied for audio:', error);
      setIsAccess((prevState) => ({
        ...prevState,
        audio: false,
      }));
    }

    try {
      // Request access to camera
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      // Update the state based on access
      setIsAccess((prevState) => ({
        ...prevState,
        video: true,
      }));

      // Stop the stream after checking permission
      videoStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Permission denied for video:', error);
      setIsAccess((prevState) => ({
        ...prevState,
        video: false,
      }));
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <main className='flex flex-col items-center w-full justify-center'>
        <div className='flex max-w-5xl w-full flex-col items-center justify-center'>
          <div className=' w-full'>
            <Suspense>
              <Header />
            </Suspense>
          </div>

          {loading && baseInterviewQuestions && (
            <div className='flex gap-2 justify-center items-center h-screen'>
              <Image
                src='/loading.gif'
                width={20}
                height={20}
                alt='Loading'
              />
              <div>Loading new interview...</div>
            </div>
          )}

          {checkingPermissions && (
            <div className='flex gap-2 justify-center items-center h-screen'>
              <Image
                src='/loading.gif'
                width={20}
                height={20}
                alt='Loading'
              />
              <div>Checking required permissions</div>
            </div>
          )}

          {!isAccess.audio && !isAccess.video && (
            <div className='flex flex-col max-w-96 items-center border rounded-md mt-20 gap-5 text-sm'>
              <div className='flex flex-col gap-4 p-4'>
                <div className='flex flex-col justify-center items-center gap-3'>
                  <svg
                    className='w-10 h-10'
                    fill='none'
                    strokeWidth={1.5}
                    stroke='red'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                    />
                  </svg>
                  <div className='text-red-500 font-bold text-lg'>
                    Before We start the Interview
                  </div>
                </div>
                {/* <div>✅ You Only get 1 FREE Interview make best out of it</div> */}
                <div>
                  ✅ Be prepared and assume this as your real US Visa interview,
                  Try giving your best to answer
                </div>
                <div>
                  ✅ For best experience find a quieter place and wear
                  headphones
                </div>

                <div>
                  ✅ For interview to go smooth we will require access to your
                  camera and microphone
                </div>
              </div>
              <hr className='w-full' />
              <div className='flex w-full flex-col gap-3 items-center justify-center px-3 pb-4 pt-0'>
                {/* <div className='text-xs'>
                  Interview will start when you give the permissions
                </div> */}

                <div className=' flex flex-col gap-2 p-2 text-xs'>
                  <div className='flex justify-between gap-2'>
                    <p>Microphone Access:</p>
                    <p>{isAccess.audio ? '🟢' : '🔴'}</p>
                  </div>
                  <div className='flex justify-between gap-2.5'>
                    <p>Camera Access:</p>
                    <p>{isAccess.video ? '🟢' : '🔴'}</p>
                  </div>
                </div>
                <button
                  className=' rounded-md hover:bg-green-500 bg-green-600 text-white px-4 py-2'
                  onClick={requestPermission}>
                  Allow access
                </button>
              </div>
            </div>
          )}
          {baseInterviewQuestions[0] && isAccess.audio && isAccess.video && (
            <div className='flex flex-col gap-4 items-center justify-center'>
              <VisaInterview baseInterviewQuestions={baseInterviewQuestions} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default DynamicPage;
