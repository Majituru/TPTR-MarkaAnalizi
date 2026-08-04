import { useState } from 'react';
import { LayoutDashboard, Wifi, Lightbulb, Bell, Search, Menu, X, Settings, LogOut, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from './lib/utils';
import { Brand } from './types';
import DashboardView from './components/DashboardView';
import { overviewData, tapoData, tplinkData } from './data/mockData';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import { signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

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
    { id: 'Overview', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'TP-Link', label: 'TP-Link', icon: Wifi },
    { id: 'Tapo', label: 'Tapo', icon: Lightbulb },
  ] as const;

  const currentData = activeTab === 'Overview' ? overviewData : activeTab === 'TP-Link' ? tplinkData : tapoData;
  const currentColor = activeTab === 'TP-Link' ? '#06b6d4' : activeTab === 'Tapo' ? '#8b5cf6' : '#334155';

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
            <h1 className="text-white font-bold text-xl tracking-tight uppercase">BrandScan <span className="text-blue-400 font-normal">Pro</span></h1>
            <p className="text-slate-400 text-[10px] mt-1 uppercase tracking-widest">Agency Analytics Portal</p>
          </div>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-6">
            Marka Analizi
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
            Sistem
          </div>
          <button className="w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors cursor-pointer text-left text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <Settings className="w-4 h-4 ml-1 text-slate-500" />
            <span className="font-medium">Ayarlar</span>
          </button>
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-6 py-2 text-sm transition-colors cursor-pointer text-left text-slate-400 hover:bg-slate-800 hover:text-rose-400"
          >
            <LogOut className="w-4 h-4 ml-1 text-slate-500" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div className="text-xs text-left">
              <p className="text-white font-medium">Ajans User</p>
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
              <span className="uppercase tracking-wider">Periyot:</span>
              <select className="bg-transparent border-none focus:ring-0 text-slate-900 cursor-pointer text-xs font-bold bg-slate-50 px-2 py-1 rounded">
                <option>Son 6 Ay</option>
                <option>Bu Yıl</option>
                <option>Son 30 Gün</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-blue-700 transition-colors">
              PDF Raporu İndir
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 bg-slate-50">
          <div className="max-w-[1200px] mx-auto h-full flex flex-col">
            <DashboardView 
              key={activeTab} // Force re-mount on tab change for animations
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
              Veri Senkronizasyonu: Aktif
            </span>
            <span>Son güncelleme: 12 dk önce</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            SİSTEM_ID: 9942-TR-GLOBAL
          </div>
        </footer>

      </main>

    </div>
  );
}
