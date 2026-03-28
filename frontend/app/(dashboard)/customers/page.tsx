'use client';
import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Pencil, Trash2, Users } from 'lucide-react';
import api from '@/lib/api';
import { Customer } from '@/types';
import { Card, Badge, EmptyState, Modal, Spinner } from '@/components/ui';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

function CustomerForm({ initial, onSave, onClose }: { initial?: Partial<Customer>; onSave: () => void; onClose: () => void }) {
  const [form, setForm] = useState({ name: initial?.name ?? '', email: initial?.email ?? '', phone: initial?.phone ?? '', company: initial?.company ?? '' });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initial?.id) await api.put(`/customers/${initial.id}`, form);
      else await api.post('/customers', form);
      onSave();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Name" value={form.name} onChange={set('name')} required />
      <Input label="Email" type="email" value={form.email} onChange={set('email')} />
      <Input label="Phone" value={form.phone} onChange={set('phone')} />
      <Input label="Company" value={form.company} onChange={set('company')} />
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">{initial?.id ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; customer?: Customer }>({ open: false });

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get('/customers', { params: { search: search || undefined } });
    setCustomers(data);
    setLoading(false);
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this customer?')) return;
    await api.delete(`/customers/${id}`);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} total</p>
        </div>
        <Button onClick={() => setModal({ open: true })} size="sm">
          <Plus className="w-4 h-4" /> Add customer
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Spinner /></div>
      ) : customers.length === 0 ? (
        <EmptyState icon={Users} title="No customers yet" description="Add your first customer to get started" />
      ) : (
        <Card>
          <div className="divide-y divide-gray-100">
            {customers.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email ?? c.company ?? 'No details'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {c.company && <span className="text-xs text-gray-500 hidden sm:block">{c.company}</span>}
                  <button onClick={() => setModal({ open: true, customer: c })} className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Modal open={modal.open} onClose={() => setModal({ open: false })} title={modal.customer ? 'Edit customer' : 'New customer'}>
        <CustomerForm
          initial={modal.customer}
          onSave={() => { setModal({ open: false }); load(); }}
          onClose={() => setModal({ open: false })}
        />
      </Modal>
    </div>
  );
}
