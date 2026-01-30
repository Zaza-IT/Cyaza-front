import { MoreVertical, Clock } from 'lucide-react';
import type { KanbanItem } from '@/lib/types';

interface KanbanCardProps {
  item: KanbanItem;
}

export function KanbanCard({ item }: KanbanCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-3 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full 
          ${item.type === 'Contrato' ? 'bg-indigo-50 text-indigo-700' : 'bg-teal-50 text-teal-700'}`}>
          {item.type}
        </span>
        <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical size={16} />
        </button>
      </div>
      <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
      <div className="flex justify-between items-end mt-3">
        <div>
          <p className="text-xs text-slate-500">Valor Estimado</p>
          <p className="font-bold text-slate-700 text-sm">{item.value}</p>
        </div>
        <div className="flex items-center text-xs text-slate-400">
          <Clock size={12} className="mr-1" />
          {item.date}
        </div>
      </div>
    </div>
  );
}
