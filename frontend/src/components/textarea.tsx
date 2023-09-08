import React, { forwardRef } from 'react';
import { collapse } from '@growthops/ext-ts';
import { FormField } from '@app/components/utility';
import type { FormFieldInputProps } from '@app/components/utility/form-field';

type TextareaProps = FormFieldInputProps &
  React.ComponentPropsWithoutRef<'textarea'>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      ...intrinsicTextareaProps
    }: TextareaProps,
    ref
  ) => (
    <FormField
      {...{ className, label, helpText, error }}
      isRequired={intrinsicTextareaProps.required}
      isDisabled={intrinsicTextareaProps.disabled}
    >
      {(baseClasses) => (
        <textarea
          ref={ref}
          className={collapse([baseClasses, 'mb-[-0.3rem]'])}
          {...intrinsicTextareaProps}
        />
      )}
    </FormField>
  )
);

export default Textarea;

export type { TextareaProps };
