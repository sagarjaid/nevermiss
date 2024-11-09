import React, { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

// Define the type for the component props
interface DateTimePickerProps {
  selectedDate: Date;
  selectedHour: number;
  selectedMinute: number;
  selectedPeriod: string;
  onDateTimeChange: (
    date: Date,
    hour: number,
    minute: number,
    period: string
  ) => void;
}

// Helper functions
const generateHourOptions = () => Array.from({ length: 12 }, (_, i) => i + 1);
const generateMinuteOptions = () =>
  Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
const generatePeriodOptions = () => ['AM', 'PM'];

export const DateTimePickerX: React.FC<DateTimePickerProps> = ({
  selectedDate,
  selectedHour,
  selectedMinute,
  selectedPeriod,
  onDateTimeChange,
}) => {
  const hourOptions = generateHourOptions();
  const minuteOptions = generateMinuteOptions();
  const periodOptions = generatePeriodOptions();

  // Handle date change
  const handleDateChange = (date: Date) => {
    onDateTimeChange(date, selectedHour, selectedMinute, selectedPeriod);
  };

  // Handle time changes
  const handleHourChange = (value: string) => {
    onDateTimeChange(
      selectedDate,
      parseInt(value, 10),
      selectedMinute,
      selectedPeriod
    );
  };

  const handleMinuteChange = (value: string) => {
    onDateTimeChange(
      selectedDate,
      selectedHour,
      parseInt(value, 10),
      selectedPeriod
    );
  };

  const handlePeriodChange = (value: string) => {
    onDateTimeChange(selectedDate, selectedHour, selectedMinute, value);
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Calendar Date Picker */}
      <Calendar
        selected={selectedDate}
        onSelect={handleDateChange}
        className='w-full p-0'
      />

      <div className='flex gap-4'>
        {/* Hour Dropdown */}
        <Select
          value={selectedHour.toString()}
          onValueChange={handleHourChange}>
          <SelectTrigger className='w-24'>
            <SelectValue placeholder='Hour' />
          </SelectTrigger>
          <SelectContent>
            {hourOptions.map((hour) => (
              <SelectItem
                key={hour}
                value={hour.toString()}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Minute Dropdown */}
        <Select
          value={selectedMinute.toString()}
          onValueChange={handleMinuteChange}>
          <SelectTrigger className='w-24'>
            <SelectValue placeholder='Minute' />
          </SelectTrigger>
          <SelectContent>
            {minuteOptions.map((minute) => (
              <SelectItem
                key={minute}
                value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* AM/PM Dropdown */}
        <Select
          value={selectedPeriod}
          onValueChange={handlePeriodChange}>
          <SelectTrigger className='w-24'>
            <SelectValue placeholder='AM/PM' />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((period) => (
              <SelectItem
                key={period}
                value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
