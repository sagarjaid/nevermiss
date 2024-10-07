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
  const [loading, setLoading] = useState<boolean>(true);
  const [baseInterviewQuestions, setBaseInterviewQuestions] = useState<
    Question[]
  >([]);
  const hasFetchedRef = useRef(false); // Ref to track if questions have been fetched

  const { callApi } = useApiCall();

  const { id } = params;

  console.log(id, 'id');

  // const id = router.asPath.split('/').pop(); // Extract the id from the path, since query is not available

  // Fetch base questions
  const getBaseQuestions = async () => {
    try {
      setLoading(true);
      const resData1 = await callApi('/api/get-questions', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const arr = JSON.parse(resData1?.result);
      setBaseInterviewQuestions(arr.balancedInterviewQuestionsArr);
    } catch (error) {
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
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && !hasFetchedRef.current) {
      getBaseQuestions();
      hasFetchedRef.current = true; // Set the ref to true after fetching
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <div className='flex gap-2 justify-center items-center h-screen'>
          <Image
            src='/loading.gif'
            width={20}
            height={20}
            alt='Loading'
          />
          <div>Loading new interview...</div>
        </div>
      ) : (
        <>
          <Suspense>
            <Header />
          </Suspense>

          <main>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <VisaInterview baseInterviewQuestions={baseInterviewQuestions} />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default DynamicPage;
