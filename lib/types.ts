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

// Lead Types
export interface LeadContact {
  email: string;
  phone: string;
  whatsapp?: string;
}

export interface LeadMeeting {
  id: string;
  date: string;
  time: string;
  type: 'call' | 'video' | 'presencial';
  notes?: string;
  completed: boolean;
}

export interface LeadInterest {
  id: string;
  service: string;
  priority: 'alta' | 'media' | 'baixa';
}

export interface LeadNote {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export type LeadSource = 'website' | 'indicacao' | 'linkedin' | 'evento' | 'cold_call' | 'outro';
export type LeadTemperature = 'frio' | 'morno' | 'quente';
export type LeadStage = 'novo' | 'contato' | 'qualificado' | 'proposta' | 'negociacao' | 'ganho' | 'perdido';

export interface Lead {
  id: string;
  // Basic Info
  name: string;
  company: string;
  position: string;
  // Contact
  contact: LeadContact;
  // Business Info
  estimatedValue: number;
  stage: LeadStage;
  temperature: LeadTemperature;
  source: LeadSource;
  // Personal/Relationship
  interests: LeadInterest[];
  meetings: LeadMeeting[];
  notes: LeadNote[];
  // Assignment
  responsible: string;
  responsibleId: string;
  // Dates
  createdAt: string;
  updatedAt: string;
  lastContactAt?: string;
  nextFollowUp?: string;
  // Additional
  tags: string[];
  avatar?: string;
}
