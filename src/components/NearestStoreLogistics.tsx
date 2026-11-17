import React, { useState } from 'react';
import { Language, ProjectEstimate, RockwoolProduct, DistributorBranch } from '../types';
import { translations } from '../data/translations';
import { DISTRIBUTOR_BRANCHES } from '../data/sampleData';
import { 
  MapPin, 
  Truck, 
  Clock, 
  Fuel, 
  Navigation, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Building2, 
  ArrowRight,
  TrendingDown,
  DollarSign
} from 'lucide-react';

interface NearestStoreLogisticsProps {
  language: Language;
  estimate: ProjectEstimate;
  product: RockwoolProduct;
  selectedThicknessMm: number;
  wasteMarginPercent: number;
  onSelectStore?: (store: DistributorBranch) => void;
}

export const NearestStoreLogistics: React.FC<NearestStoreLogisticsProps> = ({
  language,
  estimate,
  product,
  selectedThicknessMm,
  wasteMarginPercent,
  onSelectStore,
}) => {
  const t = translations[language];

  // Dynamic order metrics
  const coveragePerPack = product.packCoverageM2[selectedThicknessMm] || 2.50;
  const netM2 = estimate.netInsulationAreaM2;
  const totalM2WithWaste = Number((netM2 * (1 + wasteMarginPercent / 100)).toFixed(1));
  const packsRequired = Math.ceil(totalM2WithWaste / coveragePerPack);

  // Store branches sorted by distance
  const sortedBranches = [...DISTRIBUTOR_BRANCHES].sort((a, b) => a.distanceKm - b.distanceKm);
  const nearestStore = sortedBranches[0];
  const farthestStore = sortedBranches[sortedBranches.length - 1];
  const logisticsSavingsDkk = (farthestStore.estimatedFuelDkk || 300) - (nearestStore.estimatedFuelDkk || 34);

  const [selectedBranch, setSelectedBranch] = useState<DistributorBranch>(nearestStore);
  const [reservedSuccess, setReservedSuccess] = useState<boolean>(false);

  return (
    <div id="nearest-store-logistics" className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-card space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'da' ? 'LOGISTIK- & TRANSPORTOPTIMERER' : 'LOGISTICS & ROUTE OPTIMIZER'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D2228] tracking-tight">
            {language === 'da' ? 'Find Nærmeste Tømmerhandel & Minimer Kørsel' : 'Nearest ROCKWOOL Store & Logistics Cost Saver'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {language === 'da'
              ? `Optimeret efter byggepladsens adresse: ${estimate.address}, ${estimate.postalCode} ${estimate.city}. Spar brændstof og afhentningstid.`
              : `Optimized from job site: ${estimate.address}, ${estimate.postalCode} ${estimate.city}. Cut fuel costs and turnaround time.`}
          </p>
        </div>

        {/* Savings Highlight Box */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center sm:text-right shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
            {language === 'da' ? 'Estimeret Logistikbesparelse' : 'Estimated Logistics Savings'}
          </span>
          <span className="text-2xl font-black font-mono text-emerald-700 block">
            ~{logisticsSavingsDkk} DKK
          </span>
          <span className="text-[10px] text-emerald-700">
            {language === 'da' ? 'ved valg af nærmeste forhandler' : 'by choosing nearest branch'}
          </span>
        </div>
      </div>

      {/* Main Grid: Recommended Nearest Store Hero Card + List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Top Optimal Store Focus Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1D2228] to-[#2B323B] text-white rounded-2xl p-6 border border-gray-800 shadow-elevated space-y-5">
          <div className="flex items-center justify-between">
            <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>{language === 'da' ? 'Mest Optimale Rute' : 'Optimal Nearest Route'}</span>
            </span>
            <span className="text-xs font-mono text-gray-300">
              Kun {nearestStore.distanceKm} km fra byggeplads
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold tracking-tight">
              {nearestStore.branchName}
            </h4>
            <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{nearestStore.address}, {nearestStore.postalCode} {nearestStore.city}</span>
            </p>
          </div>

          {/* Key Logistics Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-800/80 p-2.5 rounded-xl border border-gray-700">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Køretid</span>
              <span className="text-base font-bold font-mono text-emerald-400 mt-0.5 block">
                {nearestStore.driveTimeMin} min
              </span>
            </div>
            <div className="bg-gray-800/80 p-2.5 rounded-xl border border-gray-700">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Afstand</span>
              <span className="text-base font-bold font-mono text-white mt-0.5 block">
                {nearestStore.distanceKm} km
              </span>
            </div>
            <div className="bg-gray-800/80 p-2.5 rounded-xl border border-gray-700">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">Brændstof</span>
              <span className="text-base font-bold font-mono text-amber-400 mt-0.5 block">
                {nearestStore.estimatedFuelDkk} DKK
              </span>
            </div>
          </div>

          {/* Real-time Inventory Check */}
          <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>{nearestStore.availablePacks} pakker</strong> på lager nu
              </span>
            </div>
            <span className="text-emerald-300 font-mono font-bold">
              (Behov: {packsRequired} pk.)
            </span>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                setSelectedBranch(nearestStore);
                setReservedSuccess(true);
                if (onSelectStore) onSelectStore(nearestStore);
              }}
              className="w-full py-3 rounded-xl font-bold bg-[#D71920] hover:bg-[#B8141A] text-white text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
            >
              <Truck className="w-4 h-4" />
              <span>
                {language === 'da'
                  ? `Reserver ${packsRequired} pk. til Håndværkerafhentning`
                  : `Reserve ${packsRequired} pk. for Morning Pickup`}
              </span>
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `${nearestStore.address}, ${nearestStore.city}, Denmark`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center gap-2 transition-colors border border-white/15"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'da' ? 'Start GPS Rutevejledning' : 'Open GPS Navigation'}</span>
            </a>
          </div>

          {reservedSuccess && (
            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-500 text-xs text-emerald-200 text-center font-semibold">
              ✓ {language === 'da' ? 'Pakker reserveret hos STARK Gentofte Pro-Center! SMS-bekræftelse afsendt.' : 'Packs reserved at STARK Gentofte! SMS confirmation sent.'}
            </div>
          )}
        </div>

        {/* Right Column: Comparison Table of All Partner Branches */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
            <span className="font-bold uppercase tracking-wider">
              {language === 'da' ? 'Forhandlere i Nærområdet' : 'Nearby Distributor Branches'}
            </span>
            <span>Rangeret efter laveste transportomkostning</span>
          </div>

          <div className="space-y-2.5">
            {sortedBranches.map((branch, idx) => {
              const isSelected = selectedBranch.id === branch.id;
              const isFirst = idx === 0;

              return (
                <div
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranch(branch);
                    if (onSelectStore) onSelectStore(branch);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#D71920] bg-red-50/30 ring-1 ring-[#D71920]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 text-[#1D2228] font-bold text-xs border border-gray-200">
                      {branch.distributorName}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-[#1D2228]">
                          {branch.branchName}
                        </h5>
                        {isFirst && (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                            {language === 'da' ? 'Nærmest' : 'Nearest'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{branch.address}, {branch.postalCode} {branch.city}</span>
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                        {branch.contractorDeskHours}
                      </p>
                    </div>
                  </div>

                  {/* Distance & Fuel Cost */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-xs text-right">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-mono">Afstand &amp; Tid</span>
                      <strong className="text-xs font-mono text-[#1D2228]">
                        {branch.distanceKm} km ({branch.driveTimeMin} min)
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 block font-mono">Kørselsomk.</span>
                      <strong className="text-xs font-mono text-gray-700">
                        ~{branch.estimatedFuelDkk} DKK
                      </strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 block font-mono">Lagerstatus</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        branch.stockStatus === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {branch.availablePacks} pk.
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
