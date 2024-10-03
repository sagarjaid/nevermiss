/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/libs/supabase/client';
import apiClient from '@/libs/api';
import { Link } from 'lucide-react';

// A button to show user some account actions
//  1. Billing: open a Stripe Customer Portal to manage their billing (cancel subscription, update payment method, etc.).
//     You have to manually activate the Customer Portal in your Stripe Dashboard (https://dashboard.stripe.com/test/settings/billing/portal)
//     This is only available if the customer has a customerId (they made a purchase previously)
//  2. Logout: sign out and go back to homepage
// See more at https://shipfa.st/docs/components/buttonAccount
const ButtonAccount = () => {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleBilling = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        '/stripe/create-portal',
        {
          returnUrl: window.location.href,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <Popover className='relative z-10'>
      {({ open }) => (
        <>
          <Popover.Button className='btn btn-sm text-xs'>
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user?.user_metadata?.avatar_url}
                alt={'Profile picture'}
                className='w-5 h-5 rounded-full shrink-0'
                referrerPolicy='no-referrer'
                width={24}
                height={24}
              />
            ) : (
              <span className='w-8 h-8 bg-base-100 flex justify-center items-center rounded-full shrink-0 capitalize'>
                {user?.email?.charAt(0)}
              </span>
            )}

            {user?.user_metadata?.name ||
              user?.email?.split('@')[0] ||
              'Account'}

            {isLoading ? (
              <span className='loading loading-spinner loading-xs'></span>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className={`w-5 h-5 duration-200 opacity-50 ${
                  open ? 'transform rotate-180 ' : ''
                }`}>
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </Popover.Button>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'>
            <Popover.Panel className='absolute right-0 z-10 mt-3 w-screen max-w-[175px] transform'>
              <div className='overflow-hidden rounded-xl shadow-xl ring-1 ring-base-content ring-opacity-5 bg-base-100 p-1'>
                <div className='space-y-0.5 text-sm'>
                  <button
                    className='flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-lg font-medium'
                    onClick={() => (window.location.href = '/list')}>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'>
                      {/* <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /> */}

                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
                      />
                    </svg>
                    My Channels
                  </button>

                  <button
                    className='flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-lg font-medium'
                    onClick={() => (window.location.href = '/dashboard')}>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'>
                      {/* <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /> */}
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                    Submit Channel
                  </button>

                  {/* <button
                    className='flex items-center gap-2 hover:bg-base-300 duration-200 py-1.5 px-4 w-full rounded-lg font-medium'
                    onClick={handleBilling}>
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
                        d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                      />
                    </svg>
                    My plans
                  </button> */}

                  <button
                    className='flex items-center gap-2 hover:bg-error/20 hover:text-error duration-200 py-1.5 px-4 w-full rounded-lg font-medium'
                    onClick={handleSignOut}>
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
                        d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ButtonAccount;
