import React, { forwardRef } from 'react';
import { isNil } from 'remeda';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { collapse } from '@growthops/ext-ts';
import { FormField } from '@app/components/utility';
import type { FormFieldInputProps } from '@app/components/utility/form-field';

type Option = {
  key: string;
  label: string;
};

type SelectProps = {
  options: Option[];
} & FormFieldInputProps &
  React.ComponentPropsWithoutRef<'select'>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      options,
      placeholder,
      ...intrinsicSelectProps
    }: SelectProps,
    ref
  ) => (
    <FormField
      {...{ className, label, helpText, error }}
      isRequired={intrinsicSelectProps.required}
      isDisabled={intrinsicSelectProps.disabled}
    >
      {(baseClasses) => (
        <div className="relative">
          <ChevronDownIcon className="absolute top-2 right-0 mt-[0.9rem] mr-2 w-5 text-true-gray-500 select-none pointer-events-none" />
          <select
            ref={ref}
            className={collapse([baseClasses, 'appearance-none'])}
            {...intrinsicSelectProps}
            defaultValue=""
          >
            {!isNil(placeholder) && (
              <option disabled value="">
                {placeholder}
              </option>
            )}
            {options.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}
    </FormField>
  )
);

export default Select;

export type { Option, SelectProps };
