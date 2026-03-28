'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Mail, FileText, Plus } from 'lucide-react';
import api from '@/lib/api';
import { Deal, Activity, ActivityType } from '@/types';
import { Card, Badge, Spinner, Modal } from '@/components/ui';
import Button from '@/components/ui/Button';

const activityIcons: Record<ActivityType, any> = { NOTE: FileText, CALL: Phone, EMAIL: Mail };

function ActivityForm({ dealId, onSave, onClose }: { dealId: string; onSave: () => void; onClose: () => void }) {
  const [form, setForm] = useState({ type: 'NOTE' as ActivityType, content: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/activities', { ...form, dealId });
      onSave();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Type</label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as ActivityType })}
        >
          <option value="NOTE">Note</option>
          <option value="CALL">Call</option>
          <option value="EMAIL">Email</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Content</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">Log activity</Button>
      </div>
    </form>
  );
}

export default function DealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get(`/deals/${id}`);
    setDeal(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;
  if (!deal) return <p className="text-gray-500">Deal not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{deal.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge label={deal.stage} />
            {deal.value > 0 && <span className="text-sm text-gray-500">${deal.value.toLocaleString()}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Details</h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-500">Customer</dt>
              <dd className="text-sm font-medium text-gray-900 mt-0.5">{deal.customer?.name}</dd>
            </div>
            {deal.customer?.company && (
              <div>
                <dt className="text-xs text-gray-500">Company</dt>
                <dd className="text-sm text-gray-900 mt-0.5">{deal.customer.company}</dd>
              </div>
            )}
            {deal.assignedTo && (
              <div>
                <dt className="text-xs text-gray-500">Assigned to</dt>
                <dd className="text-sm text-gray-900 mt-0.5">{deal.assignedTo.name}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs text-gray-500">Created</dt>
              <dd className="text-sm text-gray-900 mt-0.5">{new Date(deal.createdAt).toLocaleDateString()}</dd>
            </div>
          </dl>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Activity</h2>
            <Button size="sm" variant="secondary" onClick={() => setModal(true)}>
              <Plus className="w-3.5 h-3.5" /> Log
            </Button>
          </div>

          {!deal.activities?.length ? (
            <p className="text-sm text-gray-400 text-center py-8">No activities yet</p>
          ) : (
            <div className="space-y-3">
              {deal.activities.map((a) => {
                const Icon = activityIcons[a.type];
                return (
                  <div key={a.id} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge label={a.type} />
                        <span className="text-xs text-gray-400">{a.user?.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">{new Date(a.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{a.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Log activity">
        <ActivityForm dealId={deal.id} onSave={() => { setModal(false); load(); }} onClose={() => setModal(false)} />
      </Modal>
    </div>
  );
}
