import Link from 'next/link';
import AuthLayout from '@/app/components/auth/auth-layout';
import LoginForm from '@/app/components/auth/login-form';

export default function Login() {
  return (
    <AuthLayout
      title="Sign In"
      socialSeparatorLabel="Or you can sign in with"
      instruction={
        <div className="flex justify-center gap-2">
          <p className="text-fg-secondary">Don&apos;t have an account?</p>
          <Link href="/register">Sign Up</Link>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
