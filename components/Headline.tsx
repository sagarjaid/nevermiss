'use client';

import Typewriter from 'typewriter-effect';

const Headline = () => {
  return (
    <>
      {/* <div className='text-xs bg-orange-200 rounded-full p-1.5 px-2.5 mb-3'>
        📞 incoming call AI is calling...
      </div> */}

      <div className='flex gap-2'>
        Never Miss Your Life Goals
        {/* <Typewriter
          options={{
            strings: ['Life Goal', 'Task', 'Meetings'],
            autoStart: true,
            loop: true,
          }}
        /> */}
      </div>
      <div className='flex gap-0 text-base font-medium '>
        {/* Remind yourself of your goals/tasks via ai call */}
        Your Life Goals/Tasks Reminded by AI via call every-
        <Typewriter
          options={{
            strings: ['day', 'week', 'month', 'year'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
    </>
  );
};

export default Headline;
