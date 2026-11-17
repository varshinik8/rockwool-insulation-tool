import { 
  RockwoolProduct, 
  ProjectEstimate, 
  DistributorBranch, 
  ChecklistItem, 
  WarrantyCertificate, 
  InsulationHealthMonitoring, 
  SeniorTechnician, 
  ChatMessage 
} from '../types';

export const ROCKWOOL_PRODUCTS: RockwoolProduct[] = [
  {
    id: 'flexibatts-37',
    sku: 'RW-DK-FLX-37-200',
    name: 'ROCKWOOL Flexibatts 37',
    category: 'Stone Wool Insulation',
    categoryDa: 'Stenuldsisolering',
    application: 'External wall framing, cavity & roof partitions',
    applicationDa: 'Ydervægsskelet, hulmur & tagkonstruktioner',
    lambdaValue: 0.037,
    fireClass: 'Euroclass A1 (Non-combustible, > 1,000°C melting point)',
    acousticRw: 'Rw = 48-52 dB (Superior sound dampening)',
    vaporOpenness: 'μ = 1 (Diffusion open, prevents condensation)',
    defaultThicknessMm: 200,
    availableThicknessesMm: [95, 120, 145, 170, 195, 200, 220, 240],
    packCoverageM2: {
      95: 5.86,
      120: 4.69,
      145: 3.52,
      170: 3.01,
      195: 2.50,
      200: 2.50,
      220: 2.25,
      240: 2.01,
    },
    pricePerM2Dkk: 94.50,
    technicalReasons: [
      {
        title: 'Patented Flexible Edge Technology',
        titleDa: 'Patenteret Fleksibel Kant',
        desc: 'Spring-loaded green edge compresses effortlessly up to 20 mm to lock between wooden studs without thermal bypass.',
        descDa: 'Den fjedrende grønne kant komprimeres let op til 20 mm og slutter helt tæt mod spær/reglar uden kuldebroer.'
      },
      {
        title: 'Euroclass A1 Highest Fire Resistance',
        titleDa: 'Højeste Brandsikkerhed — Euroclass A1',
        desc: 'Manufactured from volcanic basalt stone. Does not ignite, fuel fire, or emit toxic smoke during residential fire events.',
        descDa: 'Fremstillet af vulkansk basaltsten. Kan ikke brænde, smelter først ved >1.000°C og afgiver ingen giftig røg.'
      },
      {
        title: 'Vapour-Open Nordic Breathability',
        titleDa: 'Diffusionsåben & Fugtsikker',
        desc: 'Enables construction assemblies to breathe naturally, eliminating mold risk under Danish rainy coastal climates.',
        descDa: 'Tillader konstruktionen at ånde, så ophobning af fugt og skimmelsvamp undgås i det omskiftelige danske klima.'
      },
      {
        title: 'Acoustic Comfort & Density',
        titleDa: 'Overlegen Lydisolering',
        desc: 'Dense, interwoven stone wool fibers actively trap air and attenuate road traffic noise by up to 52 dB.',
        descDa: 'Tæt, uorienteret fiberstruktur dæmper effektivt støj fra trafik, vind og naboer med op til 52 dB.'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'ROCKWOOL Flexibatts 37 Product Datasheet',
        titleDa: 'Produktdatablad — Flexibatts 37',
        category: 'Datasheet',
        categoryDa: 'Datablad',
        size: '1.4 MB PDF',
        code: 'PDB-DK-2024-FLX'
      },
      {
        id: 'doc-2',
        title: 'Official Installation Guide: External & Cavity Walls',
        titleDa: 'Montagevejledning: Lette ydervægge og spær',
        category: 'Installation',
        categoryDa: 'Montagevejledning',
        size: '3.2 MB PDF',
        code: 'MNT-DK-RW-02'
      },
      {
        id: 'doc-3',
        title: 'EPD Environmental Product Declaration (LCA Cradle-to-Grave)',
        titleDa: 'EPD Miljøvaredeklaration (Cradle-to-Grave)',
        category: 'Environmental',
        categoryDa: 'Miljø',
        size: '890 KB PDF',
        code: 'EPD-RW-DK-019'
      },
      {
        id: 'doc-4',
        title: 'Danish Building Code BR18 U-Value Compliance Certificate',
        titleDa: 'BR18 Overensstemmelsescertifikat (U-værdi ≤ 0.15)',
        category: 'Compliance',
        categoryDa: 'Godkendelse',
        size: '620 KB PDF',
        code: 'BR18-CERT-DK-37'
      }
    ]
  },
  {
    id: 'facaderock-system',
    sku: 'RW-DK-FCD-150',
    name: 'ROCKWOOL Facaderock Premium',
    category: 'External Facade Stone Wool',
    categoryDa: 'Udvendig Facadeisolering',
    application: 'External solid wall & masonry thermal wrap',
    applicationDa: 'Udvendig facadeisolering på murværk & beton',
    lambdaValue: 0.036,
    fireClass: 'Euroclass A1 Non-combustible',
    acousticRw: 'Rw = 54 dB',
    vaporOpenness: 'μ = 1 (Vapour-permeable exterior)',
    defaultThicknessMm: 150,
    availableThicknessesMm: [100, 120, 150, 180, 200],
    packCoverageM2: {
      100: 2.88,
      120: 2.16,
      150: 1.80,
      180: 1.44,
      200: 1.44,
    },
    pricePerM2Dkk: 142.00,
    technicalReasons: [
      {
        title: 'Dual Density Dual-Layer Construction',
        titleDa: 'Dual Density — Dobbelt Lagstruktur',
        desc: 'Hard impact-resistant outer surface provides ideal render/mechanical anchoring, while flexible inner layer hugs uneven masonry.',
        descDa: 'Hård, robust overflade mod mekanisk slid og puds, kombineret med en eftergivelig bagside der tilpasser sig ujævn mur.'
      },
      {
        title: 'Eliminates All Thermal Bridging',
        titleDa: 'Fuldstændig Kuldebrofri Facade',
        desc: 'Wrapping the building continuously from the exterior shifts the dew point outward and preserves internal living space.',
        descDa: 'Udvendig isolering flytter dugpunktet ud af murværket og bevarer boligens fulde indvendige etageareal.'
      },
      {
        title: 'Zero Combustibility for Multi-Storey Buildings',
        titleDa: '100% Ubrændbart til Flere Etager',
        desc: 'Required under Danish fire regulations for facades over 2 storeys; cannot melt or form flaming droplets.',
        descDa: 'Opfylder alle krav i Bygningsreglementet BR18 til brandsikre facader uden behov for brændbare skumplast-løsninger.'
      }
    ],
    documents: [
      {
        id: 'doc-fcd-1',
        title: 'Facaderock Technical Data Sheet',
        titleDa: 'Produktdatablad — Facaderock',
        category: 'Datasheet',
        categoryDa: 'Datablad',
        size: '1.8 MB PDF',
        code: 'PDB-FCD-2024'
      },
      {
        id: 'doc-fcd-2',
        title: 'System Installation Manual & Mechanical Fixing Layout',
        titleDa: 'Montagevejledning: Dyvling og fastholdelse',
        category: 'Installation',
        categoryDa: 'Montagevejledning',
        size: '4.5 MB PDF',
        code: 'MNT-FCD-DK-01'
      }
    ]
  },
  {
    id: 'super-rockwool-34',
    sku: 'RW-DK-SPR-34-250',
    name: 'ROCKWOOL Super Rockwool 34',
    category: 'High-Performance Stone Wool',
    categoryDa: 'Højeffektiv Stenuldsisolering',
    application: 'Lofts, roof rafters, cold attics & low-energy retrofits',
    applicationDa: 'Uudnyttede lofter, tagkonstruktioner & lavenergirenovering',
    lambdaValue: 0.034,
    fireClass: 'Euroclass A1 Non-combustible',
    acousticRw: 'Rw = 50 dB',
    vaporOpenness: 'μ = 1',
    defaultThicknessMm: 250,
    availableThicknessesMm: [100, 150, 200, 250, 300],
    packCoverageM2: {
      100: 4.50,
      150: 3.00,
      200: 2.25,
      250: 1.80,
      300: 1.50,
    },
    pricePerM2Dkk: 118.00,
    technicalReasons: [
      {
        title: 'Class-Leading λ 0.034 Thermal Efficiency',
        titleDa: 'Markedsledende Lambda 0,034',
        desc: 'Delivers 9% higher thermal resistance per centimeter than standard insulation, ideal for tight Danish rafters.',
        descDa: 'Giver 9% bedre isoleringsevne pr. centimeter end standardisolering — perfekt til trange tagspær.'
      },
      {
        title: 'Form-Stable Dimensional Permanence',
        titleDa: 'Formstabil og Synker Ikke',
        desc: 'Does not settle or compress over 50+ year lifespan, ensuring thermal envelopes retain designed R-value perpetually.',
        descDa: 'Bibeholder sin tykkelse og spændstighed i hele bygningens levetid uden at falde sammen.'
      }
    ],
    documents: [
      {
        id: 'doc-spr-1',
        title: 'Super Rockwool 34 Technical Specification',
        titleDa: 'Produktdatablad — Super Rockwool 34',
        category: 'Datasheet',
        categoryDa: 'Datablad',
        size: '1.2 MB PDF',
        code: 'PDB-SPR-34'
      }
    ]
  }
];

// Nearest store branches ranked by proximity to Gentofte (2820) to minimize logistics costs
export const DISTRIBUTOR_BRANCHES: DistributorBranch[] = [
  {
    id: 'stark-gentofte',
    distributorName: 'STARK',
    branchName: 'STARK Gentofte Pro-Center',
    address: 'Kongevejen 42',
    postalCode: '2820',
    city: 'Gentofte',
    phone: '+45 82 52 31 00',
    stockStatus: 'In Stock',
    stockStatusDa: 'På lager',
    availablePacks: 88,
    distanceKm: 3.2,
    driveTimeMin: 6,
    estimatedFuelDkk: 34,
    contractorDeskHours: 'Man-Fre: 06:00 - 17:00',
    isNearest: true
  },
  {
    id: 'xl-lyngby',
    distributorName: 'XL-BYG',
    branchName: 'XL-BYG Brejnholt Kgs. Lyngby',
    address: 'Klokkehøjen 8',
    postalCode: '2800',
    city: 'Kgs. Lyngby',
    phone: '+45 45 87 12 34',
    stockStatus: 'In Stock',
    stockStatusDa: 'På lager',
    availablePacks: 74,
    distanceKm: 4.8,
    driveTimeMin: 9,
    estimatedFuelDkk: 52,
    contractorDeskHours: 'Man-Fre: 06:30 - 17:00',
    isNearest: false
  },
  {
    id: 'bygma-herlev',
    distributorName: 'Bygma',
    branchName: 'Bygma Herlev Pro-Center',
    address: 'Hørkær 18',
    postalCode: '2730',
    city: 'Herlev',
    phone: '+45 44 88 06 00',
    stockStatus: 'In Stock',
    stockStatusDa: 'På lager',
    availablePacks: 112,
    distanceKm: 8.4,
    driveTimeMin: 13,
    estimatedFuelDkk: 88,
    contractorDeskHours: 'Man-Fre: 06:00 - 17:00',
    isNearest: false
  },
  {
    id: 'stark-kbh-syd',
    distributorName: 'STARK',
    branchName: 'STARK København Sydhavn',
    address: 'Teglholmsgade 24',
    postalCode: '2450',
    city: 'København SV',
    phone: '+45 82 52 20 00',
    stockStatus: 'In Stock',
    stockStatusDa: 'På lager',
    availablePacks: 142,
    distanceKm: 14.2,
    driveTimeMin: 22,
    estimatedFuelDkk: 154,
    contractorDeskHours: 'Man-Fre: 06:00 - 18:00',
    isNearest: false
  },
  {
    id: 'davidsen-odense',
    distributorName: 'Davidsen',
    branchName: 'Davidsen Tømmerhandel Odense',
    address: 'Hvidkærvej 31',
    postalCode: '5250',
    city: 'Odense SV',
    phone: '+45 74 35 15 00',
    stockStatus: 'In Stock',
    stockStatusDa: 'På lager',
    availablePacks: 84,
    distanceKm: 165.0,
    driveTimeMin: 110,
    estimatedFuelDkk: 940,
    contractorDeskHours: 'Man-Fre: 06:30 - 16:30',
    isNearest: false
  }
];

export const SENIOR_TECHNICIANS: SeniorTechnician[] = [
  {
    id: 'tech-1',
    name: 'Henrik Thomsen',
    role: 'Senior Master Installation Specialist',
    roleDa: 'Chefkonsulent & Montagespecialist',
    yearsAtRockwool: 22,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phoneDirect: '+45 46 56 16 28',
    email: 'henrik.thomsen@rockwool.com',
    status: 'Available Now',
    statusDa: 'Ledig nu',
    specialties: ['Hulmur & Murbindere', 'Kuldebroisolering', 'Pudsede Facader (Facaderock)'],
    specialtiesDa: ['Hulmur & Murbindere', 'Kuldebroisolering', 'Pudsede Facader (Facaderock)']
  },
  {
    id: 'tech-2',
    name: 'Lars Bo Jensen',
    role: 'Senior Building Physics & BR18 Advisor',
    roleDa: 'Bygningsfysiker & BR18 Konsulent',
    yearsAtRockwool: 17,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phoneDirect: '+45 46 56 16 35',
    email: 'lars.jensen@rockwool.com',
    status: 'On Line',
    statusDa: 'I samtale',
    specialties: ['Dampspærre tæthed', 'Tagventilation', 'U-værdiberegning'],
    specialtiesDa: ['Dampspærre tæthed', 'Tagventilation', 'U-værdiberegning']
  },
  {
    id: 'tech-3',
    name: 'Morten Friis',
    role: 'Trade On-Site Problem Solver',
    roleDa: 'Praktisk Byggepladsrådgiver',
    yearsAtRockwool: 14,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phoneDirect: '+45 46 56 16 42',
    email: 'morten.friis@rockwool.com',
    status: 'Available Now',
    statusDa: 'Ledig nu',
    specialties: ['Skæring & Værktøj', 'Trange Skråvægge', 'Brandlukninger'],
    specialtiesDa: ['Skæring & Værktøj', 'Trange Skråvægge', 'Brandlukninger']
  }
];

export const DEMO_WARRANTY: WarrantyCertificate = {
  certificateId: 'RW-DK-WAR-2024-8842',
  productName: 'ROCKWOOL Flexibatts 37 (200 mm)',
  warrantyPeriodYears: 25,
  issueDate: '17. November 2024',
  expiryDate: '17. November 2049',
  propertyAddress: 'Brogaardsvej 44, 2820 Gentofte',
  ownerName: 'Niels & Kirsten Møller',
  installerCompany: 'Gentofte Byg & Isolering ApS',
  contractorCertificationId: 'CERT-DK-PRO-9921',
  fireSafetyGuarantee: 'Euroclass A1 Non-Combustible throughout entire lifespan',
  dimensionalPermanenceGuarantee: 'Guaranteed 0% settlement/sagging under Danish climate conditions',
  moldResistGuarantee: 'Biological inertness guarantee: zero microbial or fungal degradation',
  transferableOnSale: true,
  status: 'Verified'
};

export const DEMO_MONITORING: InsulationHealthMonitoring = {
  overallHealthScore: 98,
  status: 'Optimal',
  statusDa: 'Optimal',
  sensorId: 'RW-SENSE-GENT-04',
  sensorLocation: 'Hulmurszone Nord & Dampspærre mod loft',
  lastUpdated: 'Live Telemetri (Sidst opdateret for 4 min. siden)',
  currentReading: {
    timestamp: '17. Nov 2024, 04:12',
    relativeHumidityPercent: 41.8,
    woodMoisturePercent: 11.4,
    cavityTemperatureC: 18.2,
    indoorTemperatureC: 21.5,
    outdoorTemperatureC: 4.8,
    calculatedUValue: 0.14,
    heatLossRateKWh: 1.2,
    moldIndexPercent: 0.0
  },
  monthlyHistory: [
    { month: 'Jun', avgHumidity: 38.5, thermalRetention: 99.4, heatingCostSavedDkk: 480 },
    { month: 'Jul', avgHumidity: 40.1, thermalRetention: 99.3, heatingCostSavedDkk: 390 },
    { month: 'Aug', avgHumidity: 42.2, thermalRetention: 99.1, heatingCostSavedDkk: 420 },
    { month: 'Sep', avgHumidity: 41.0, thermalRetention: 99.5, heatingCostSavedDkk: 860 },
    { month: 'Okt', avgHumidity: 43.1, thermalRetention: 98.9, heatingCostSavedDkk: 1410 },
    { month: 'Nov', avgHumidity: 41.8, thermalRetention: 99.2, heatingCostSavedDkk: 1820 }
  ],
  keyInsights: [
    {
      metric: 'Hulmursfugtighed (RH)',
      metricDa: 'Hulmursfugtighed (RH)',
      value: '41.8%',
      rating: 'excellent',
      note: 'Perfekt tørt miljø. Diffusionsåben stenuld sikrer kontinuerlig fugtafgang mod det fri.',
      noteDa: 'Perfekt tørt miljø. Diffusionsåben stenuld sikrer kontinuerlig fugtafgang mod det fri.'
    },
    {
      metric: 'Træfugtighed i spær',
      metricDa: 'Træfugtighed i spær',
      value: '11.4%',
      rating: 'excellent',
      note: 'Langt under den kritiske grænse på 18%. Træværk og lægter er fuldstændig beskyttet mod råd.',
      noteDa: 'Langt under den kritiske grænse på 18%. Træværk og lægter er fuldstændig beskyttet mod råd.'
    },
    {
      metric: 'Isoleringsevne (U-værdi)',
      metricDa: 'Isoleringsevne (U-værdi)',
      value: '0.14 W/m²K',
      rating: 'excellent',
      note: 'Overholder og overgår kravene i BR18 klimaskærm (krav: ≤ 0.15 W/m²K).',
      noteDa: 'Overholder og overgår kravene i BR18 klimaskærm (krav: ≤ 0.15 W/m²K).'
    },
    {
      metric: 'Formstabilitet & Synkning',
      metricDa: 'Formstabilitet & Synkning',
      value: '0.0 mm (100%)',
      rating: 'excellent',
      note: 'Stenuldens uorienterede fiberstruktur fastholder fuld spænding mod reglar uden kuldebroer.',
      noteDa: 'Stenuldens uorienterede fiberstruktur fastholder fuld spænding mod reglar uden kuldebroer.'
    }
  ]
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    senderName: 'ROCKWOOL HomeCare Assistant',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    text: 'Hej Niels! Velkommen til din ROCKWOOL Boligejerportal. Din 25-års garanti på Brogaardsvej 44 er aktiv, og dine sensorer melder 98% optimal isoleringstilstand. Hvad kan jeg hjælpe dig med i dag?',
    timestamp: '04:15',
    isExecutiveOnline: true,
    quickReplies: [
      'Hvordan dækker min 25-års garanti?',
      'Hvad sparer jeg på varmeregningen?',
      'Vis sensorstatus for fugt og skimmel',
      'Forbind mig direkte med en ROCKWOOL rådgiver'
    ]
  }
];

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    stage: 'prep',
    label: 'Verify on-site laser measurements against preliminary video estimate',
    labelDa: 'Kontrollér lasermål på byggepladsen mod det foreløbige video-estimat',
    description: 'Preliminary AI video estimates have an estimated +/- 5-8% dimensional margin. Always verify critical stud intervals and perimeter heights.',
    descriptionDa: 'Foreløbige video-estimater har en margen på ca. 5-8%. Kontrollér altid kritiske spærafstande og facadehøjder på stedet.',
    checked: true,
    required: true
  },
  {
    id: 'chk-2',
    stage: 'substrate',
    label: 'Inspect masonry cavity condition, ties & moisture levels (< 15-18%)',
    labelDa: 'Undersøg hulmur, murbindere og mål fugtindhold i underlag (< 15-18%)',
    description: 'Ensure existing cavity is free from fallen mortar bridges and timber moisture is within safe Danish BR18 tolerances.',
    descriptionDa: 'Sikr at hulmuren er ren for murbrokker og at træfugtigheden er under 18% inden isolering lukkes til.',
    checked: true,
    required: true
  },
  {
    id: 'chk-3',
    stage: 'substrate',
    label: 'Confirm vapor barrier (dampspærre) integrity & airtight taping',
    labelDa: 'Kontrollér dampspærrens tæthed og samlinger ifølge BR18',
    description: 'Verify continuity of internal air/vapour control layer. Tape all penetrations (electrical conduits, vent pipes) with approved system tape.',
    descriptionDa: 'Efterse at dampspærren er intakt og at alle gennemføringer (el, ventilation) er tapet lufttæt med godkendt systemtape.',
    checked: false,
    required: true
  },
  {
    id: 'chk-4',
    stage: 'installation',
    label: 'Prepare specialized cutting knife and PPE (gloves, safety glasses, FFP2)',
    labelDa: 'Klargør ROCKWOOL isoleringskniv og værnemidler (briller, handsker, FFP2)',
    description: 'Use the wavy-edge ROCKWOOL insulation knife for clean straight cuts with 5 mm over-dimensioning for snug friction-fit.',
    descriptionDa: 'Anvend bølgeskæret isoleringskniv og tilskær med 5 mm overmål for at sikre fuldstændig spænding i hulrummet.',
    checked: true,
    required: false
  },
  {
    id: 'chk-5',
    stage: 'installation',
    label: 'Install with staggered joints (forbandt) to prevent continuous seams',
    labelDa: 'Monteres med forskudte samlinger (forbandt) for at forhindre kuldebroer',
    description: 'When installing 2-layer systems (e.g. 2x 100mm), offset horizontal and vertical seams by minimum 150 mm.',
    descriptionDa: 'Ved tolagsløsninger (f.eks. 2x 100 mm) skal samlinger forskydes mindst 150 mm.',
    checked: false,
    required: true
  },
  {
    id: 'chk-6',
    stage: 'verification',
    label: 'Final quality control, thermal camera check & handover documentation',
    labelDa: 'Slutkontrol, termografisk stikprøve og udfyldt kvalitetssikringsrapport',
    description: 'Log batch numbers from ROCKWOOL packs and verify absence of gaps around window and door perimeters.',
    descriptionDa: 'Notér batchnumre fra ROCKWOOL pakkerne og dokumentér fuld isoleringstæthed ved vinduer og døre.',
    checked: false,
    required: true
  }
];

export const DEMO_PROJECT_GENTOFTE: ProjectEstimate = {
  id: 'prj-dk-2024-001',
  projectName: 'Klassisk Murermestervilla — Facade & Hulmursisolering',
  clientName: 'Niels & Kirsten Møller',
  address: 'Brogaardsvej 44',
  postalCode: '2820',
  city: 'Gentofte',
  projectType: 'residential_reno',
  createdDate: '17. Nov 2024',
  videoFileName: 'gentofte_facade_walkthrough.mp4',
  videoDurationSec: 28,
  thumbnailUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  
  grossFacadeAreaM2: 142.4,
  openingsDeductionM2: 24.2,
  netInsulationAreaM2: 118.2,
  estimatedVolumeM3: 23.64,
  
  confidence: 'Medium',
  confidenceScore: 84,
  
  detectedElements: [
    {
      id: 'elem-1',
      label: 'Facade North (Brick masonry, 2 storeys)',
      labelDa: 'Facade Nord (Mursten, 2 etager)',
      type: 'wall',
      areaM2: 54.8,
      confidence: 88,
      color: '#D71920',
      status: 'insulate',
      notes: 'Even masonry surface, cavity depth measured at 110 mm + 100 mm exterior wrap recommended.',
      notesDa: 'Jævn murstensfacade, hulmursdybde ca. 110 mm + 100 mm udvendig isolering anbefales.'
    },
    {
      id: 'elem-2',
      label: 'Facade West & Gable (Exposed brickwork)',
      labelDa: 'Facade Vest & Gavl (Vindudsat murværk)',
      type: 'wall',
      areaM2: 48.6,
      confidence: 82,
      color: '#D71920',
      status: 'insulate',
      notes: 'Gable apex has existing mineral wool in cold loft requiring 150 mm top-up.',
      notesDa: 'Gavlspids har ældre mineraluld i kold tagrum, kræver efterisolering.'
    },
    {
      id: 'elem-3',
      label: 'Facade South (Garden facing)',
      labelDa: 'Facade Syd (Havefacade)',
      type: 'wall',
      areaM2: 39.0,
      confidence: 85,
      color: '#D71920',
      status: 'insulate',
      notes: 'Direct sunlight exposure, verify thermal expansion tolerances for external base render.',
      notesDa: 'Direkte sol, kontroller temperaturbevægelser ved pudset facade.'
    },
    {
      id: 'elem-4',
      label: 'Apertures: 14 Windows & 2 Exterior Doors',
      labelDa: 'Åbninger: 14 Vinduer & 2 Yderdøre',
      type: 'window',
      areaM2: 24.2,
      confidence: 94,
      color: '#3B82F6',
      status: 'deduct',
      notes: 'Deducted automatically from insulation gross surface. Requires 20 mm reveal insulation (smygisolering).',
      notesDa: 'Automatisk fratræk. Kræver 20 mm ROCKWOOL smygisolering i lysninger.'
    }
  ],
  
  recommendedProduct: ROCKWOOL_PRODUCTS[0], // Flexibatts 37
  selectedThicknessMm: 200,
  wasteMarginPercent: 8,
  totalMaterialM2: 127.7,
  packsRequired: 51,
  palletsRequired: 5,
  estimatedWeightKg: 890,
  
  installerNotes: [
    'Existing cavity wall has irregular mortar spillage in lower 40 cm — requires vacuum cleaning before cavity fill.',
    'Scaffolding setup has tight clearance along western boundary fence (approx. 1.2m width).',
    'Owner requested quote with both 200 mm Flexibatts and alternative Facaderock exterior system.',
    'Danish BR18 renovation grant eligibility confirmed for U-value ≤ 0.15 W/(m²·K).'
  ],
  
  checklist: DEFAULT_CHECKLIST,
  
  openQuestions: [
    'Confirm exact wall cavity depth at rear corner by drilling 10 mm inspection core hole.',
    'Check if electrical meter cabinet on eastern wall needs extending outward by electrician.',
    'Clarify with client if window cills should be replaced with deep zinc profiles.'
  ],
  openQuestionsDa: [
    'Bekræft nøjagtig hulmursdybde i baghjørne ved at bore 10 mm inspektionshul.',
    'Undersøg om elmålerskab på østfacade skal flyttes frem af autoriseret elinstallatør.',
    'Afklar med bygherre om sålbænke skal udskiftes med dybe zinkprofiler ved udvendig isolering.'
  ],
  
  status: 'Analysed',
  selectedDistributorId: 'stark-gentofte',
  warranty: DEMO_WARRANTY,
  monitoring: DEMO_MONITORING
};

export const DEMO_PROJECT_LOFT: ProjectEstimate = {
  id: 'prj-dk-2024-002',
  projectName: 'Københavnsk Andelsbolig — Tagetage & Skråvægge',
  clientName: 'A/B Nørrebrogade 114',
  address: 'Nørrebrogade 114, 4. sal',
  postalCode: '2200',
  city: 'København N',
  projectType: 'loft_roof',
  createdDate: '12. Nov 2024',
  videoFileName: 'norrebro_loft_survey.mp4',
  videoDurationSec: 35,
  thumbnailUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  
  grossFacadeAreaM2: 98.0,
  openingsDeductionM2: 14.5,
  netInsulationAreaM2: 83.5,
  estimatedVolumeM3: 20.88,
  
  confidence: 'High',
  confidenceScore: 91,
  
  detectedElements: [
    {
      id: 'elem-l1',
      label: 'Pitched Rafters (Skråtag mod gade)',
      labelDa: 'Skråtag mod gade (Spærkonstruktion)',
      type: 'roof',
      areaM2: 46.2,
      confidence: 92,
      color: '#D71920',
      status: 'insulate'
    },
    {
      id: 'elem-l2',
      label: 'Cold Attic Ceiling (Vandret hanebåndsloft)',
      labelDa: 'Vandret hanebåndsloft (Uudnyttet kold tagrum)',
      type: 'roof',
      areaM2: 37.3,
      confidence: 90,
      color: '#D71920',
      status: 'insulate'
    },
    {
      id: 'elem-l3',
      label: '6 Roof Skylights (Velux)',
      labelDa: '6 Velux Tagvinduer',
      type: 'window',
      areaM2: 14.5,
      confidence: 96,
      color: '#3B82F6',
      status: 'deduct'
    }
  ],
  
  recommendedProduct: ROCKWOOL_PRODUCTS[2], // Super Rockwool 34
  selectedThicknessMm: 250,
  wasteMarginPercent: 7,
  totalMaterialM2: 89.3,
  packsRequired: 50,
  palletsRequired: 5,
  estimatedWeightKg: 780,
  
  installerNotes: [
    'Material hoist required for bringing pallets to 4th floor courtyard entrance.',
    'Existing 100mm glass wool should be removed due to dust degradation from 1978.',
    'Strict Danish BR18 requirement: Continuous 50 mm ventilation gap above insulation under roof underlay.'
  ],
  
  checklist: DEFAULT_CHECKLIST,
  openQuestions: [
    'Verify structural load capacity of rafter ties before stacking packs.',
    'Check chimney flashing condition on north slope.'
  ],
  openQuestionsDa: [
    'Kontrollér bæreevne af hanebånd inden oplagring af pakker på loftet.',
    'Efterse inddækning omkring skorsten på nordsiden.'
  ],
  status: 'Quote prepared',
  selectedDistributorId: 'stark-gentofte',
  warranty: DEMO_WARRANTY,
  monitoring: DEMO_MONITORING
};

export const DEMO_PROJECT_AARHUS: ProjectEstimate = {
  id: 'prj-dk-2024-003',
  projectName: 'Rækkehuse Facaderenovering — Aarhus C',
  clientName: 'Ejerforeningen Bakkehusene',
  address: 'Langelandsgade 88',
  postalCode: '8000',
  city: 'Aarhus C',
  projectType: 'residential_reno',
  createdDate: '04. Nov 2024',
  videoFileName: 'aarhus_rowhouses_scan.mp4',
  videoDurationSec: 42,
  thumbnailUrl: 'https://images.unsplash.com/photo-1584463699042-45a8553229b4?auto=format&fit=crop&w=1200&q=80',
  
  grossFacadeAreaM2: 240.0,
  openingsDeductionM2: 45.0,
  netInsulationAreaM2: 195.0,
  estimatedVolumeM3: 29.25,
  
  confidence: 'High',
  confidenceScore: 89,
  
  detectedElements: [
    {
      id: 'elem-a1',
      label: 'Continuous East Facade',
      labelDa: 'Gennemgående Østfacade',
      type: 'wall',
      areaM2: 120.0,
      confidence: 89,
      color: '#D71920',
      status: 'insulate'
    },
    {
      id: 'elem-a2',
      label: 'Continuous West Facade',
      labelDa: 'Gennemgående Vestfacade',
      type: 'wall',
      areaM2: 120.0,
      confidence: 88,
      color: '#D71920',
      status: 'insulate'
    },
    {
      id: 'elem-a3',
      label: 'All Fenestration & Entrance Portals',
      labelDa: 'Samtlige Vinduespartier & Indgangspartier',
      type: 'window',
      areaM2: 45.0,
      confidence: 93,
      color: '#3B82F6',
      status: 'deduct'
    }
  ],
  
  recommendedProduct: ROCKWOOL_PRODUCTS[1], // Facaderock
  selectedThicknessMm: 150,
  wasteMarginPercent: 6,
  totalMaterialM2: 206.7,
  packsRequired: 115,
  palletsRequired: 10,
  estimatedWeightKg: 2150,
  
  installerNotes: [
    'Large scale project: phasing into 3 sections (East facade week 1, West facade week 2).',
    'Specialist mechanically anchored facade anchors (Hilti / Fischer) required into hollow brick.'
  ],
  checklist: DEFAULT_CHECKLIST,
  openQuestions: [
    'Confirm container and dumpster placement permit with Aarhus Municipality.'
  ],
  openQuestionsDa: [
    'Sikr vej- og containertilladelse hos Aarhus Kommune inden opstart.'
  ],
  status: 'Material ordered',
  selectedDistributorId: 'stark-gentofte',
  warranty: DEMO_WARRANTY,
  monitoring: DEMO_MONITORING
};

export const SAMPLE_PROJECTS_LIST: ProjectEstimate[] = [
  DEMO_PROJECT_GENTOFTE,
  DEMO_PROJECT_LOFT,
  DEMO_PROJECT_AARHUS
];
