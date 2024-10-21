import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';
import Result from '@/components/molecules/Result';

import VisaInterview from '@/components/core/visaInterview';
import RightSidebar from '@/components/molecules/RightSidebar';

interface Params {
  id: string;
}

const DynamicPage = ({ params }: { params: Params }) => {
  const { id } = params;

  return (
    <>
      <main className='flex flex-col items-center w-full justify-center'>
        <div className='bg-green-500 text-white text-sm w-full flex justify-center items-center p-2 py-3'>
          We are working on few new features, Errors may occur
        </div>
        <div className='flex max-w-5xl w-full flex-col items-center justify-center'>
          <div className='border-b w-full'>
            <Suspense>
              <Header />
            </Suspense>
          </div>
          <div className='flex w-full max-w-5xl h-screen text-xs'>
            <Navbar />

            {/* <div className='flex justify-between w-full'> */}
            <div className='flex flex-col w-full lg:overflow-y-scroll'>
              {/* <ChannelList filter={'all'} /> */}

              {/* <VisaInterviewF baseInterviewQuestions={baseInterviewQuestions} /> */}

              {/* <VisaInterviewThree
                  baseInterviewQuestions={baseInterviewQuestions}
                /> */}

              {/* <VisaInterview
                  baseInterviewQuestions={baseInterviewQuestions}
                /> */}

              <main className='flex gap-6 flex-col p-4 w-full'>
                <Result interviewId={id} />
              </main>
            </div>

            <div className=' hidden lg:flex flex-col gap-4 w-[350px] border-l p-4 cursor-pointer'>
              <RightSidebar />
            </div>
            {/* </div> */}
          </div>
        </div>
      </main>
    </>
  );
};
export default DynamicPage;
