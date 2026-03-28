'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [form, setForm] = useState({ orgName: '', name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.orgName, form.name, form.email, form.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Create your workspace</h1>
        <p className="text-gray-400 text-sm mt-1">Start managing your pipeline today</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Organization name" placeholder="Acme Inc." value={form.orgName} onChange={set('orgName')} required />
          <Input label="Your name" placeholder="John Doe" value={form.name} onChange={set('name')} required />
          <Input label="Email" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} required />
          <Input label="Password" type="password" placeholder="Min. 8 characters" value={form.password} onChange={set('password')} minLength={8} required />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create account
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-gray-600 mt-6">
        Built by{' '}
        <a href="https://github.com/anointedthedeveloper" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
          anointedthedeveloper
        </a>
      </p>
    </div>
  );
}
