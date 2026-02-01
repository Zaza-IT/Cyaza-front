interface ProspeccaoCardProps {
  days: string;
  count: number;
  percent: string;
}

export function ProspeccaoCard({ days, count, percent }: ProspeccaoCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Últimos {days}</p>
        <h4 className="text-2xl font-bold text-slate-800">{count} <span className="text-sm font-normal text-slate-400">leads</span></h4>
      </div>
      <div className="text-right">
        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold">{percent}</span>
        <p className="text-[10px] text-slate-400 mt-1">vs período anterior</p>
      </div>
    </div>
  );
}
