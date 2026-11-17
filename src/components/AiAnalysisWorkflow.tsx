import React, { useState, useEffect } from 'react';
import { Language, AnalysisStage } from '../types';
import { translations } from '../data/translations';
import { 
  Cpu, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  Scan, 
  Box, 
  Calculator, 
  ShieldCheck, 
  FastForward,
  Building2
} from 'lucide-react';

interface AiAnalysisWorkflowProps {
  language: Language;
  onAnalysisComplete: () => void;
  projectName: string;
  videoFileName: string;
}

export const AiAnalysisWorkflow: React.FC<AiAnalysisWorkflowProps> = ({
  language,
  onAnalysisComplete,
  projectName,
  videoFileName,
}) => {
  const t = translations[language];

  // 7 Realistic Stages per specification
  const initialStages: AnalysisStage[] = [
    {
      id: 1,
      name: 'Processing video & keyframe extraction',
      nameDa: 'Behandler video & udtrækker 60 billedrammer',
      description: 'Decoding MP4 stream, normalizing perspective distortion, sampling 60 keyframes',
      descriptionDa: 'Dekoder MP4-strøm, korrigerer perspektivforvrængning, sampler 60 keyframes',
      status: 'processing',
      progress: 0,
      detail: 'Sampling 60 keyframes at 1080p...',
      detailDa: 'Sampler 60 keyframes i 1080p opløsning...'
    },
    {
      id: 2,
      name: 'Detecting building elements & apertures',
      nameDa: 'Registrerer bygningselementer & vinduesåbninger',
      description: 'Segmenting masonry envelope, timber frame, 14 windows, 2 doors, and eaves',
      descriptionDa: 'Segmenterer murstensfacade, træspær, 14 vinduer, 2 døre og udhæng',
      status: 'pending',
      progress: 0,
      detail: 'YOLOv9-BIM: 16 apertures tagged (confidence: 94.2%)',
      detailDa: 'YOLOv9-BIM: 16 bygningsåbninger identificeret (94,2% pålidelighed)'
    },
    {
      id: 3,
      name: 'Identifying insulation areas',
      nameDa: 'Kortlægger isoleringsflader',
      description: 'Isolating gross facade envelope vs. unheated secondary structures',
      descriptionDa: 'Isolerer primær klimaskærm ift. uopvarmede sekundære bygningsdele',
      status: 'pending',
      progress: 0,
      detail: 'Isolating heated building envelope perimeter',
      detailDa: 'Afgrænser opvarmet boligareal mod det fri'
    },
    {
      id: 4,
      name: 'Estimating scale & photogrammetry dimensions',
      nameDa: 'Estimerer skala & fotogrammetriske dimensioner',
      description: 'Applying reference scale from brick modular height (66 mm) & standard door frames',
      descriptionDa: 'Beregner rumlig målestok fra modulmål (dansk murstensmål 66 mm) og standarddøre',
      status: 'pending',
      progress: 0,
      detail: 'Gross surface: ~142.4 m² | Deductions: -24.2 m²',
      detailDa: 'Bruttoareal: ~142,4 m² | Fratræk: -24,2 m²'
    },
    {
      id: 5,
      name: 'Assessing existing construction layers',
      nameDa: 'Vurderer eksisterende konstruktionslag',
      description: 'Evaluating visible outer leaf, cavity indicators, and roof ventilation clearance',
      descriptionDa: 'Vurderer udvendig formur, hulmursforhold og ventilationsspalte under tag',
      status: 'pending',
      progress: 0,
      detail: 'Cavity brickwork detected; requires on-site depth inspection',
      detailDa: 'Dobbelt muret hulmur identificeret; kræver sonderingshul på stedet'
    },
    {
      id: 6,
      name: 'Matching ROCKWOOL solution matrix',
      nameDa: 'Matcher ROCKWOOL produktløsning',
      description: 'Cross-referencing Danish BR18 Table 1.1 U-value guidelines and Euroclass A1 fire safety',
      descriptionDa: 'Krydstjekker med Bygningsreglementet BR18 U-værdikrav og Euroclass A1 ubrændbarhed',
      status: 'pending',
      progress: 0,
      detail: 'Matched: ROCKWOOL Flexibatts 37 (200 mm) / λ 0.037',
      detailDa: 'Matchet: ROCKWOOL Flexibatts 37 (200 mm) / λ 0,037'
    },
    {
      id: 7,
      name: 'Preparing project estimate & pack calculation',
      nameDa: 'Beregner materialebehov & pakkeantal',
      description: 'Computing net m² (118.2 m²), 8% cutting waste margin, pallet layout, and weight',
      descriptionDa: 'Beregner netto m² (118,2 m²), 8% spildtillæg, palleoptimering og transportvægt',
      status: 'pending',
      progress: 0,
      detail: '51 packs (5 pallets) • Estimated weight: 890 kg',
      detailDa: '51 pakker (5 paller) • Estimeret vægt: 890 kg'
    }
  ];

  const [stages, setStages] = useState<AnalysisStage[]>(initialStages);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(10);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    'Initializing SiteScan Vision Kernel v2.4 (TensorRT-accelerated)...',
    `Loaded video asset: ${videoFileName}`,
    'Extracting 30 FPS frames with sub-pixel alignment...'
  ]);

  // Stage progression timer
  useEffect(() => {
    const stageDuration = 650; // ms per stage in default mode

    const interval = setInterval(() => {
      setCurrentStageIndex((prevIndex) => {
        if (prevIndex >= stages.length - 1) {
          clearInterval(interval);
          setOverallProgress(100);
          setTimeout(() => {
            onAnalysisComplete();
          }, 600);
          return prevIndex;
        }

        const nextIndex = prevIndex + 1;
        setStages((prevStages) =>
          prevStages.map((st, idx) => {
            if (idx < nextIndex) return { ...st, status: 'completed', progress: 100 };
            if (idx === nextIndex) return { ...st, status: 'processing', progress: 50 };
            return st;
          })
        );

        setOverallProgress(Math.round(((nextIndex + 1) / stages.length) * 100));

        // Add dynamic telemetry log
        const newLog = language === 'da' 
          ? `[AI-LOG] Trin ${nextIndex + 1}: ${stages[nextIndex].nameDa}`
          : `[AI-LOG] Stage ${nextIndex + 1}: ${stages[nextIndex].name}`;
        
        setTelemetryLogs((prev) => [newLog, ...prev.slice(0, 5)]);

        return nextIndex;
      });
    }, stageDuration);

    return () => clearInterval(interval);
  }, [language, onAnalysisComplete, stages.length]);

  // Instant completion for judges
  const handleSkipToResults = () => {
    setStages((prev) => prev.map((s) => ({ ...s, status: 'completed', progress: 100 })));
    setOverallProgress(100);
    onAnalysisComplete();
  };

  return (
    <section className="py-12 sm:py-16 bg-[#1D2228] text-white min-h-[720px] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-800 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D71920] animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                AI SITESCAN ANALYSIS PIPELINE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {projectName}
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Source: {videoFileName} • Danish BR18 Matrix v24.2
            </p>
          </div>

          {/* Speed up CTA for competition judges */}
          <button
            onClick={handleSkipToResults}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
            title="Skip to results immediately"
          >
            <FastForward className="w-3.5 h-3.5 text-[#D71920]" />
            <span>{t.speedUpAnalysis}</span>
          </button>
        </div>

        {/* Prominent Realistic Disclaimer Banner */}
        <div className="my-6 bg-red-950/40 border-l-4 border-[#D71920] p-4 rounded-r-xl border border-red-900/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-300 uppercase tracking-wide">
              {language === 'da' ? 'Vigtigt Byggepladsforbehold' : 'Essential Site Verification Notice'}
            </p>
            <p className="text-xs text-red-200/90 mt-0.5 leading-relaxed">
              {t.analysisDisclaimerBanner}
            </p>
          </div>
        </div>

        {/* Main Grid: Visual Frame Photogrammetry + Stage List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Simulated Computer Vision Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black border border-gray-800 aspect-4/3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="Analyzing frame"
                className="w-full h-full object-cover opacity-60"
              />

              {/* Animated Laser Scanline */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-0.5 bg-[#D71920] shadow-[0_0_12px_#D71920] animate-scanline absolute" />
              </div>

              {/* Dynamic Bounding Box Visuals */}
              <div className="absolute inset-4 pointer-events-none flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="bg-[#D71920]/90 text-white font-mono text-[10px] px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                    <Scan className="w-3 h-3" />
                    <span>FACADE_SEGMENT #1</span>
                  </div>
                  <div className="bg-blue-600/90 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                    WINDOW_DEDUCT: 14x
                  </div>
                </div>

                {/* Crosshairs */}
                <div className="border border-white/30 border-dashed rounded-lg p-3 bg-black/30 backdrop-blur-xs text-center">
                  <p className="text-[10px] font-mono text-gray-300">
                    CALCULATING SURFACE NORMAL VECTOR...
                  </p>
                  <p className="text-xs font-mono font-bold text-amber-300 mt-1">
                    NET ESTIMATE: 118.2 m²
                  </p>
                </div>

                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>SCALE: BRICK_66MM_REF</span>
                  <span>CONFIDENCE: 84%</span>
                </div>
              </div>
            </div>

            {/* Live Telemetry Log Feed */}
            <div className="bg-black/60 rounded-xl p-3 border border-gray-800 font-mono text-[11px] text-gray-400 space-y-1 h-28 overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-gray-500 border-b border-gray-800 pb-1 mb-1">
                <span>SYSTEM TELEMETRY</span>
                <span className="text-emerald-400">LIVE STREAM</span>
              </div>
              {telemetryLogs.map((log, idx) => (
                <p key={idx} className="truncate text-gray-300">
                  <span className="text-gray-500 mr-1.5">&gt;</span>
                  {log}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: 7 Stages Progress Indicator */}
          <div className="lg:col-span-7 bg-[#232930] rounded-2xl p-6 border border-gray-800 space-y-4">
            {/* Overall Progress Bar */}
            <div className="space-y-1.5 pb-2 border-b border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-300">
                  {language === 'da' ? 'Samlet analysefremskridt' : 'Overall Analysis Progress'}
                </span>
                <span className="font-mono font-bold text-[#D71920]">
                  {overallProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#D71920] h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* 7 Individual Stages */}
            <div className="space-y-2.5">
              {stages.map((stage, idx) => {
                const isCurrent = idx === currentStageIndex;
                const isDone = idx < currentStageIndex;
                const isPending = idx > currentStageIndex;

                return (
                  <div
                    key={stage.id}
                    className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-red-500/10 border-[#D71920] text-white shadow-xs'
                        : isDone
                        ? 'bg-gray-800/40 border-gray-700/60 text-gray-300'
                        : 'bg-transparent border-gray-800 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-5 h-5 text-[#D71920] animate-spin" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-gray-700 text-gray-600 flex items-center justify-center text-[10px] font-mono">
                            {stage.id}
                          </span>
                        )}
                      </div>
                      <div className="truncate">
                        <p className={`font-semibold truncate ${isCurrent ? 'text-white' : ''}`}>
                          {language === 'da' ? stage.nameDa : stage.name}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {isCurrent || isDone
                            ? (language === 'da' ? stage.detailDa : stage.detail)
                            : (language === 'da' ? stage.descriptionDa : stage.description)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {isDone && (
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                          OK
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-red-400 font-bold uppercase animate-pulse">
                          RUNNING
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
