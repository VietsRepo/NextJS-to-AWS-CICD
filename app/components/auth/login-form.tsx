'use client';

import { useActionState } from 'react';
import { login } from '@/app/lib/actions/auth';
import SubmitButton from './submit-button';
import LegalNotice from './legal-notice';

export default function LoginForm() {
  // A react hook help manages state and status automatically
  // instead of useState() the traditional way
  const [state, formAction] = useActionState(login, undefined);

  return (
    <form action={formAction} className="my-8 flex flex-col gap-5">
      <div>
        <label htmlFor="username" className="sr-only">
          Username or email address
        </label>
        <input
          id="username"
          name="username"
          type="text"
          // Help Password Manager and Browser know and autofill
          autoComplete="username"
          placeholder="Username or email address"
          defaultValue={state?.values?.username}
          aria-describedby="username-error"
          className="focus:border-focus-ring border-border-strong w-full rounded-lg border p-2"
        />
        {state?.errors?.username && (
          <p id="username-error" className="text-danger-600 mt-1 text-sm">
            {state.errors.username[0]}
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
          // Help Password Manager and Browser know and autofill
          autoComplete="current-password"
          placeholder="Password"
          aria-describedby="password-error"
          className="focus:border-focus-ring border-border-strong w-full rounded-lg border p-2"
        />
        {state?.errors?.password && (
          <p id="password-error" className="text-danger-600 mt-1 text-sm">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {state?.message && (
        <p role="alert" aria-live="polite" className="text-danger-600 text-sm">
          {state.message}
        </p>
      )}

      <SubmitButton>Sign In</SubmitButton>
      <LegalNotice />
      <div className="flex justify-between">
        <a href="#">Forgot Password?</a>
      </div>
    </form>
  );
}
