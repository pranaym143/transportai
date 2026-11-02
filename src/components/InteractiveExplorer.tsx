import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Car, 
  TrafficCone, 
  Plane, 
  ParkingCircle, 
  Send, 
  Truck, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Play, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  Activity,
  Radio
} from 'lucide-react';

interface TransportCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  pageRef: number;
  explanation: string;
  howAiWorks: string[];
  realWorldApp: string;
  advantages: string[];
  challenges: string[];
  imageSrc?: string;
  sensorHighlights: string[];
}

export const InteractiveExplorer: React.FC = () => {
  const { openAssistantWithQuery, openModuleReader } = useLearning();

  const [activeCardId, setActiveCardId] = useState<string>('autonomous-cars');

  const [activeStage, setActiveStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const cards: TransportCard[] = [
    {
      id: 'autonomous-cars',
      title: 'Autonomous Cars',
      subtitle: 'Self-driving vehicles, perception & active safety',
      icon: <Car className="w-5 h-5 text-[#f9570c]" />,
      pageRef: 6,
      explanation: 'Autonomous automobiles use sensor fusion—fusing millimeter-wave radar, optical cameras, and ultrasonic proximity sensors—to eliminate human driving error and automate steering, acceleration, and emergency braking.',
      howAiWorks: [
        'Cameras recognize road striping, speed limits, and pedestrian silhouettes at 60 fps.',
        'Millimeter-wave radar (77 GHz) penetrates fog and rain while measuring relative speed via Doppler frequency shift.',
        'Ultrasonic sensors (0-5m range) provide sub-centimeter proximity safety during parking and lane changes.',
        'Drive-by-wire electronic actuators engage Automatic Emergency Braking (AEB) in under 35 milliseconds.'
      ],
      realWorldApp: 'Tesla Autopilot & FSD vision stacks, Waymo commercial driverless robotaxis in Phoenix & San Francisco.',
      advantages: [
        'Mitigates 90%+ of collisions caused by human fatigue, distraction, and alcohol',
        'Smoother speed modulation saves up to 15% fuel and battery power',
        'Enables mobility for non-drivers, elderly, and visually impaired individuals'
      ],
      challenges: [
        'Edge-case dilemmas in torrential downpours and blizzards that occlude sensors',
        'Complex moral liability frameworks and high hardware compute costs'
      ],
      sensorHighlights: ['77 GHz Radar', 'High-Res Optical Vision', 'Ultrasonic Transducers', 'Drive-by-Wire Actuators']
    },
    {
      id: 'smart-traffic',
      title: 'Smart Traffic Signals',
      subtitle: 'Dynamic signal timing, inductive loops & edge vision',
      icon: <TrafficCone className="w-5 h-5 text-amber-500" />,
      pageRef: 7,
      explanation: 'Rather than running on rigid, obsolete countdown timers, smart traffic signals dynamically modulate green light durations in real time based on actual queue lengths and metallic vehicle counts.',
      howAiWorks: [
        'Inductive loop sensors embedded beneath road asphalt detect changes in electromagnetic inductance as metallic car chassis pass.',
        'High-mount computer vision cameras classify vehicles, buses, and crossing pedestrians.',
        'Reinforcement learning algorithms coordinate "green waves" along major metropolitan corridors.',
        'Emergency vehicle preemption clears green corridors for approaching fire trucks and ambulances.'
      ],
      realWorldApp: 'Adaptive traffic control systems in smart cities reducing commute delays by 20% to 35%.',
      advantages: [
        'Drastic reduction in unnecessary intersection idling and fuel waste',
        'Measurable cuts in localized nitrogen oxide and particulate emissions',
        'Priority clearance for public transit buses and first responders'
      ],
      challenges: [
        'Pavement cutting required for inductive loops causes road surface maintenance issues',
        'Camera lens occlusion from dust, bird droppings, or extreme weather conditions'
      ],
      sensorHighlights: ['Inductive Loop Coils', 'Edge Vision Cameras', 'Optical Pedestrian Detectors', 'Radio Priority Beacons']
    },
    {
      id: 'ai-aviation',
      title: 'AI Aviation & ADS-B',
      subtitle: 'Flight monitoring, weather avoidance & vital human captains',
      icon: <Plane className="w-5 h-5 text-blue-600" />,
      pageRef: 8,
      explanation: 'Commercial aviation integrates AI for real-time flight envelope protection, predictive engine maintenance, convective weather avoidance, and ADS-B satellite surveillance—while human pilots remain essential for safety oversight.',
      howAiWorks: [
        'ADS-B (Automatic Dependent Surveillance-Broadcast) satellites continuously ingest aircraft coordinates and velocity.',
        'Predictive maintenance (PHM) sensors detect microscopic turbofan vibration anomalies before takeoff.',
        'Weather radar AI calculates optimal altitude climb and turbulence bypass paths.',
        'Human pilots maintain ultimate command authority during extreme emergencies and non-standard events.'
      ],
      realWorldApp: 'Commercial Boeing/Airbus flight decks, Rolls-Royce turbofan real-time predictive telemetry networks.',
      advantages: [
        'Safest transportation mode in human history through envelope protection',
        'Millions of gallons of jet fuel conserved through dynamic flight path optimization',
        'Zero unscheduled in-flight engine shutdowns due to early vibration detection'
      ],
      challenges: [
        'Sensor icing or Pitot tube anomalies requiring immediate human takeover',
        'Risk of automation complacency if junior aviators rely entirely on autopilot'
      ],
      sensorHighlights: ['ADS-B Transponders', 'Turbine Vibration Sensors', 'Doppler Weather Radar', 'Fly-by-Wire Computers']
    },
    {
      id: 'smart-parking',
      title: 'Smart Parking Systems',
      subtitle: 'Ultrasonic spot occupancy, automated guidance & zero cruising',
      icon: <ParkingCircle className="w-5 h-5 text-emerald-600" />,
      pageRef: 2,
      explanation: 'Downtown cruising for parking accounts for 30% of urban traffic congestion. AI parking networks detect empty spaces and route drivers directly to available bays.',
      howAiWorks: [
        'Overhead ultrasonic or magnetic sensors detect bay occupancy with 99.8% precision.',
        'Automated license plate recognition (ALPR) manages barrierless entry and contact-free payments.',
        'Central cloud servers publish real-time space availability to in-vehicle GPS navigation apps.',
        'Predictive occupancy models forecast availability 30 minutes in advance of arrival.'
      ],
      realWorldApp: 'Municipal smart garages in modern airports and downtown centers, automated valet parking pilots.',
      advantages: [
        'Eliminates the 30% of downtown traffic generated by drivers looking for spots',
        'Reduces localized greenhouse gas emissions and driver stress',
        'Maximizes revenue and capacity utilization for city infrastructure'
      ],
      challenges: [
        'Installation cost for retrofitting thousands of legacy outdoor asphalt bays',
        'Occasional sensor false positives from oversized luggage or motorcycles'
      ],
      sensorHighlights: ['Bay Ultrasonic Proximity', 'License Plate Cameras (ALPR)', 'Pavement Magnetometers', 'Digital Guidance Signage']
    },
    {
      id: 'delivery-drones',
      title: 'Delivery Drones & Hubs',
      subtitle: 'Autonomous micro-fulfillment, sky corridors & rapid transit',
      icon: <Send className="w-5 h-5 text-purple-600" />,
      pageRef: 12,
      explanation: 'Autonomous aerial drones and ground sorting hubs bypass road congestion entirely, delivering critical medical supplies, defibrillators, and high-priority packages within minutes.',
      howAiWorks: [
        'Computer vision optical flow and LiDAR maintain precise GPS-denied altitude and heading.',
        'AI deconfliction software plans 3D flight corridors avoiding trees, utility poles, and powerlines.',
        'Automated winch tether systems lower payloads safely into backyards without landing.',
        'Fail-safe emergency parachute systems deploy autonomously if motor thrust degrades.'
      ],
      realWorldApp: 'Wing, Zipline medical drone drops in Rwanda and the US, rapid commercial aerial couriers.',
      advantages: [
        'Life-saving 10-minute delivery times for anti-venom, vaccines, and blood supplies',
        'Zero street congestion and 100% electric clean aerial operation',
        'Direct access to remote islands and mountainous terrain cut off from roads'
      ],
      challenges: [
        'Acoustic noise regulations in dense residential zones',
        'Extreme wind gusts, bird strikes, and payload weight limitations'
      ],
      imageSrc: '/assets/aistudio/image_73a8bc50.png',
      sensorHighlights: ['3D LiDAR Scanners', 'Optical Flow Cameras', 'Precision Altimeters', 'Autonomous Parachute Ejectors']
    },
    {
      id: 'intelligent-logistics',
      title: 'Intelligent Logistics',
      subtitle: 'Dynamic multi-stop dispatch, warehouse robotics & fleet telematics',
      icon: <Truck className="w-5 h-5 text-[#f9570c]" />,
      pageRef: 9,
      explanation: 'AI transforms the global supply chain by solving the multi-variable Vehicle Routing Problem, managing robotic sortation hubs, and tracking shipments in real time with sub-minute accuracy.',
      howAiWorks: [
        'Heuristic algorithms solve Traveling Salesperson sequences for thousands of parcel drop-offs in seconds.',
        'Vision-guided warehouse robots automatically sort, scan barcodes, and load delivery pods.',
        'Fleet telematics evaluate driver acceleration, braking, and idle time to prevent accidents.',
        'Autonomous delivery vans (like the Swift logistics model) integrate seamlessly with urban micro-hubs.'
      ],
      realWorldApp: 'Automated sorting hubs (e.g. Swift logistics ecosystem), global courier multi-stop optimization.',
      advantages: [
        'Saves tens of millions of driving miles and fuel costs per logistics carrier',
        'Sub-minute customer delivery tracking eliminating missed first delivery attempts',
        '24/7 robotic warehouse throughput without fatigue or inventory discrepancies'
      ],
      challenges: [
        'Massive upfront capital expenditure for robotic sorting facilities',
        'Transition and reskilling requirements for legacy warehouse and driving personnel'
      ],
      imageSrc: '/assets/aistudio/image_73a8bc50.png',
      sensorHighlights: ['Fleet GPS Telematics', 'Computer Vision Parcel Scanners', 'Engine CAN-Bus Monitors', 'Automated Guided Vehicles (AGVs)']
    }
  ];

  const currentCard = cards.find(c => c.id === activeCardId) || cards[0];

  const stages = [
    {
      step: 1,
      title: 'Data Collection',
      icon: <Eye className="w-5 h-5 text-[#f9570c]" />,
      tag: 'Raw Environmental Ingestion',
      sensors: 'LiDAR, 77 GHz Radar, 60fps Stereo Cameras, Ultrasonic, GPS Telemetry',
      action: 'Ingesting 1.5 Gigabytes of sensory input per second. Forward camera detects a silhouette 45 meters ahead.',
      latency: '2 ms'
    },
    {
      step: 2,
      title: 'Information Analysis',
      icon: <Cpu className="w-5 h-5 text-blue-600" />,
      tag: 'Edge Neural Networks',
      sensors: 'Automotive GPU / NPU Edge Tensor Processors',
      action: 'Convolutional neural network classifies silhouette as "Pedestrian with bicycle", velocity vector = 1.2 m/s crossing right.',
      latency: '14 ms'
    },
    {
      step: 3,
      title: 'Decision-Making',
      icon: <Activity className="w-5 h-5 text-purple-600" />,
      tag: 'Trajectory & Path Planning',
      sensors: 'Deterministic Safety Kernel & Risk Optimization',
      action: 'Calculates vehicle speed (48 km/h). Stopping distance is 28 meters. Algorithm decides: Immediate ABS Emergency Braking.',
      latency: '8 ms'
    },
    {
      step: 4,
      title: 'System Response',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      tag: 'Drive-by-Wire Actuation',
      sensors: 'Hydraulic ABS Pump, Electronic Brake Booster, Hazard Flashers',
      action: 'Actuator clamps disc brakes at maximum threshold. Vehicle decelerates to 0 km/h with 7.5 meters of safety buffer.',
      latency: '10 ms'
    }
  ];

  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      timer = setInterval(() => {
        setActiveStage(prev => {
          if (prev >= 3) {
            setIsSimulating(false);
            return 3;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  return (
    <section id="applications-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#f9570c] text-xs font-bold mb-3 border border-orange-200">
            <Radio className="w-3.5 h-3.5 text-[#f9570c] animate-pulse" />
            <span>INTERACTIVE MOBILITY EXPLORER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-display tracking-tight uppercase">
            6 Core Intelligent Transportation Sectors
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Examine the operational mechanics, sensor suites, real-world deployment, and engineering challenges of artificial intelligence across every major transit domain.
          </p>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {cards.map((c) => {
            const isActive = activeCardId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCardId(c.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {c.icon}
                <span>{c.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Detailed Card Showcase */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 swift-card-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Technical Deep-Dive */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                    {currentCard.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950 font-display">
                      {currentCard.title}
                    </h3>
                    <p className="text-xs text-slate-500">{currentCard.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => openModuleReader(`module-${currentCard.pageRef}`)}
                  className="px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 text-[#f9570c] font-mono text-xs font-bold border border-orange-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Page {currentCard.pageRef} in PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Overview */}
              <div>
                <span className="text-[11px] font-bold text-[#f9570c] uppercase tracking-wider block mb-1">
                  System Overview
                </span>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {currentCard.explanation}
                </p>
              </div>

              {/* How AI Works */}
              <div>
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-2.5">
                  How AI Works (Hardware & Algorithmic Mechanics)
                </span>
                <div className="space-y-2">
                  {currentCard.howAiWorks.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-[#f9570c] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Applications */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1">
                  Real-World Deployment
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentCard.realWorldApp}
                </p>
              </div>

              {/* Sensors */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Key Sensor & Compute Hardware:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentCard.sensorHighlights.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-mono font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Visual Graphic, Advantages vs Challenges */}
            <div className="lg:col-span-5 space-y-6">
              
              {currentCard.imageSrc ? (
                <div className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-white p-2">
                  <img 
                    src={currentCard.imageSrc} 
                    alt={currentCard.title} 
                    className="w-full h-52 object-cover object-center rounded-2xl"
                  />
                  <div className="pt-2 px-1 text-xs text-slate-700 font-bold flex items-center justify-between">
                    <span>Swift Autonomous Logistics & Hub Network</span>
                    <span className="text-[#f9570c]">Modules 9 & 12</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl p-8 bg-slate-50 border border-slate-200 flex flex-col justify-center items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#f9570c] mb-3">
                    {React.cloneElement(currentCard.icon as React.ReactElement<any>, { className: 'w-7 h-7 text-[#f9570c]' })}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-display">{currentCard.title} Ecosystem</h4>
                  <p className="text-xs text-slate-500 max-w-xs mt-1">
                    Continuous high-frequency sensor fusion, edge intelligence, and sub-second safe decisions.
                  </p>
                </div>
              )}

              {/* Advantages and Challenges */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Key Advantages</span>
                  </div>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {currentCard.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Challenges & Limitations</span>
                  </div>
                  <ul className="space-y-1 text-slate-700 text-[11px]">
                    {currentCard.challenges.map((ch, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">✗</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => openAssistantWithQuery(`Give me a detailed breakdown of ${currentCard.title} from Page ${currentCard.pageRef} of the PDF including its sensor mechanics, benefits, and challenges.`)}
                className="w-full py-3 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#f9570c]" />
                <span>Ask Transport AI About {currentCard.title}</span>
              </button>

            </div>

          </div>
        </div>

        {/* 4-STAGE COGNITIVE PIPELINE SIMULATOR (PAGE 5 HOW AI WORKS) */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 swift-card-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#f9570c] uppercase tracking-wider mb-1">
                <Cpu className="w-4 h-4" />
                <span>PAGE 5: HOW AI WORKS – THE 4-STAGE COGNITIVE PIPELINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-display">
                Real-Time Obstacle Detection & Response Simulation
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveStage(0);
                  setIsSimulating(true);
                }}
                disabled={isSimulating}
                className="px-5 py-2.5 rounded-full bg-[#f9570c] hover:bg-[#e04a04] text-white text-xs font-bold shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Simulating...' : 'Simulate Obstacle Event'}</span>
              </button>

              <button
                onClick={() => {
                  setIsSimulating(false);
                  setActiveStage(0);
                }}
                className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stg, idx) => {
              const isCurrent = activeStage === idx;
              const isPast = activeStage > idx;

              return (
                <div
                  key={stg.step}
                  onClick={() => {
                    setIsSimulating(false);
                    setActiveStage(idx);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-orange-50/60 border-[#f9570c] shadow-sm'
                      : isPast
                      ? 'bg-slate-50 border-slate-300'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      STAGE {stg.step} OF 4
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#f9570c]">
                      +{stg.latency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-orange-100 text-[#f9570c]' : 'bg-slate-100 text-slate-500'}`}>
                      {stg.icon}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      {stg.title}
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
                    {stg.tag}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Stage Telemetry Viewer */}
          <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-[#f9570c] font-mono font-bold flex items-center justify-center text-sm border border-orange-200">
                  {stages[activeStage].step}
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    {stages[activeStage].title} – {stages[activeStage].tag}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Hardware Stack: {stages[activeStage].sensors}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Total Pipeline Latency</span>
                <span className="text-sm font-mono font-bold text-[#f9570c]">
                  {activeStage === 0 ? '2 ms' : activeStage === 1 ? '16 ms' : activeStage === 2 ? '24 ms' : '34 ms (Safe Stop)'}
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono leading-relaxed shadow-sm">
              &gt; {stages[activeStage].action}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Ground source: Page 5 of "AI IN TRANSPORTATION.pdf"</span>
              <button
                onClick={() => openAssistantWithQuery('Explain the 4 stages of AI in transportation with detailed formulas and real obstacle examples.')}
                className="text-[#f9570c] hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <span>Ask AI deep dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
