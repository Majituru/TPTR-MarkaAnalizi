import { ArrowDown, ArrowUp } from "lucide-react";
import { MetricData } from "../types";
import { cn } from "../lib/utils";
import React from 'react';

interface Props {
  metric: MetricData;
  key?: React.Key;
}

export default function MetricCard({ metric }: Props) {
  const isPositive = metric.trend >= 0;
  
  const formatValue = (val: string | number, format: string) => {
    if (format === 'percentage') return `%${val}`;
    if (format === 'number' && typeof val === 'number') {
      if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
      if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
      return val.toLocaleString('tr-TR');
    }
    return val;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col hover:border-slate-300 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider line-clamp-1 pr-2">{metric.title}</h3>
        <span className={cn(
          "text-[10px] px-1.5 py-0.5 rounded flex items-center font-bold whitespace-nowrap shrink-0",
          isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {isPositive ? '+' : '-'}{Math.abs(metric.trend)}%
        </span>
      </div>
      
      <div className="mt-auto pt-2 border-t border-slate-50 flex items-baseline justify-between">
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          {formatValue(metric.value, metric.format)}
        </span>
        <span className="text-[9px] text-slate-400 uppercase tracking-wider">
          Geçen Ay
        </span>
      </div>
    </div>
  );
}
