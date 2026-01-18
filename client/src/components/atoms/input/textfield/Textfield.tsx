'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';
import { TextFieldProps } from './textfield.types';
import {
  inputBase,
  inputNormal,
  inputError,
  labelStyle,
  errorStyle,
} from './textfield.styles';

export const Textfield = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={labelStyle}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={clsx(
            inputBase,
            error ? inputError : inputNormal,
            className
          )}
          {...props}
        />

        {error?.message && (
          <p className={errorStyle}>{error.message}</p>
        )}
      </div>
    );
  }
);

Textfield.displayName = 'Textfield';
