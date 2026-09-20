'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children }: { children: string }) {
  //   Get status of the nearest parent <form>'s submission
  // without passing props down from the parent
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-on-primary bg-primary hover:bg-primary-hover hover:border-primary-hover border-focus-ring cursor-pointer rounded-lg border p-2 font-bold disabled:cursor-not-allowed disabled:opacity-70"
    >
      {children}
    </button>
  );
}
