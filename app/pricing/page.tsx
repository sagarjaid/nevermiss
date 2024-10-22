import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';
import VisaInterviewThree from '@/components/core/visaInterviewThree';
import VisaInterviewF from '@/components/core/visaInterviewF';

import VisaInterviewTwo from '@/components/core/visaInterviewTwo';
import VisaInterview from '@/components/core/visaInterview';
import Pricing from '@/components/Pricing';
import RightSidebar from '@/components/molecules/RightSidebar';
import Plans from '@/components/molecules/Plans';

export default function Dashboard() {
  return (
    <>
      <main className='flex flex-col items-center w-full justify-center'>
        {/* <div className='bg-green-500 text-white text-sm w-full flex justify-center items-center p-2 py-3'>
          We are working on few new features, Errors may occur
        </div> */}
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

              <main className='flex gap-6 flex-col p-4 pb-20 w-full'>
                <Plans />
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
}
