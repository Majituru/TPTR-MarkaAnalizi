import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { BrandData } from "../types";
import { Users, UserPlus, Undo2, MousePointerClick, Package, RotateCcw, TrendingUp, MonitorSmartphone, Share2, MapPin, Search, MousePointer2, ShoppingCart, CreditCard, MessageSquare, Files, Activity } from "lucide-react";
import React, { useState } from 'react';

interface Props {
  data: BrandData;
  brandColor: string;
  brandName: string;
  key?: string;
}

const COLORS = ['#2563eb', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e'];

export default function DashboardView({ data, brandColor, brandName }: Props) {
  const [view, setView] = useState<'website' | 'amazon'>('amazon');
  
  const color = brandName === 'TP-Link' ? '#2563eb' : brandName === 'Tapo' ? '#8b5cf6' : '#2563eb';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{brandName} Performance Overview</h2>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider">Comprehensive & Anonymized Brand Analytics</p>
        </div>
        
        {/* Segmented Control */}
        <div className="flex p-1 bg-slate-200/50 rounded-lg shrink-0">
          <button
            onClick={() => setView('website')}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              view === 'website' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Website Data
          </button>
          <button
            onClick={() => setView('amazon')}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
              view === 'amazon' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Amazon Data
          </button>
        </div>
      </div>

      {view === 'website' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {/* Main Website Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <MetricCard title="Total Visitors" value={data.website.totalVisitors} icon={Users} color={color} className="col-span-2" />
            <MetricCard title="New Visitors" value={data.website.newVisitors} icon={UserPlus} color={color} className="col-span-2" />
            <MetricCard title="Returning Visitors" value={data.website.returningVisitors} icon={Undo2} color={color} className="col-span-2" />
            
            <MetricCard title="Bounce Rate" value={`%${data.website.bounceRate}`} icon={Activity} color="#ef4444" className="col-span-2 lg:col-span-2" />
            <MetricCard title="Page Views" value={data.website.totalPages} icon={Files} color={color} className="col-span-2 lg:col-span-2" />
            <MetricCard title="Live Chats" value={data.website.totalChats} icon={MessageSquare} color={color} className="col-span-2 lg:col-span-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Website Traffic Area Chart */}
            <div className="col-span-1 lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-6">Hourly Traffic</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.website.trafficByHour} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                    <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px', padding: '12px' }}
                    />
                    <Area type="monotone" dataKey="visitors" stroke={color} strokeWidth={2.5} fillOpacity={1} fill="url(#colorTotal)" name="Total Visitors" />
                    <Area type="monotone" dataKey="newVisitors" stroke="#94a3b8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNew)" name="New Visitors" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Devices & Sources */}
            <div className="col-span-1 flex flex-col gap-6">
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <MonitorSmartphone className="w-4 h-4 text-slate-400" />
                  <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Device Distribution</h3>
                </div>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data.website.devices} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                        {data.website.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  {data.website.devices.map((d, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-slate-600 font-medium">{d.name}</span>
                      </div>
                      <span className="font-bold">{d.value.toLocaleString('en-US')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-4 h-4 text-slate-400" />
                  <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Traffic Sources</h3>
                </div>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data.website.sources} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                        {data.website.sources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  {data.website.sources.map((d, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[(i + 2) % COLORS.length] }}></div>
                        <span className="text-slate-600 font-medium">{d.name}</span>
                      </div>
                      <span className="font-bold">{d.value.toLocaleString('en-US')}</span>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>

          </div>
        </div>
      )}

      {view === 'amazon' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {/* Amazon Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Dispatched Units" value={data.amazon.totalUnits} icon={Package} color={color} />
            <MetricCard title="Glance Views" value={data.amazon.glanceViews} icon={MousePointerClick} color={color} />
            <MetricCard title="Customer Returns" value={data.amazon.returns} icon={RotateCcw} color="#ef4444" />
            <MetricCard title="Avg. Conversion Rate" value={`%${data.amazon.avgConversion}`} icon={TrendingUp} color={color} />
          </div>

          {/* Time Series Charts (Replicating user images) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Orders YoY */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-[13px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                </span>
                Orders YoY
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.amazon.timeSeries.monthlyYoY} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={{stroke: '#e2e8f0'}} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }} />
                    <Line type="linear" dataKey="currentUnits" stroke="#60a5fa" strokeWidth={2} dot={false} name="Current period" />
                    <Line type="linear" dataKey="previousUnits" stroke="#e11d48" strokeWidth={2} dot={false} name="Previous year" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-2 px-6">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-blue-400 rounded-full"></div> Current period
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-rose-600 rounded-full"></div> Previous year
                </div>
              </div>
            </div>

            {/* Glance Views, Orders and Conversion Rate */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-[13px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                </span>
                Glance Views & Orders
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.amazon.timeSeries.monthlyGlance} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={{stroke: '#e2e8f0'}} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }} />
                    <Line yAxisId="left" type="linear" dataKey="glanceViews" stroke="#60a5fa" strokeWidth={2} dot={false} name="Glance Views" />
                    <Line yAxisId="right" type="linear" dataKey="orderedUnits" stroke="#e11d48" strokeWidth={2} dot={false} name="Ordered units" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center mt-2 px-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-blue-400 rounded-full"></div> Glance Views
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-rose-600 rounded-full"></div> Ordered units
                </div>
              </div>
            </div>

            {/* Traffic vs Conversion Rate */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-[13px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                </span>
                Traffic vs Conversion Rate (Anonymized)
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.amazon.timeSeries.weeklyTraffic} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="week" axisLine={{stroke: '#e2e8f0'}} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `%${val}`} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }} />
                    <Line yAxisId="left" type="linear" dataKey="glanceViews" stroke="#60a5fa" strokeWidth={2} dot={false} name="Glance Views" />
                    <Line yAxisId="right" type="linear" dataKey="conversionRate" stroke="#e11d48" strokeWidth={2} dot={false} name="Conversion Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center mt-2 px-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-blue-400 rounded-full"></div> Glance Views
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-rose-600 rounded-full"></div> Conversion Rate
                </div>
              </div>
            </div>

            {/* Returns vs Shipped Units */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-[13px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-4 h-4 grid grid-cols-2 gap-[2px]">
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                  <span className="bg-slate-300 rounded-[1px]"></span><span className="bg-slate-300 rounded-[1px]"></span>
                </span>
                Returns vs Shipped Units (Anonymized)
              </h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.amazon.timeSeries.weeklyReturns} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="week" axisLine={{stroke: '#e2e8f0'}} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', fontSize: '11px', border: '1px solid #e2e8f0' }} />
                    <Line yAxisId="left" type="linear" dataKey="shippedUnits" stroke="#60a5fa" strokeWidth={2} dot={false} name="Shipped Units" />
                    <Line yAxisId="right" type="linear" dataKey="returns" stroke="#e11d48" strokeWidth={2} dot={false} name="Returns" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center mt-2 px-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-blue-400 rounded-full"></div> Shipped Units
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <div className="w-4 h-1 bg-rose-600 rounded-full"></div> Returns
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Products By Units */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">Top Products (By Units)</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.amazon.topProductsByUnits} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid horizontal={true} vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis dataKey="name" type="category" width={160} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 500 }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px', padding: '12px' }}
                    />
                    <Bar dataKey="units" fill={color} radius={[0, 4, 4, 0]} name="Units" barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Top Products By Views */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">Top Products (By Glance Views)</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.amazon.topProductsByViews} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid horizontal={true} vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                    <YAxis dataKey="name" type="category" width={160} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 500 }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px', padding: '12px' }}
                    />
                    <Bar dataKey="views" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Glance Views" barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top States */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Top Regions (Units)</h3>
              </div>
              <div className="h-[250px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.amazon.topStates.slice(0, 10)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                    <RechartsTooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
                    />
                    <Bar dataKey="units" fill="#334155" radius={[4, 4, 0, 0]} name="Units" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, className = "" }: { title: string, value: string | number, icon: any, color: string, className?: string }) {
  return (
    <div className={`bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center gap-3 relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon className="w-16 h-16" style={{ color: color }} />
      </div>
      <div className="flex items-center gap-2 z-10">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15`, color: color }}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{title}</p>
      </div>
      <div className="z-10">
        <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{typeof value === 'number' ? value.toLocaleString('en-US') : value}</p>
      </div>
    </div>
  );
}
