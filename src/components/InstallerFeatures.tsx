import React, { useState } from 'react';
import { Language, ProjectEstimate, RockwoolProduct, ChecklistItem, TechnicalDocument } from '../types';
import { translations } from '../data/translations';
import { 
  Calculator, 
  CheckSquare, 
  FileText, 
  StickyNote, 
  Plus, 
  Trash2, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  Sliders, 
  Package, 
  Scale, 
  Truck, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface InstallerFeaturesProps {
  language: Language;
  estimate: ProjectEstimate;
  selectedProduct: RockwoolProduct;
  selectedThicknessMm: number;
  wasteMarginPercent: number;
  onUpdateWasteMargin: (waste: number) => void;
  onToggleChecklist: (itemId: string) => void;
  onAddNote: (note: string) => void;
  onRemoveNote: (index: number) => void;
  checklist: ChecklistItem[];
  notes: string[];
}

export const InstallerFeatures: React.FC<InstallerFeaturesProps> = ({
  language,
  estimate,
  selectedProduct,
  selectedThicknessMm,
  wasteMarginPercent,
  onUpdateWasteMargin,
  onToggleChecklist,
  onAddNote,
  onRemoveNote,
  checklist,
  notes,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'calculator' | 'checklist' | 'documents' | 'notes'>('calculator');
  const [newNoteInput, setNewNoteInput] = useState<string>('');
  const [selectedDocPreview, setSelectedDocPreview] = useState<TechnicalDocument | null>(null);

  // Dynamic calculations
  const coveragePerPack = selectedProduct.packCoverageM2[selectedThicknessMm] || 2.50;
  const netM2 = estimate.netInsulationAreaM2;
  const totalM2WithWaste = Number((netM2 * (1 + wasteMarginPercent / 100)).toFixed(1));
  const packsRequired = Math.ceil(totalM2WithWaste / coveragePerPack);
  const palletsRequired = Math.ceil(packsRequired / 12); // typically 10-12 packs per pallet
  const approxWeightKg = Math.round(totalM2WithWaste * (selectedThicknessMm / 1000) * 35); // ~35kg/m³ density
  const estimatedCostDkk = Math.round(totalM2WithWaste * selectedProduct.pricePerM2Dkk);

  // Quick note suggestions for Danish contractors
  const quickNotesSuggestions = language === 'da' ? [
    'Hulmur har varierende dybde (80-110 mm)',
    'Adgang til stillads er trang mod skel',
    'Træfugtighed kontrolleret til 14% OK',
    'Dampspærre skal eftertapes ved elrør',
    'Vinduer skiftes samtidig med isolering'
  ] : [
    'Cavity has variable depth (80-110 mm)',
    'Scaffolding access narrow along boundary',
    'Timber moisture verified at 14% OK',
    'Vapour barrier requires taping at conduits',
    'Windows replaced concurrently with insulation'
  ];

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteInput.trim()) {
      onAddNote(newNoteInput.trim());
      setNewNoteInput('');
    }
  };

  const completedChecksCount = checklist.filter((c) => c.checked).length;

  return (
    <div id="installer-suite" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-card space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200 mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-[#D71920]" />
            <span>{language === 'da' ? 'HÅNDVÆRKERENS VÆRKTØJ' : 'CONTRACTOR EXECUTION SUITE'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D2228] tracking-tight">
            {t.installerToolsHeader}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t.installerToolsSub}
          </p>
        </div>

        {/* 4 Feature Tabs */}
        <div className="flex flex-wrap items-center p-1 bg-gray-100 rounded-xl text-xs font-semibold gap-1">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'calculator'
                ? 'bg-white text-[#D71920] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calculatorTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'checklist'
                ? 'bg-white text-[#D71920] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{t.checklistTab}</span>
            <span className="text-[10px] font-mono bg-gray-200 text-gray-800 px-1.5 py-0.2 rounded-full">
              {completedChecksCount}/{checklist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'documents'
                ? 'bg-white text-[#D71920] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.techDocsTab}</span>
            <span className="text-[10px] font-mono bg-red-100 text-[#D71920] px-1.5 py-0.2 rounded-full">
              {selectedProduct.documents.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'notes'
                ? 'bg-white text-[#D71920] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>{t.notesTab}</span>
            <span className="text-[10px] font-mono bg-gray-200 text-gray-800 px-1.5 py-0.2 rounded-full">
              {notes.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: MATERIAL CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls: Area, Thickness, Waste Margin */}
            <div className="lg:col-span-6 bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200 space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {language === 'da' ? 'Indstillinger for Beregning' : 'Calculation Parameters'}
              </h4>

              {/* Net Area Display */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs text-gray-700 font-semibold">{t.calcM2Net}</span>
                <span className="text-sm font-mono font-bold text-[#1D2228]">
                  {netM2.toFixed(1)} m²
                </span>
              </div>

              {/* Thickness Selection Display */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs text-gray-700 font-semibold">{t.calcThickness}</span>
                <span className="text-sm font-mono font-bold text-[#D71920]">
                  {selectedThicknessMm} mm ({coveragePerPack.toFixed(2)} m²/pk)
                </span>
              </div>

              {/* Interactive Waste Margin Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-700">{t.calcWaste}</span>
                  <span className="font-mono font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-300">
                    +{wasteMarginPercent}% {language === 'da' ? 'tilskæringsspild' : 'cutting margin'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={wasteMarginPercent}
                  onChange={(e) => onUpdateWasteMargin(Number(e.target.value))}
                  className="w-full accent-[#D71920] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>0% (Tight exact)</span>
                  <span className="text-[#D71920] font-bold">8% (Standard DK anbefaling)</span>
                  <span>15% (Complex irregular geometry)</span>
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-start gap-2">
                <Sliders className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5" />
                <span>
                  {language === 'da'
                    ? '8% skærespild anbefales til murermestervillaer med gesimser og fremspring for at undgå stop på byggepladsen.'
                    : 'An 8% waste allowance is recommended for Nordic brick villas to avoid costly job stoppages on-site.'}
                </span>
              </div>
            </div>

            {/* Right Output: Calculation Results */}
            <div className="lg:col-span-6 bg-[#1D2228] text-white rounded-2xl p-6 border border-gray-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                <span className="text-xs font-mono uppercase text-gray-400">
                  {language === 'da' ? 'ORDREOVERSIGT' : 'MATERIAL ORDER SPECIFICATION'}
                </span>
                <span className="text-xs font-mono text-emerald-400">BR18 Tjek: OK</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/60 p-3.5 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block">
                    {t.calcTotalM2}
                  </span>
                  <span className="text-xl font-mono font-black text-white mt-1 block">
                    {totalM2WithWaste} m²
                  </span>
                  <span className="text-[10px] text-gray-400">
                    +{((netM2 * wasteMarginPercent) / 100).toFixed(1)} m² {language === 'da' ? 'spild' : 'waste'}
                  </span>
                </div>

                <div className="bg-gray-800/60 p-3.5 rounded-xl border border-red-500/30">
                  <span className="text-[10px] font-mono uppercase text-red-400 block">
                    {t.calcPacks}
                  </span>
                  <span className="text-xl font-mono font-black text-white mt-1 block">
                    {packsRequired} {language === 'da' ? 'pakker' : 'packs'}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {coveragePerPack} m² pr. pakke
                  </span>
                </div>

                <div className="bg-gray-800/60 p-3.5 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block">
                    {t.calcPallets}
                  </span>
                  <span className="text-xl font-mono font-black text-white mt-1 block">
                    {palletsRequired} {language === 'da' ? 'paller' : 'pallets'}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    ~10-12 pk./palle
                  </span>
                </div>

                <div className="bg-gray-800/60 p-3.5 rounded-xl">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block">
                    {t.calcWeight}
                  </span>
                  <span className="text-xl font-mono font-black text-white mt-1 block">
                    ~{approxWeightKg} kg
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {language === 'da' ? 'Fragtvægt' : 'Shipping weight'}
                  </span>
                </div>
              </div>

              {/* Price estimate block */}
              <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">
                    {t.calcEstimatePrice}
                  </span>
                  <span className="text-xs text-gray-500">
                    {language === 'da' ? 'Vejl. håndværkerpris hos forhandlere' : 'Estimated trade contractor price'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-mono font-black text-[#D71920]">
                    ~{estimatedCostDkk.toLocaleString('da-DK')} DKK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INSTALLATION CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h4 className="text-sm font-bold text-[#1D2228]">
                {t.checklistTitle}
              </h4>
              <p className="text-xs text-gray-500">
                {t.checklistDesc}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {completedChecksCount} / {checklist.length} {language === 'da' ? 'udført' : 'verified'}
            </span>
          </div>

          <div className="space-y-2.5">
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleChecklist(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  item.checked
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mt-0.5">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      item.checked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${item.checked ? 'text-emerald-900 line-through' : 'text-[#1D2228]'}`}>
                      {language === 'da' ? item.labelDa : item.label}
                    </span>
                    {item.required && (
                      <span className="text-[10px] font-bold text-red-600 uppercase bg-red-50 px-1.5 py-0.2 rounded border border-red-200 ml-2 shrink-0">
                        {t.mandatoryTag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    {language === 'da' ? item.descriptionDa : item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TECHNICAL DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="pb-2 border-b border-gray-100">
            <h4 className="text-sm font-bold text-[#1D2228]">
              {language === 'da' ? 'Certificerede Dokumenter & Datablade' : 'Certified Technical Documents'}
            </h4>
            <p className="text-xs text-gray-500">
              {language === 'da'
                ? 'Officielle ROCKWOOL produktdatablade, CE-mærkning, EPD miljødeklarationer og montagevejledninger.'
                : 'Official ROCKWOOL product datasheets, CE declarations, EPD environmental declarations, and installation guides.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedProduct.documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-2">
                    <span className="bg-white px-2 py-0.5 rounded border border-gray-200">
                      {doc.code}
                    </span>
                    <span>{doc.size}</span>
                  </div>
                  <h5 className="text-xs font-bold text-[#1D2228] mb-1">
                    {language === 'da' ? doc.titleDa : doc.title}
                  </h5>
                  <p className="text-[11px] text-gray-500">
                    Kategori: {language === 'da' ? doc.categoryDa : doc.category}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDocPreview(doc)}
                    className="text-xs font-semibold text-[#D71920] hover:text-[#B8141A] flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t.viewDoc}</span>
                  </button>
                  <button
                    onClick={() => alert(language === 'da' ? `Downloader ${doc.titleDa}...` : `Downloading ${doc.title}...`)}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Preview Box if clicked */}
          {selectedDocPreview && (
            <div className="p-4 bg-gray-900 text-white rounded-xl border border-gray-800 text-xs space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-400">
                  DOCUMENT VIEWER: {selectedDocPreview.code}
                </span>
                <button
                  onClick={() => setSelectedDocPreview(null)}
                  className="text-gray-400 hover:text-white font-mono"
                >
                  ✕ Luk
                </button>
              </div>
              <p className="text-gray-300">
                {language === 'da' ? selectedDocPreview.titleDa : selectedDocPreview.title}
              </p>
              <div className="bg-black/60 p-3 rounded font-mono text-[11px] text-gray-400">
                [ROCKWOOL A/S Denmark Certification: Euroclass A1 Fire, λ=0.037 W/mK, CE EN 13162:2012+A1:2015]
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PROJECT NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="pb-2 border-b border-gray-100">
            <h4 className="text-sm font-bold text-[#1D2228]">
              {t.notesTitle}
            </h4>
            <p className="text-xs text-gray-500">
              {language === 'da'
                ? 'Notér forbehold, skævheder eller installationsforhold til tilbuddet og byggepladsen.'
                : 'Log reservations, site constraints, or conditions for the customer quotation.'}
            </p>
          </div>

          {/* Quick Add Suggestion Pills */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-gray-500">
              {t.suggestedNotes}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickNotesSuggestions.map((sug, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => onAddNote(sug)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 hover:bg-red-50 hover:text-[#D71920] border border-gray-200 transition-colors"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleAddNoteSubmit} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newNoteInput}
              onChange={(e) => setNewNoteInput(e.target.value)}
              placeholder={t.addNotePlaceholder}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] bg-white"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#D71920] hover:bg-[#B8141A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addNoteBtn}</span>
            </button>
          </form>

          {/* List of Active Notes */}
          <div className="space-y-2 pt-2">
            {notes.map((note, nIdx) => (
              <div
                key={nIdx}
                className="bg-[#F8F9FA] p-3 rounded-xl border border-gray-200 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2">
                  <span className="text-[#D71920] font-bold mt-0.5">•</span>
                  <span className="text-gray-800">{note}</span>
                </div>
                <button
                  onClick={() => onRemoveNote(nIdx)}
                  className="text-gray-400 hover:text-red-600 transition-colors shrink-0"
                  title="Slet note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
