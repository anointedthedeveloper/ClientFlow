'use client';
import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>{children}</div>;
}

const badgeColors: Record<string, string> = {
  LEAD: 'bg-blue-100 text-blue-700',
  CONTACTED: 'bg-yellow-100 text-yellow-700',
  PROPOSAL: 'bg-purple-100 text-purple-700',
  CLOSED: 'bg-green-100 text-green-700',
  ADMIN: 'bg-indigo-100 text-indigo-700',
  SALES: 'bg-teal-100 text-teal-700',
  SUPPORT: 'bg-orange-100 text-orange-700',
  NOTE: 'bg-gray-100 text-gray-700',
  CALL: 'bg-blue-100 text-blue-700',
  EMAIL: 'bg-green-100 text-green-700',
};

export function Badge({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[label] ?? 'bg-gray-100 text-gray-700'}`}>
      {label.charAt(0) + label.slice(1).toLowerCase()}
    </span>
  );
}

export function Spinner() {
  return <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />;
}

export function EmptyState({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
