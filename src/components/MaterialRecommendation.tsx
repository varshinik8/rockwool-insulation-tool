import React from 'react';
import { Language, RockwoolProduct, ProjectEstimate } from '../types';
import { translations } from '../data/translations';
import { ROCKWOOL_PRODUCTS } from '../data/sampleData';
import { 
  Flame, 
  Volume2, 
  Wind, 
  Sparkles, 
  Layers, 
  Check, 
  ShieldCheck, 
  FileText, 
  Info,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface MaterialRecommendationProps {
  language: Language;
  estimate: ProjectEstimate;
  selectedProduct: RockwoolProduct;
  selectedThicknessMm: number;
  onSelectProduct: (product: RockwoolProduct) => void;
  onSelectThickness: (thicknessMm: number) => void;
}

export const MaterialRecommendation: React.FC<MaterialRecommendationProps> = ({
  language,
  estimate,
  selectedProduct,
  selectedThicknessMm,
  onSelectProduct,
  onSelectThickness,
}) => {
  const t = translations[language];

  // Calculate current pack coverage for selected thickness
  const coveragePerPack = selectedProduct.packCoverageM2[selectedThicknessMm] || 2.50;
  const packsForNetArea = Math.ceil(estimate.totalMaterialM2 / coveragePerPack);

  return (
    <div id="material-recommendation" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-card space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#D71920] border border-red-200 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'da' ? 'SYSTEMANBEFALING' : 'SYSTEM RECOMMENDATION'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D2228] tracking-tight">
            {t.solutionHeader}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {t.solutionSub}
          </p>
        </div>

        {/* Alternative Product Switcher for Contractors */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
            {language === 'da' ? 'Skift produkt:' : 'Alternative:'}
          </span>
          <div className="flex rounded-xl bg-gray-100 p-1">
            {ROCKWOOL_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onSelectThickness(prod.defaultThicknessMm);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedProduct.id === prod.id
                    ? 'bg-white text-[#D71920] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {prod.name.replace('ROCKWOOL ', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Showcase Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product Visual + Specs Badge */}
        <div className="lg:col-span-5 bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200/90 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-gray-500">
              SKU: {selectedProduct.sku}
            </span>
            <span className="bg-red-50 text-[#D71920] border border-red-200 text-[11px] font-bold px-2 py-0.5 rounded">
              BR18 Godkendt
            </span>
          </div>

          {/* Product Name & Category */}
          <div>
            <h4 className="text-xl font-black text-[#1D2228] tracking-tight">
              {selectedProduct.name}
            </h4>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">
              {language === 'da' ? selectedProduct.categoryDa : selectedProduct.category}
            </p>
          </div>

          {/* Product Photo / Pack Render Representation */}
          <div className="relative rounded-xl overflow-hidden bg-white border border-gray-200 p-4 shadow-subtle flex items-center justify-center">
            <div className="text-center space-y-2 py-4">
              {/* Distinctive ROCKWOOL Red & Green Flexible Edge Graphic */}
              <div className="w-36 h-28 mx-auto bg-gradient-to-br from-amber-700 via-amber-800 to-stone-700 rounded-md relative shadow-md border-2 border-stone-600 flex items-center justify-center">
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-emerald-500 rounded-r-sm flex items-center justify-center text-[9px] font-bold text-white uppercase tracking-tighter [writing-mode:vertical-lr]">
                  FLEXI
                </div>
                <div className="bg-[#D71920] text-white font-extrabold text-[12px] px-2 py-1 rounded shadow">
                  ROCKWOOL
                </div>
              </div>
              <p className="text-[11px] font-mono text-gray-500">
                {selectedProduct.name} ({selectedThicknessMm} mm)
              </p>
            </div>
          </div>

          {/* Key Engineering Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">
                {t.lambdaLabel}
              </span>
              <span className="text-sm font-black font-mono text-[#1D2228] mt-0.5 block">
                λ = {selectedProduct.lambdaValue} W/(m·K)
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">
                {t.fireClassLabel}
              </span>
              <span className="text-sm font-black font-mono text-[#D71920] mt-0.5 block">
                Euroclass A1
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">
                {t.soundLabel}
              </span>
              <span className="text-sm font-black font-mono text-[#1D2228] mt-0.5 block">
                {selectedProduct.acousticRw}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">
                Diffusionsåbenhed
              </span>
              <span className="text-sm font-black font-mono text-[#1D2228] mt-0.5 block">
                {selectedProduct.vaporOpenness}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Technical Justification ("Why this solution?") + Thickness Control */}
        <div className="lg:col-span-7 space-y-6">
          {/* Thickness & Quantity Controls */}
          <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-[#1D2228] uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D71920]" />
                <span>{t.recommendedThickness}</span>
              </label>
              <span className="text-xs font-mono font-bold text-gray-600">
                {coveragePerPack.toFixed(2)} m² / {language === 'da' ? 'pakke' : 'pack'}
              </span>
            </div>

            {/* Thickness Buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {selectedProduct.availableThicknessesMm.map((th) => (
                <button
                  key={th}
                  onClick={() => onSelectThickness(th)}
                  className={`py-2 text-xs font-bold font-mono rounded-lg border transition-all ${
                    selectedThicknessMm === th
                      ? 'bg-[#D71920] text-white border-[#D71920] shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {th} mm
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
              <span>
                {language === 'da' ? 'Beregnet til:' : 'Calculated for:'}{' '}
                <strong className="text-[#1D2228]">~{estimate.netInsulationAreaM2.toFixed(1)} m²</strong> {language === 'da' ? 'nettoareal' : 'net area'}
              </span>
              <span className="text-xs font-mono font-bold text-[#D71920] bg-white px-2 py-1 rounded border border-gray-200">
                {packsForNetArea} {language === 'da' ? 'pakker påkrævet' : 'packs required'}
              </span>
            </div>
          </div>

          {/* "Why This Solution?" — 4 Technical Reasons */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#1D2228] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D71920]" />
              <span>{t.whyThisSolution}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectedProduct.technicalReasons.map((reason, rIdx) => (
                <div
                  key={rIdx}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors shadow-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-red-50 text-[#D71920] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#1D2228]">
                        {language === 'da' ? reason.titleDa : reason.title}
                      </h5>
                      <p className="text-[11px] text-gray-600 leading-relaxed mt-1">
                        {language === 'da' ? reason.descDa : reason.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
