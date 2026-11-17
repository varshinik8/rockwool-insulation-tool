import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Video, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Building, 
  CheckCircle, 
  FileSpreadsheet,
  Layers,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onUploadClick: () => void;
  onSeeHowItWorksClick: () => void;
  onStartDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onUploadClick,
  onSeeHowItWorksClick,
  onStartDemo,
}) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-200 pt-8 pb-14 sm:pt-14 sm:pb-20">
      {/* Subtle Technical Engineering Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D71920]"></span>
            <span>{t.danishBr18Badge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#D71920] border border-red-200">
            <Flame className="w-3.5 h-3.5" />
            <span>{t.nonCombustibleBadge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.installerReadyBadge}</span>
          </div>
        </div>

        {/* Hero Grid: Typography + Interactive Visual Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1D2228] tracking-tight leading-[1.1]">
                {t.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {t.heroSubheadline}
              </p>
            </div>

            {/* Strategic Value Proposition for Contractors */}
            <div className="bg-[#F8F9FA] border-l-4 border-[#D71920] p-4 rounded-r-xl border border-gray-200/80">
              <div className="flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-[#D71920] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {language === 'da' ? 'Værdi for Håndværkeren' : 'Contractor Value Proposition'}
                  </p>
                  <p className="text-sm font-semibold text-[#1D2228] mt-0.5">
                    {language === 'da'
                      ? '»Gør en video fra byggepladsen til en færdig isoleringsplan — spar op til 2 timer pr. tilbud.«'
                      : '"Turn a site video into a ready-to-use insulation plan — save up to 2 hours per quotation."'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onUploadClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-[#D71920] hover:bg-[#B8141A] shadow-md shadow-red-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] text-base"
              >
                <Video className="w-5 h-5" />
                <span>{t.uploadCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-[#1D2228] bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all text-sm shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#D71920]" />
                <span>{t.tryDemoCta}</span>
                <span className="text-[11px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">60s</span>
              </button>

              <button
                onClick={onSeeHowItWorksClick}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <span>{t.seeHowItWorks}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                {language === 'da' ? 'Ingen installation påkrævet' : 'No app install required'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                {language === 'da' ? 'MP4 / MOV / WebM formater' : 'Mobile & drone footage supported'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                {language === 'da' ? 'Direkte tømmerhandel-integration' : 'Direct distributor integration'}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Technical Teaser Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#1D2228] rounded-2xl p-5 text-white shadow-xl border border-gray-800 relative overflow-hidden group">
              {/* Scanline light effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D71920] to-transparent opacity-80" />

              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="font-mono text-gray-300">SITESCAN_ENGINE_V2.4</span>
                </div>
                <span className="bg-red-500/20 text-[#D71920] border border-red-500/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  {language === 'da' ? 'LIVE ESTIMERING' : 'LIVE ESTIMATOR'}
                </span>
              </div>

              {/* Preview Image with Simulated Computer Vision Overlay */}
              <div className="relative mt-4 rounded-xl overflow-hidden aspect-video bg-gray-900 border border-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                  alt="Danish Villa Renovation Site"
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid Photogrammetry Bounding Boxes */}
                <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#D71920]/90 text-white text-[10px] font-mono px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
                      <span>ZONE_1: FACADE MURVÆRK</span>
                      <span className="font-bold">118.2 m²</span>
                    </div>
                    <div className="bg-blue-600/90 text-white text-[10px] font-mono px-2 py-1 rounded backdrop-blur-xs">
                      <span>-24.2 m² VINDUER</span>
                    </div>
                  </div>

                  {/* Wireframe box simulation */}
                  <div className="border border-dashed border-[#D71920] rounded-lg p-2 bg-[#D71920]/10 flex items-center justify-between text-[11px] font-mono text-white">
                    <span>ROCKWOOL FLEXIBATTS 37</span>
                    <span className="font-bold text-amber-300">200 mm (51 pk.)</span>
                  </div>
                </div>
              </div>

              {/* Fast Spec Bar */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-800 text-center">
                <div className="bg-gray-800/60 p-2 rounded-lg">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">
                    {language === 'da' ? 'Netto Areal' : 'Net Area'}
                  </p>
                  <p className="text-sm font-bold font-mono text-white">118.2 m²</p>
                </div>
                <div className="bg-gray-800/60 p-2 rounded-lg">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">
                    {language === 'da' ? 'Pakker' : 'Packs'}
                  </p>
                  <p className="text-sm font-bold font-mono text-red-400">51 pk</p>
                </div>
                <div className="bg-gray-800/60 p-2 rounded-lg">
                  <p className="text-[10px] text-gray-400 uppercase font-mono">
                    {language === 'da' ? 'U-værdi' : 'U-Value'}
                  </p>
                  <p className="text-sm font-bold font-mono text-emerald-400">0.14 W/m²K</p>
                </div>
              </div>

              {/* Quick Launch Button within Card */}
              <button
                onClick={onStartDemo}
                className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>{language === 'da' ? 'Kør dette eksempel nu (Gentofte)' : 'Load this sample project now (Gentofte)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
