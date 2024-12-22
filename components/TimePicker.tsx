/** @format */

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

// Define the type for the component props
interface TimePickerProps {
  selectedHour: number;
  selectedMinute: number;
  selectedPeriod: string;
  onTimeChange: (hour: number, minute: number, period: string) => void;
}

const generateHourOptions = () => Array.from({ length: 12 }, (_, i) => i + 1);
const generateMinuteOptions = () =>
  Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
const generatePeriodOptions = () => ['AM', 'PM'];

export const TimePicker: React.FC<TimePickerProps> = ({
  selectedHour,
  selectedMinute,
  selectedPeriod,
  onTimeChange,
}) => {
  const hourOptions = generateHourOptions();
  const minuteOptions = generateMinuteOptions();
  const periodOptions = generatePeriodOptions();

  const [hour, setHour] = useState<number>(selectedHour);
  const [minute, setMinute] = useState<number>(selectedMinute);
  const [period, setPeriod] = useState<string>(selectedPeriod);

  useEffect(() => {
    setHour(selectedHour);
    setMinute(selectedMinute);
    setPeriod(selectedPeriod);
  }, [selectedHour, selectedMinute, selectedPeriod]);

  const handleHourChange = (value: string) => {
    const newHour = parseInt(value, 10);
    setHour(newHour);
    onTimeChange(newHour, minute, period);
  };

  const handleMinuteChange = (value: string) => {
    const newMinute = parseInt(value, 10);
    setMinute(newMinute);
    onTimeChange(hour, newMinute, period);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    onTimeChange(hour, minute, value);
  };

  return (
    <div className='flex gap-2'>
      {/* Hour Dropdown */}
      <Select
        value={hour.toString()}
        onValueChange={handleHourChange}>
        <SelectTrigger className='w-16'>
          <SelectValue placeholder='Hour'>{hour}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hourOptions.map((hourOption) => (
            <SelectItem
              key={hourOption}
              value={hourOption.toString()}>
              {hourOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Minute Dropdown */}
      <Select
        value={minute.toString()}
        onValueChange={handleMinuteChange}>
        <SelectTrigger className='w-16'>
          <SelectValue placeholder='Minute'>
            {minute.toString().padStart(2, '0')}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {minuteOptions.map((minuteOption) => (
            <SelectItem
              key={minuteOption}
              value={minuteOption}>
              {minuteOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* AM/PM Dropdown */}
      <Select
        value={period}
        onValueChange={handlePeriodChange}>
        <SelectTrigger className='w-16'>
          <SelectValue placeholder='AM/PM'>{period}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {periodOptions.map((periodOption) => (
            <SelectItem
              key={periodOption}
              value={periodOption}>
              {periodOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimePicker;
