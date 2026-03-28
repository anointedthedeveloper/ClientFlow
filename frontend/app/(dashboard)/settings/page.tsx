'use client';
import { useAuthStore } from '@/store/auth.store';
import { Card, Badge } from '@/components/ui';
import { User, Building2, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">Profile</h2>
        </div>
        <dl className="space-y-4">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Name</dt>
            <dd className="text-sm font-medium text-gray-900">{user?.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="text-sm font-medium text-gray-900">{user?.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Role</dt>
            <dd><Badge label={user?.role ?? ''} /></dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">Organization</h2>
        </div>
        <p className="text-sm text-gray-500">Organization ID: <span className="font-mono text-xs text-gray-700">{user?.organizationId}</span></p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ExternalLink className="w-4 h-4 text-gray-500" />
          <h2 className="text-sm font-semibold text-gray-700">About</h2>
        </div>
        <p className="text-sm text-gray-600">
          ClientFlow is built and maintained by{' '}
          <a
            href="https://github.com/anointedthedeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium hover:underline"
          >
            anointedthedeveloper
          </a>
          . View the source code and contribute on GitHub.
        </p>
      </Card>
    </div>
  );
}
