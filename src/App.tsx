import React, { useState } from 'react';
import { 
  Language, 
  ProjectEstimate, 
  RockwoolProduct, 
  ProjectType, 
  ChecklistItem,
  UserRole,
  DistributorBranch
} from './types';
import { translations } from './data/translations';
import { 
  ROCKWOOL_PRODUCTS, 
  SAMPLE_PROJECTS_LIST, 
  DEMO_PROJECT_GENTOFTE, 
  DEMO_PROJECT_LOFT, 
  DEMO_PROJECT_AARHUS, 
  DEFAULT_CHECKLIST 
} from './data/sampleData';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { VideoUploadSection } from './components/VideoUploadSection';
import { AiAnalysisWorkflow } from './components/AiAnalysisWorkflow';
import { ResultsDashboard } from './components/ResultsDashboard';
import { MaterialRecommendation } from './components/MaterialRecommendation';
import { InstallerFeatures } from './components/InstallerFeatures';
import { NearestStoreLogistics } from './components/NearestStoreLogistics';
import { TechnicianHotlineModal } from './components/TechnicianHotlineModal';
import { CustomerPortal } from './components/CustomerPortal';
import { ProjectReportModal } from './components/ProjectReportModal';
import { DistributorModal } from './components/DistributorModal';
import { CustomerHandoffModal } from './components/CustomerHandoffModal';
import { ProjectHistoryModal } from './components/ProjectHistoryModal';
import { TechnicalSupportModal } from './components/TechnicalSupportModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Role & View State
  const [language, setLanguage] = useState<Language>('da'); // Danish default
  const [activeRole, setActiveRole] = useState<UserRole>('installer');
  const [appState, setAppState] = useState<'landing' | 'analyzing' | 'results'>('results');
  
  // Active Project Data
  const [projects, setProjects] = useState<ProjectEstimate[]>(SAMPLE_PROJECTS_LIST);
  const [currentProject, setCurrentProject] = useState<ProjectEstimate>(DEMO_PROJECT_GENTOFTE);
  
  // Customization controls
  const [selectedProduct, setSelectedProduct] = useState<RockwoolProduct>(DEMO_PROJECT_GENTOFTE.recommendedProduct);
  const [selectedThicknessMm, setSelectedThicknessMm] = useState<number>(DEMO_PROJECT_GENTOFTE.selectedThicknessMm);
  const [wasteMarginPercent, setWasteMarginPercent] = useState<number>(DEMO_PROJECT_GENTOFTE.wasteMarginPercent);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEMO_PROJECT_GENTOFTE.checklist);
  const [installerNotes, setInstallerNotes] = useState<string[]>(DEMO_PROJECT_GENTOFTE.installerNotes);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isDistributorModalOpen, setIsDistributorModalOpen] = useState<boolean>(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState<boolean>(false);

  // Handlers
  const handleScrollToUpload = () => {
    setActiveRole('installer');
    setAppState('landing');
    setTimeout(() => {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartDemo = () => {
    setActiveRole('installer');
    setCurrentProject(DEMO_PROJECT_GENTOFTE);
    setSelectedProduct(DEMO_PROJECT_GENTOFTE.recommendedProduct);
    setSelectedThicknessMm(DEMO_PROJECT_GENTOFTE.selectedThicknessMm);
    setWasteMarginPercent(DEMO_PROJECT_GENTOFTE.wasteMarginPercent);
    setChecklist(DEMO_PROJECT_GENTOFTE.checklist);
    setInstallerNotes(DEMO_PROJECT_GENTOFTE.installerNotes);
    setAppState('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = (params: {
    projectName: string;
    projectType: ProjectType;
    location: string;
    approxArea: string;
    renovationZone: string;
    videoFileName: string;
    videoDurationSec: number;
    videoUrl: string;
  }) => {
    let matchedProduct = ROCKWOOL_PRODUCTS[0];
    let matchedThickness = 200;
    if (params.renovationZone === 'loft_roof' || params.projectType === 'loft_roof') {
      matchedProduct = ROCKWOOL_PRODUCTS[2];
      matchedThickness = 250;
    } else if (params.renovationZone === 'external_facade' && params.projectType === 'commercial_reno') {
      matchedProduct = ROCKWOOL_PRODUCTS[1];
      matchedThickness = 150;
    }

    const newProject: ProjectEstimate = {
      ...DEMO_PROJECT_GENTOFTE,
      id: `prj-dk-${Math.floor(1000 + Math.random() * 9000)}`,
      projectName: params.projectName,
      address: params.location || 'Byggeplads, Danmark',
      projectType: params.projectType,
      videoFileName: params.videoFileName,
      videoDurationSec: params.videoDurationSec,
      recommendedProduct: matchedProduct,
      selectedThicknessMm: matchedThickness,
      status: 'Analysed',
      createdDate: new Date().toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setCurrentProject(newProject);
    setSelectedProduct(matchedProduct);
    setSelectedThicknessMm(matchedThickness);
    setProjects((prev) => [newProject, ...prev]);
    setAppState('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalysisCompleted = () => {
    setAppState('results');
    setTimeout(() => {
      document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleNewEstimate = () => {
    setActiveRole('installer');
    setAppState('landing');
    setTimeout(() => {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectHistoryProject = (proj: ProjectEstimate) => {
    setCurrentProject(proj);
    setSelectedProduct(proj.recommendedProduct);
    setSelectedThicknessMm(proj.selectedThicknessMm);
    setWasteMarginPercent(proj.wasteMarginPercent);
    setChecklist(proj.checklist);
    setInstallerNotes(proj.installerNotes);
    setAppState('results');
    setTimeout(() => {
      document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const handleAddNote = (newNote: string) => {
    setInstallerNotes((prev) => [newNote, ...prev]);
  };

  const handleRemoveNote = (index: number) => {
    setInstallerNotes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const scrollToNearestStore = () => {
    setActiveRole('installer');
    setAppState('results');
    setTimeout(() => {
      document.getElementById('nearest-store-logistics')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1D2228] selection:bg-red-100 selection:text-red-950">
      {/* Navigation Bar with Role Switcher */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenSupport={() => setIsSupportModalOpen(true)}
        onOpenHotline={() => setIsHotlineModalOpen(true)}
        onOpenNearestStore={scrollToNearestStore}
        onStartDemo={handleStartDemo}
        onNewEstimate={handleNewEstimate}
        currentProject={currentProject}
        historyCount={projects.length}
      />

      {/* Main App Content Flow */}
      <main className="flex-1">
        {/* INTERFACE 1: CUSTOMER SIDE (Boligejer Portal) */}
        {activeRole === 'customer' ? (
          <CustomerPortal
            language={language}
            estimate={currentProject}
            onBackToEstimator={() => setActiveRole('installer')}
          />
        ) : (
          /* INTERFACE 2: INSTALLER SIDE (Håndværker Portal) */
          <>
            {/* State 1: Analysis Pipeline Screen */}
            {appState === 'analyzing' && (
              <AiAnalysisWorkflow
                language={language}
                onAnalysisComplete={handleAnalysisCompleted}
                projectName={currentProject.projectName}
                videoFileName={currentProject.videoFileName}
              />
            )}

            {/* State 2: Hero Section & Landing Flow */}
            {appState === 'landing' && (
              <>
                <HeroSection
                  language={language}
                  onUploadClick={handleScrollToUpload}
                  onSeeHowItWorksClick={handleScrollToHowItWorks}
                  onStartDemo={handleStartDemo}
                />

                <HowItWorksSection
                  language={language}
                  onStartDemo={handleStartDemo}
                />

                <VideoUploadSection
                  language={language}
                  onStartAnalysis={handleStartAnalysis}
                  onLoadPreset={(key) => {
                    if (key === 'gentofte') handleSelectHistoryProject(DEMO_PROJECT_GENTOFTE);
                    if (key === 'loft') handleSelectHistoryProject(DEMO_PROJECT_LOFT);
                    if (key === 'aarhus') handleSelectHistoryProject(DEMO_PROJECT_AARHUS);
                  }}
                />
              </>
            )}

            {/* State 3: Results Dashboard & Full Contractor Workflow Suite */}
            {appState === 'results' && (
              <>
                {/* Active project banner with fast actions */}
                <div className="bg-[#1D2228] text-white py-4 px-4 sm:px-8 border-b border-gray-800">
                  <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-mono text-gray-300">
                        {language === 'da' ? 'Aktiv Byggeplads:' : 'Active Site:'}{' '}
                        <strong className="text-white">{currentProject.projectName}</strong>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setIsHotlineModalOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>📞</span>
                        <span>{language === 'da' ? 'Spørg Vagttekniker' : 'Technician Hotline'}</span>
                      </button>

                      <button
                        onClick={scrollToNearestStore}
                        className="bg-white/10 hover:bg-white/20 text-emerald-300 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 border border-emerald-500/30"
                      >
                        <span>📍</span>
                        <span>{language === 'da' ? 'Nærmeste Tømmerhandel' : 'Nearest Store'}</span>
                      </button>

                      <button
                        onClick={() => setActiveRole('customer')}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <span>🏡</span>
                        <span>{language === 'da' ? 'Vis Boligejerportal' : 'Customer View'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
                  {/* Results Dashboard & Computer Vision Inspector */}
                  <ResultsDashboard
                    language={language}
                    estimate={currentProject}
                    onOpenReport={() => setIsReportModalOpen(true)}
                    onOpenDistributor={scrollToNearestStore}
                    onOpenCustomer={() => setActiveRole('customer')}
                    onOpenSupport={() => setIsSupportModalOpen(true)}
                  />

                  {/* Material Recommendation */}
                  <MaterialRecommendation
                    language={language}
                    estimate={currentProject}
                    selectedProduct={selectedProduct}
                    selectedThicknessMm={selectedThicknessMm}
                    onSelectProduct={setSelectedProduct}
                    onSelectThickness={setSelectedThicknessMm}
                  />

                  {/* Installer Execution Features (Calculator, Checklist, Docs, Notes) */}
                  <InstallerFeatures
                    language={language}
                    estimate={currentProject}
                    selectedProduct={selectedProduct}
                    selectedThicknessMm={selectedThicknessMm}
                    wasteMarginPercent={wasteMarginPercent}
                    onUpdateWasteMargin={setWasteMarginPercent}
                    onToggleChecklist={handleToggleChecklist}
                    onAddNote={handleAddNote}
                    onRemoveNote={handleRemoveNote}
                    checklist={checklist}
                    notes={installerNotes}
                  />

                  {/* Nearest Store Locator & Logistics Cost Optimizer */}
                  <NearestStoreLogistics
                    language={language}
                    estimate={currentProject}
                    product={selectedProduct}
                    selectedThicknessMm={selectedThicknessMm}
                    wasteMarginPercent={wasteMarginPercent}
                  />

                  {/* Strategic Conversion & Handoff Action Bar */}
                  <div className="bg-gradient-to-r from-[#1D2228] to-[#2B323B] rounded-2xl p-6 sm:p-8 text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 font-mono">
                        {language === 'da' ? 'HÅNDVÆRKER & BYGHERRE OVERLEVERING' : 'CONTRACTOR & HOMEOWNER HANDOFF'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                        {language === 'da' ? 'Klar til at afsende tilbud eller bestille?' : 'Ready to quote or order materials?'}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300">
                        {language === 'da'
                          ? 'Download professionelt PDF-dossier, reserver hos nærmeste forhandler, eller åbn boligejerens garantiportal.'
                          : 'Download trade dossier, reserve at nearest merchant, or launch homeowner warranty portal.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="px-5 py-3 rounded-xl font-bold bg-[#D71920] hover:bg-[#B8141A] text-white text-xs shadow-md transition-all hover:scale-[1.02]"
                      >
                        {language === 'da' ? 'Generér Projektdossier (PDF)' : 'Generate Project Dossier (PDF)'}
                      </button>
                      <button
                        onClick={scrollToNearestStore}
                        className="px-4 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white text-xs border border-white/20 transition-colors"
                      >
                        {language === 'da' ? 'Find Nærmeste Tømmerhandel' : 'Nearest Store & Logistics'}
                      </button>
                      <button
                        onClick={() => setActiveRole('customer')}
                        className="px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-xs shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <span>🏡</span>
                        <span>{language === 'da' ? 'Åbn Boligejerportal' : 'Open Customer Portal'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenSupport={() => setIsSupportModalOpen(true)}
      />

      {/* MODAL 1: Project Report Dossier Modal */}
      {isReportModalOpen && (
        <ProjectReportModal
          language={language}
          estimate={currentProject}
          product={selectedProduct}
          selectedThicknessMm={selectedThicknessMm}
          wasteMarginPercent={wasteMarginPercent}
          checklist={checklist}
          notes={installerNotes}
          onClose={() => setIsReportModalOpen(false)}
          onOpenCustomerShare={() => {
            setIsReportModalOpen(false);
            setActiveRole('customer');
          }}
          onOpenDistributor={() => {
            setIsReportModalOpen(false);
            scrollToNearestStore();
          }}
        />
      )}

      {/* MODAL 2: Distributor / Purchase Handoff Modal */}
      {isDistributorModalOpen && (
        <DistributorModal
          language={language}
          estimate={currentProject}
          product={selectedProduct}
          selectedThicknessMm={selectedThicknessMm}
          wasteMarginPercent={wasteMarginPercent}
          onClose={() => setIsDistributorModalOpen(false)}
        />
      )}

      {/* MODAL 3: Customer / Homeowner Handoff Modal */}
      {isCustomerModalOpen && (
        <CustomerHandoffModal
          language={language}
          estimate={currentProject}
          product={selectedProduct}
          selectedThicknessMm={selectedThicknessMm}
          onClose={() => setIsCustomerModalOpen(false)}
        />
      )}

      {/* MODAL 4: Project History Modal */}
      {isHistoryModalOpen && (
        <ProjectHistoryModal
          language={language}
          projects={projects}
          currentProjectId={currentProject.id}
          onSelectProject={handleSelectHistoryProject}
          onNewEstimate={handleNewEstimate}
          onClose={() => setIsHistoryModalOpen(false)}
        />
      )}

      {/* MODAL 5: Technical Support & CRM Modal */}
      {isSupportModalOpen && (
        <TechnicalSupportModal
          language={language}
          estimate={currentProject}
          onClose={() => setIsSupportModalOpen(false)}
        />
      )}

      {/* MODAL 6: On-Site Master Technician Hotline Modal */}
      {isHotlineModalOpen && (
        <TechnicianHotlineModal
          language={language}
          estimate={currentProject}
          onClose={() => setIsHotlineModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
