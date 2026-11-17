import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenSupport }) => {
  const t = translations[language];

  return (
    <footer className="bg-[#1D2228] text-white border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="bg-[#D71920] text-white font-extrabold text-xl tracking-tighter px-3 py-1.5 rounded-sm inline-block">
              ROCKWOOL
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'da'
                ? 'ROCKWOOL A/S er verdens førende producent af stenuldsbaserede isoleringsløsninger til professionelle håndværkere i Danmark.'
                : 'ROCKWOOL is the global leader in stone wool insulation solutions engineered for professional trades in Denmark.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Dansk Bygningsreglement BR18</span>
            </div>
          </div>

          {/* Core Philosophy */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-gray-300">
              {language === 'da' ? 'Filosofi for Håndværkere' : 'Contractor Philosophy'}
            </h4>
            <p className="text-gray-400 leading-relaxed font-mono">
              &quot;{t.strategicHeadline}&quot;
            </p>
            <p className="text-gray-400">
              1. {language === 'da' ? 'Vurdér projektet' : 'Assess the project'}
            </p>
            <p className="text-gray-400">
              2. {language === 'da' ? 'Forstå isoleringsbehovet' : 'Understand insulation requirements'}
            </p>
            <p className="text-gray-400">
              3. {language === 'da' ? 'Specificér løsningen' : 'Specify the right solution'}
            </p>
            <p className="text-gray-400">
              4. {language === 'da' ? 'Bestil hos forhandler' : 'Order via trade distributors'}
            </p>
          </div>

          {/* Quick Support Links */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-gray-300">
              {language === 'da' ? 'Teknisk Support' : 'Technical Support'}
            </h4>
            <p className="text-gray-400 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D71920]" />
              <span>+45 46 56 16 16 (Hovednummer)</span>
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#D71920]" />
              <span>teknik@rockwool.dk</span>
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D71920]" />
              <span>Hovedgaden 501, 2640 Hedehusene</span>
            </p>
            <button
              onClick={onOpenSupport}
              className="text-red-400 hover:text-red-300 underline font-semibold mt-1 inline-block"
            >
              {language === 'da' ? 'Book byggeteknisk rådgiver →' : 'Book building consultant →'}
            </button>
          </div>

          {/* Compliance & Standards */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-gray-300">
              {language === 'da' ? 'Certificering & Brand' : 'Fire & Standards'}
            </h4>
            <div className="bg-gray-800/80 p-3 rounded-xl border border-gray-700/60 space-y-1 font-mono text-[11px] text-gray-300">
              <p>• DS/EN 13162 Mineraluld</p>
              <p>• Euroclass A1 Ubrændbar</p>
              <p>• EPD Cradle-to-Grave LCA</p>
              <p>• Keymark &amp; CE-mærket</p>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-8 border-t border-gray-800 text-[11px] text-gray-500 space-y-2">
          <p className="leading-relaxed">
            <strong className="text-gray-400">{language === 'da' ? 'Vigtigt forbehold:' : 'Important notice:'} </strong>
            {t.disclaimerText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-gray-500 pt-2 text-[10px] font-mono">
            <p>© {new Date().getFullYear()} ROCKWOOL A/S. All rights reserved. SiteScan Pro Platform.</p>
            <p>Danmark • STARK • Bygma • XL-BYG • Davidsen integreret</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
