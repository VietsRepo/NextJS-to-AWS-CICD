'use client';

import { useActionState } from 'react';
import { register } from '@/app/lib/actions/auth';
import SubmitButton from './submit-button';
import LegalNotice from './legal-notice';

export default function RegisterForm() {
  // A react hook help manages state and status automatically
  // instead of useState() the traditional way
  const [state, formAction] = useActionState(register, undefined);

  return (
    <form action={formAction} className="my-8 flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="Email address"
          defaultValue={state?.values?.email}
          aria-describedby="email-error"
          className="focus:border-focus-ring border-border-strong w-full rounded-lg border p-2"
        />
        {state?.errors?.email && (
          <p id="email-error" className="text-danger-600 mt-1 text-sm">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          // new-password to Password Manager and Browser know and suggestion strong password
          autoComplete="new-password"
          placeholder="Password"
          aria-describedby="password-error"
          className="focus:border-focus-ring border-border-strong w-full rounded-lg border p-2"
        />
        {state?.errors?.password && (
          <ul
            id="password-error"
            className="text-danger-600 mt-1 text-sm whitespace-pre-line"
          >
            {state.errors.password.map((error, index, originArr) => (
              <li key={error}>
                {originArr.length < 2 && index === 0 ? error : `- ${error}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {state?.message && (
        <p role="alert" aria-live="polite" className="text-danger-600 text-sm">
          {state.message}
        </p>
      )}

      <SubmitButton>Sign Up</SubmitButton>
      <LegalNotice />
    </form>
  );
}
