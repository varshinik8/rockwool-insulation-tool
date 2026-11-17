export type Language = 'da' | 'en';

export type UserRole = 'installer' | 'customer';

export type ProjectType = 
  | 'residential_reno'
  | 'commercial_reno'
  | 'new_construction'
  | 'loft_roof'
  | 'facade_cavity'
  | 'other';

export type ProjectStatus = 'Analysed' | 'Quote prepared' | 'Material ordered' | 'Completed';

export interface AnalysisStage {
  id: number;
  name: string;
  nameDa: string;
  description: string;
  descriptionDa: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  detail: string;
  detailDa: string;
}

export interface DetectedElement {
  id: string;
  label: string;
  labelDa: string;
  type: 'wall' | 'window' | 'door' | 'roof' | 'foundation';
  areaM2: number;
  confidence: number;
  color: string;
  status: 'insulate' | 'deduct' | 'inspect';
  notes?: string;
  notesDa?: string;
}

export interface TechnicalDocument {
  id: string;
  title: string;
  titleDa: string;
  category: 'Datasheet' | 'Installation' | 'Environmental' | 'Compliance';
  categoryDa: 'Datablad' | 'Montagevejledning' | 'Miljø' | 'Godkendelse';
  size: string;
  code: string;
  url?: string;
}

export interface RockwoolProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  categoryDa: string;
  application: string;
  applicationDa: string;
  lambdaValue: number; // e.g. 0.037 W/(m·K)
  fireClass: string; // Euroclass A1
  acousticRw: string; // e.g. "Rw = 45-52 dB"
  vaporOpenness: string; // e.g. "μ = 1 (Vapour-open)"
  defaultThicknessMm: number;
  availableThicknessesMm: number[];
  packCoverageM2: Record<number, number>; // thickness -> m² per pack
  pricePerM2Dkk: number;
  technicalReasons: {
    title: string;
    titleDa: string;
    desc: string;
    descDa: string;
  }[];
  documents: TechnicalDocument[];
}

export interface ChecklistItem {
  id: string;
  stage: 'prep' | 'substrate' | 'installation' | 'verification';
  label: string;
  labelDa: string;
  description: string;
  descriptionDa: string;
  checked: boolean;
  required: boolean;
}

export interface DistributorBranch {
  id: string;
  distributorName: 'STARK' | 'Bygma' | 'XL-BYG' | 'Davidsen' | 'Bauhaus Pro';
  branchName: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  stockStatus: 'In Stock' | 'Available 24h' | 'Special Order';
  stockStatusDa: 'På lager' | 'Leveres 24t' | 'Fjernlager';
  availablePacks: number;
  distanceKm: number;
  driveTimeMin?: number;
  estimatedFuelDkk?: number;
  contractorDeskHours?: string;
  isNearest?: boolean;
}

export interface WarrantyCertificate {
  certificateId: string;
  productName: string;
  warrantyPeriodYears: number; // e.g. 25
  issueDate: string;
  expiryDate: string;
  propertyAddress: string;
  ownerName: string;
  installerCompany: string;
  contractorCertificationId: string;
  fireSafetyGuarantee: string;
  dimensionalPermanenceGuarantee: string;
  moldResistGuarantee: string;
  transferableOnSale: boolean;
  status: 'Active' | 'Verified';
}

export interface InsulationSensorReading {
  timestamp: string;
  relativeHumidityPercent: number; // e.g. 42% (safe <55%)
  woodMoisturePercent: number; // e.g. 11.2% (safe <18%)
  cavityTemperatureC: number; // e.g. 18.4 C
  indoorTemperatureC: number;
  outdoorTemperatureC: number;
  calculatedUValue: number; // e.g. 0.14 W/m²K
  heatLossRateKWh: number;
  moldIndexPercent: number; // 0.0%
}

export interface InsulationHealthMonitoring {
  overallHealthScore: number; // e.g. 98 / 100
  status: 'Optimal' | 'Good' | 'Attention';
  statusDa: 'Optimal' | 'God' | 'Opmærksomhed';
  sensorId: string;
  sensorLocation: string;
  lastUpdated: string;
  currentReading: InsulationSensorReading;
  monthlyHistory: {
    month: string;
    avgHumidity: number;
    thermalRetention: number;
    heatingCostSavedDkk: number;
  }[];
  keyInsights: {
    metric: string;
    metricDa: string;
    value: string;
    rating: 'excellent' | 'normal' | 'check';
    note: string;
    noteDa: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'executive';
  senderName: string;
  avatar?: string;
  text: string;
  timestamp: string;
  isExecutiveOnline?: boolean;
  quickReplies?: string[];
}

export interface SeniorTechnician {
  id: string;
  name: string;
  role: string;
  roleDa: string;
  yearsAtRockwool: number;
  avatar: string;
  phoneDirect: string;
  email: string;
  status: 'Available Now' | 'On Line' | 'In Field';
  statusDa: 'Ledig nu' | 'I samtale' | 'På byggeplads';
  specialties: string[];
  specialtiesDa: string[];
}

export interface ProjectEstimate {
  id: string;
  projectName: string;
  clientName: string;
  address: string;
  postalCode: string;
  city: string;
  projectType: ProjectType;
  createdDate: string;
  videoFileName: string;
  videoDurationSec: number;
  thumbnailUrl: string;
  
  // Dimensions & Areas
  grossFacadeAreaM2: number;
  openingsDeductionM2: number;
  netInsulationAreaM2: number;
  estimatedVolumeM3: number;
  
  // Analysis details
  confidence: 'High' | 'Medium' | 'Preliminary';
  confidenceScore: number; // e.g. 84%
  detectedElements: DetectedElement[];
  
  // Recommendation & calculation
  recommendedProduct: RockwoolProduct;
  selectedThicknessMm: number;
  wasteMarginPercent: number; // e.g. 8%
  totalMaterialM2: number;
  packsRequired: number;
  palletsRequired: number;
  estimatedWeightKg: number;
  
  // Workflow
  installerNotes: string[];
  checklist: ChecklistItem[];
  openQuestions: string[];
  openQuestionsDa: string[];
  status: ProjectStatus;
  
  // Selected distributor for handoff
  selectedDistributorId?: string;

  // Connected Customer Information
  warranty?: WarrantyCertificate;
  monitoring?: InsulationHealthMonitoring;
}
