import React from 'react';
import { Language, ProjectEstimate, RockwoolProduct } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Home, 
  Check, 
  Flame, 
  ThermometerSnowflake, 
  Volume2, 
  PiggyBank, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

interface CustomerHandoffModalProps {
  language: Language;
  estimate: ProjectEstimate;
  product: RockwoolProduct;
  selectedThicknessMm: number;
  onClose: () => void;
}

export const CustomerHandoffModal: React.FC<CustomerHandoffModalProps> = ({
  language,
  estimate,
  product,
  selectedThicknessMm,
  onClose,
}) => {
  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-popover border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {t.customerModalTitle}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {language === 'da' ? 'Forståeligt overblik til boligejeren uden teknisk jargon' : 'Clear, friendly overview prepared for the client'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Homeowner Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-700 text-xs sm:text-sm">
          {/* Welcome greeting */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
            <p className="text-sm font-bold text-emerald-900">
              {language === 'da' ? `Kære ${estimate.clientName}` : `Dear ${estimate.clientName}`}
            </p>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              {language === 'da'
                ? `Din isoleringshåndværker har foretaget en foreløbig videoscanning af boligen på ${estimate.address}. Her er et enkelt overblik over, hvad der blev fundet, og hvordan en energirenovering gavner dit hjem.`
                : `Your contractor conducted a preliminary video inspection of your home at ${estimate.address}. Here is a straightforward breakdown of the findings and benefits for your house.`}
            </p>
          </div>

          {/* 1. What your installer found */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.customerFound}
            </h4>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'da'
                    ? `Opmålt facadeareal er ca. ${estimate.grossFacadeAreaM2.toFixed(1)} m². Efter automatisk fratræk for vinduer og døre er netto isoleringsarealet ca. ${estimate.netInsulationAreaM2.toFixed(1)} m².`
                    : `Gross facade measured at ~${estimate.grossFacadeAreaM2.toFixed(1)} m². Deducting windows and doors yields a net insulation surface of ~${estimate.netInsulationAreaM2.toFixed(1)} m².`}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'da'
                    ? 'Murværk og spær har tilstrækkelig bæreevne, men ældre uisolerede hulmure medfører betydeligt varmetab om vinteren.'
                    : 'The building structure is solid, but older uninsulated walls cause noticeable heat loss and cold downdrafts in winter.'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Recommended Solution */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.customerSolution}
            </h4>
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#1D2228] block">
                  {product.name} ({selectedThicknessMm} mm)
                </span>
                <span className="text-xs text-gray-500">
                  {language === 'da' ? 'Danskproduceret stenuld fra ROCKWOOL' : 'Natural stone wool made by ROCKWOOL'}
                </span>
              </div>
              <span className="bg-red-50 text-[#D71920] font-bold text-xs px-2.5 py-1 rounded border border-red-200">
                {language === 'da' ? 'Klasse A1 Brandsikker' : 'Class A1 Fireproof'}
              </span>
            </div>
          </div>

          {/* 3. Expected Benefits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.customerBenefits}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                <PiggyBank className="w-5 h-5 text-emerald-600 mb-1" />
                <strong className="text-xs block text-[#1D2228]">
                  {language === 'da' ? 'Lavere Varmeregning' : 'Lower Heating Bills'}
                </strong>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {language === 'da' ? 'Spar op til 25-35% på opvarmningen afhengig af varmekilde.' : 'Save up to 25-35% on heating energy consumption.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                <ThermometerSnowflake className="w-5 h-5 text-blue-600 mb-1" />
                <strong className="text-xs block text-[#1D2228]">
                  {language === 'da' ? 'Slut med Træk & Kolde Vægge' : 'No More Cold Walls'}
                </strong>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {language === 'da' ? 'Ensartet behagelig indendørstemperatur året rundt.' : 'Even, draft-free comfort across all living spaces.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                <Flame className="w-5 h-5 text-[#D71920] mb-1" />
                <strong className="text-xs block text-[#1D2228]">
                  {language === 'da' ? 'Højeste Brandsikkerhed' : 'Maximum Fire Protection'}
                </strong>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {language === 'da' ? 'Stenuld kan ikke brænde og modstår >1.000°C varme.' : 'Non-combustible volcanic stone wool withstands >1,000°C.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 bg-white">
                <Volume2 className="w-5 h-5 text-purple-600 mb-1" />
                <strong className="text-xs block text-[#1D2228]">
                  {language === 'da' ? 'Mindre Trafikstøj' : 'Acoustic Peace'}
                </strong>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {language === 'da' ? 'Dæmper støj fra veje, haver og naboer markant.' : 'Significantly cushions road traffic and outdoor noise.'}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Next Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t.customerNext}
            </h4>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">1</span>
                <span>{language === 'da' ? 'Håndværkeren verificerer præcise mål på adressen' : 'Contractor performs quick on-site measurement check'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">2</span>
                <span>{language === 'da' ? 'Du modtager et bindende fastpristilbud på udførelsen' : 'You receive a formal quotation with fixed delivery timeline'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[11px]">3</span>
                <span>{language === 'da' ? 'Montage udføres på 2-4 arbejdsdage' : 'Installation is executed within 2-4 working days'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => alert(language === 'da' ? 'Link til bygherre kopieret til udklipsholder!' : 'Shareable link copied to clipboard!')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{language === 'da' ? 'Kopier Delbart Link til Boligejer' : 'Copy Client Link'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-gray-900"
          >
            {language === 'da' ? 'Luk' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
