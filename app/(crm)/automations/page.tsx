"use client";

import { useState } from 'react';
import { automationsMock } from '@/services/mock-data';

export default function AutomacoesPage() {
  const [selected, setSelected] = useState<any | null>(null);
  const [tab, setTab] = useState<'details' | 'logs'>('details');

  const statusStyle = (status: string) => {
    if (status === 'online') return 'bg-green-100 text-green-700';
    if (status === 'warning') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Automações</h1>
          <p className="text-slate-500">
            Monitoramento das automações do sistema
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {automationsMock.map((automation) => (
            <button
              key={automation.id}
              onClick={() => {
                setSelected(automation);
                setTab('details');
              }}
              className="bg-white border border-slate-200 rounded-xl shadow-sm
                         p-5 text-left hover:shadow-md transition"
            >
              <h3 className="font-semibold text-slate-800 mb-3">
                {automation.title}
              </h3>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${statusStyle(
                  automation.status
                )}`}
              >
                {automation.status.toUpperCase()}
              </span>

              <p className="text-sm text-slate-500">
                Online: {automation.onlineSince}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            {/* HEADER */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-semibold text-slate-800">
                {selected.title}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* TABS */}
            <div className="flex border-b border-slate-200 px-6">
              <button
                onClick={() => setTab('details')}
                className={`py-3 text-sm font-medium border-b-2 transition
                  ${
                    tab === 'details'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500'
                  }`}
              >
                Detalhes
              </button>
              <button
                onClick={() => setTab('logs')}
                className={`ml-6 py-3 text-sm font-medium border-b-2 transition
                  ${
                    tab === 'logs'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500'
                  }`}
              >
                Logs
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              {tab === 'details' && (
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>Status:</strong> {selected.info}
                  </p>
                  <p>
                    <strong>Online desde:</strong> {selected.onlineSince}
                  </p>
                </div>
              )}

              {tab === 'logs' && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg max-h-64 overflow-y-auto">
                  {selected.logs.map((log: any, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-xs text-slate-600 border-b last:border-b-0"
                    >
                      <span className="font-medium">
                        {log.date}
                      </span>{' '}
                      — {log.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
