/** @format */

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import config from '@/config';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';

import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/bootstrap.css';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { log } from 'node:console';

export default function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, [supabase]);

  if (user) {
    window.location.href = '/dash';
  }

  console.log(user, 'user');

  const sendOTP = async () => {
    if (!phoneNumber) {
      toast.error('Phone number is required!');
      return;
    }
    console.log(phoneNumber, 'phoneNumber');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: `+${phoneNumber}`,
      });
      if (error) {
        toast.error(`Error: ${error.message || error.code}`);
        setShowOtp(false);
      } else {
        toast.success('OTP sent successfully!');
        setShowOtp(true);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e: any) => {
    e.preventDefault();

    if (!otp) {
      toast.error('Please enter the OTP!');
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) {
        toast.error(`Error: ${error.message || error.code}`);
      } else {
        toast.success('OTP verified successfully!');
        const redirectURL = `${window.location.origin}/api/auth/callback`;

        // Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
        router.push(redirectURL);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const text = {
    heading: 'Login with OTP',
    label: {
      phoneNumber: 'Phone Number',
      otp: 'OTP',
      otpTooltip: 'Enter the OTP sent to your phone',
      tooltip: 'AI will call you on this number',
    },
  };

  return (
    <main>
      <div className='flex justify-center items-center h-screen'>
        <div
          className='p-8 md:p-10 flex flex-col gap-4 justify-center items-center border w-fit rounded-md'
          data-theme={config.colors.theme}>
          <div className='flex flex-col w-full gap-4'>
            <Link
              href='/'
              className='flex items-center text-[10px] text-gray-700 max-w-fit'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5'>
                <path
                  fillRule='evenodd'
                  d='M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z'
                  clipRule='evenodd'
                />
              </svg>
              Home
            </Link>

            <h1 className='text-xl md:text-2xl font-extrabold tracking-tight'>
              {text.heading}
            </h1>

            <hr />
          </div>

          <div className='flex flex-col gap-4 w-full min-w-[300px] min-h-[200px]'>
            {!showOtp && (
              <>
                <div className='flex flex-col gap-2 max-w-xl w-full'>
                  <div className='flex gap-1.5'>
                    <div className='text-sm'>{text.label.phoneNumber}</div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <svg
                            className='w-3.5 h-3.5'
                            fill='none'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                            />
                          </svg>
                        </TooltipTrigger>
                        <TooltipContent side='right'>
                          <p>{text.label.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <PhoneInput
                    country={'in'}
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    inputStyle={{
                      fontFamily: 'Bricolage Grotesque',
                      padding: '8px 14px 8px 60px',
                      color: '#0D0A09',
                      width: '100%',
                      border: '1px solid #E7E5E4',
                      borderRadius: '6px',
                      fontSize: '14px',
                      lineHeight: '19px',
                    }}
                    inputProps={{
                      required: true,
                      onFocus: (e: {
                        target: {
                          style: { border: string; boxShadow: string };
                        };
                      }) => {
                        (e.target.style.border = ' 1px solid #015ECC'), // Focus state border color
                          (e.target.style.boxShadow = 'none'); // Box-shadow on focus
                      },
                      onBlur: (e: {
                        target: { style: { border: string } };
                      }) => {
                        e.target.style.border = '1px solid #E7E5E4'; // Blur state resets the border
                      },
                    }}
                  />
                </div>
                <Button
                  onClick={sendOTP}
                  disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            )}

            {showOtp && (
              <div className='flex text-md flex-col gap-2 w-full'>
                <div className='flex gap-1.5'>
                  <div className='text-sm'>{text.label.otp}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <svg
                          className='w-3.5 h-3.5'
                          fill='none'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                          />
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent side='right'>
                        <p>{text.label.otpTooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Input
                  type='text'
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button
                  onClick={verifyOtp}
                  disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
