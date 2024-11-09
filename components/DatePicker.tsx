import React from 'react';
import { Calendar } from '@/components/ui/calendar';

// Define the type for the component props
interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  // Handle date change
  const handleDateChange = (date: Date) => {
    onDateChange(date);
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* Calendar Date Picker */}
      <Calendar
        selected={selectedDate}
        onSelect={handleDateChange}
        className='w-full p-0'
      />
    </div>
  );
};
