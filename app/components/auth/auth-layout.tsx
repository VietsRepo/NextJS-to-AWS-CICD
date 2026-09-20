import type { ReactNode } from 'react';
import Link from 'next/link';
import Container from '@/app/components/layout/container';
import Logo from '@/app/components/ui/logo';
import GoogleBrand from '@/app/components/ui/google-brand';

type Props = {
  title: string;
  children: ReactNode;
  instruction: ReactNode;
  socialSeparatorLabel: string;
};

export default function AuthLayout({
  title,
  children,
  instruction,
  socialSeparatorLabel,
}: Props) {
  return (
    <>
      <header className="px-6 leading-1 shadow-xl">
        <Container>
          <Link
            href="/"
            className="inline-block focus-visible:outline-transparent!"
          >
            <Logo className="w-18" />
          </Link>
        </Container>
      </header>
      <main className="flex-1 bg-neutral-100 py-8">
        <div className="bg-surface mx-auto mt-12 w-100 rounded-lg p-6 shadow-lg">
          <h1 className="text-center text-4xl">{title}</h1>
          {children}
          <div className="flex items-center gap-3">
            <span className="bg-border h-px flex-1"></span>
            <span>{socialSeparatorLabel}</span>
            <span className="bg-border h-px flex-1"></span>
          </div>
          <button
            aria-label="Continue with Google"
            className="group border-border-strong hover:bg-info-50 hover:border-info-200 my-4 flex w-full cursor-pointer items-center justify-center rounded-lg border"
          >
            <GoogleBrand className="text-app group-hover:text-info-50 h-10 w-auto" />
          </button>
          {instruction}
        </div>
      </main>
      <footer className="border-border border-t bg-neutral-100 px-6">
        <Container>
          <p>@ {new Date().getFullYear()} DropTime · Best Time - Best Price</p>
        </Container>
      </footer>
    </>
  );
}
