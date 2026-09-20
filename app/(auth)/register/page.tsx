import Link from "next/link";
import AuthLayout from "@/app/components/auth/auth-layout";
import RegisterForm from "@/app/components/auth/register-form";

export default function Register() {
  return (
    <AuthLayout
      title="Sign Up"
      socialSeparatorLabel="Or you can sign up with"
      instruction={
        <div className="flex justify-center gap-2">
          <p className="text-fg-secondary">Have an account?</p>
          <Link href="/login">Sign In</Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
