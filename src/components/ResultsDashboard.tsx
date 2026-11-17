import React, { useState } from 'react';
import { Language, ProjectEstimate, DetectedElement } from '../types';
import { translations } from '../data/translations';
import { 
  Building2, 
  Layers, 
  Box, 
  Package, 
  ShieldCheck, 
  AlertTriangle, 
  Maximize2, 
  Eye, 
  CheckCircle2, 
  MinusCircle, 
  HelpCircle,
  FileDown,
  Share2,
  Truck,
  ArrowUpRight
} from 'lucide-react';

interface ResultsDashboardProps {
  language: Language;
  estimate: ProjectEstimate;
  onOpenReport: () => void;
  onOpenDistributor: () => void;
  onOpenCustomer: () => void;
  onOpenSupport: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  language,
  estimate,
  onOpenReport,
  onOpenDistributor,
  onOpenCustomer,
  onOpenSupport,
}) => {
  const t = translations[language];
  const [activeVisionTab, setActiveVisionTab] = useState<'boxes' | 'heatmap' | 'deductions'>('boxes');
  const [selectedElement, setSelectedElement] = useState<DetectedElement | null>(estimate.detectedElements[0] || null);

  return (
    <div id="results-dashboard" className="space-y-8">
      {/* Top Banner Disclaimer (Mandatory per specification) */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl border border-amber-200 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <span className="font-bold uppercase tracking-wide block sm:inline mr-2">
            {language === 'da' ? 'Foreløbigt AI-Estimat:' : 'Preliminary AI-Assisted Estimate:'}
          </span>
          <span>
            {language === 'da'
              ? 'Kontrollér altid fysiske dimensioner, murbindere, fugt og eksisterende konstruktionslag på byggepladsen før bestilling af materialer.'
              : 'Always verify physical dimensions, cavity ties, moisture conditions, and existing construction layers on site before ordering materials.'}
          </span>
        </div>
      </div>

      {/* High-Level Project Summary Cards Grid (Exact specs from Section 6) */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card">
        {/* Project Header Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase text-[#D71920] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                {language === 'da' ? 'ANALYSERET PROJEKT' : 'ANALYZED PROJECT'}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                ID: {estimate.id} • {estimate.createdDate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D2228] tracking-tight mt-1">
              {estimate.projectName}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {estimate.address}, {estimate.postalCode} {estimate.city}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenReport}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#D71920] hover:bg-[#B8141A] shadow-sm transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>{t.generateReportBtn}</span>
            </button>
            <button
              onClick={onOpenDistributor}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1D2228] bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Truck className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline">{t.findDistributorBtn}</span>
            </button>
          </div>
        </div>

        {/* 5 Key Metric Cards (Area Analysed, Net Insulation, Material, Volume, Confidence) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6">
          {/* 1. Area Analysed */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {t.areaAnalysed}
            </p>
            <p className="text-xl sm:text-2xl font-black font-mono text-[#1D2228] mt-1">
              ~{estimate.grossFacadeAreaM2.toFixed(1)} m²
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {language === 'da' ? 'Brutto facademurværk' : 'Gross facade surface'}
            </p>
          </div>

          {/* 2. Insulation Area */}
          <div className="bg-red-50/60 rounded-xl p-4 border border-red-200">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#D71920]">
              {t.insulationArea}
            </p>
            <p className="text-xl sm:text-2xl font-black font-mono text-[#D71920] mt-1">
              ~{estimate.netInsulationAreaM2.toFixed(1)} m²
            </p>
            <p className="text-[11px] text-gray-600 mt-1">
              -{estimate.openingsDeductionM2.toFixed(1)} m² {language === 'da' ? 'åbninger fratrukket' : 'openings deducted'}
            </p>
          </div>

          {/* 3. Estimated Material Packs */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {t.estimatedMaterial}
            </p>
            <p className="text-xl sm:text-2xl font-black font-mono text-[#1D2228] mt-1">
              ~{estimate.packsRequired} {language === 'da' ? 'pakker' : 'packs'}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {estimate.palletsRequired} {language === 'da' ? 'paller' : 'pallets'} ({estimate.wasteMarginPercent}% {language === 'da' ? 'spild' : 'waste'})
            </p>
          </div>

          {/* 4. Insulation Volume */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200/80">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {t.estimatedVolume}
            </p>
            <p className="text-xl sm:text-2xl font-black font-mono text-[#1D2228] mt-1">
              ~{estimate.estimatedVolumeM3.toFixed(1)} m³
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              @{estimate.selectedThicknessMm} mm {language === 'da' ? 'tykkelse' : 'thickness'}
            </p>
          </div>

          {/* 5. Estimate Confidence */}
          <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200/80 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {t.confidenceLabel}
              </p>
              <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                {estimate.confidenceScore}%
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
              {estimate.confidence}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              {language === 'da' ? 'Fotogrammetri god; tjek hulmur' : 'Visual clear; check cavity depth'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive AI Vision Inspector */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#1D2228] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#D71920]" />
              <span>{t.interactiveVisionTitle}</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {language === 'da'
                ? 'Klik på et bygningselement herunder for at se udledte mål og specifikationer.'
                : 'Click any building element below to inspect detected area and photogrammetry confidence.'}
            </p>
          </div>

          {/* Vision Mode Selector Tabs */}
          <div className="flex items-center p-1 bg-gray-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveVisionTab('boxes')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVisionTab === 'boxes'
                  ? 'bg-white text-[#D71920] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.tabBoundingBoxes}
            </button>
            <button
              onClick={() => setActiveVisionTab('heatmap')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVisionTab === 'heatmap'
                  ? 'bg-white text-[#D71920] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.tabHeatmap}
            </button>
            <button
              onClick={() => setActiveVisionTab('deductions')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeVisionTab === 'deductions'
                  ? 'bg-white text-[#D71920] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.tabApertures}
            </button>
          </div>
        </div>

        {/* Vision Display: Image with Interactive Layers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-16/10 border border-gray-800 shadow-inner group">
              <img
                src={estimate.thumbnailUrl}
                alt="Analyzed building inspection frame"
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{
                  filter: activeVisionTab === 'heatmap' ? 'contrast(130%) brightness(90%)' : 'none'
                }}
              />

              {/* Thermal Heatmap Simulation Layer */}
              {activeVisionTab === 'heatmap' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-red-600/40 to-yellow-400/40 mix-blend-color-burn pointer-events-none">
                  <div className="absolute bottom-3 left-3 bg-black/80 font-mono text-[10px] text-white p-2 rounded">
                    <span>THERMAL GRADIENT: High heat flux through uninsulated masonry wall</span>
                  </div>
                </div>
              )}

              {/* Bounding Box Highlights */}
              {activeVisionTab === 'boxes' && (
                <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#D71920] text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded shadow-md">
                      FACADE ZONE #1 (118.2 m²)
                    </div>
                    <div className="bg-emerald-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                      BR18 ALIGNED
                    </div>
                  </div>

                  {/* Highlight box */}
                  <div className="border-2 border-dashed border-[#D71920] rounded-xl p-3 bg-red-600/10 flex items-center justify-between text-white text-xs font-mono">
                    <span>ROCKWOOL FLEXIBATTS 37</span>
                    <span className="font-bold">200 mm SPECIFIED</span>
                  </div>
                </div>
              )}

              {/* Deductions view */}
              {activeVisionTab === 'deductions' && (
                <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between bg-blue-950/20">
                  <div className="bg-blue-600 text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded shadow-md w-fit">
                    14 WINDOWS &amp; 2 DOORS (-24.2 m²)
                  </div>
                  <div className="border border-blue-400 border-dashed rounded-lg p-2 bg-blue-500/20 text-center font-mono text-xs text-blue-100">
                    AUTOMATIC APERTURE DEDUCTION APPLIED
                  </div>
                </div>
              )}

              {/* Scale Reference Badge */}
              <div className="absolute bottom-3 right-3 bg-black/75 text-white font-mono text-[10px] px-2.5 py-1 rounded backdrop-blur-xs">
                Målestok: 1:1 photogrammetry (66mm brick standard)
              </div>
            </div>
          </div>

          {/* Right Column: Detected Elements Interactive List */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {language === 'da' ? 'Registrerede Bygningsdele' : 'Identified Envelope Elements'}
            </h4>

            <div className="space-y-2">
              {estimate.detectedElements.map((elem) => {
                const isSelected = selectedElement?.id === elem.id;
                return (
                  <div
                    key={elem.id}
                    onClick={() => setSelectedElement(elem)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#D71920] bg-red-50/40 shadow-xs'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: elem.color }}
                        />
                        <span className="text-xs font-bold text-[#1D2228]">
                          {language === 'da' ? elem.labelDa : elem.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-800">
                        {elem.status === 'deduct' ? `-${elem.areaM2} m²` : `${elem.areaM2} m²`}
                      </span>
                    </div>

                    {elem.notes && (
                      <p className="text-[11px] text-gray-600 mt-1.5 pl-5 leading-normal">
                        {language === 'da' ? elem.notesDa : elem.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-2 pl-5 pt-1.5 border-t border-gray-100">
                      <span>Status: {elem.status === 'insulate' ? (language === 'da' ? 'Isoleres' : 'To Insulate') : (language === 'da' ? 'Fratrækkes' : 'Deducted')}</span>
                      <span>Pålidelighed: {elem.confidence}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
