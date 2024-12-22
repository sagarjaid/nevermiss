/** @format */

import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RecurrencePickerProps {
  onRecurrenceChange: (recurrence: string) => void;
}

// Define the recurrence types and options as a type-safe object
type RecurrenceType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

type RecurrenceOptions = {
  [key in RecurrenceType]: string[];
};

const RecurrencePicker: React.FC<RecurrencePickerProps> = ({
  onRecurrenceChange,
}) => {
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>('Daily');
  const [recurrenceOption, setRecurrenceOption] = useState<string>(''); // Will hold the selected option
  const [specificDay, setSpecificDay] = useState<string>(''); // To store the selected day if "Specific day" is chosen

  // Type-safe options for each recurrence type
  const recurrenceOptions: RecurrenceOptions = {
    Daily: ['Everyday', 'Weekdays', 'Weekends', 'Specific day'],
    Weekly: ['Every Week', 'Alternate Week'],
    Monthly: [
      'Every Month',
      'Alternate Month',
      'Every 3 Months',
      'Every 6 Months',
    ],
    Yearly: ['Every Year'],
  };

  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  // Handle main recurrence type change
  const handleRecurrenceTypeChange = (type: RecurrenceType) => {
    setRecurrenceType(type);
  };

  // Handle recurrence option change
  const handleRecurrenceOptionChange = (option: string) => {
    setRecurrenceOption(option);
    if (option === 'Specific day') {
      const currentDay = new Date()
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase(); // Default to current day
      setSpecificDay(currentDay);
      onRecurrenceChange(`${recurrenceType}: Specific day (${currentDay})`);
    } else {
      onRecurrenceChange(`${recurrenceType}: ${option}`);
    }
  };

  // Handle specific day selection
  const handleSpecificDayChange = (day: string) => {
    setSpecificDay(day);
    onRecurrenceChange(`${recurrenceType}: Specific day (${day})`);
  };

  // Set the first option as selected when recurrenceType changes
  useEffect(() => {
    const firstOption = recurrenceOptions[recurrenceType]?.[0] || '';
    setRecurrenceOption(firstOption); // Set to first option
    onRecurrenceChange(`${recurrenceType}: ${firstOption}`); // Propagate change

    // Set default specific day if "Specific day" is the first option
    if (firstOption === 'Specific day') {
      const currentDay = new Date()
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase(); // Get current day in lowercase
      setSpecificDay(currentDay);
      onRecurrenceChange(`${recurrenceType}: Specific day (${currentDay})`);
    }
  }, [recurrenceType]);

  return (
    <div className='flex flex-col gap-4'>
      {/* Main Recurrence Type */}
      <Select
        value={recurrenceType}
        onValueChange={handleRecurrenceTypeChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select Recurrence Type' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Daily'>Daily</SelectItem>
          <SelectItem value='Weekly'>Weekly</SelectItem>
          <SelectItem value='Monthly'>Monthly</SelectItem>
          <SelectItem value='Yearly'>Yearly</SelectItem>
        </SelectContent>
      </Select>

      {/* Conditional Rendering of Recurrence Options */}
      {recurrenceType === 'Daily' && (
        <RadioGroup
          value={recurrenceOption}
          onValueChange={handleRecurrenceOptionChange}
          className='flex flex-col gap-2'>
          {recurrenceOptions.Daily.map((option) => (
            <div
              key={option}
              className='flex items-center gap-2'>
              <RadioGroupItem
                value={option}
                id={option}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {recurrenceType === 'Weekly' && (
        <RadioGroup
          value={recurrenceOption}
          onValueChange={handleRecurrenceOptionChange}
          className='flex flex-col gap-2'>
          {recurrenceOptions.Weekly.map((option) => (
            <div
              key={option}
              className='flex items-center gap-2'>
              <RadioGroupItem
                value={option}
                id={option}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {recurrenceType === 'Monthly' && (
        <RadioGroup
          value={recurrenceOption}
          onValueChange={handleRecurrenceOptionChange}
          className='flex flex-col gap-2'>
          {recurrenceOptions.Monthly.map((option) => (
            <div
              key={option}
              className='flex items-center gap-2'>
              <RadioGroupItem
                value={option}
                id={option}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {recurrenceType === 'Yearly' && (
        <RadioGroup
          value={recurrenceOption}
          onValueChange={handleRecurrenceOptionChange}
          className='flex flex-col gap-2'>
          {recurrenceOptions.Yearly.map((option) => (
            <div
              key={option}
              className='flex items-center gap-2'>
              <RadioGroupItem
                value={option}
                id={option}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {/* Show Days of the Week Dropdown if "Specific day" is selected */}
      {recurrenceOption === 'Specific day' && (
        <Select
          value={specificDay}
          onValueChange={handleSpecificDayChange}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select Specific day' />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day) => (
              <SelectItem
                key={day}
                value={day}>
                Every {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default RecurrencePicker;
