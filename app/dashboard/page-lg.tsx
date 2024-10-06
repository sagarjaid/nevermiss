import ButtonAccount from '@/components/ButtonAccount';

export const dynamic = 'force-dynamic';

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className='min-h-screen p-8 pb-24'>
      <section className='max-w-xl mx-auto space-y-8'>
        <ButtonAccount />
        <main className='flex max-w-5xl gap-6 flex-col p-4 w-full'>
          <div className='flex flex-col justify-start items-start pt-4 text-base  xs:text-2xl sdm:text-2xl sm:gap-3 md:text-2xl p-1'>
            <div className='font-semibold'>
              Welcome <span>{'User'}</span>!
            </div>
            <div className='text-sm'>
              Choose your goal from following 2 options.
            </div>
          </div>
          <div className='flex w-full flex-col items-center max-w-xl justify-center gap-4'>
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <div
                // onClick={() => console.log('/career')}
                className='flex h-60 cursor-pointer items-center justify-between gap-2 rounded-md p-4  border shadow-md hover:shadow-lg'>
                <div className='flex flex-col gap-3'>
                  <img
                    src='history.svg'
                    alt='right'
                    className='h-10 w-10'
                  />
                  <div className='text-lg mt-4 font-semibold'>
                    AI-powerd Career Suggestions
                  </div>
                  <div className='text-xs'>
                    Get 4-to-6 career suggestion based on your personality and
                    interests.
                  </div>
                </div>
              </div>
              <div
                // onClick={() => console.log('/pathfinder')}
                className='relative h-60 flex cursor-pointer items-center justify-between gap-2 rounded-md p-4 border shadow-md hover:shadow-lg'>
                <div className=' absolute right-4 -top-2 w-max rounded-full bg-rose-500 animate-pulse shadow-sm px-1.5 text-xs text-transparent'>
                  .
                </div>
                <div className='flex flex-col gap-3 '>
                  <img
                    src='bag.svg'
                    alt='right'
                    className='h-10 w-10'
                  />
                  <div className='text-lg mt-4 font-semibold'>
                    Detailed Career Path Finder
                  </div>
                  <div className='text-xs'>
                    Get career clarity of the career path with step by step
                    career plan.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </main>
  );
}
