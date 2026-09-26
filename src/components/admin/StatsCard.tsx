'use client';

import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  subtitle?: string;
  badgeColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  icon,
  subtitle,
  bgColor = 'bg-white',
  onClick,
}: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={`${bgColor} p-4 rounded-2xl border border-sand-300 shadow-sm flex flex-col justify-between ${
        onClick ? 'cursor-pointer active:scale-98 transition-transform' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-charcoal-800 font-medium">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-sand-100/80 text-charcoal-700">{icon}</div>
      </div>

      <div>
        <span className="font-serif text-3xl font-bold text-charcoal-900 tracking-tight">
          {value}
        </span>
        {subtitle && (
          <p className="text-[11px] text-charcoal-800 font-light mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
