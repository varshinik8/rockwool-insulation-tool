import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Camera, 
  Cpu, 
  Layers, 
  Truck, 
  ArrowRight, 
  Check, 
  ShieldAlert, 
  Compass, 
  FileCheck2 
} from 'lucide-react';

interface HowItWorksSectionProps {
  language: Language;
  onStartDemo: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  language,
  onStartDemo
}) => {
  const t = translations[language];

  const steps = [
    {
      number: '01',
      icon: Camera,
      title: t.step1Title,
      desc: t.step1Desc,
      tag: language === 'da' ? '30–60 sek. video' : '30–60 sec video',
      details: language === 'da' 
        ? ['Film facader og gesims', 'Medtag dør/vindue som målestok', 'Registrér skader og installationer']
        : ['Film facades and eaves', 'Include door/window as scale', 'Capture surface flaws and pipes']
    },
    {
      number: '02',
      icon: Cpu,
      title: t.step2Title,
      desc: t.step2Desc,
      tag: language === 'da' ? 'AI Fotogrammetri' : 'Spatial AI Analysis',
      details: language === 'da'
        ? ['Segmenterer murværk vs. åbninger', 'Fratrækker vinduesarealer automatisk', 'Estimerer m² og volumen m³']
        : ['Segments masonry vs. openings', 'Auto-deducts window areas', 'Calculates m² and volume m³']
    },
    {
      number: '03',
      icon: Layers,
      title: t.step3Title,
      desc: t.step3Desc,
      tag: language === 'da' ? 'BR18 & ROCKWOOL' : 'BR18 & ROCKWOOL',
      details: language === 'da'
        ? ['U-værdi ≤ 0.15 W/m²K optimering', 'Anbefaler Flexibatts el. Facaderock', 'Beregner pakker inkl. spild']
        : ['U-value ≤ 0.15 W/m²K match', 'Specifies Flexibatts or Facaderock', 'Calculates packs with waste']
    },
    {
      number: '04',
      icon: Truck,
      title: t.step4Title,
      desc: t.step4Desc,
      tag: language === 'da' ? 'STARK / Bygma klar' : 'Distributor Handoff',
      details: language === 'da'
        ? ['Hent PDF-projektdossier', 'Tjek lager hos lokal tømmerhandel', 'Del enkel oversigt med bygherre']
        : ['Download contractor PDF dossier', 'Check local timber merchant stock', 'Share plain view with homeowner']
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">
            <Compass className="w-3.5 h-3.5 text-[#D71920]" />
            <span>{language === 'da' ? 'ARBEJDSGANG FOR HÅNDVÆRKERE' : 'CONTRACTOR WORKFLOW'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D2228] tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {t.howItWorksSubtitle}
          </p>
        </div>

        {/* 4 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between relative group hover:border-gray-300"
              >
                {/* Top Number & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-gray-300 group-hover:text-[#D71920] transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D71920] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-[#1D2228] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                {/* Sub-bullet items */}
                <div className="pt-4 border-t border-gray-100 space-y-1.5">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-gray-600">
                      <Check className="w-3 h-3 text-[#D71920] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Strategic Motto Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-lg font-bold text-[#1D2228]">
              {t.strategicHeadline}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              {t.strategicSub}
            </p>
          </div>
          <button
            onClick={onStartDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1D2228] hover:bg-black transition-colors shrink-0 shadow-sm"
          >
            <FileCheck2 className="w-4 h-4 text-red-500" />
            <span>{language === 'da' ? 'Afprøv Komplet Flow (1 Klik)' : 'Test Complete Flow (1 Click)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
