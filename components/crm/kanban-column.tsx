import { KanbanCard } from './kanban-card';
import type { KanbanItem } from '@/lib/types';

interface KanbanColumnProps {
  title: string;
  items: KanbanItem[];
  colorBorder: string;
}

export function KanbanColumn({ title, items, colorBorder }: KanbanColumnProps) {
  return (
    <div className="min-w-72 w-full bg-slate-50/50 rounded-xl flex flex-col h-full border border-slate-200/60">
      <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${colorBorder} border-t-4 rounded-t-xl bg-white`}>
        <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
          {items.length}
        </span>
      </div>
      <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
        {items.map((item: KanbanItem) => (
          <KanbanCard key={item.id} item={item} />
        ))}
        <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm font-medium hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 mt-2">
          <span>+ Adicionar</span>
        </button>
      </div>
    </div>
  );
}
