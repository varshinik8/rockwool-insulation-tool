import React from 'react';
import { Language, ProjectEstimate, RockwoolProduct, ChecklistItem } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Printer, 
  Download, 
  Share2, 
  Building2, 
  Calendar, 
  FileCheck, 
  Flame, 
  CheckCircle2, 
  AlertTriangle,
  Mail,
  Truck
} from 'lucide-react';

interface ProjectReportModalProps {
  language: Language;
  estimate: ProjectEstimate;
  product: RockwoolProduct;
  selectedThicknessMm: number;
  wasteMarginPercent: number;
  checklist: ChecklistItem[];
  notes: string[];
  onClose: () => void;
  onOpenCustomerShare: () => void;
  onOpenDistributor: () => void;
}

export const ProjectReportModal: React.FC<ProjectReportModalProps> = ({
  language,
  estimate,
  product,
  selectedThicknessMm,
  wasteMarginPercent,
  checklist,
  notes,
  onClose,
  onOpenCustomerShare,
  onOpenDistributor,
}) => {
  const t = translations[language];

  // Dynamic values
  const coveragePerPack = product.packCoverageM2[selectedThicknessMm] || 2.50;
  const netM2 = estimate.netInsulationAreaM2;
  const totalM2WithWaste = Number((netM2 * (1 + wasteMarginPercent / 100)).toFixed(1));
  const packsRequired = Math.ceil(totalM2WithWaste / coveragePerPack);
  const palletsRequired = Math.ceil(packsRequired / 12);
  const totalVolumeM3 = (totalM2WithWaste * (selectedThicknessMm / 1000)).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-popover border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="p-4 bg-[#1D2228] text-white flex items-center justify-between no-print">
          <div className="flex items-center space-x-3">
            <div className="bg-[#D71920] px-2.5 py-1 rounded text-xs font-black tracking-tight">
              ROCKWOOL
            </div>
            <span className="text-xs font-semibold">
              {language === 'da' ? 'Officielt Projektdossier (PDF / Udskrift)' : 'Official Project Dossier (PDF / Print)'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#1D2228] hover:bg-gray-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'da' ? 'Udskriv / Gem som PDF' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:space-y-6">
          {/* Report Header */}
          <div className="border-b-2 border-gray-900 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#D71920] text-white text-xs font-black px-2 py-0.5 rounded">
                  ROCKWOOL® SiteScan™
                </span>
                <span className="text-xs font-mono font-bold text-gray-500">
                  REF: {estimate.id}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D2228] tracking-tight">
                {estimate.projectName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {estimate.address}, {estimate.postalCode} {estimate.city} • Bygherre: {estimate.clientName}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <p className="font-mono text-gray-500">
                {language === 'da' ? 'Dato:' : 'Date:'} <strong>{estimate.createdDate}</strong>
              </p>
              <p className="font-mono text-gray-500">
                {language === 'da' ? 'Status:' : 'Status:'} <strong className="text-emerald-700">{estimate.status}</strong>
              </p>
              <p className="font-mono text-gray-500">
                {language === 'da' ? 'Klimaskærmskrav:' : 'Building Code:'} <strong>Dansk BR18</strong>
              </p>
            </div>
          </div>

          {/* Video Thumbnail & Spatial Assessment */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-5 rounded-xl overflow-hidden border border-gray-300 aspect-16/10 bg-gray-100">
              <img
                src={estimate.thumbnailUrl}
                alt="Site Inspection Video Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="p-2 bg-gray-900 text-white text-[10px] font-mono flex justify-between">
                <span>VID: {estimate.videoFileName}</span>
                <span>00:{estimate.videoDurationSec}s</span>
              </div>
            </div>

            <div className="sm:col-span-7 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {language === 'da' ? '1. Rumlig Analyse & Arealer' : '1. Spatial Analysis & Surface Areas'}
              </h3>
              <table className="w-full text-xs text-left border border-gray-200 rounded-lg overflow-hidden">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="py-2 px-3 text-gray-600">{t.areaAnalysed} (Brutto)</td>
                    <td className="py-2 px-3 font-mono font-bold text-right text-gray-900">
                      {estimate.grossFacadeAreaM2.toFixed(1)} m²
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600">Fratræk for åbninger (14 vinduer &amp; døre)</td>
                    <td className="py-2 px-3 font-mono font-bold text-right text-blue-600">
                      -{estimate.openingsDeductionM2.toFixed(1)} m²
                    </td>
                  </tr>
                  <tr className="bg-red-50/70">
                    <td className="py-2 px-3 font-bold text-gray-900">{t.insulationArea} (Netto)</td>
                    <td className="py-2 px-3 font-mono font-black text-right text-[#D71920]">
                      {netM2.toFixed(1)} m²
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-600">Spildtillæg ({wasteMarginPercent}%)</td>
                    <td className="py-2 px-3 font-mono font-bold text-right text-gray-700">
                      +{((netM2 * wasteMarginPercent) / 100).toFixed(1)} m²
                    </td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="py-2 px-3 text-gray-900">Samlet Beregnet Behov</td>
                    <td className="py-2 px-3 font-mono font-black text-right text-gray-900">
                      {totalM2WithWaste} m²
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Solution & Material Specification */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {language === 'da' ? '2. Anbefalet ROCKWOOL Løsning & Materialeliste' : '2. Recommended ROCKWOOL Solution & Bill of Materials'}
            </h3>

            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
                <div>
                  <h4 className="text-base font-bold text-[#1D2228]">
                    {product.name} ({selectedThicknessMm} mm)
                  </h4>
                  <p className="text-xs text-gray-600">
                    {language === 'da' ? product.applicationDa : product.application} • Varenummer: {product.sku}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-red-100 text-[#D71920] px-2 py-0.5 rounded font-bold">
                    λ = {product.lambdaValue} W/(m·K)
                  </span>
                  <span className="text-xs font-mono bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-bold">
                    Euroclass A1
                  </span>
                </div>
              </div>

              {/* Order quantities grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block">Antal Pakker</span>
                  <span className="text-lg font-mono font-black text-[#D71920] mt-0.5 block">
                    {packsRequired} pk.
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block">Antal Paller</span>
                  <span className="text-lg font-mono font-black text-gray-900 mt-0.5 block">
                    {palletsRequired} paller
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block">Isoleringsvolumen</span>
                  <span className="text-lg font-mono font-black text-gray-900 mt-0.5 block">
                    {totalVolumeM3} m³
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <span className="text-gray-500 block">Estimeret Beløb</span>
                  <span className="text-lg font-mono font-black text-gray-900 mt-0.5 block">
                    ~{(totalM2WithWaste * product.pricePerM2Dkk).toLocaleString('da-DK')} DKK
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Checklist Status & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {language === 'da' ? '3. Kvalitetssikring & Tjekliste' : '3. Quality Assurance & Checklist'}
              </h3>
              <div className="border border-gray-200 rounded-xl p-3 bg-white space-y-1.5 text-xs">
                {checklist.map((chk) => (
                  <div key={chk.id} className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${chk.checked ? 'bg-emerald-600 text-white font-bold' : 'border border-gray-300 text-gray-400'}`}>
                      {chk.checked ? '✓' : ''}
                    </span>
                    <span className={chk.checked ? 'text-gray-900' : 'text-gray-500'}>
                      {language === 'da' ? chk.labelDa : chk.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {language === 'da' ? '4. Håndværkerens Forbehold & Notater' : '4. Contractor Notes & Reservations'}
              </h3>
              <div className="border border-gray-200 rounded-xl p-3 bg-white space-y-2 text-xs">
                {notes.length === 0 ? (
                  <p className="text-gray-400 italic">Ingen notater registreret.</p>
                ) : (
                  notes.map((note, nIdx) => (
                    <div key={nIdx} className="flex items-start gap-1.5">
                      <span className="text-[#D71920] font-bold">•</span>
                      <span className="text-gray-800">{note}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-[11px] text-gray-600 leading-relaxed">
            <strong className="text-gray-900 block mb-1">
              {language === 'da' ? 'Juridisk Ansvarsfraskrivelse & BR18 Krav:' : 'Legal Disclaimer & BR18 Compliance:'}
            </strong>
            <p>{t.disclaimerText}</p>
          </div>

          {/* Signature line for Danish contractor */}
          <div className="pt-6 border-t border-gray-200 flex justify-between items-end text-xs">
            <div>
              <p className="text-gray-500">Udfærdiget af autoriseret isolatør / entreprenør:</p>
              <div className="w-56 h-8 border-b border-gray-400 mt-4"></div>
              <p className="font-mono text-gray-400 text-[10px] mt-1">Dato &amp; Underskrift</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-gray-400 text-[10px]">ROCKWOOL A/S • Hovedgaden 501 • 2640 Hedehusene</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer (Hidden in Print) */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCustomerShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.shareCustomerBtn}</span>
            </button>
            <button
              onClick={onOpenDistributor}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-[#D71920]" />
              <span>{t.findDistributorBtn}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              {language === 'da' ? 'Luk' : 'Close'}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#D71920] hover:bg-[#B8141A] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadPdfBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
