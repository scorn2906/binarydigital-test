'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { SelectProps } from './select.types';
import {
  selectBase,
  selectNormal,
  selectError,
  labelStyle,
  errorStyle,
} from './select.styles';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      className,
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const selectId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className={labelStyle}>
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={clsx(
            selectBase,
            error ? selectError : selectNormal,
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error?.message && (
          <p className={errorStyle}>{error.message}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
