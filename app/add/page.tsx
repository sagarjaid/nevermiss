/** @format */

'use client';

import { Suspense, useEffect } from 'react';
import Header from '@/components/Header';
import { User } from '@supabase/supabase-js';

import Navbar from '@/components/Navbar';

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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function Dashboard() {
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

  // const languages = [
  //   'English',
  //   'Spanish',
  //   'French',
  //   'Chinese',
  //   'Hindi',
  //   'Arabic',
  //   'Russian',
  //   'German',
  //   'Japanese',
  //   'Indonesian',
  //   'Vietnamese',
  //   'Thai',
  //   'Korean',
  //   'Tamil',
  //   'Marathi',
  // ];

  const languages = ['English', 'Spanish', 'Chinese', 'Hindi'];

  const repeat = ['No', 'Yes'];

  const aiVoices = ['Male', 'Female'];

  const supabase = createClient();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  const [goalName, setGoalName] = useState<string>('');
  const [aiVoice, setAIVoice] = useState(aiVoices[0]); // Set the first value as default
  const [language, setLanguage] = useState(languages[0]); // Set the first value as default
  const [persona, setPersona] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [isRepeat, setIsRepeat] = useState(true); // Use boolean state
  const [isActive, setIsActive] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // const [selectedTime, setSelectedTime] = useState<string>('12:00 AM');

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // const [selectedHour, setSelectedHour] = useState<number>(12);
  // const [selectedMinute, setSelectedMinute] = useState<number>(0);
  // const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');

  const [recurrenceType, setRecurrenceType] = useState<string>('');

  const handleRepeat = (value: string) => {
    setIsRepeat(value === 'true');
  };

  const handleDateChange = (date: Date) => {
    console.log(date, 'date');

    setSelectedDate(date);
  };

  // // Handle time change
  // const handleTimeChange = (hour: number, minute: number, period: string) => {
  //   setSelectedHour(hour);
  //   setSelectedMinute(minute);
  //   setSelectedPeriod(period);
  // };

  const [hour, setHour] = useState<number>(10); // Default: 10 AM
  const [minute, setMinute] = useState<number>(0); // Default: 00
  const [period, setPeriod] = useState<string>('AM'); // Default: AM

  // Function to get current local time
  const getCurrentTime = () => {
    const now = new Date();
    let hour = now.getHours();
    const minute = Math.round(now.getMinutes() / 5) * 5; // Round to nearest 5
    const period = hour >= 12 ? 'PM' : 'AM';

    if (hour > 12) hour -= 12; // Convert to 12-hour format
    if (hour === 0) hour = 12; // Handle midnight as 12 AM

    return { hour, minute, period };
  };

  useEffect(() => {
    const { hour, minute, period } = getCurrentTime();
    setHour(hour);
    setMinute(minute);
    setPeriod(period);
  }, []);

  const handleTimeChange = (
    selectedHour: number,
    selectedMinute: number,
    selectedPeriod: string
  ) => {
    // Increment hour if minute is 55 or greater
    if (selectedMinute >= 55) {
      if (selectedHour === 12) {
        // If hour is 12, switch to 1
        selectedHour = 1;
        selectedPeriod = selectedPeriod === 'AM' ? 'PM' : 'AM';
      } else {
        selectedHour = (selectedHour % 12) + 1;
      }
      selectedMinute = 0;
    }

    setHour(selectedHour);
    setMinute(selectedMinute);
    setPeriod(selectedPeriod);
  };

  const handleRecurrenceChange = (recurrence: string) => {
    console.log('Selected Recurrence:', recurrence);
    setRecurrenceType(recurrence);
  };

  // const handleDateTimeChange = (
  //   date: Date,
  //   hour: number,
  //   minute: number,
  //   period: string
  // ) => {
  //   setSelectedDate(date);
  //   setSelectedHour(hour);
  //   setSelectedMinute(minute);
  //   setSelectedPeriod(period);
  //   console.log(
  //     `Selected DateTime: ${format(date, 'yyyy-MM-dd')} ${hour}:${
  //       minute < 10 ? `0${minute}` : minute
  //     } ${period}`
  //   );
  // };

  // const getResult = async () => {
  //   setLoading(true);
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   const { data: resultData, error } = await supabase
  //     .from('interviews')
  //     .select('interview_id')
  //     .eq('user_id', user.id);

  //   setHistory(resultData.map((interview) => interview.interview_id));

  //   console.log(resultData, 'resultData');
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getResult();
  // }, []);

  const handleToggle = (value: boolean) => {
    setIsActive(value);
    console.log('Switch is now:', value ? 'Active' : 'Inactive');
  };

  const handleClick = () => {
    console.log('Create a Goal button clicked!');
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setPhoneNumber(user?.phone || '');
    };

    getUser();
  }, [supabase]);

  // console.log(user, 'user');

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
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
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

                    <div className=' w-full'>
                      <Select
                        value={aiVoice}
                        onValueChange={(value) => setAIVoice(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Voice' />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                          {aiVoices.map((el, i) => (
                            <SelectItem
                              key={i}
                              value={el}>
                              {el}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                    <div className=' w-full'>
                      <Select
                        value={language}
                        onValueChange={(value) => setLanguage(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Voice' />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                          {languages.map((el, i) => (
                            <SelectItem
                              key={i}
                              value={el}>
                              {el}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      value={phoneNumber || ''}
                      disabled={true}
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
                          (e.target.style.border = ' 1px solid #000000'), // Focus state border color
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
                      value={persona}
                      onChange={(e) => setPersona(e.target.value)}
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
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
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

                    <div>
                      <DatePicker
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                      />
                    </div>
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

                    {/* <TimePicker onTimeChange={handleTimeChange} /> */}

                    {/* <TimePicker
                      selectedHour={selectedHour}
                      selectedMinute={selectedMinute}
                      selectedPeriod={selectedPeriod}
                      onTimeChange={handleTimeChange}
                    /> */}

                    <TimePicker
                      selectedHour={hour}
                      selectedMinute={minute}
                      selectedPeriod={period}
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

                    <div className=' w-full'>
                      <Select
                        value={isRepeat.toString()}
                        onValueChange={handleRepeat}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Repeat'>
                            {isRepeat ? 'Yes' : 'No'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                          <SelectItem value='true'>Yes</SelectItem>
                          <SelectItem value='false'>No</SelectItem>
                          {/* Pass "false" as a string */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {isRepeat && (
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
                  )}

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
