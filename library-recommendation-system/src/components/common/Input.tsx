import React from 'react';

/**
 * Input component props
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Modern Input component with beautiful focus states
 *
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={emailError}
 *   required
 * />
 */
export function Input({ label, error, required, className = '', ...props }: InputProps) {
  const inputClasses = `input-modern ${
    error ? 'border-rose-500 bg-rose-50 focus:border-rose-500 focus:ring-rose-500/10' : ''
  } ${className}`;

  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <input className={inputClasses} {...props} />
      {error && (
        <div className="mt-2 flex items-center text-sm text-rose-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
