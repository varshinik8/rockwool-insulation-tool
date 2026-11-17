import React, { useState } from 'react';
import { Language, ProjectEstimate, RockwoolProduct, DistributorBranch } from '../types';
import { translations } from '../data/translations';
import { DISTRIBUTOR_BRANCHES } from '../data/sampleData';
import { 
  X, 
  Truck, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Package, 
  Building2, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';

interface DistributorModalProps {
  language: Language;
  estimate: ProjectEstimate;
  product: RockwoolProduct;
  selectedThicknessMm: number;
  wasteMarginPercent: number;
  onClose: () => void;
}

export const DistributorModal: React.FC<DistributorModalProps> = ({
  language,
  estimate,
  product,
  selectedThicknessMm,
  wasteMarginPercent,
  onClose,
}) => {
  const t = translations[language];

  // Dynamic order metrics
  const coveragePerPack = product.packCoverageM2[selectedThicknessMm] || 2.50;
  const netM2 = estimate.netInsulationAreaM2;
  const totalM2WithWaste = Number((netM2 * (1 + wasteMarginPercent / 100)).toFixed(1));
  const packsRequired = Math.ceil(totalM2WithWaste / coveragePerPack);
  const palletsRequired = Math.ceil(packsRequired / 12);

  const [selectedBranch, setSelectedBranch] = useState<DistributorBranch>(DISTRIBUTOR_BRANCHES[0]);
  const [contractorAccountNumber, setContractorAccountNumber] = useState<string>('DK-PRO-88421');
  const [requestedDeliveryDate, setRequestedDeliveryDate] = useState<string>('I morgen, kl. 07:00');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-popover border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#1D2228] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {t.distributorTitle}
              </h3>
              <p className="text-[11px] text-gray-400">
                {language === 'da' ? 'Forbind estimat direkte til lokal tømmerhandel' : 'Connect estimate directly with local Danish merchants'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            /* Success confirmation */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-[#1D2228]">
                {language === 'da' ? 'Håndværkerordre Afsendt!' : 'Trade Reservation Sent!'}
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {language === 'da'
                  ? `Din reservation på ${packsRequired} pakker (${product.name}) er sendt til ${selectedBranch.branchName}. Afhentningsbekræftelse sendt til din e-mail.`
                  : `Your reservation for ${packsRequired} packs (${product.name}) has been routed to ${selectedBranch.branchName}. Pickup confirmation sent to your email.`}
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-mono max-w-sm mx-auto text-left space-y-1">
                <p><strong>Ordre ID:</strong> RW-ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Lokation:</strong> {selectedBranch.address}, {selectedBranch.city}</p>
                <p><strong>Konto:</strong> {contractorAccountNumber}</p>
                <p><strong>Afhentning:</strong> {requestedDeliveryDate}</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold bg-[#D71920] text-white hover:bg-[#B8141A] transition-colors text-xs"
              >
                {language === 'da' ? 'Tilbage til Projektet' : 'Back to Project'}
              </button>
            </div>
          ) : (
            <>
              {/* Order summary bar */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#1D2228] block">
                    {product.name} ({selectedThicknessMm} mm)
                  </span>
                  <span className="text-gray-500">
                    Varenummer: {product.sku}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-gray-500 block">Estimeret Behov:</span>
                    <strong className="text-sm font-mono text-[#D71920]">
                      {totalM2WithWaste} m² ({packsRequired} pk.)
                    </strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Paller:</span>
                    <strong className="text-sm font-mono text-gray-900">
                      {palletsRequired} paller
                    </strong>
                  </div>
                </div>
              </div>

              {/* Branch Selection List */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  {language === 'da' ? 'Vælg Tømmerhandel & Afdeling:' : 'Select Distributor Branch:'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DISTRIBUTOR_BRANCHES.map((branch) => {
                    const isSelected = selectedBranch.id === branch.id;
                    return (
                      <div
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#D71920] bg-red-50/40 shadow-xs ring-1 ring-[#D71920]'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#1D2228]">
                            {branch.branchName}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            branch.stockStatus === 'In Stock'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {language === 'da' ? branch.stockStatusDa : branch.stockStatus}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{branch.address}, {branch.postalCode} {branch.city}</span>
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-2 pt-1.5 border-t border-gray-100">
                          <span>{branch.distanceKm} km {language === 'da' ? 'fra byggeplads' : 'from site'}</span>
                          <span className="text-emerald-700 font-bold">
                            {branch.availablePacks} {language === 'da' ? 'pk. på lager' : 'in stock'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reservation / RFQ Form */}
              <form onSubmit={handleReserve} className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {language === 'da' ? 'Håndværkerbestilling / Reservering' : 'Contractor Reservation Form'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      {language === 'da' ? 'Håndværker Kontonr. (STARK / Bygma / XL)' : 'Trade Account Number'}
                    </label>
                    <input
                      type="text"
                      value={contractorAccountNumber}
                      onChange={(e) => setContractorAccountNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      {language === 'da' ? 'Ønsket Afhentning / Levering' : 'Pickup / Delivery Window'}
                    </label>
                    <input
                      type="text"
                      value={requestedDeliveryDate}
                      onChange={(e) => setRequestedDeliveryDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold bg-[#D71920] hover:bg-[#B8141A] text-white text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {language === 'da'
                        ? `Reserver ${packsRequired} pakker hos ${selectedBranch.branchName}`
                        : `Reserve ${packsRequired} packs at ${selectedBranch.branchName}`}
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
