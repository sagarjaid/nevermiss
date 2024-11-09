'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
// import ButtonSubmitYT from '@/components/ButtonSubmitYT';
// import ChannelList from '@/components/ChannelList';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';

import { createClient } from '@/libs/supabase/client';
import { useState } from 'react';
import RightSidebar from '@/components/molecules/RightSidebar';

import RecurrencePicker from '@/components/RecurrencePicker';

import { Switch } from '@/components/ui/switch';

import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/bootstrap.css';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DatePicker } from '@/components/DatePicker';
import { TimePicker } from '@/components/TimePicker';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const supabase = createClient();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedTime, setSelectedTime] = useState<string>('12:00 AM');

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');

  const [recurrenceType, setRecurrenceType] = useState<string>('');

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle time change
  const handleTimeChange = (hour: number, minute: number, period: string) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(period);
  };

  const handleRecurrenceTypeChange = (value: string) => {
    setRecurrenceType(value);
    console.log('Selected Recurrence Type:', value);
  };

  const handleRecurrenceChange = (recurrence: string) => {
    console.log('Selected Recurrence:', recurrence);
  };

  const handleDateTimeChange = (
    date: Date,
    hour: number,
    minute: number,
    period: string
  ) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(period);
    console.log(
      `Selected DateTime: ${format(date, 'yyyy-MM-dd')} ${hour}:${
        minute < 10 ? `0${minute}` : minute
      } ${period}`
    );
  };

  const getResult = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: resultData, error } = await supabase
      .from('interviews')
      .select('interview_id')
      .eq('user_id', user.id);

    setHistory(resultData.map((interview) => interview.interview_id));

    console.log(resultData, 'resultData');
    setLoading(false);
  };

  // useEffect(() => {
  //   getResult();
  // }, []);

  const text = {
    heading: {
      addYoutubeChannel: 'Add YouTube Channel',
    },
    label: {
      channelUrl: {
        name: 'Channel URL',
        required: true,
        toolTip: 'Please enter your youtube channel url',
        maxLength: 300,
      },
      language: {
        name: 'Language',
        required: true,
        toolTip: 'Please select youtube channel language',
        maxLength: 300,
      },
      repeat: {
        name: 'Repeat',
        required: true,
        toolTip: ' Goal needs to be reminded daily/weekly/monthly?',
        maxLength: 100,
      },
      voices: {
        name: 'AI Voice',
        required: true,
        toolTip: 'Please select preferred voice tone for AI',
        maxLength: 100,
      },
      date: {
        name: 'Starting Date',
        required: true,
        toolTip: 'Please enter goal starting date',
        maxLength: 100,
      },
      time: {
        name: 'Time',
        required: true,
        toolTip: 'Please select time on which AI can call you',
        maxLength: 100,
      },
      persona: {
        name: 'AI Persona',
        required: true,
        toolTip: 'Enter which persona you want the AI to take',
        maxLength: 100,
      },
      context: {
        name: 'Reminder context',
        required: true,
        toolTip:
          'Enter what exactly AI should remind you, what AI should say, etc...',
        maxLength: 100,
      },
      PhoneNumber: {
        name: 'Phone Number',
        required: true,
        toolTip: 'AI will call you on this number',
        maxLength: 100,
      },
      status: {
        name: 'Status',
        required: true,
        toolTip: 'Run or pause the goal',
        maxLength: 100,
      },
      repeatEvery: {
        name: 'Repeat intervals',
        required: true,
        toolTip:
          'Please check the box if applicable in your case or leave it unchecked',
        maxLength: 100,
      },
    },
  };

  const languages = [
    'English',
    'Spanish',
    'French',
    'Chinese',
    'Hindi',
    'Arabic',
    'Russian',
    'German',
    'Japanese',
    'Indonesian',
    'Vietnamese',
    'Thai',
    'Korean',
    'Tamil',
    'Marathi',
    'Other',
  ];

  const repeat = ['No', 'Yes'];

  const aiVoices = ['Male', 'Female'];

  const [isActive, setIsActive] = useState(true);

  const handleToggle = (value: boolean) => {
    setIsActive(value);
    console.log('Switch is now:', value ? 'Active' : 'Inactive');
  };

  const handleClick = () => {
    console.log('Create a Goal button clicked!');
  };

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

              <div className='flex gap-2 flex-col p-4 w-full'>
                <div className='flex flex-col justify-start items-start text-sm  xs:text-lg sdm:text-xl sm:gap-1.5 md:text-2xl p-1 border-b pb-3'>
                  <div className='font-semibold'>Add Goal +</div>
                  <div className='text-sm'>
                    Create goal and get reminded in specific time intervals
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start text-sm  xs:text-lg sdm:text-xl gap-6 md:text-2xl p-2 pb-24'>
                  <div className='flex text-md w-[60%] flex-col gap-2'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>Goal Name</div>
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
                            <p>Please select youtube channel language</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <Input
                      type='text'
                      className='placeholder:text-xs'
                      placeholder='Gym reminder'
                      maxLength={100}
                      value={''}
                      // onChange={(e) => setChannelOwnerName(e.target.value)}
                      required
                    />
                  </div>

                  {/* <div className='flex w-full justify-between gap-3'> */}
                  <div className='flex flex-col gap-2 w-[60%]'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.voices.name}</div>
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
                            <p>{text.label.voices.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className='relative w-full'>
                      <select
                        // onChange={(e) => setCategory(e.target.value)}
                        className='block appearance-none w-full text-sm bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none'>
                        {aiVoices.map((el, i) => (
                          <option
                            key={i}
                            value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'>
                          <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-2 w-[60%]'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.language.name}</div>
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
                            <p>{text.label.language.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className='relative w-full'>
                      <select
                        // onChange={(e) => setLanguage(e.target.value)}
                        className='block appearance-none w-full text-sm bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none'>
                        {languages.map((el, i) => (
                          <option
                            key={i}
                            value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'>
                          <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}

                  <div className=' flex flex-col gap-2 w-[60%]'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>
                        {text.label.PhoneNumber.name}
                      </div>
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
                            <p>{text.label.PhoneNumber.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {/* <input
                type='number'
                toolTip='+(country-code)'
                className='w-full rounded-md border  p-2 toolTip:text-xs'
                maxLength={text.label.PhoneNumber.maxLength}
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                min='0'
                required
              /> */}

                    <PhoneInput
                      country={'in'}
                      inputStyle={{
                        fontFamily: 'Bricolage Grotesque',
                        padding: '8px 14px 8px 60px', // Padding can be dynamically set here if required
                        color: '#0D0A09',
                        width: '100%',
                        border: '1px solid #E7E5E4',
                        borderRadius: '6px',
                        fontSize: '14px',
                        lineHeight: '19px ',
                      }}
                      inputProps={{
                        required: true,
                        onFocus: (e: {
                          target: {
                            style: { border: string; boxShadow: string };
                          };
                        }) => {
                          (e.target.style.border = ' 2px solid #015ECC'), // Focus state border color
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

                  <div className='flex text-md w-[60%] flex-col gap-2'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.persona.name}</div>
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
                            <p>{text.label.persona.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      type='text'
                      placeholder='Act as gym coach'
                      className='placeholder:text-xs'
                      maxLength={100}
                      value={''}
                      // onChange={(e) => setChannelOwnerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className='flex text-md w-[60%] flex-col gap-2'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.context.name}</div>
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
                            <p>{text.label.context.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <Textarea
                      placeholder='Remind me to go to the gym, ask about my last workout, today’s plan, motivate me if required and wish a great day ahead.'
                      className='placeholder:text-xs h-32'
                    />
                  </div>

                  <div className='flex flex-col gap-3 w-full'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.date.name}</div>
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
                            <p>{text.label.date.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <DatePicker
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                    />
                  </div>

                  <div className='flex flex-col gap-3 w-full'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.time.name}</div>
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
                            <p>{text.label.time.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <TimePicker
                      selectedHour={selectedHour}
                      selectedMinute={selectedMinute}
                      selectedPeriod={selectedPeriod}
                      onTimeChange={handleTimeChange}
                    />
                  </div>

                  <div className='flex flex-col gap-1 w-[60%]'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.repeat.name}</div>
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
                            <p>{text.label.repeat.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className='relative w-full'>
                      <select
                        // onChange={(e) => setLanguage(e.target.value)}
                        className='block appearance-none w-full text-sm bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none'>
                        {repeat.map((el, i) => (
                          <option
                            key={i}
                            value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <svg
                          className='fill-current h-4 w-4'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'>
                          <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col gap-1 w-[60%]'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>
                        {text.label.repeatEvery.name}
                      </div>
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
                            <p>{text.label.repeatEvery.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <RecurrencePicker
                      onRecurrenceChange={handleRecurrenceChange}
                    />
                  </div>

                  <div className='flex flex-col gap-3 w-full'>
                    <div className='flex gap-1.5'>
                      <div className='text-sm'>{text.label.status.name}</div>
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
                            <p>{text.label.status.toolTip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className='flex gap-1.5'>
                      <Switch
                        checked={isActive}
                        onCheckedChange={handleToggle}
                      />
                      <div className='text-sm'>
                        {isActive ? 'Active' : 'Pause'}
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleClick}>Create a Goal</Button>
                </div>
              </div>
            </div>

            <div className=' hidden lg:flex flex-col gap-4 w-[350px] border-l p-4 cursor-pointer'>
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
