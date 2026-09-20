import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ className = "", children }: Props) {
  return (
    <div className={`mx-auto max-w-7xl py-4 ${className}`}>{children}</div>
  );
}
