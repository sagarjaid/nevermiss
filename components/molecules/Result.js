import React from 'react';

const Result = () => {
  const f1VisaApprovalReasons = [
    'Strong academic background and qualifications',
    'Clear and focused study plan related to career goals',
    'Proof of sufficient financial resources to cover tuition and living expenses',
    'Admission to a reputable US educational institution',
    'Ties to home country indicating intent to return after studies',
    'Good English language proficiency (if required by the program)',
  ];

  return (
    <div className='flex h-full w-full cursor-pointer items-center justify-between gap-2 rounded-md  border shadow-md hover:shadow-lg'>
      <div className='flex w-full flex-col gap-6'>
        <div className='flex flex-col gap-0.5 px-4 pt-4'>
          {/* <svg
                        className='w-10 h-10 text-red-500'
                        fill='none'
                        strokeWidth={3}
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18 18 6M6 6l12 12'
                        />
                      </svg> */}
          <svg
            className='w-16 h-16 text-green-600'
            fill='none'
            strokeWidth={3}
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m4.5 12.75 6 6 9-13.5'
            />
          </svg>

          <div className='text-lg mt-4 font-semibold'>Interview Result</div>
          <div className='text-xs text-gray-700'>InterviewID : 91739730173</div>
        </div>
        <div className='flex flex-col gap-1 px-4 border-b pb-6'>
          <div className='text-green-600 text-lg font-bold'>
            Your visa has been Approved!
          </div>
          {/* <div className='text-red-500 text-base'>
                        Sorry your visa has been Rejected
                      </div> */}

          <div className='text-xs'>
            These reasons can help guide your visa preparation and provide
            strong points to address during the visa interview.
          </div>
        </div>

        <div className='flex flex-col pt-0 p-2 pl-4'>
          <div className='text-sm font-semibold'>
            Reasons why your visa was Approved/Rejected
          </div>

          {/* // <div className='flex flex-col gap-4 p-2 border rounded-sm mt-0 m-2.5'> */}
          <div className='flex flex-col gap-6 p-2 pt-4 '>
            {f1VisaApprovalReasons.length > 0 &&
              f1VisaApprovalReasons.map((el, i) => (
                <div key={i}>
                  <div className='flex gap-2.5'>
                    {/* <svg
                                      className='w-3.5 h-3.5 text-green-500'
                                      fill='none'
                                      strokeWidth={3}
                                      stroke='currentColor'
                                      viewBox='0 0 24 24'
                                      xmlns='http://www.w3.org/2000/svg'
                                      aria-hidden='true'>
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='m4.5 12.75 6 6 9-13.5'
                                      />
                                    </svg> */}
                    <span>{i + 1}.</span>
                    <span> {el}.</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className='flex justify-start gap-5 px-4 pb-6'>
          {/* <a
                          href='/signin'
                          className='flex items-center gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
                            />
                          </svg>
                          <span>Share on WhatsApp</span>
                        </a> */}
          <a
            href='/signin'
            className='flex items-center gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
            <svg
              className='w-5 h-5'
              fill='none'
              strokeWidth={1.5}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
              />
            </svg>
            <span>Upgrade to Success Plan</span>
          </a>
          <a
            href='/signin'
            className='flex items-center gap-2 bg-white hover:bg-slate-50 p-2 px-3.5 border cursor-pointer border-black rounded-md'>
            <svg
              className='w-5 h-5'
              fill='none'
              strokeWidth={1.5}
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
              />
            </svg>
            <span>Take another interview</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
