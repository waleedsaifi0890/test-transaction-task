import React, { useMemo } from 'react';
import { isNil } from 'remeda';
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { collapse } from '@growthops/ext-ts';

type FormFieldInputProps = {
  label: string;
  helpText?: string;
  isColor?:boolean;
  error?: string;
  className?: string;
};

type FormFieldProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
  children: (baseClasses: string) => JSX.Element;
} & FormFieldInputProps;

const generateMetaText = (
  text: string | undefined,
  additionalClasses: string,
  Svg: React.ElementType
) =>
  !isNil(text) && (
    <div
      className={collapse([
        'flex mt-1 items-center space-x-1',
        additionalClasses,
      ])}
    >
      <Svg className="w-4" />
      <span className="block text-xs">{text}</span>
    </div>
  );

const baseClasses = `
	mt-1
	border
  h-[52px]
	rounded-[5px]
	px-2
	py-1
	w-full
	text-regular
`;
const drivedClasses = `
bg-[#171719]
h-[56px]
border-0
outline-0
rounded-xl
indent-4
text-white
	
`

const getErrorClasses = (error: string | undefined) =>
  isNil(error) ? 'border-[#D9DBE9]  ' : 'border-red-300';

const getDisabledClasses = (disabled: boolean | undefined) =>
  disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white';

const FormField = ({
  className,
  label,
  isRequired,
  isColor,
  isDisabled,
  helpText,
  error,
  children,
}: FormFieldProps) => {
  const smartLabel = useMemo(
    () => `${label} ${isRequired ? '*' : ''}`.trim(),
    [label, isRequired]
  );

  const labelClasses = useMemo(
    () =>
      `block text-base  font-[500] ${isNil(error) ? '' : 'text-red-500'}`,
    [error]
  );

  const fieldClasses = useMemo(
    () =>
      collapse([
        baseClasses,
        getErrorClasses(error),
        getDisabledClasses(isDisabled),
      ]),
    [error, isDisabled]
  );

  return (
    <div className={className}>
      <span className={labelClasses}>{smartLabel}</span>
      {isColor?children(baseClasses+drivedClasses):children(fieldClasses)}
      {generateMetaText(helpText, 'text-true-gray-500', InformationCircleIcon)}
      {generateMetaText(error, 'text-red-500', ExclamationCircleIcon)}
    </div>
  );
};

export default FormField;

export type { FormFieldInputProps, FormFieldProps };
