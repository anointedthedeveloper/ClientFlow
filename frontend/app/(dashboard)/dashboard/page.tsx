'use client';
import { useEffect, useState } from 'react';
import { Users, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';
import api from '@/lib/api';
import { Dashboard } from '@/types';
import { Card, Spinner } from '@/components/ui';

const stages = ['LEAD', 'CONTACTED', 'PROPOSAL', 'CLOSED'] as const;

const stageColors: Record<string, string> = {
  LEAD: 'bg-blue-500',
  CONTACTED: 'bg-yellow-500',
  PROPOSAL: 'bg-purple-500',
  CLOSED: 'bg-green-500',
};

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/deals/dashboard').then((r) => setData(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;
  if (!data) return null;

  const stats = [
    { label: 'Total Customers', value: data.totalCustomers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Deals', value: data.totalDeals, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Closed Revenue', value: `$${data.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Deals', value: data.byStage.LEAD + data.byStage.CONTACTED + data.byStage.PROPOSAL, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const maxStage = Math.max(...stages.map((s) => data.byStage[s]), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your pipeline at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-6">Pipeline by Stage</h2>
        <div className="space-y-4">
          {stages.map((stage) => (
            <div key={stage} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-24">{stage.charAt(0) + stage.slice(1).toLowerCase()}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${stageColors[stage]} transition-all duration-500`}
                  style={{ width: `${(data.byStage[stage] / maxStage) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900 w-6 text-right">{data.byStage[stage]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
