import React, { useState, useEffect } from 'react';
import { 
  Language, 
  ProjectEstimate, 
  WarrantyCertificate, 
  InsulationHealthMonitoring, 
  ChatMessage 
} from '../types';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  Activity, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Thermometer, 
  Droplets, 
  Flame, 
  Volume2, 
  PiggyBank, 
  Download, 
  Send, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  Clock,
  Home,
  FileCheck2,
  PhoneCall
} from 'lucide-react';

interface CustomerPortalProps {
  language: Language;
  estimate: ProjectEstimate;
  onBackToEstimator?: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  language,
  estimate,
  onBackToEstimator,
}) => {
  const t = translations[language];
  const warranty = estimate.warranty!;
  const monitoring = estimate.monitoring!;

  // Tabs within customer portal
  const [activeTab, setActiveTab] = useState<'monitoring' | 'warranty' | 'chat'>('monitoring');

  // Initial chat message generator based on language
  const getInitialChatMessages = (lang: Language): ChatMessage[] => [
    {
      id: 'msg-1',
      sender: 'bot',
      senderName: t.chatAssistantName,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      text: lang === 'da'
        ? `Hej ${estimate.clientName}! Velkommen til din ROCKWOOL Boligejerportal. Din 25-års garanti på ${estimate.address} er aktiv, og dine sensorer melder 98% optimal isoleringstilstand. Hvad kan jeg hjælpe dig med i dag?`
        : `Hello ${estimate.clientName}! Welcome to your ROCKWOOL Homeowner Care Portal. Your 25-year warranty for ${estimate.address} is active, and your sensors report 98% optimal insulation health. How can I assist you today?`,
      timestamp: '04:15',
      isExecutiveOnline: true,
      quickReplies: lang === 'da' ? [
        'Hvordan dækker min 25-års garanti?',
        'Hvad sparer jeg på varmeregningen?',
        'Vis sensorstatus for fugt og skimmel',
        'Forbind mig direkte med en ROCKWOOL rådgiver'
      ] : [
        'How does my 25-year warranty work?',
        'How much am I saving on heating?',
        'Check moisture & mold sensor levels',
        'Connect me directly with a ROCKWOOL executive'
      ]
    }
  ];

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialChatMessages(language));
  const [inputText, setInputText] = useState<string>('');
  const [isExecutiveMode, setIsExecutiveMode] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // When language switches, update initial messages if no custom messages sent
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return getInitialChatMessages(language);
      }
      return prev;
    });
  }, [language]);

  // Quick reply prompt handler
  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: estimate.clientName || 'Niels Møller',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulate AI / Executive Response
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('garanti') || lower.includes('warranty')) {
        botResponse = language === 'da'
          ? `Din 25-års garanti (#${warranty.certificateId}) er 100% aktiv. Den dækker fuld formstabilitet, brandmodstand (Euroclass A1) og uændret isoleringsevne. Garantien overdrages automatisk til fremtidige købere, hvis boligen sælges.`
          : `Your 25-year warranty (#${warranty.certificateId}) is 100% active. It covers structural stability, Euroclass A1 fire resistance, and perpetual thermal efficiency. It automatically transfers to future buyers if your property is sold.`;
      } else if (lower.includes('varmeregning') || lower.includes('spar') || lower.includes('bill') || lower.includes('saving')) {
        botResponse = language === 'da'
          ? `I november måned har din nye ROCKWOOL isolering sparet dig for ca. 1.820 DKK i opvarmning. På årsbasis estimeres den samlede besparelse til 8.400 - 11.200 DKK afhængig af vinterens hårdhed.`
          : `In November alone, your new ROCKWOOL insulation saved an estimated 1,820 DKK in heating. Annually, projected total savings are 8,400 - 11,200 DKK depending on winter weather.`;
      } else if (lower.includes('fugt') || lower.includes('skimmel') || lower.includes('sensor') || lower.includes('moisture') || lower.includes('mold')) {
        botResponse = language === 'da'
          ? `Dine hulmurssensorer måler p.t. en relativ luftfugtighed på ${monitoring.currentReading.relativeHumidityPercent}% og en træfugtighed på ${monitoring.currentReading.woodMoisturePercent}%. Dette er langt under de kritiske grænser (<18%), så der er 0.0% risiko for skimmel eller svamp.`
          : `Your embedded cavity sensors report ${monitoring.currentReading.relativeHumidityPercent}% relative humidity and ${monitoring.currentReading.woodMoisturePercent}% timber moisture. This is comfortably below critical levels (<18%), with 0.0% mold or rot risk.`;
      } else if (lower.includes('rådgiver') || lower.includes('executive') || lower.includes('kontakt') || lower.includes('connect')) {
        setIsExecutiveMode(true);
        botResponse = language === 'da'
          ? `Hej ${estimate.clientName}, jeg hedder Mette Lindegaard, Senior Kundedirektør & Byggerådgiver hos ROCKWOOL Danmark. Jeg har overtaget chatten. Har du spørgsmål til din isoleringsinstallation på ${estimate.address}, eller ønsker du et direkte opkald?`
          : `Hello ${estimate.clientName}, I am Mette Lindegaard, Senior Customer Experience Director & Building Advisor at ROCKWOOL Nordic. I have connected to your chat directly. How can I assist you with your installation at ${estimate.address}?`;
      } else {
        botResponse = language === 'da'
          ? `Tak for din besked. ROCKWOOL stenuld er fremstillet af naturlig vulkansk basaltsten, som aldrig mister sin isoleringsevne eller synker sammen. Har du brug for at tale med en af vores byggetekniske konsulenter, kan du klikke på knappen forneden.`
          : `Thank you for reaching out. ROCKWOOL stone wool is manufactured from volcanic basalt rock, ensuring it never loses thermal retention or sags over time. Would you like me to connect you directly with a technical executive?`;
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: isExecutiveMode || lower.includes('rådgiver') || lower.includes('executive') ? 'executive' : 'bot',
        senderName: isExecutiveMode || lower.includes('rådgiver') || lower.includes('executive') ? t.chatAdvisorName : t.chatAssistantName,
        avatar: isExecutiveMode || lower.includes('rådgiver') || lower.includes('executive')
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
          : undefined,
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Welcome Header for Homeowner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#1D2228] to-[#1D2228] text-white rounded-3xl p-6 sm:p-10 border border-emerald-900/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                {t.customerPortalBadge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t.customerWelcome}, {estimate.clientName}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {t.customerDescPrefix} <strong className="text-white">{estimate.address}</strong> {t.customerDescSuffix}
            </p>
          </div>

          {/* Quick Health Status Indicator Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center shrink-0 min-w-[200px]">
            <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-300 block">
              {t.customerHealthLabel}
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-3xl font-black font-mono text-emerald-400">
                {monitoring.overallHealthScore}%
              </span>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                {language === 'da' ? monitoring.statusDa : monitoring.status}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">
              {language === 'da' ? monitoring.lastUpdated : 'Live Telemetry (Updated 4 min ago)'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-gray-800 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'monitoring'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{t.tabHealthTelemetry}</span>
          </button>

          <button
            onClick={() => setActiveTab('warranty')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'warranty'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.tabWarrantyCert}</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'chat'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.tabAdvisorChatbot}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* TAB 1: CONTINUOUS HEALTH & SENSOR TELEMETRY */}
      {activeTab === 'monitoring' && (
        <div className="space-y-8">
          {/* 4 Sensor Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Relative Humidity */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold uppercase tracking-wider">{t.cavityHumidityLabel}</span>
                  <Droplets className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-[#1D2228]">
                    {monitoring.currentReading.relativeHumidityPercent}%
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {t.safeZoneBadge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                  {t.cavityHumidityDesc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-[10px] font-mono text-gray-500">
                <span>{t.sensorProbeText} {monitoring.sensorId}</span>
                <span className="text-emerald-600 font-bold">100% OK</span>
              </div>
            </div>

            {/* Timber Moisture */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold uppercase tracking-wider">{t.timberMoistureLabel}</span>
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-[#1D2228]">
                    {monitoring.currentReading.woodMoisturePercent}%
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {t.timberOptimalBadge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                  {t.timberMoistureDesc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-[10px] font-mono text-gray-500">
                <span>{t.br18LimitLabel}</span>
                <span className="text-emerald-600 font-bold">{t.dryTimberStatus}</span>
              </div>
            </div>

            {/* Realized U-Value */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span className="font-bold uppercase tracking-wider">{t.measuredUValueLabel}</span>
                  <Thermometer className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-[#1D2228]">
                    {monitoring.currentReading.calculatedUValue}
                  </span>
                  <span className="text-xs text-gray-500 font-mono">W/(m²·K)</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                  {t.measuredUValueDesc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-[10px] font-mono text-gray-500">
                <span>{t.indoorLabel} {monitoring.currentReading.indoorTemperatureC}°C</span>
                <span>{t.outdoorLabel} {monitoring.currentReading.outdoorTemperatureC}°C</span>
              </div>
            </div>

            {/* Monthly Heating Savings */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-200 bg-emerald-50/30 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-800 mb-2">
                  <span className="font-bold uppercase tracking-wider">{t.monthlySavingsLabel}</span>
                  <PiggyBank className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono text-emerald-700">
                    1.820 DKK
                  </span>
                  <span className="text-xs font-bold text-emerald-800">{t.inNovLabel}</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
                  {t.monthlySavingsDesc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 flex justify-between text-[10px] font-mono text-emerald-800 font-bold">
                <span>{t.accumulatedYtdLabel}</span>
                <span>~5.380 DKK</span>
              </div>
            </div>
          </div>

          {/* Detailed Health Telemetry Insights */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1D2228] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>{t.healthAnalysisHeader}</span>
                </h3>
                <p className="text-xs text-gray-500">
                  {t.healthAnalysisSub}
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {t.activeSensorPointsBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monitoring.keyInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-200 flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1D2228]">
                        {language === 'da' ? insight.metricDa : (
                          insight.metricDa === 'Hulmursfugtighed (RH)' ? 'Cavity Relative Humidity' :
                          insight.metricDa === 'Træfugtighed i spær' ? 'Rafter Timber Moisture' :
                          insight.metricDa === 'Isoleringsevne (U-værdi)' ? 'Thermal Retention (U-value)' :
                          'Form Stability & Settlement'
                        )}
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                        {insight.value}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                      {language === 'da' ? insight.noteDa : (
                        insight.metricDa === 'Hulmursfugtighed (RH)' ? 'Perfect dry cavity. Vapour-open stone wool ensures continuous dissipation of indoor moisture.' :
                        insight.metricDa === 'Træfugtighed i spær' ? 'Well below critical 18% threshold. Rafters and batts are completely immune to rot.' :
                        insight.metricDa === 'Isoleringsevne (U-værdi)' ? 'Exceeds strict BR18 building envelope requirements (threshold: ≤ 0.15 W/m²K).' :
                        'Randomly oriented stone wool fibers lock tight between studs with zero sagging over building lifetime.'
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Trend Timeline */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                {t.monthlySavingsHeader}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {monitoring.monthlyHistory.map((m) => (
                  <div key={m.month} className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                    <span className="text-[11px] font-mono font-bold text-gray-500 block">
                      {language === 'en' && m.month === 'Okt' ? 'Oct' : m.month}
                    </span>
                    <span className="text-sm font-mono font-black text-emerald-600 mt-1 block">
                      {m.heatingCostSavedDkk} DKK
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {m.avgHumidity}% RH
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 25-YEAR WARRANTY CERTIFICATE */}
      {activeTab === 'warranty' && (
        <div className="bg-white rounded-3xl p-6 sm:p-12 border-2 border-emerald-900/30 shadow-card max-w-4xl mx-auto space-y-8 relative overflow-hidden">
          {/* Certificate Border Design */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-emerald-700 via-[#D71920] to-emerald-700" />

          {/* Certificate Header */}
          <div className="text-center space-y-3 pb-6 border-b border-gray-200">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.certOfficialBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D2228] tracking-tight">
              {t.certHeading}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
              {t.certSubheading}
            </p>
          </div>

          {/* Certificate Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <div className="space-y-1">
              <span className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">{t.certNumberLabel}</span>
              <p className="font-mono font-bold text-sm text-[#1D2228]">{warranty.certificateId}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">{t.certValidityLabel}</span>
              <p className="font-mono font-bold text-sm text-emerald-700">
                {warranty.issueDate} — {warranty.expiryDate} (25 {language === 'da' ? 'år' : 'years'})
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">{t.certPropertyLabel}</span>
              <p className="font-bold text-[#1D2228]">{warranty.propertyAddress}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">{t.certOwnerLabel}</span>
              <p className="font-bold text-[#1D2228]">{warranty.ownerName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">{t.certSolutionLabel}</span>
              <p className="font-bold text-[#D71920]">{warranty.productName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">{t.certInstallerLabel}</span>
              <p className="font-bold text-[#1D2228]">{warranty.installerCompany} ({warranty.contractorCertificationId})</p>
            </div>
          </div>

          {/* 3 Pillars of the Guarantee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              {t.certCoverageHeading}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                <Flame className="w-4 h-4 text-[#D71920] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block">{t.certFireTitle}</strong>
                  <span className="text-gray-600 text-[11px]">{warranty.fireSafetyGuarantee}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block">{t.certSagTitle}</strong>
                  <span className="text-gray-600 text-[11px]">{warranty.dimensionalPermanenceGuarantee}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block">{t.certMoldTitle}</strong>
                  <span className="text-gray-600 text-[11px]">{warranty.moldResistGuarantee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transferability Feature for Home Resale Value */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
            <Home className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold">{t.certTransferableTitle}</strong>
              <p className="text-[11px] mt-0.5 leading-relaxed">
                {t.certTransferableDesc}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1D2228] hover:bg-black transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t.certDownloadPdfBtn}</span>
            </button>

            <span className="text-[11px] font-mono text-gray-500">
              {t.certCompanyAddress}
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: DIRECT EXECUTIVE & ADVISOR CHATBOT */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-card overflow-hidden max-w-4xl mx-auto flex flex-col h-[680px]">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 bg-[#1D2228] text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-sm overflow-hidden border border-emerald-500">
                  {isExecutiveMode ? 'ML' : 'RW'}
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 absolute bottom-0 right-0 border-2 border-[#1D2228]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold">
                    {isExecutiveMode ? t.chatAdvisorName : t.chatAssistantName}
                  </h3>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded border border-emerald-500/30">
                    {isExecutiveMode ? t.chatDirectAdvisorBadge : t.chatAiActiveBadge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">
                  {isExecutiveMode ? t.chatAdvisorSubtitle : t.chatAssistantSubtitle}
                </p>
              </div>
            </div>

            {/* Direct Executive Escalation Toggle */}
            <button
              onClick={() => {
                setIsExecutiveMode(!isExecutiveMode);
                handleSendMessage(language === 'da' ? 'Forbind mig direkte med en ROCKWOOL rådgiver' : 'Connect me directly with a ROCKWOOL executive');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isExecutiveMode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/20'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isExecutiveMode ? t.chatSpeakingWithAdvisorBtn : t.chatSpeakWithAdvisorBtn}</span>
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F8F9FA]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isExec = msg.sender === 'executive';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#1D2228] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {isExec ? 'ML' : 'RW'}
                    </div>
                  )}

                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 shadow-xs ${
                    isUser
                      ? 'bg-[#1D2228] text-white rounded-tr-none'
                      : isExec
                      ? 'bg-emerald-900 text-white rounded-tl-none border border-emerald-700'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between text-[10px] opacity-75 font-mono mb-1">
                      <span>{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p>{msg.text}</p>

                    {/* Quick Reply Pills */}
                    {msg.quickReplies && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((qr, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleQuickReply(qr)}
                            className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold transition-colors"
                          >
                            {qr}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-gray-500 italic pl-10">
                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                <span>{isExecutiveMode ? t.chatAdvisorTyping : t.chatAssistantThinking}</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isExecutiveMode ? t.chatPlaceholderAdvisor : t.chatPlaceholderAssistant}
                className="flex-1 text-xs px-4 py-3 rounded-xl border border-gray-300 focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
              />

              <button
                type="submit"
                className="px-5 py-3 rounded-xl font-bold bg-emerald-700 hover:bg-emerald-800 text-white text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">{t.chatSendBtn}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
