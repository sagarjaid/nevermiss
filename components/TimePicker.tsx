import React from 'react';
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

// Helper functions
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

  // Handle time changes
  const handleHourChange = (value: string) => {
    onTimeChange(parseInt(value, 10), selectedMinute, selectedPeriod);
  };

  const handleMinuteChange = (value: string) => {
    onTimeChange(selectedHour, parseInt(value, 10), selectedPeriod);
  };

  const handlePeriodChange = (value: string) => {
    onTimeChange(selectedHour, selectedMinute, value);
  };

  return (
    <div className='flex gap-2'>
      {/* Hour Dropdown */}
      <Select
        value={selectedHour.toString()}
        onValueChange={handleHourChange}>
        <SelectTrigger className='w-16'>
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
        <SelectTrigger className='w-16'>
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
        <SelectTrigger className='w-16'>
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
  );
};
