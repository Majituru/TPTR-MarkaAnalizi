import { useState } from 'react';
import { LayoutDashboard, Wifi, Lightbulb, Bell, Search, Menu, X, Settings, LogOut, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from './lib/utils';
import { Brand, BrandData } from './types';
import DashboardView from './components/DashboardView';
import { brandData } from './data/brandData';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import { signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

const combinedStates = brandData['TP-Link'].amazon.topStates.map((state, index) => {
  return {
    name: state.name,
    units: state.units + (brandData['Tapo'].amazon.topStates[index]?.units || 0)
  };
});

const overviewData: BrandData = {
  amazon: {
    totalUnits: brandData['TP-Link'].amazon.totalUnits + brandData['Tapo'].amazon.totalUnits,
    glanceViews: brandData['TP-Link'].amazon.glanceViews + brandData['Tapo'].amazon.glanceViews,
    returns: brandData['TP-Link'].amazon.returns + brandData['Tapo'].amazon.returns,
    avgConversion: Number(((brandData['TP-Link'].amazon.avgConversion + brandData['Tapo'].amazon.avgConversion) / 2).toFixed(2)),
    topProductsByUnits: [...brandData['TP-Link'].amazon.topProductsByUnits, ...brandData['Tapo'].amazon.topProductsByUnits].sort((a,b) => b.units - a.units).slice(0, 5),
    topProductsByViews: [...brandData['TP-Link'].amazon.topProductsByViews, ...brandData['Tapo'].amazon.topProductsByViews].sort((a,b) => b.views - a.views).slice(0, 5),
    funnel: {
      impressions: brandData['TP-Link'].amazon.funnel.impressions + brandData['Tapo'].amazon.funnel.impressions,
      clicks: brandData['TP-Link'].amazon.funnel.clicks + brandData['Tapo'].amazon.funnel.clicks,
      basketAdds: brandData['TP-Link'].amazon.funnel.basketAdds + brandData['Tapo'].amazon.funnel.basketAdds,
      purchases: brandData['TP-Link'].amazon.funnel.purchases + brandData['Tapo'].amazon.funnel.purchases,
    },
    topStates: combinedStates,
    timeSeries: {
      monthlyYoY: brandData['TP-Link'].amazon.timeSeries.monthlyYoY.map((item, i) => ({
        month: item.month,
        currentUnits: item.currentUnits + brandData['Tapo'].amazon.timeSeries.monthlyYoY[i].currentUnits,
        previousUnits: item.previousUnits + brandData['Tapo'].amazon.timeSeries.monthlyYoY[i].previousUnits,
      })),
      monthlyGlance: brandData['TP-Link'].amazon.timeSeries.monthlyGlance.map((item, i) => ({
        month: item.month,
        glanceViews: item.glanceViews + brandData['Tapo'].amazon.timeSeries.monthlyGlance[i].glanceViews,
        orderedUnits: item.orderedUnits + brandData['Tapo'].amazon.timeSeries.monthlyGlance[i].orderedUnits,
      })),
      weeklyTraffic: brandData['TP-Link'].amazon.timeSeries.weeklyTraffic.map((item, i) => ({
        week: item.week,
        glanceViews: item.glanceViews + brandData['Tapo'].amazon.timeSeries.weeklyTraffic[i].glanceViews,
        conversionRate: Number(((item.conversionRate + brandData['Tapo'].amazon.timeSeries.weeklyTraffic[i].conversionRate) / 2).toFixed(2)),
      })),
      weeklyReturns: brandData['TP-Link'].amazon.timeSeries.weeklyReturns.map((item, i) => ({
        week: item.week,
        shippedUnits: item.shippedUnits + brandData['Tapo'].amazon.timeSeries.weeklyReturns[i].shippedUnits,
        returns: item.returns + brandData['Tapo'].amazon.timeSeries.weeklyReturns[i].returns,
      })),
    },
    marketBasket: [
      ...(brandData['TP-Link'].amazon.marketBasket || []),
      ...(brandData['Tapo'].amazon.marketBasket || [])
    ]
  },
  website: {
    totalVisitors: brandData['TP-Link'].website.totalVisitors + brandData['Tapo'].website.totalVisitors,
    newVisitors: brandData['TP-Link'].website.newVisitors + brandData['Tapo'].website.newVisitors,
    returningVisitors: brandData['TP-Link'].website.returningVisitors + brandData['Tapo'].website.returningVisitors,
    totalPages: brandData['TP-Link'].website.totalPages + brandData['Tapo'].website.totalPages,
    totalChats: brandData['TP-Link'].website.totalChats + brandData['Tapo'].website.totalChats,
    bounceRate: Number(((brandData['TP-Link'].website.bounceRate + brandData['Tapo'].website.bounceRate) / 2).toFixed(2)),
    trafficByHour: brandData['TP-Link'].website.trafficByHour.map((item, i) => ({
      time: item.time,
      visitors: item.visitors + (brandData['Tapo'].website.trafficByHour[i]?.visitors || 0),
      newVisitors: item.newVisitors + (brandData['Tapo'].website.trafficByHour[i]?.newVisitors || 0)
    })),
    devices: [
      { name: 'Desktop', value: (brandData['TP-Link'].website.devices.find(d => d.name === 'Desktop')?.value || 0) + (brandData['Tapo'].website.devices.find(d => d.name === 'Desktop')?.value || 0) },
      { name: 'Mobile', value: (brandData['TP-Link'].website.devices.find(d => d.name === 'Mobile')?.value || 0) + (brandData['Tapo'].website.devices.find(d => d.name === 'Mobile')?.value || 0) }
    ].filter(d => d.value > 0),
    sources: [
      { name: 'Search Engine', value: (brandData['TP-Link'].website.sources.find(d => d.name === 'Search Engine')?.value || 0) + (brandData['Tapo'].website.sources.find(d => d.name === 'Search Engine')?.value || 0) },
      { name: 'Direct', value: (brandData['TP-Link'].website.sources.find(d => d.name === 'Direct')?.value || 0) + (brandData['Tapo'].website.sources.find(d => d.name === 'Direct')?.value || 0) }
    ].filter(d => d.value > 0)
  }
};

export default function App() {
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Brand>('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  const tabs = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'TP-Link', label: 'TP-Link', icon: Wifi },
    { id: 'Tapo', label: 'Tapo', icon: Lightbulb },
  ] as const;

  const currentData = activeTab === 'Overview' ? overviewData : activeTab === 'TP-Link' ? brandData['TP-Link'] : brandData['Tapo'];
  const currentColor = activeTab === 'TP-Link' ? '#2563eb' : activeTab === 'Tapo' ? '#8b5cf6' : '#334155';

  return (
    <div className="h-screen w-full bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 lg:static lg:h-full w-64 bg-slate-900 flex flex-col border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out shrink-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight uppercase">TP-Link <span className="text-blue-400 font-normal">BRAND</span>SCAN</h1>
            <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-widest">Agency Share Portal</p>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-6">
            Brand Analytics
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as Brand);
                setMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors cursor-pointer text-left relative",
                activeTab === tab.id 
                  ? "bg-slate-800 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )}
            >
              {activeTab === tab.id && <div className="w-2 h-2 rounded-full bg-blue-400 absolute left-2 top-1/2 -translate-y-1/2"></div>}
              <tab.icon className={cn(
                "w-4 h-4 ml-1",
                activeTab === tab.id ? "text-blue-400" : "text-slate-500"
              )} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
          <div className="mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-6">
            System
          </div>
          <button className="w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors cursor-pointer text-left text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <Settings className="w-4 h-4 ml-1 text-slate-500" />
            <span className="font-medium">Settings</span>
          </button>
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors cursor-pointer text-left text-slate-400 hover:bg-slate-800 hover:text-rose-400"
          >
            <LogOut className="w-4 h-4 ml-1 text-slate-500" />
            <span className="font-medium">Sign Out</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div className="text-xs text-left">
              <p className="text-white font-medium">Agency User</p>
              <p className="text-slate-500">Global Strategy</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header / Filters */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="p-1 -ml-2 text-slate-500 hover:bg-slate-100 rounded lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="uppercase tracking-wider font-bold">Data Period:</span>
              <span className="text-slate-900 font-bold bg-slate-100 px-3 py-1.5 rounded text-[11px]">Last 1 Month</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-sm">
              Download PDF Report
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 bg-slate-50">
          <div className="max-w-[1400px] mx-auto h-full flex flex-col">
            <DashboardView 
              data={currentData} 
              brandColor={currentColor}
              brandName={activeTab}
            />
          </div>
        </div>

        {/* Status Bar */}
        <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> 
              Data Synchronization: Active
            </span>
            <span>Last updated: Just now</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            SYSTEM_ID: 9942-EN-GLOBAL
          </div>
        </footer>

      </main>

    </div>
  );
}
