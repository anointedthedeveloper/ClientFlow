import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign in' };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 flex items-center justify-center p-4">
      {children}
    </div>
  );
}
