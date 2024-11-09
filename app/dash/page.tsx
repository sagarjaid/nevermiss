import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';

import RightSidebar from '@/components/molecules/RightSidebar';
import TakeInterviewCard from '@/components/molecules/TakeInterviewCard';

import CallButton from '@/components/CallButton';
import GetJobs from '@/components/GetJobs';
import GetJob from '@/components/GetJob';
import CreateJob from '@/components/CreateJob';

import { v4 as uuidv4 } from 'uuid';

export default function Dashboard() {
  const generatedUUID = uuidv4(); // Ensure this function is called

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
              <main className='flex gap-6 flex-col p-4 w-full'>
                <div className='flex flex-col justify-start items-start text-sm  xs:text-lg sdm:text-xl sm:gap-3 md:text-2xl p-1'>
                  <div className='font-semibold'>Dashboard</div>
                  <div className='text-sm'>
                    Take the first step toward your dream today!
                  </div>
                </div>
                <div className='flex w-full flex-col items-center max-w-lg justify-center gap-4'>
                  <div className='flex w-full flex-col items-center justify-center gap-4 sm:flex-row'>
                    {/* <TakeInterviewCard generatedUUID={generatedUUID} /> */}
                    <a
                      href='/add'
                      className='flex h-52 w-full cursor-pointer items-center justify-between gap-2 rounded-md p-4  border shadow-md hover:shadow-lg'>
                      <div className='flex flex-col gap-3 '>
                        {/* <svg
                          className='w-10 h-10'
                          fill='none'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3'
                          />
                        </svg> */}
                        <svg
                          className='w-10 h-10'
                          fill='none'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 4.5v15m7.5-7.5h-15'
                          />
                        </svg>
                        <div className='text-lg mt-4 font-semibold'>
                          Add New Goal
                        </div>
                        <div className='text-xs text-gray-600'>
                          Create a Goal, AI will call on your mobile number to
                          remind your goal
                        </div>
                      </div>
                    </a>
                    <a
                      href='/goals'
                      className='flex h-52 w-full cursor-pointer items-center justify-between gap-2 rounded-md p-4  border shadow-md hover:shadow-lg'>
                      <div className='flex flex-col gap-3 '>
                        <svg
                          className='w-10 h-10'
                          fill='none'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3'
                          />
                        </svg>
                        <div className='text-lg mt-4 font-semibold'>
                          Active Goals
                        </div>
                        <div className='text-xs text-gray-600'>
                          Instantly Access your active goals, view, delete,
                          edit, pause them
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* <CallButton />

                  <GetJobs />

                  <GetJob />

                  <CreateJob /> */}
                </div>
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
