'use client';

import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
}

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  type = "text"
}: CustomFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="form-label">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className="form-input"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-red-500 font-medium text-sm mt-1" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
