import React, { forwardRef } from 'react';
import { collapse } from '@growthops/ext-ts';
import { FormField } from '@app/components/utility';
import type { FormFieldInputProps } from '@app/components/utility/form-field';

type InputProps = FormFieldInputProps & React.ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error,isColor, helpText, ...intrinsicInputProps }: InputProps,
    ref
  ) => (
    <FormField
      {...{ className, label,isColor, helpText, error }}
      isRequired={intrinsicInputProps.required}
      isDisabled={intrinsicInputProps.disabled}
    >
      {(baseClasses) => (
        <input
          ref={ref}
          className={collapse(baseClasses)}
          {...intrinsicInputProps}
        />
      )}
    </FormField>
  )
);

export default Input;

export type { InputProps };
