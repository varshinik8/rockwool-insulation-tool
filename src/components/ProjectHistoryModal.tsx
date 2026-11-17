import React from 'react';
import { Language, ProjectEstimate } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  History, 
  Calendar, 
  MapPin, 
  Layers, 
  ArrowUpRight, 
  Plus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Truck 
} from 'lucide-react';

interface ProjectHistoryModalProps {
  language: Language;
  projects: ProjectEstimate[];
  currentProjectId: string;
  onSelectProject: (project: ProjectEstimate) => void;
  onNewEstimate: () => void;
  onClose: () => void;
}

export const ProjectHistoryModal: React.FC<ProjectHistoryModalProps> = ({
  language,
  projects,
  currentProjectId,
  onSelectProject,
  onNewEstimate,
  onClose,
}) => {
  const t = translations[language];

  const getStatusBadge = (status: ProjectEstimate['status']) => {
    switch (status) {
      case 'Analysed':
        return <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{t.statusAnalysed}</span>;
      case 'Quote prepared':
        return <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">{t.statusQuote}</span>;
      case 'Material ordered':
        return <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">{t.statusOrdered}</span>;
      case 'Completed':
        return <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">{t.statusCompleted}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-popover border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-[#1D2228] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-white">
              <History className="w-4 h-4 text-[#D71920]" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {t.historyTitle}
              </h3>
              <p className="text-[11px] text-gray-400">
                {t.historySub}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onNewEstimate();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#D71920] hover:bg-[#B8141A] text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'da' ? 'Ny Scanning' : 'New Scan'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project List Table */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="space-y-3">
            {projects.map((proj) => {
              const isCurrent = proj.id === currentProjectId;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onClose();
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isCurrent
                      ? 'border-[#D71920] bg-red-50/30 ring-1 ring-[#D71920]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-900 border border-gray-200">
                      <img
                        src={proj.thumbnailUrl}
                        alt="Project thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-500">
                          {proj.id}
                        </span>
                        {getStatusBadge(proj.status)}
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold text-[#D71920] bg-red-100 px-1.5 py-0.2 rounded">
                            {language === 'da' ? 'Aktiv' : 'Active'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#1D2228] mt-0.5">
                        {proj.projectName}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{proj.address}, {proj.postalCode} {proj.city}</span>
                        <span className="mx-1">•</span>
                        <span>{proj.createdDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 text-xs text-right">
                    <div>
                      <span className="text-gray-500 block">Nettoareal:</span>
                      <strong className="text-sm font-mono text-[#D71920]">
                        {proj.netInsulationAreaM2.toFixed(1)} m²
                      </strong>
                    </div>

                    <div>
                      <span className="text-gray-500 block">Løsning:</span>
                      <span className="font-semibold text-gray-800 truncate max-w-[140px] block">
                        {proj.recommendedProduct.name.replace('ROCKWOOL ', '')}
                      </span>
                    </div>

                    <div className="text-gray-400 hover:text-gray-900">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
          <span>{projects.length} {language === 'da' ? 'gemte projekter i skyen' : 'saved projects in workspace'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-gray-900"
          >
            {language === 'da' ? 'Luk' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
