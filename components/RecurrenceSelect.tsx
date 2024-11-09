'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import React from 'react';

interface RecurrenceSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const RecurrenceSelect: React.FC<RecurrenceSelectProps> = ({
  value,
  onValueChange,
}) => {
  //   const defaultValue = value || 'Daily';

  return (
    <div className='flex flex-col gap-4'>
      <Select
        value={value}
        onValueChange={onValueChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select One ' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='Daily'>Daily</SelectItem>
          <SelectItem value='Weekly'>Weekly</SelectItem>
          <SelectItem value='Monthly'>Monthly</SelectItem>
          <SelectItem value='Yearly'>Yearly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RecurrenceSelect;
