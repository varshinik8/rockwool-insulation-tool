import React from 'react';
import { Language, ProjectEstimate, UserRole } from '../types';
import { translations } from '../data/translations';
import { 
  Building2, 
  History, 
  Sparkles, 
  Headphones, 
  Globe, 
  CheckCircle2, 
  FileText,
  UserCheck,
  HardHat,
  Home,
  PhoneCall,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  onOpenHistory: () => void;
  onOpenSupport: () => void;
  onOpenHotline: () => void;
  onOpenNearestStore: () => void;
  onStartDemo: () => void;
  onNewEstimate: () => void;
  currentProject: ProjectEstimate | null;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  activeRole,
  setActiveRole,
  onOpenHistory,
  onOpenSupport,
  onOpenHotline,
  onOpenNearestStore,
  onStartDemo,
  onNewEstimate,
  currentProject,
  historyCount,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Top Brand & Utility Bar */}
      <div className="bg-[#1D2228] text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1.5 font-medium text-gray-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ROCKWOOL® Danmark
          </span>
          <span className="hidden md:inline text-gray-500">|</span>
          <span className="hidden md:inline text-gray-300">
            {language === 'da' ? 'Bygningsreglement BR18 godkendt portal' : 'Danish BR18 Energy Code Compliant Platform'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Technician Hotline quick link */}
          <button
            onClick={onOpenHotline}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D71920]" />
            <span className="hidden sm:inline">
              {language === 'da' ? 'Tekniker Hotline (Byggeplads)' : 'Technician Hotline'}
            </span>
          </button>

          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* Nearest Store quick link */}
          <button
            onClick={onOpenNearestStore}
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">
              {language === 'da' ? 'Nærmeste Tømmerhandel' : 'Nearest Store'}
            </span>
          </button>

          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* Technical Support Call */}
          <button 
            onClick={onOpenSupport}
            className="hidden md:flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <Headphones className="w-3.5 h-3.5 text-gray-400" />
            <span>+45 46 56 16 16</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between gap-4">
        {/* ROCKWOOL Brand & App Name */}
        <div className="flex items-center space-x-4 shrink-0">
          <div 
            onClick={onNewEstimate}
            className="cursor-pointer flex items-center space-x-3 group"
          >
            {/* ROCKWOOL Bold Red Brand Block */}
            <div className="bg-[#D71920] text-white font-extrabold text-xl tracking-tighter px-3 py-1.5 rounded-sm flex items-center shadow-sm group-hover:bg-[#B8141A] transition-colors">
              <span>ROCKWOOL</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#1D2228] tracking-tight">SiteScan™</span>
                <span className="text-[10px] uppercase font-semibold bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200">
                  Pro DK
                </span>
              </div>
              <span className="text-[11px] text-gray-500 hidden sm:inline">
                {t.brandTagline}
              </span>
            </div>
          </div>
        </div>

        {/* ROLE SWITCHER: Installer vs Customer Portal */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner">
          <button
            onClick={() => setActiveRole('installer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'installer'
                ? 'bg-white text-[#D71920] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>{language === 'da' ? 'Håndværker Portal' : 'Installer Portal'}</span>
          </button>

          <button
            onClick={() => setActiveRole('customer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeRole === 'customer'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'da' ? 'Boligejer Portal' : 'Customer Portal'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Quick 60s Demo Button */}
          <button
            onClick={onStartDemo}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-[#D71920] border border-red-200 hover:bg-red-100 transition-colors shadow-xs"
            title="Load full sample project workflow in 60s"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D71920]" />
            <span className="font-bold">{t.tryDemoCta}</span>
          </button>

          {/* Project History Button */}
          {activeRole === 'installer' && (
            <button
              onClick={onOpenHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">{language === 'da' ? 'Projekter' : 'History'}</span>
              <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            </button>
          )}

          {/* Language Toggle (DA / EN) */}
          <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
            <button
              onClick={() => setLanguage('da')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'da'
                  ? 'bg-white text-[#D71920] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              🇩🇰 DA
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-[#D71920] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
