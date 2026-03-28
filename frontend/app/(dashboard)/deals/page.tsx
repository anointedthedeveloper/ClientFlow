'use client';
import { useEffect, useState, useCallback } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import api from '@/lib/api';
import { Deal, DealStage, Customer } from '@/types';
import { EmptyState, Modal, Spinner } from '@/components/ui';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import KanbanBoard from '@/components/deals/KanbanBoard';

function DealForm({ customers, onSave, onClose }: { customers: Customer[]; onSave: () => void; onClose: () => void }) {
  const [form, setForm] = useState({ title: '', value: '', customerId: '', stage: 'LEAD' as DealStage });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/deals', { ...form, value: parseFloat(form.value) || 0 });
      onSave();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Deal title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <Input label="Value ($)" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Customer</label>
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
          required
        >
          <option value="">Select customer</option>
          {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">Create deal</Button>
      </div>
    </form>
  );
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [d, c] = await Promise.all([api.get('/deals'), api.get('/customers')]);
    setDeals(d.data);
    setCustomers(c.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStageChange = async (dealId: string, stage: DealStage) => {
    setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, stage } : d));
    await api.put(`/deals/${dealId}`, { stage });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-sm text-gray-500 mt-1">Drag cards to update stage</p>
        </div>
        <Button onClick={() => setModal(true)} size="sm">
          <Plus className="w-4 h-4" /> New deal
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : deals.length === 0 ? (
        <EmptyState icon={Briefcase} title="No deals yet" description="Create your first deal to start tracking your pipeline" />
      ) : (
        <KanbanBoard deals={deals} onStageChange={handleStageChange} />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title="New deal">
        <DealForm customers={customers} onSave={() => { setModal(false); load(); }} onClose={() => setModal(false)} />
      </Modal>
    </div>
  );
}
