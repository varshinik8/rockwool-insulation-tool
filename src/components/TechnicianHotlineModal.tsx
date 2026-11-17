import React, { useState } from 'react';
import { Language, ProjectEstimate, SeniorTechnician } from '../types';
import { translations } from '../data/translations';
import { SENIOR_TECHNICIANS } from '../data/sampleData';
import { 
  X, 
  PhoneCall, 
  PhoneOff, 
  Camera, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Sparkles, 
  Send, 
  HelpCircle,
  ShieldCheck,
  Building
} from 'lucide-react';

interface TechnicianHotlineModalProps {
  language: Language;
  estimate: ProjectEstimate;
  onClose: () => void;
}

export const TechnicianHotlineModal: React.FC<TechnicianHotlineModalProps> = ({
  language,
  estimate,
  onClose,
}) => {
  const [selectedTech, setSelectedTech] = useState<SeniorTechnician>(SENIOR_TECHNICIANS[0]);
  const [activeCall, setActiveCall] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [queryTopic, setQueryTopic] = useState<string>('Hulmur & Murbindere');
  const [questionText, setQuestionText] = useState<string>(
    'Vi er på Brogaardsvej 44. Murbinderne i det nordvestlige hjørne sidder med 30 cm mellemrum, og der er let mørtelspild. Bør vi støvsuge hulrummet inden 200 mm Flexibatts monteres?'
  );
  const [isQuestionSent, setIsQuestionSent] = useState<boolean>(false);
  const [technicianAnswer, setTechnicianAnswer] = useState<string>('');

  // Call timer simulation
  React.useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeCall) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeCall]);

  const handleStartCall = (tech: SeniorTechnician) => {
    setSelectedTech(tech);
    setActiveCall(true);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setActiveCall(false);
    setCallDuration(0);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuestionSent(true);
    setTimeout(() => {
      setTechnicianAnswer(
        language === 'da'
          ? `Hej fra Henrik Thomsen (22 år hos ROCKWOOL): Godt du tjekkede! Ja, fjern altid løst mørtelspild i de nederste 40 cm for at undgå fugtbroer fra formuren. Flexibatts 37 optager murbindernes gennemføring uden problemer pga. den fleksible kant. Husk at forskubbe samlingerne (forbandt). Ring gerne hvis du vil have mig til at kigge forbi Gentofte i eftermiddag.`
          : `Hello from Henrik Thomsen (22 yrs at ROCKWOOL): Good catch! Always vacuum out loose mortar bridges in the lower 40 cm to prevent capillary moisture bridging. Flexibatts 37 will naturally absorb the wall ties thanks to the springy edge. Remember to stagger joints. Call my direct line if you need an on-site visit today.`
      );
    }, 1200);
  };

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-popover border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#1D2228] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#D71920] flex items-center justify-center text-white">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {language === 'da' ? 'Byggeplads-Hotline: Tal med Erfaren ROCKWOOL Tekniker' : 'On-Site Technician Hotline (Direct Support)'}
              </h3>
              <p className="text-[11px] text-gray-400">
                {language === 'da' ? 'Direkte sparring på byggepladsen under montage' : 'Immediate senior master technician assistance during installation'}
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

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Active Call Simulation Banner */}
          {activeCall && (
            <div className="bg-emerald-900 text-white rounded-2xl p-5 border border-emerald-700 shadow-md flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400">
                  <img src={selectedTech.avatar} alt={selectedTech.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-bold text-emerald-300">AKTIVT DIREKTE OPKALD</span>
                  </div>
                  <h4 className="text-base font-bold">{selectedTech.name}</h4>
                  <p className="text-xs text-emerald-200">
                    {language === 'da' ? selectedTech.roleDa : selectedTech.role} ({selectedTech.yearsAtRockwool} {language === 'da' ? 'års erfaring' : 'yrs experience'})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xl font-mono font-black text-white bg-black/30 px-3 py-1.5 rounded-xl">
                  {formatCallTime(callDuration)}
                </span>
                <button
                  onClick={handleEndCall}
                  className="px-4 py-2 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white text-xs flex items-center gap-1.5 transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>{language === 'da' ? 'Afslut Opkald' : 'End Call'}</span>
                </button>
              </div>
            </div>
          )}

          {/* List of 3 Experienced ROCKWOOL Technicians */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              {language === 'da' ? 'Vælg Rådgivende Tekniker' : 'Available Senior Technicians On Call'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SENIOR_TECHNICIANS.map((tech) => (
                <div
                  key={tech.id}
                  className={`bg-[#F8F9FA] rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                    selectedTech.id === tech.id
                      ? 'border-[#D71920] bg-red-50/20 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {language === 'da' ? tech.statusDa : tech.status}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {tech.yearsAtRockwool} {language === 'da' ? 'år hos RW' : 'yrs at RW'}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-full overflow-hidden mb-3 border border-gray-200">
                      <img src={tech.avatar} alt={tech.name} className="w-full h-full object-cover" />
                    </div>

                    <h5 className="text-xs font-bold text-[#1D2228]">
                      {tech.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 mb-2">
                      {language === 'da' ? tech.roleDa : tech.role}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {tech.specialtiesDa.map((sp, sIdx) => (
                        <span key={sIdx} className="text-[9px] bg-white text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartCall(tech)}
                    disabled={activeCall}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-[#1D2228] hover:bg-black text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'da' ? 'Ring direkte op' : 'Call Directly'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* On-Site Photo & Technical Query Form */}
          <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#D71920]" />
                <span>{language === 'da' ? 'Send Spørgsmål eller Billede fra Byggepladsen' : 'Submit Site Photo & Query'}</span>
              </h4>
              <span className="text-[10px] font-mono text-gray-500">
                Svar inden for 5-10 min.
              </span>
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {language === 'da' ? 'Emne / Problemstilling' : 'Topic / Site Issue'}
                </label>
                <select
                  value={queryTopic}
                  onChange={(e) => setQueryTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                >
                  <option value="Hulmur & Murbindere">Hulmur & Murbindere (Cavity & Ties)</option>
                  <option value="Dampspærre samling">Dampspærre samling (Vapor barrier taping)</option>
                  <option value="Ujævne spær">Ujævne spærafstande (Irregular rafter spacing)</option>
                  <option value="Smygisolering ved vinduer">Smygisolering ved vinduer (Reveal insulation)</option>
                  <option value="Brandlukning ved gennembrydning">Brandlukning ved gennembrydning (Fire stop)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {language === 'da' ? 'Beskriv tvivlsspørgsmålet' : 'Describe your question'}
                </label>
                <textarea
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => alert(language === 'da' ? 'Kamera aktiveret! Billede fra pladsen tilknyttet forespørgsel.' : 'Camera activated! Site photo attached.')}
                  className="text-xs font-semibold text-gray-700 hover:text-black flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 bg-white"
                >
                  <Camera className="w-4 h-4 text-[#D71920]" />
                  <span>{language === 'da' ? 'Tag / Vedhæft Foto fra Pladsen' : 'Attach Photo from Site'}</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-[#D71920] hover:bg-[#B8141A] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'da' ? 'Send til Vagttekniker' : 'Submit Query'}</span>
                </button>
              </div>
            </form>

            {/* Answer Display */}
            {technicianAnswer && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Svar fra Henrik Thomsen:</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700">Lige nu</span>
                </div>
                <p className="leading-relaxed">{technicianAnswer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
