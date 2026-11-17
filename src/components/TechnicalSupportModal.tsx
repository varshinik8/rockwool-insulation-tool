import React, { useState } from 'react';
import { Language, ProjectEstimate } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Headphones, 
  CheckCircle2, 
  Send, 
  FileCheck2, 
  UserCheck, 
  Building, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';

interface TechnicalSupportModalProps {
  language: Language;
  estimate: ProjectEstimate | null;
  onClose: () => void;
}

export const TechnicalSupportModal: React.FC<TechnicalSupportModalProps> = ({
  language,
  estimate,
  onClose,
}) => {
  const [requestType, setRequestType] = useState<'uvalue' | 'site_visit' | 'distributor' | 'sample'>('uvalue');
  const [contractorName, setContractorName] = useState<string>('Mads Holm — Gentofte Byg & Isolering ApS');
  const [phone, setPhone] = useState<string>('+45 28 44 91 10');
  const [email, setEmail] = useState<string>('kontakt@gentoftebyg.dk');
  const [comments, setComments] = useState<string>(
    estimate 
      ? `Ønsker validering af U-værdi på ${estimate.projectName} samt teknisk vurdering af hulmur ved 200 mm Flexibatts.` 
      : 'Ønsker kontakt fra en teknisk konsulent.'
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-popover border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#D71920] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-white">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {language === 'da' ? 'ROCKWOOL Teknisk Rådgivning Danmark' : 'ROCKWOOL Technical Consultant Service'}
              </h3>
              <p className="text-[11px] text-red-100">
                {language === 'da' ? 'Direkte sparring for professionelle håndværkere' : 'Direct engineering support for professional contractors'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-black/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-[#1D2228]">
                {language === 'da' ? 'Tak for din henvendelse!' : 'Request Received!'}
              </h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                {language === 'da'
                  ? 'En ROCKWOOL byggeteknisk konsulent kontakter dig inden for 2 timer på telefon eller e-mail.'
                  : 'A certified ROCKWOOL building engineer will reach out to you within 2 business hours.'}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-[#1D2228] text-white hover:bg-black transition-colors"
              >
                {language === 'da' ? 'Luk vindue' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5 uppercase tracking-wider text-[11px]">
                  {language === 'da' ? 'Hvad ønsker du hjælp til?' : 'What assistance do you require?'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRequestType('uvalue')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      requestType === 'uvalue'
                        ? 'border-[#D71920] bg-red-50/50 text-[#D71920] font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>📐</span> {language === 'da' ? 'U-værdiberegning (BR18)' : 'U-value validation'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('site_visit')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      requestType === 'site_visit'
                        ? 'border-[#D71920] bg-red-50/50 text-[#D71920] font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>👷</span> {language === 'da' ? 'Besøg på byggepladsen' : 'On-site technical visit'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('distributor')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      requestType === 'distributor'
                        ? 'border-[#D71920] bg-red-50/50 text-[#D71920] font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>🏢</span> {language === 'da' ? 'Forhandler & Kontorabat' : 'Distributor trade pricing'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRequestType('sample')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      requestType === 'sample'
                        ? 'border-[#D71920] bg-red-50/50 text-[#D71920] font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>📦</span> {language === 'da' ? 'Materialeprøve pakke' : 'Sample box request'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {language === 'da' ? 'Virksomhed / Kontaktperson' : 'Company / Contact Person'}
                  </label>
                  <input
                    type="text"
                    value={contractorName}
                    onChange={(e) => setContractorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {language === 'da' ? 'Telefonnummer' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {language === 'da' ? 'E-mailadresse' : 'Email Address'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {language === 'da' ? 'Beskrivelse / Kommentarer' : 'Project Comments / Questions'}
                </label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold bg-[#D71920] hover:bg-[#B8141A] text-white flex items-center justify-center gap-2 shadow-sm transition-colors text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'da' ? 'Send Henvendelse til Teknisk Service' : 'Submit Request to Technical Team'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
