'use client';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import { DollarSign } from 'lucide-react';
import { Deal, DealStage } from '@/types';
import { Badge } from '@/components/ui';
import Link from 'next/link';

const STAGES: DealStage[] = ['LEAD', 'CONTACTED', 'PROPOSAL', 'CLOSED'];

const stageLabels: Record<DealStage, string> = {
  LEAD: 'Lead',
  CONTACTED: 'Contacted',
  PROPOSAL: 'Proposal',
  CLOSED: 'Closed',
};

const stageHeaderColors: Record<DealStage, string> = {
  LEAD: 'border-blue-400',
  CONTACTED: 'border-yellow-400',
  PROPOSAL: 'border-purple-400',
  CLOSED: 'border-green-400',
};

function DealCard({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: deal.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-3 shadow-sm cursor-grab active:cursor-grabbing transition-shadow ${isDragging ? 'shadow-lg opacity-80' : 'hover:shadow-md'}`}
    >
      <Link href={`/deals/${deal.id}`} onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">{deal.title}</p>
      </Link>
      {deal.customer && <p className="text-xs text-gray-500 mt-1">{deal.customer.name}</p>}
      {deal.value > 0 && (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
          <DollarSign className="w-3 h-3" />
          {deal.value.toLocaleString()}
        </div>
      )}
    </div>
  );
}

function Column({ stage, deals }: { stage: DealStage; deals: Deal[] }) {
  const { setNodeRef } = useDroppable({ id: stage });
  return (
    <div className="flex flex-col min-w-[240px] w-full">
      <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${stageHeaderColors[stage]}`}>
        <span className="text-sm font-semibold text-gray-700">{stageLabels[stage]}</span>
        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{deals.length}</span>
      </div>
      <div ref={setNodeRef} className="flex-1 space-y-2 min-h-[100px]">
        <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
        </SortableContext>
      </div>
    </div>
  );
}

interface KanbanProps {
  deals: Deal[];
  onStageChange: (dealId: string, stage: DealStage) => void;
}

export default function KanbanBoard({ deals, onStageChange }: KanbanProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const newStage = over.id as DealStage;
    if (STAGES.includes(newStage)) {
      const deal = deals.find((d) => d.id === active.id);
      if (deal && deal.stage !== newStage) onStageChange(deal.id, newStage);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAGES.map((stage) => (
          <Column key={stage} stage={stage} deals={deals.filter((d) => d.stage === stage)} />
        ))}
      </div>
    </DndContext>
  );
}
