import React, { useState, useRef } from 'react';
import { Language, ProjectType } from '../types';
import { translations } from '../data/translations';
import { 
  UploadCloud, 
  Film, 
  CheckCircle2, 
  Trash2, 
  Play, 
  Pause, 
  Sparkles, 
  FileVideo, 
  Info, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface VideoUploadSectionProps {
  language: Language;
  onStartAnalysis: (params: {
    projectName: string;
    projectType: ProjectType;
    location: string;
    approxArea: string;
    renovationZone: string;
    videoFileName: string;
    videoDurationSec: number;
    videoUrl: string;
  }) => void;
  onLoadPreset: (presetKey: 'gentofte' | 'loft' | 'aarhus') => void;
}

export const VideoUploadSection: React.FC<VideoUploadSectionProps> = ({
  language,
  onStartAnalysis,
  onLoadPreset,
}) => {
  const t = translations[language];

  // Upload state
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    duration: number;
    url: string;
  } | null>({
    name: 'gentofte_facade_walkthrough.mp4',
    size: '18.4 MB',
    duration: 28,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Form Fields
  const [projectName, setProjectName] = useState<string>('Klassisk Murermestervilla — Gentofte');
  const [projectType, setProjectType] = useState<ProjectType>('residential_reno');
  const [location, setLocation] = useState<string>('2820 Gentofte');
  const [approxArea, setApproxArea] = useState<string>('140 m²');
  const [renovationZone, setRenovationZone] = useState<string>('external_facade');

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Generate object URL
    const url = URL.createObjectURL(file);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    
    // Simulate upload progress
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 30;
      });
    }, 150);

    setSelectedFile({
      name: file.name,
      size: sizeMb,
      duration: 32, // placeholder
      url: url
    });

    if (projectName === '') {
      setProjectName(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    }
  };

  const handleRemoveVideo = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    onStartAnalysis({
      projectName: projectName || 'Renoveringsprojekt',
      projectType,
      location: location || 'Danmark',
      approxArea,
      renovationZone,
      videoFileName: selectedFile.name,
      videoDurationSec: selectedFile.duration,
      videoUrl: selectedFile.url
    });
  };

  const loadPresetGentofte = () => {
    setSelectedFile({
      name: 'gentofte_facade_walkthrough.mp4',
      size: '18.4 MB',
      duration: 28,
      url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    });
    setProjectName('Klassisk Murermestervilla — Gentofte');
    setProjectType('residential_reno');
    setLocation('2820 Gentofte');
    setApproxArea('142 m²');
    setRenovationZone('external_facade');
  };

  const loadPresetLoft = () => {
    setSelectedFile({
      name: 'norrebro_loft_survey.mp4',
      size: '22.1 MB',
      duration: 35,
      url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80'
    });
    setProjectName('Tagetage & Skråvægge — Nørrebro');
    setProjectType('loft_roof');
    setLocation('2200 København N');
    setApproxArea('95 m²');
    setRenovationZone('loft_roof');
  };

  return (
    <section id="upload-section" className="py-12 sm:py-18 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-[#D71920] border border-red-200 mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>{language === 'da' ? 'TRIN 1: VIDEO UPLOAD' : 'STEP 1: VIDEO UPLOAD'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D2228] tracking-tight">
            {t.uploadTitle}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t.uploadSubtitle}
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Sparkles className="w-4 h-4 text-[#D71920]" />
            <span>{language === 'da' ? 'Hurtig Demo uden video-upload:' : 'Quick Demo without custom upload:'}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadPresetGentofte}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-[#D71920] hover:text-[#D71920] font-semibold transition-colors flex items-center gap-1.5 text-gray-800 shadow-xs"
            >
              <span>🏡</span>
              <span>{t.loadDemoGentofte}</span>
            </button>
            <button
              type="button"
              onClick={loadPresetLoft}
              className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:border-[#D71920] hover:text-[#D71920] font-semibold transition-colors flex items-center gap-1.5 text-gray-800 shadow-xs"
            >
              <span>📐</span>
              <span>{t.loadDemoLoft}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Drag & Drop Area and Video Preview */}
          <div className="lg:col-span-7 space-y-5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
            />

            {!selectedFile ? (
              /* Empty Dropzone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[340px] ${
                  isDragging
                    ? 'border-[#D71920] bg-red-50/50 scale-[1.01]'
                    : 'border-gray-300 bg-[#FAFAFA] hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-card flex items-center justify-center text-[#D71920] mb-4 border border-gray-100">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-[#1D2228] mb-1">
                  {t.dropzonePrompt}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {t.dropzoneOr}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-mono text-gray-500 bg-gray-100">
                  <FileVideo className="w-3.5 h-3.5 text-gray-400" />
                  <span>{t.supportedFormats}</span>
                </div>
              </div>
            ) : (
              /* Selected Video Preview Card */
              <div className="bg-[#1D2228] rounded-2xl overflow-hidden border border-gray-800 shadow-card text-white">
                {/* Video Player or Simulated Video Canvas */}
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {/* Background Video/Image preview */}
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                    alt="Uploaded project video"
                    className="w-full h-full object-cover opacity-85"
                  />

                  {/* Playhead overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full bg-white/90 hover:bg-white text-[#1D2228] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 ml-1 fill-current" />
                      )}
                    </button>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 right-3 bg-black/80 font-mono text-[11px] text-white px-2 py-0.5 rounded">
                    00:{selectedFile.duration < 10 ? `0${selectedFile.duration}` : selectedFile.duration}
                  </div>

                  {/* Video format tag */}
                  <div className="absolute top-3 left-3 bg-red-600 font-mono text-[10px] font-bold uppercase text-white px-2 py-0.5 rounded">
                    MP4 1080p 60fps
                  </div>
                </div>

                {/* Video Metadata Bar */}
                <div className="p-4 bg-[#232930] flex items-center justify-between">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 text-[#D71920]">
                      <Film className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-white truncate font-mono">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {selectedFile.size} • {selectedFile.duration}s • {language === 'da' ? 'Klar til analyse' : 'Ready for AI'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
                    >
                      {language === 'da' ? 'Erstat video' : 'Replace video'}
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                      title={t.removeVideo}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Upload Progress Bar (if simulated) */}
                {uploadProgress < 100 && (
                  <div className="w-full bg-gray-800 h-1.5">
                    <div 
                      className="bg-[#D71920] h-1.5 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Pre-Analysis Checklist (Mandatory per specification) */}
            <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-[#D71920]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  {t.checklistHeader}
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.chkWall}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.chkExisting}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.chkWindows}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.chkRoof}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.chkScale}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.chkDamage}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Metadata Fields & Action */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#1D2228] border-b border-gray-100 pb-3">
              {language === 'da' ? 'Projektoplysninger' : 'Project Information'}
            </h3>

            {/* Project Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t.projectNameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder={t.projectNamePlaceholder}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] bg-white"
                required
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t.projectTypeLabel}
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as ProjectType)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] bg-white"
              >
                <option value="residential_reno">
                  {language === 'da' ? 'Boligrenovering (Murer- / Tømrermester)' : 'Residential Renovation (Single/Multi-family)'}
                </option>
                <option value="commercial_reno">
                  {language === 'da' ? 'Erhvervsrenovering' : 'Commercial Renovation'}
                </option>
                <option value="loft_roof">
                  {language === 'da' ? 'Tag- og Loftisolering' : 'Roof & Loft Insulation'}
                </option>
                <option value="new_construction">
                  {language === 'da' ? 'Nybyggeri' : 'New Construction'}
                </option>
                <option value="other">
                  {language === 'da' ? 'Andet' : 'Other'}
                </option>
              </select>
            </div>

            {/* Target Renovation Area */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {t.renovationZoneLabel}
              </label>
              <select
                value={renovationZone}
                onChange={(e) => setRenovationZone(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] bg-white"
              >
                <option value="external_facade">{t.zoneExternal}</option>
                <option value="loft_roof">{t.zoneLoft}</option>
                <option value="ground_floor">{t.zoneFloor}</option>
                <option value="acoustic_partition">{t.zonePartition}</option>
              </select>
            </div>

            {/* Location & Approx Area Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t.locationLabel}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {t.approxAreaLabel}
                </label>
                <input
                  type="text"
                  value={approxArea}
                  onChange={(e) => setApproxArea(e.target.value)}
                  placeholder={t.approxAreaPlaceholder}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] bg-white"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!selectedFile}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-base transition-all ${
                  selectedFile
                    ? 'bg-[#D71920] hover:bg-[#B8141A] shadow-md shadow-red-600/20 hover:scale-[1.01]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>{t.analyseButton}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Honest disclaimer notice */}
            <div className="flex items-start gap-2 pt-1 text-[11px] text-gray-500">
              <AlertCircle className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span>
                {language === 'da'
                  ? 'AI-modellen udleder foreløbige mål fra video. Ingen skjulte lag eller dybder gættes uden fysisk inspektion.'
                  : 'AI model extracts preliminary scale from visible surfaces. Hidden structural layers require manual on-site verification.'}
              </span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
