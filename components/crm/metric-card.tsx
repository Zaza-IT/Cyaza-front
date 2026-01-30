import { TrendingUp } from 'lucide-react';
import type { MetricCardProps } from '@/lib/types';

export function MetricCard({ title, value, subtext, trend, icon: Icon, colorClass }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp size={12} className="mr-1" />
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
      </div>
    </div>
  );
}
