import React from "react"
// CRM Types

export interface KanbanItem {
  id: number;
  title: string;
  type: string;
  value: string;
  date: string;
  status: string;
  responsible: string;
  stage?: string;
}

export interface KanbanColumn {
  title: string;
  color: string;
  items: KanbanItem[];
}

export interface KanbanData {
  received: KanbanColumn;
  contact: KanbanColumn;
  negotiation: KanbanColumn;
  proposal: KanbanColumn;
  closed: KanbanColumn;
}

export interface ChartDataItem {
  name: string;
  contratos: number;
  valor: number;
}

export interface RankingDataItem {
  name: string;
  valor: number;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  icon: React.ComponentType<{ size: number }>;
  colorClass: string;
}
