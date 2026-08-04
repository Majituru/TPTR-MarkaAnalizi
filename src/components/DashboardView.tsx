import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { BrandData } from "../types";
import MetricCard from "./MetricCard";
import { Calendar, Filter } from "lucide-react";
import React from 'react';

interface Props {
  data: BrandData;
  brandColor: string;
  brandName: string;
  key?: React.Key;
}

export default function DashboardView({ data, brandColor, brandName }: Props) {
  // Use a more vibrant blue for TP-Link, maybe the brand color
  const color = brandName === 'TP-Link' ? '#2563eb' : brandName === 'Tapo' ? '#8b5cf6' : '#2563eb';

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
      
      <div className="mb-2">
        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{brandName} Performans Özeti</h2>
        <p className="text-[11px] text-slate-500 uppercase tracking-wider">Trafik, pazar payı ve demografik verilerin analizi.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.metrics.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Traffic Trend */}
        <div className="col-span-1 lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Web Sitesi Trafik Kaynakları</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.traffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(val) => `${val / 1000}k`} />
                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="organic" stroke={color} strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" name="Organik Trafik" />
                <Area type="monotone" dataKey="paid" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorPaid)" name="Ücretli Trafik" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Share */}
        <div className="col-span-1 bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Pazar Payı Dağılımı</h3>
          <div className="flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.marketShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="share"
                >
                  {data.marketShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: number) => [`%${value}`, 'Pazar Payı']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
             {data.marketShare.map((item, i) => (
               <div key={i} className="flex items-center justify-between text-[10px]">
                 <div className="flex items-center gap-1.5 text-slate-600">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="truncate font-medium">{item.category}</span>
                 </div>
                 <span className="font-bold text-slate-900">%{(item.share)}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Demographics */}
        <div className="col-span-1 lg:col-span-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">Hedef Kitle Demografisi (Yaş)</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.demographics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(val) => `%${val}`} />
                <RechartsTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
                  formatter={(value: number) => [`%${value}`, 'Oran']}
                />
                <Bar dataKey="percentage" fill={color} radius={[2, 2, 0, 0]} name="Kitle Oranı" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
