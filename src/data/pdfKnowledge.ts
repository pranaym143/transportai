/**
 * PDF Knowledge Corpus: "AI IN TRANSPORTATION.pdf" (14 Pages)
 * Exact structured curriculum extracted from the primary PDF source.
 */

export interface PDFModule {
  pageNumber: number;
  moduleId: string;
  title: string;
  subtitle: string;
  iconName: string;
  category: 'Fundamentals' | 'Technology & Mechanics' | 'Sector Applications' | 'Impact & Future' | 'Synthesis';
  summary: string;
  pdfExcerpt: string;
  importantPoints: string[];
  realWorldExamples: { title: string; description: string; impact: string }[];
  advantages: string[];
  limitations: string[];
  keyTakeaways: string[];
  sampleQuestions: { question: string; answer: string; examTip: string }[];
  flashcards: { front: string; back: string }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export const PDF_MODULES: PDFModule[] = [
  {
    pageNumber: 1,
    moduleId: 'module-1',
    title: 'Introduction to AI',
    subtitle: 'Core principles, machine intelligence, and foundational data processing',
    iconName: 'Cpu',
    category: 'Fundamentals',
    summary: 'Artificial Intelligence (AI) is the simulation of human intelligence processes by computer systems, enabling machines to learn, reason, solve problems, and automate tasks.',
    pdfExcerpt: 'Artificial Intelligence (AI) enables computer systems and machines to perform tasks typically requiring human intelligence. These include data processing, image and sound recognition, adaptive learning, contextual reasoning, problem-solving, and process automation. In modern transportation, AI moves beyond pre-programmed instructions to continuously analyze live streams of environmental data.',
    importantPoints: [
      'Definition of Artificial Intelligence: Machines simulating cognitive functions such as learning and problem-solving.',
      'Data Processing: High-speed ingestion and transformation of sensor inputs into actionable digital knowledge.',
      'Image and Sound Recognition: Computer vision and acoustic signal processing for environment perception.',
      'Cognitive Pillars: Learning from feedback loops, reasoning under uncertainty, dynamic problem solving, and end-to-end automation.',
      'Key Difference: Traditional automation executes rigid rules, whereas AI adapts to novel road and transit conditions.'
    ],
    realWorldExamples: [
      {
        title: 'Computer Vision Perception',
        description: 'Deep neural networks processing 60 video frames per second to recognize pedestrians, vehicles, and road hazards.',
        impact: 'Reduces reaction times from human average (1.5 seconds) down to sub-50 milliseconds.'
      },
      {
        title: 'Acoustic Siren Detection',
        description: 'Microphone arrays inside intelligent vehicles analyzing acoustic signatures to yield right-of-way to ambulances before they are visible.',
        impact: 'Emergency vehicle response times improved by up to 28% in congested corridors.'
      }
    ],
    advantages: [
      'Continuous operation without fatigue or loss of attention',
      'Instantaneous multi-source data processing',
      'Scalable automation across millions of transport nodes'
    ],
    limitations: [
      'High computational power and specialized silicon required',
      'Vulnerability to unexpected edge cases not present in training datasets',
      'Difficulty in explaining deep neural network decisions ("black box" problem)'
    ],
    keyTakeaways: [
      'AI transforms vehicles from passive mechanical assemblies into cognitive autonomous agents.',
      'Data is the foundational fuel for machine learning algorithms in transportation.'
    ],
    sampleQuestions: [
      {
        question: 'Define Artificial Intelligence in the context of transportation.',
        answer: 'AI is the simulation of human cognitive functions—such as learning, reasoning, sensory recognition, and automated problem-solving—enabling transport systems to perceive their environment and make safe driving or routing decisions independently.',
        examTip: 'Always mention data processing, image/sound recognition, and adaptive learning to score full marks.'
      }
    ],
    flashcards: [
      {
        front: 'What is the core definition of Artificial Intelligence according to the PDF?',
        back: 'The simulation of human intelligence by machines to perform data processing, recognition, learning, reasoning, and automation.'
      },
      {
        front: 'How does AI differ from traditional rule-based vehicle automation?',
        back: 'Traditional automation follows hardcoded static logic, while AI adapts dynamically to new scenarios through continuous data learning.'
      }
    ],
    quizQuestions: [
      {
        question: 'According to Page 1 of the PDF, which cognitive abilities are simulated by Artificial Intelligence?',
        options: [
          'Mechanical combustion and thermal transfer',
          'Learning, reasoning, problem-solving, and automation',
          'Manual steering and human visual perception only',
          'Static rule execution without data processing'
        ],
        correctIndex: 1,
        explanation: 'Page 1 specifies that AI simulates human intelligence processes: data processing, image/sound recognition, learning, reasoning, problem-solving, and automation.'
      }
    ]
  },
  {
    pageNumber: 2,
    moduleId: 'module-2',
    title: 'AI in Transportation',
    subtitle: 'Smarter mobility, engine diagnostics, road detection, and smart parking',
    iconName: 'Car',
    category: 'Fundamentals',
    summary: 'AI enhances transportation systems to become smarter, safer, and more efficient through engine performance analysis, optical road detection, and intelligent parking ecosystems.',
    pdfExcerpt: 'AI in transportation focuses on creating smarter and safer transit systems. Key implementations include engine performance analysis for fuel optimization and mechanical health, road sign and lane detection to prevent drifting and violations, and smart parking systems that direct drivers to open spaces, eliminating urban search congestion.',
    importantPoints: [
      'Smarter and Safer Transit: AI minimizes human error, which accounts for over 90% of conventional road collisions.',
      'Engine Performance Analysis: Continuous telemetry monitoring of air-to-fuel ratios, exhaust temperatures, and battery thermal states.',
      'Road Sign & Lane Detection: Optical computer vision identifying speed limits, stop signs, yield warnings, and lane boundaries in real time.',
      'Smart Parking Systems: Sensor networks and cameras detecting vacant slots and guiding drivers via navigation apps, cutting city cruising time by 30%.'
    ],
    realWorldExamples: [
      {
        title: 'Real-Time Engine Telemetry Diagnostics',
        description: 'Heavy freight trucks equipped with AI ECUs that calculate optimal gear shifting and torque to save up to 15% diesel.',
        impact: 'Extends engine lifespan by 200,000 km while lowering emissions.'
      },
      {
        title: 'Municipal Smart Parking Guidance',
        description: 'Smart parking lots equipped with overhead ultrasonic sensors and plate recognition cameras.',
        impact: 'Reduces parking search traffic, which typically generates 30% of downtown congestion.'
      }
    ],
    advantages: [
      'Immediate mitigation of human driving errors',
      'Optimized fuel and battery consumption profiles',
      'Streamlined urban vehicle circulation through automated parking discovery'
    ],
    limitations: [
      'Degraded lane detection during heavy snow, worn road markings, or sun glare',
      'Retrofitting legacy vehicle fleets with advanced sensors requires capital expenditure'
    ],
    keyTakeaways: [
      'AI creates tangible safety improvements across both vehicle mechanics (engine analysis) and active navigation (lane detection, parking).'
    ],
    sampleQuestions: [
      {
        question: 'Explain how AI improves smart parking systems and engine performance analysis.',
        answer: 'Smart parking uses sensors/cameras to track parking vacancy in real-time, routing drivers directly to free spots and eliminating traffic jams. Engine performance analysis monitors combustion parameters and thermal data to optimize fuel burn and predict maintenance needs.',
        examTip: 'Cite both parking time reduction and preventative engine optimization.'
      }
    ],
    flashcards: [
      {
        front: 'What are the three primary applications highlighted in Module 2?',
        back: '1. Engine performance analysis, 2. Road sign and lane detection, 3. Smart parking systems.'
      },
      {
        front: 'How does smart parking reduce urban traffic congestion?',
        back: 'By guiding drivers directly to vacant spots, preventing the 30% of downtown traffic caused by searching for parking.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which of the following is specifically identified in Page 2 as an application of AI in transportation?',
        options: [
          'Engine performance analysis and road sign/lane detection',
          'Manual steering cable replacement with steel wires',
          'Eliminating all digital instruments from vehicle cabins',
          'Restricting all vehicles to fixed subterranean rails'
        ],
        correctIndex: 0,
        explanation: 'Page 2 highlights smarter/safer transit, engine performance analysis, road sign and lane detection, and smart parking systems.'
      }
    ]
  },
  {
    pageNumber: 3,
    moduleId: 'module-3',
    title: 'History and Evolution',
    subtitle: 'From manual navigation to computer automation, GPS, and deep-learning vehicles',
    iconName: 'History',
    category: 'Fundamentals',
    summary: 'Transportation has evolved across four distinct eras: early manual travel, 1960s–1980s computer automation, 1990s–2000s GPS and intelligent systems, and 2010s–present AI-powered autonomous vehicles.',
    pdfExcerpt: 'The timeline of transportation technology spans four foundational eras:\n1. Early Era: Manual transportation reliant solely on human drivers, mechanical linkages, and high human error rates.\n2. 1960s–1980s: Computer-based automation introduction—early electronic fuel injection (EFI), basic computerized signaling, and anti-lock braking systems (ABS).\n3. 1990s–2000s: GPS and Intelligent Transport Systems (ITS)—satellite navigation, digital road maps, electronic toll collection, and adaptive cruise control.\n4. 2010s–Present: AI-powered vehicles and smart traffic—deep learning neural networks, multi-sensor perception, and connected vehicle ecosystems.',
    importantPoints: [
      'Early Era: 100% human-operated mechanical vehicles with no computer assistance and zero sensor telemetry.',
      '1960s–1980s: First microcontrollers integrated into cars for engine timing, fuel injection, and hydraulic ABS.',
      '1990s–2000s: Satellite GPS opened commercial navigation, onboard diagnostics (OBD-II), and basic driver assist.',
      '2010s–Present: Explosion of GPU compute, deep neural networks, LiDAR, computer vision, and real-time algorithmic traffic control.'
    ],
    realWorldExamples: [
      {
        title: 'Transition from Paper Maps to Dynamic GPS',
        description: 'Drivers transitioning from static folded paper maps to satellite GPS systems with real-time route calculation in the late 1990s.',
        impact: 'Cut route planning errors and established the digital mapping infrastructure required for autonomous vehicles.'
      },
      {
        title: 'Evolution of Cruise Control',
        description: 'Evolving from 1970s mechanical throttle locks to 1990s radar adaptive cruise control and 2020s deep-learning Autopilot.',
        impact: 'Paved the evolutionary pathway for full Society of Automotive Engineers (SAE) autonomy levels.'
      }
    ],
    advantages: [
      'Progressive reduction in traffic accidents across four technological decades',
      'Standardized global navigation through GPS satellite constellations',
      'Transition from reactive mechanical repairs to predictive software updates'
    ],
    limitations: [
      'Early automated systems lacked perceptual intelligence and could not interpret context',
      'Legacy roadway infrastructure was built for human drivers, creating friction during technological transitions'
    ],
    keyTakeaways: [
      'AI in transportation is not an abrupt invention, but the culmination of a 60-year progression from analog mechanics to digital intelligence.'
    ],
    sampleQuestions: [
      {
        question: 'Trace the four developmental eras of transportation technology as outlined in the PDF.',
        answer: '1. Early Manual: Human-controlled, mechanical linkages. 2. 1960s–1980s: Computer-based automation (EFI, ABS). 3. 1990s–2000s: GPS and Intelligent Transport Systems (satellite nav, tolling). 4. 2010s–Present: AI-powered autonomous vehicles and smart traffic networks.',
        examTip: 'Structure your answer with the exact decade groupings mentioned in Page 3.'
      }
    ],
    flashcards: [
      {
        front: 'What major advancement characterized the 1990s–2000s era in transportation history?',
        back: 'The adoption of GPS (Global Positioning System) and Intelligent Transport Systems (ITS) with digital road maps.'
      },
      {
        front: 'When did deep learning and AI-powered autonomous vehicles emerge into mainstream transportation?',
        back: 'From the 2010s to the present day.'
      }
    ],
    quizQuestions: [
      {
        question: 'According to Page 3 of the PDF, which technological milestone characterized the 1960s–1980s in transportation?',
        options: [
          'Satellite-based GPS smartphones',
          'Computer-based automation including early electronic control and ABS',
          'Level 5 fully autonomous flying cars',
          'Horse-drawn carriage regulation'
        ],
        correctIndex: 1,
        explanation: 'Page 3 defines the 1960s–1980s as the era of computer-based automation, introducing microprocessors and electronic control.'
      }
    ]
  },
  {
    pageNumber: 4,
    moduleId: 'module-4',
    title: 'AI in Public Transportation',
    subtitle: 'Transit optimization, accessibility aids, predictive arrival times, and real-world platforms',
    iconName: 'Bus',
    category: 'Sector Applications',
    summary: 'Public transit systems utilize AI to balance fleet dispatch, provide predictive arrival times, enhance accessibility for persons with disabilities, and coordinate smart signals.',
    pdfExcerpt: 'AI in Public Transportation transforms urban commuting through:\n- Traffic management: Dynamic fleet re-balancing and priority lane management.\n- Accessibility assistance: Intelligent boarding aids, automated audio-visual guidance for disabled and elderly passengers.\n- Bus and train arrival predictions: Predictive algorithms accounting for live congestion, weather, and passenger boarding delays.\n- Real-world platforms: Tesla autonomous driving systems, Google Maps crowd-sourced transit routing, and adaptive smart traffic signal networks.',
    importantPoints: [
      'Predictive Arrival Times: Replacing static timetables with dynamic machine learning arrival estimates accurate within seconds.',
      'Accessibility Assistance: AI-guided automated ramps, visual-speech translation for hearing-impaired travelers, and crowd-density alerts.',
      'Real-World Benchmark Systems: Tesla Autopilot/FSD fleet learning, Google Maps predictive congestion routing, and smart traffic lights.',
      'Grid Level Optimization: Synchronizing bus, light rail, and subway schedules to prevent commuter bottlenecks.'
    ],
    realWorldExamples: [
      {
        title: 'Google Maps Traffic Prediction',
        description: 'Ingesting billions of anonymized smartphone location pings and historical transit patterns to predict delays on public bus routes.',
        impact: 'Saves millions of commuter hours weekly and optimizes public transit schedules.'
      },
      {
        title: 'Intelligent Transit Signal Priority (TSP)',
        description: 'Buses transmitting wireless priority requests to upcoming traffic lights when running behind schedule.',
        impact: 'Reduces transit delays by 18% without creating cross-traffic congestion.'
      }
    ],
    advantages: [
      'High transit reliability encouraging modal shift away from private cars',
      'Inclusive mobility for passengers with physical or cognitive disabilities',
      'Lower municipal operational costs through automated route dispatching'
    ],
    limitations: [
      'Requires substantial municipal capital investment in connected transit infrastructure',
      'Accuracy depends on steady GPS signal coverage in urban canyons and tunnels'
    ],
    keyTakeaways: [
      'AI transforms public transportation from rigid, unpredictable schedules into a responsive, accessible public service.'
    ],
    sampleQuestions: [
      {
        question: 'Name three key ways AI enhances public transit according to Page 4.',
        answer: '1. Traffic management and priority dispatching. 2. Accessibility assistance for disabled/elderly passengers. 3. Real-time predictive bus and train arrival times (exemplified by Google Maps and smart signals).',
        examTip: 'Cite the real-world platforms mentioned: Tesla, Google Maps, and smart traffic lights.'
      }
    ],
    flashcards: [
      {
        front: 'How does AI improve accessibility in public transportation?',
        back: 'Through automated ramps, voice/visual assistance for visually and hearing impaired travelers, and crowd-density guidance.'
      },
      {
        front: 'Which prominent real-world platforms are cited on Page 4 of the PDF?',
        back: 'Tesla (autonomous vision), Google Maps (predictive routing), and smart traffic signal networks.'
      }
    ],
    quizQuestions: [
      {
        question: 'On Page 4 of the PDF, which prominent platforms are explicitly cited as real-world examples of AI in transit and mobility?',
        options: [
          'Tesla, Google Maps, and smart traffic signals',
          'Steam locomotive controllers and telegram networks',
          'Analog punch card scheduling machines',
          'Paper timetable printers'
        ],
        correctIndex: 0,
        explanation: 'Page 4 explicitly references Tesla, Google Maps, and smart traffic signal systems as premier applications.'
      }
    ]
  },
  {
    pageNumber: 5,
    moduleId: 'module-5',
    title: 'How AI Works in Transportation',
    subtitle: 'The 4-stage cognitive loop: Data Collection, Analysis, Decision-Making, and System Response',
    iconName: 'Workflow',
    category: 'Technology & Mechanics',
    summary: 'The operational architecture of AI in transportation operates through a continuous four-stage pipeline: Data Collection, Information Analysis, Decision-Making, and System Response.',
    pdfExcerpt: 'AI systems in transportation execute a continuous four-stage operational loop:\n1. Data Collection: Gathering environmental and vehicle parameters via sensors, cameras, radar, and GPS.\n2. Information Analysis: Neural networks and processors filter noise, extract features, and classify objects.\n3. Decision-Making: Algorithmic assessment of speed, distance, trajectory, and safety regulations.\n4. System Response: Physical actuators execute braking, steering, acceleration, or signal switching.\nExample: In a self-driving car, cameras detect an obstacle, processors identify it as a pedestrian at 30 meters, the decision engine computes required stopping distance, and electronic actuators engage the anti-lock brakes within 35 milliseconds.',
    importantPoints: [
      'Stage 1 – Data Collection: Raw data ingestion from optical cameras, millimeter-wave radar, LiDAR, ultrasonic sensors, and satellite GPS.',
      'Stage 2 – Information Analysis: Edge compute units process point clouds and video frames to classify objects and measure relative velocities.',
      'Stage 3 – Decision-Making: Path-planning algorithms simulate alternative trajectories and choose the safest compliance maneuver.',
      'Stage 4 – System Response: Drive-by-wire electronic actuators translate digital commands into physical steering, throttle, or braking actions.',
      'The Obstacle Detection Benchmark: Microsecond sensor-to-actuator execution loop prevents collisions before human reaction thresholds.'
    ],
    realWorldExamples: [
      {
        title: 'Emergency Pedestrian Braking (AEB)',
        description: 'Camera and radar detect an unexpected pedestrian walking into the road. The system executes the full 4-stage loop.',
        impact: 'Executes full emergency braking within 35ms—saving pedestrian lives in low-visibility nighttime conditions.'
      },
      {
        title: 'Adaptive Intersection Light Switching',
        description: 'Cameras count waiting vehicles (Collection) -> Vision model calculates queue (Analysis) -> Timer calculates green wave (Decision) -> Relays flip light green (Response).',
        impact: 'Prevents empty green light cycles and cuts arterial delays by up to 30%.'
      }
    ],
    advantages: [
      'End-to-end latency below 50 milliseconds compared to 1,500 milliseconds for human drivers',
      'Simultaneous 360-degree environmental awareness with zero blind spots',
      'Deterministic execution of safety protocols without emotional or panicky reactions'
    ],
    limitations: [
      'Sensor blinding due to heavy mud, direct sun glare, or torrential downpours',
      'Compute throttle under extreme thermal temperatures in automotive hardware'
    ],
    keyTakeaways: [
      'The four-stage loop (Collect -> Analyze -> Decide -> Respond) is the universal architectural foundation of all AI mobility systems.'
    ],
    sampleQuestions: [
      {
        question: 'Detail the 4 steps of how AI works in transportation with a self-driving car obstacle detection example.',
        answer: '1. Data Collection: Cameras & radar capture the scene. 2. Analysis: Vision algorithms classify an obstacle (e.g. pedestrian 35m ahead). 3. Decision-Making: The AI calculates trajectory, braking distance, and decides to perform emergency stop. 4. System Response: Actuators engage brakes immediately.',
        examTip: 'List each of the 4 steps in numbered order and finish with the pedestrian example.'
      }
    ],
    flashcards: [
      {
        front: 'What are the 4 fundamental stages of how AI works in transportation?',
        back: '1. Data Collection -> 2. Information Analysis -> 3. Decision-Making -> 4. System Response.'
      },
      {
        front: 'In Stage 4 (System Response), what physically carries out the AI command?',
        back: 'Drive-by-wire electronic actuators that steer the wheel, engage brakes, or modulate engine throttle.'
      }
    ],
    quizQuestions: [
      {
        question: 'What is the correct sequence of the 4 stages of AI operation in transportation according to Page 5?',
        options: [
          'Decision-Making -> System Response -> Data Collection -> Information Analysis',
          'Data Collection -> Information Analysis -> Decision-Making -> System Response',
          'Information Analysis -> Data Collection -> System Response -> Decision-Making',
          'System Response -> Data Collection -> Information Analysis -> Decision-Making'
        ],
        correctIndex: 1,
        explanation: 'Page 5 defines the cognitive cycle: 1. Data Collection, 2. Information Analysis, 3. Decision-Making, 4. System Response.'
      }
    ]
  },
  {
    pageNumber: 6,
    moduleId: 'module-6',
    title: 'AI in Automobiles',
    subtitle: 'Self-driving vehicles, sensor fusion, ultrasonic, radar, and lane detection',
    iconName: 'ShieldCheck',
    category: 'Technology & Mechanics',
    summary: 'Automobiles leverage multi-sensor fusion—including ultrasonic proximity sensors, millimeter-wave radar, and optical cameras—to power automated braking, lane centering, and self-driving autonomy.',
    pdfExcerpt: 'AI in automobiles empowers modern vehicles to perceive, react, and steer autonomously. Critical hardware and algorithmic components include:\n- Self-driving cars: Processing driving environments across SAE autonomy tiers.\n- Obstacle identification: Neural networks trained on millions of driving scenarios.\n- Ultrasonic sensors: High-frequency sound wave transducers for short-range detection (0-5m) used in parking and low-speed maneuvers.\n- Braking and lane detection: Computer vision tracking lane striping and actuating Automatic Emergency Braking (AEB).\n- Radar sensors: Millimeter-wave radio transceivers capable of penetrating fog, rain, snow, and darkness to compute target velocity via the Doppler effect.',
    importantPoints: [
      'Self-Driving Autonomy: Gradual handoff of dynamic driving tasks from human to autonomous compute stacks.',
      'Multi-Sensor Fusion: Combining optical cameras (high resolution), radar (weather penetration & velocity), and ultrasonic sensors (proximity).',
      'Ultrasonic Transducers: Ideal for close-quarters proximity (up to 5m) around bumpers for parking assist and curb detection.',
      'Radar Sensors: Millimeter-wave signals unaffected by inclement weather, dust, or blinding solar glare.',
      'Active Safety Interlocks: Automatic Emergency Braking (AEB), Lane Keeping Assist (LKA), and Blind Spot Monitoring (BSM).'
    ],
    realWorldExamples: [
      {
        title: 'Radar Doppler Velocity Tracking',
        description: 'Automotive radar bouncing 77 GHz radio waves off a decelerating lead vehicle two cars ahead.',
        impact: 'Detects sudden highway pile-ups before the driver or front cameras can visually see the brake lights.'
      },
      {
        title: 'Lane Keep Assist (LKA) via Optical Vision',
        description: 'Monocular windshield camera analyzing lane contrast, road shoulders, and reflective road cat-eyes.',
        impact: 'Prevents unintentional highway departure accidents, which cause over 25% of fatal single-vehicle crashes.'
      }
    ],
    advantages: [
      'Redundant multi-sensor perception eliminates individual sensor weaknesses',
      'Radar provides all-weather 24/7 vision through dense fog and blinding blizzards',
      'Ultrasonic sensors deliver sub-centimeter accuracy for tight urban parking'
    ],
    limitations: [
      'High cost of advanced sensor suites and redundant steer-by-wire hardware',
      'Ultrasonic sensors have very limited operational range (under 5 meters)'
    ],
    keyTakeaways: [
      'Automotive AI relies on sensor fusion: cameras see detail, radar sees speed through weather, and ultrasonics guard close boundaries.'
    ],
    sampleQuestions: [
      {
        question: 'Differentiate between ultrasonic sensors and radar sensors in autonomous automobiles.',
        answer: 'Ultrasonic sensors emit high-frequency sound waves effective for short ranges (0-5 meters), primarily used in parking assist. Radar sensors emit millimeter-wave radio signals that penetrate adverse weather (rain, fog, darkness), reach long ranges (over 150m), and measure target speed via Doppler shift.',
        examTip: 'Highlight the difference in physical medium (sound waves vs radio waves) and operational range.'
      }
    ],
    flashcards: [
      {
        front: 'What is the operational distance and primary role of ultrasonic sensors in cars?',
        back: 'Short-range (0–5 meters), used primarily for parking assist, curb detection, and close-proximity alerts.'
      },
      {
        front: 'Why is millimeter-wave radar essential for automobile safety in severe weather?',
        back: 'Radar penetrates rain, fog, dust, and darkness where optical cameras become blind, while measuring speed via the Doppler effect.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which sensor type in automobiles is best suited for short-range detection (0–5 meters) such as parking assistance according to Page 6?',
        options: [
          'Ultrasonic sensors',
          'Intercontinental satellite dishes',
          'Long-range weather radar',
          'Laser altimeters'
        ],
        correctIndex: 0,
        explanation: 'Page 6 highlights ultrasonic sensors as high-frequency sound transducers for short-range detection (0–5m) used in parking.'
      }
    ]
  },
  {
    pageNumber: 7,
    moduleId: 'module-7',
    title: 'AI in Traffic Management',
    subtitle: 'Smart traffic signals, inductive loops, computer vision cameras, and congestion reduction',
    iconName: 'TrafficCone',
    category: 'Sector Applications',
    summary: 'City traffic networks deploy AI-driven traffic signals, inductive pavement loops, computer vision cameras, and GPS rerouting to eliminate bottlenecks and reduce vehicle congestion.',
    pdfExcerpt: 'Urban traffic congestion is mitigated through intelligent infrastructure systems:\n- Smart traffic signals: Dynamic timing algorithms that adjust green/red signal duration based on actual live queue lengths rather than fixed timers.\n- Inductive loop sensors: Coils of wire embedded beneath the road surface that detect changes in electromagnetic inductance caused by metallic vehicle chassis.\n- Traffic cameras: Edge AI computer vision tracking vehicle counts, pedestrian crossings, and illegal lane blockages.\n- GPS alternative routes: Real-time traffic dispersal algorithms routing traffic through under-utilized corridors.\n- Congestion reduction: Decreasing gridlock, carbon emissions, and driver travel times across arterial corridors.',
    importantPoints: [
      'Inductive Loop Detectors: Embedded wire coils in pavement acting as metallic mass sensors to trigger signal changes.',
      'Dynamic Phase Allocation: Signals stay green longer for dense corridors and terminate empty phases immediately.',
      'Edge Computer Vision: High-definition cameras identifying lane blockages, accidents, and pedestrian jaywalking in real time.',
      'GPS Alternative Routing: Coordinating city-wide traffic volume across alternative side streets without bottlenecking residential zones.',
      'Macro Impact: Studies cited in intelligent traffic management demonstrate 20% to 35% reductions in intersection idle times.'
    ],
    realWorldExamples: [
      {
        title: 'Adaptive Green Corridor Wave',
        description: 'Smart signals communicating along an 8-kilometer avenue to coordinate green lights for platoons of vehicles.',
        impact: 'Cuts stop-and-go events by 40% and drastically lowers citywide vehicle emissions.'
      },
      {
        title: 'Inductive Loop Signal Triggers',
        description: 'Left-turn lanes with embedded inductive loops that instantly detect waiting vehicles and insert a protected turn arrow.',
        impact: 'Eliminates wasted signal time when no vehicles are waiting to turn.'
      }
    ],
    advantages: [
      'Measurable reduction in commuter fuel consumption and tailpipe carbon output',
      'Immediate emergency service vehicle preemption (green light clearance for fire trucks)',
      'Data-driven municipal urban planning based on real traffic count metrics'
    ],
    limitations: [
      'Pavement cuts required to install and repair inductive loop sensors cause road wear',
      'Extreme camera lens occlusion from bird droppings, soot, or heavy snow'
    ],
    keyTakeaways: [
      'Smart traffic systems transform intersections from rigid static countdowns into dynamic, sensor-responsive nodes.'
    ],
    sampleQuestions: [
      {
        question: 'Explain the working and role of inductive loop sensors and smart traffic signals in traffic management.',
        answer: 'Inductive loop sensors are wire coils embedded in the road pavement that detect changes in inductance when a metallic car passes over them. Smart traffic signals use this data, along with camera feeds, to adjust green light durations dynamically, clearing long queues and reducing citywide congestion.',
        examTip: 'Remember to mention electromagnetic inductance and metallic vehicle chassis detection.'
      }
    ],
    flashcards: [
      {
        front: 'What is an inductive loop sensor and where is it installed?',
        back: 'A coil of wire embedded beneath the roadway pavement that detects the metallic mass of vehicles through electromagnetic inductance.'
      },
      {
        front: 'How do smart traffic signals differ from conventional traffic lights?',
        back: 'Conventional lights run on static preset timers; smart signals adjust green light durations in real time based on actual vehicle queues.'
      }
    ],
    quizQuestions: [
      {
        question: 'How do inductive loop sensors detect vehicles at an intersection as described on Page 7?',
        options: [
          'By reading driver fingerprints on the steering wheel',
          'By detecting changes in electromagnetic inductance caused by the metallic vehicle mass',
          'By satellite optical magnification through cloud cover',
          'By weighing vehicle rubber tires on acoustic scales'
        ],
        correctIndex: 1,
        explanation: 'Page 7 specifies that inductive loop sensors are wire coils in the pavement detecting changes in electromagnetic inductance from metallic vehicle chassis.'
      }
    ]
  },
  {
    pageNumber: 8,
    moduleId: 'module-8',
    title: 'AI in Aviation',
    subtitle: 'Flight monitoring, weather navigation, ADS-B, predictive maintenance, and the vital human pilot',
    iconName: 'Plane',
    category: 'Sector Applications',
    summary: 'Aviation harnesses AI for real-time flight monitoring, predictive weather navigation, ADS-B tracking, and predictive airframe maintenance, while human pilots remain indispensable for critical decision-making.',
    pdfExcerpt: 'AI in Aviation enhances commercial and cargo aerospace operations through:\n- Flight monitoring: Continuous telemetry analysis of flight control surfaces, engine thrust, and fuel burn.\n- Navigation and weather analysis: AI weather models analyzing satellite imagery to circumvent dangerous turbulence, microbursts, and storm cells.\n- ADS-B (Automatic Dependent Surveillance-Broadcast): Satellite-based surveillance where aircraft broadcast their precise position, altitude, and velocity for air traffic management.\n- Aircraft maintenance sensors: Vibration and thermal analysis predicting component failure before takeoff.\n- Human pilots remain important: Despite advanced AI co-pilots and auto-flight capabilities, human captains are vital for non-standard emergencies, ethical dilemmas, and ultimate flight safety authority.',
    importantPoints: [
      'ADS-B Technology: High-precision satellite-guided flight tracking replacing legacy rotating ground radar.',
      'Weather Optimization: Rerouting around convective storms to save thousands of gallons of jet fuel per trans-oceanic flight.',
      'Predictive Maintenance (PHM): Engine sensors detecting microscopic turbine blade imbalances before mechanical failure.',
      'Automated Flight Envelope Protection: Flight computers preventing aerodynamic stalls or excessive structural g-loads.',
      'The Indispensable Human Pilot: The PDF firmly emphasizes that human pilots remain essential for complex intuition, ethical judgment, and managing unpredictable emergencies.'
    ],
    realWorldExamples: [
      {
        title: 'ADS-B Air Traffic Deconfliction',
        description: 'Aircraft transmitting positional coordinates twice per second to ground stations and surrounding planes.',
        impact: 'Enables safe reduced separation minima in congested airspace, expanding skyway capacity.'
      },
      {
        title: 'Jet Engine Predictive Health Monitoring',
        description: 'Turbofan engines streaming thousands of operational parameters per flight to cloud AI diagnostics.',
        impact: 'Prevents in-flight engine shutdowns and avoids unscheduled passenger flight cancellations.'
      }
    ],
    advantages: [
      'Unprecedented aerospace safety record through automated envelope monitoring',
      'Optimal fuel burn profiles reducing global airline carbon emissions',
      'Early detection of mechanical fatigue before catastrophic airframe failure'
    ],
    limitations: [
      'Software bugs or corrupted angle-of-attack sensor data can cause flight control anomalies',
      'Over-reliance on automation can degrade manual handling proficiency among junior aviators'
    ],
    keyTakeaways: [
      'Aviation exemplifies human-machine teaming: AI manages complex sensor streams, but licensed human captains maintain ultimate authority.'
    ],
    sampleQuestions: [
      {
        question: 'What is ADS-B and why do human pilots remain important despite AI in aviation?',
        answer: 'ADS-B (Automatic Dependent Surveillance-Broadcast) is a satellite-based surveillance system where aircraft broadcast their GPS position and velocity for traffic management. Human pilots remain vital because extreme emergencies, unexpected equipment malfunctions, and ethical safety decisions require human judgment that AI cannot replicate.',
        examTip: 'Explicitly state that human pilots remain important—a core emphasis on Page 8 of the PDF.'
      }
    ],
    flashcards: [
      {
        front: 'What does ADS-B stand for and what is its purpose in aviation?',
        back: 'Automatic Dependent Surveillance-Broadcast: aircraft broadcast GPS position, altitude, and velocity for real-time tracking.'
      },
      {
        front: 'Does AI replace human pilots in aviation according to the PDF?',
        back: 'No. The PDF emphasizes that human pilots remain indispensable for safety, emergency handling, and critical decision-making.'
      }
    ],
    quizQuestions: [
      {
        question: 'According to Page 8 of the PDF, what is the role of human pilots in modern AI-assisted aviation?',
        options: [
          'Human pilots are completely obsolete and no longer permitted in cockpits',
          'Human pilots remain important and vital for critical decision-making, emergencies, and ultimate flight safety',
          'Human pilots are only used to refuel airplanes on the tarmac',
          'Human pilots are replaced by fully autonomous delivery drones'
        ],
        correctIndex: 1,
        explanation: 'Page 8 clearly underlines that despite advanced AI monitoring and automation, human pilots remain important and indispensable.'
      }
    ]
  },
  {
    pageNumber: 9,
    moduleId: 'module-9',
    title: 'AI in Logistics and Delivery',
    subtitle: 'Route optimization, real-time tracking, automated inventory, and autonomous fleet operations',
    iconName: 'PackageCheck',
    category: 'Sector Applications',
    summary: 'Modern supply chains rely on AI for solving complex vehicle routing problems, tracking shipments in real time, running robotic fulfillment centers, and optimizing autonomous fleets.',
    pdfExcerpt: 'AI in Logistics and Delivery revolutionizes global supply chain velocity:\n- Route optimization: Machine learning algorithms solving complex multi-stop routing problems considering traffic, customer time windows, and cargo weight.\n- Real-time delivery tracking: Sub-minute predictive delivery estimates and automated exception handling.\n- Inventory management: Computer vision sorting systems, automated storage and retrieval systems (ASRS), and predictive restocking.\n- Fleet management: Monitoring driver fatigue, vehicle wear, fuel burn, and optimal cargo load distribution.',
    importantPoints: [
      'Route Optimization: Algorithmic resolution of the Traveling Salesperson Problem across thousands of urban delivery drops.',
      'Real-Time Tracking: Hyper-accurate dynamic delivery windows reducing failed first-attempt deliveries.',
      'Automated Warehousing: Vision-guided robotic sorting arms and automated guided vehicles (AGVs) expediting parcel movement.',
      'Fleet Telematics: AI monitoring acceleration, harsh braking, and idle times to lower commercial fleet fuel expenditure by 12–20%.',
      'Autonomous Delivery Pods: Deployment of autonomous last-mile vans and aerial courier drones for rapid transport.'
    ],
    realWorldExamples: [
      {
        title: 'Dynamic Courier Route Optimization',
        description: 'AI algorithms recomputing parcel delivery sequences whenever unexpected traffic congestion or road closures occur.',
        impact: 'Saves major parcel carriers tens of millions of driving miles and millions of gallons of fuel annually.'
      },
      {
        title: 'Autonomous Hub & Last-Mile Delivery (e.g. Swift Logistics)',
        description: 'Automated micro-fulfillment centers where robotic sorting meets electric delivery vans for rapid parcel dispatch.',
        impact: 'Enables same-day delivery with 99% on-time reliability and lower operating overhead.'
      }
    ],
    advantages: [
      'Significant reduction in delivery mileage and urban carbon footprint',
      'Automated 24/7 warehouse sorting without inventory discrepancy bottlenecks',
      'Predictive dispatching anticipating regional order surges before they occur'
    ],
    limitations: [
      'High initial capital cost for warehouse robotics and fleet telematics units',
      'Physical last-mile delivery bottlenecks in apartment complexes without automated drop boxes'
    ],
    keyTakeaways: [
      'Logistics AI connects digital routing algorithms with physical fulfillment, making modern e-commerce rapid and sustainable.'
    ],
    sampleQuestions: [
      {
        question: 'Outline the four core pillars of AI in logistics and delivery described in Module 9.',
        answer: '1. Route optimization (solving delivery routes considering traffic/delays). 2. Real-time delivery tracking (predictive customer delivery updates). 3. Inventory management (automated sorting and predictive stocking). 4. Fleet management (telematics, fuel efficiency, driver safety).',
        examTip: 'Cite all four pillars directly from Page 9.'
      }
    ],
    flashcards: [
      {
        front: 'What are the four pillars of AI in logistics described on Page 9?',
        back: '1. Route optimization, 2. Real-time delivery tracking, 3. Inventory management, 4. Fleet management.'
      },
      {
        front: 'How does AI route optimization benefit delivery fleets?',
        back: 'By calculating the most efficient delivery paths based on live traffic, minimizing miles traveled, fuel burn, and delivery delays.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which of the following is NOT one of the core pillars of AI in Logistics and Delivery on Page 9?',
        options: [
          'Route optimization and real-time delivery tracking',
          'Inventory management and fleet management',
          'Manual paper ledger sorting and unmonitored driving',
          'Dynamic multi-stop parcel dispatching'
        ],
        correctIndex: 2,
        explanation: 'Page 9 highlights route optimization, real-time tracking, inventory management, and fleet management. Manual paper sorting is the opposite of AI logistics.'
      }
    ]
  },
  {
    pageNumber: 10,
    moduleId: 'module-10',
    title: 'Benefits of AI in Transportation',
    subtitle: 'Danger detection, pollution reduction, cargo efficiency, fuel conservation, and predictive maintenance',
    iconName: 'Sparkles',
    category: 'Impact & Future',
    summary: 'AI delivers transformative benefits across global mobility: immediate danger detection, reduced carbon emissions, streamlined cargo logistics, reduced fuel consumption, and proactive predictive maintenance.',
    pdfExcerpt: 'The primary benefits of Artificial Intelligence in transportation include:\n- Danger detection: Microsecond detection of hazards, lane departures, and distracted driving to avert catastrophic crashes.\n- Pollution reduction: Eco-routing and smooth acceleration minimizing fossil fuel burn and urban particulate emissions.\n- Improved cargo transportation: Enhanced supply chain velocity, reduced deadhead miles, and continuous cargo climate control.\n- Fuel consumption reduction: Algorithmic speed regulation, drafting/platooning, and reduced idling saving up to 20% fuel.\n- Predictive maintenance: Detecting mechanical wear and component fatigue before roadside breakdown.\n- Better navigation: Continuous real-time routing adapting to accidents, weather, and road closures.',
    importantPoints: [
      'Life-Saving Danger Detection: Eliminating human impairment, texting while driving, and micro-sleep risks.',
      'Environmental Sustainability: Reducing greenhouse gas emissions through intelligent traffic synchronization and eco-cruising.',
      'Cargo Efficiency: Minimizing "empty miles" (deadhead driving) where trucks travel without payload.',
      'Fuel Economy: Smart engine mapping and platooning reducing aerodynamic drag across commercial freight.',
      'Zero Roadside Breakdowns: Predictive algorithms replacing reactive repairs with planned maintenance intervals.'
    ],
    realWorldExamples: [
      {
        title: 'Heavy Truck Highway Platooning',
        description: 'AI-linked trucks traveling in close aerodynamic formation with automated synchronized braking.',
        impact: 'Reduces trailing truck fuel consumption by up to 10–12% and decreases highway congestion.'
      },
      {
        title: 'Citywide Emission Reduction via Smart Signals',
        description: 'Synchronized green corridors eliminating repeated vehicle decelerations and accelerations at red lights.',
        impact: 'Cuts local particulate matter (PM2.5) and nitrogen oxide emissions by 15–20% in urban centers.'
      }
    ],
    advantages: [
      'Dramatic reduction in traffic fatalities and serious injuries',
      'Billions of dollars saved annually in commercial fuel and maintenance costs',
      'Smoother, less stressful commuting experiences for global citizens'
    ],
    limitations: [
      'Benefits depend on high market penetration of connected vehicle hardware',
      'Requires clean, high-bandwidth communication networks for real-time data sync'
    ],
    keyTakeaways: [
      'The benefits of AI in mobility span human safety, economic efficiency, and planetary environmental conservation.'
    ],
    sampleQuestions: [
      {
        question: 'Enumerate five key benefits of AI in transportation listed in the PDF.',
        answer: '1. Danger detection (microsecond reaction to road hazards). 2. Pollution reduction (eco-routing and reduced idling). 3. Improved cargo transportation. 4. Fuel consumption reduction (platooning and efficient speed). 5. Predictive maintenance (preventing component breakdowns).',
        examTip: 'Include predictive maintenance and pollution reduction alongside danger detection.'
      }
    ],
    flashcards: [
      {
        front: 'List 5 key benefits of AI in transportation from Page 10 of the PDF.',
        back: 'Danger detection, pollution reduction, improved cargo transport, fuel consumption reduction, and predictive maintenance.'
      },
      {
        front: 'How does AI contribute to pollution reduction in transportation?',
        back: 'Through eco-friendly route planning, reducing idling at red lights, and smoothing vehicle acceleration/deceleration.'
      }
    ],
    quizQuestions: [
      {
        question: 'According to Page 10 of the PDF, which of the following is explicitly listed as a benefit of AI in transportation?',
        options: [
          'Increased fuel waste through permanent idling',
          'Predictive maintenance and pollution reduction',
          'Eliminating all safety sensors from cars',
          'Promoting distracted human driving'
        ],
        correctIndex: 1,
        explanation: 'Page 10 lists danger detection, pollution reduction, improved cargo transportation, fuel consumption reduction, and predictive maintenance as core benefits.'
      }
    ]
  },
  {
    pageNumber: 11,
    moduleId: 'module-11',
    title: 'Disadvantages and Challenges of AI',
    subtitle: 'High deployment costs, system errors, data privacy risks, cyberattacks, job displacement, and dependence',
    iconName: 'AlertTriangle',
    category: 'Impact & Future',
    summary: 'The adoption of AI in transportation faces critical hurdles: exorbitant development costs, technical edge-case errors, personal data privacy exposure, cybersecurity vulnerabilities, workforce displacement, and human skill degradation.',
    pdfExcerpt: 'Despite significant advantages, AI in transportation introduces substantial challenges:\n- High development and installation costs: Specialized compute chips, LiDAR, high-density batteries, and sensor suites create expensive consumer and municipal pricing.\n- System errors: Software bugs, sensor calibration drift, and unmodeled edge cases leading to potential crashes.\n- Personal data exposure: Vehicles capturing cabin video, GPS trip histories, and biometric data raising privacy concerns.\n- Cyberattacks: Risk of malicious actors hacking vehicle control networks, spoofing GPS signals, or disabling traffic infrastructure.\n- Job displacement: Automation posing economic disruption for professional truck drivers, taxi operators, and warehouse workers.\n- Excessive dependence on AI: Over-reliance causing human drivers to lose fundamental vigilance and manual handling skills.',
    importantPoints: [
      'Economic Cost Barrier: Equipping fleets with automotive-grade LiDAR and GPUs costs tens of thousands of dollars per vehicle.',
      'The Edge-Case Problem: Rare weather phenomena, bizarre road obstacles, and ambiguous gestures confound neural networks.',
      'Surveillance & Privacy: Connected cars generating over 25 gigabytes of personal trip, cabin, and location telemetry per hour.',
      'Cybersecurity Threat Surface: Potential remote injection of malicious commands into electronic brake or steering controllers.',
      'Socioeconomic Transition: Reskilling commercial drivers as logistics fleets transition to Level 4 autonomous platforms.',
      'Automation Complacency: Drivers failing to take over in emergency disengagement scenarios due to eroded attentiveness.'
    ],
    realWorldExamples: [
      {
        title: 'Sensor Blinding by Extreme Weather',
        description: 'Heavy blizzards covering optical camera lenses and freezing radar radomes, causing system disengagement.',
        impact: 'Highlights the current gap in all-weather Level 5 autonomy reliability.'
      },
      {
        title: 'Connected Vehicle Cybersecurity Audits',
        description: 'White-hat cybersecurity researchers demonstrating remote takeover of vehicle entertainment and steering modules via cellular networks.',
        impact: 'Prompted automotive regulatory mandates for hardware security modules (HSMs) and encrypted CAN buses.'
      }
    ],
    advantages: [
      'Acknowledging these limitations guides robust safety engineering and legal frameworks',
      'Drives development of fault-tolerant redundant architectures and encrypted communication standards'
    ],
    limitations: [
      'These challenges require concerted international regulatory standards and ethical consensus'
    ],
    keyTakeaways: [
      'Safe transportation AI demands balanced implementation: technical excellence must be matched by cybersecurity hardening and ethical labor transitions.'
    ],
    sampleQuestions: [
      {
        question: 'Discuss four major disadvantages or challenges of AI in transportation outlined in Module 11.',
        answer: '1. High development & installation costs (expensive sensors and computing units). 2. System errors and edge-case failures in extreme weather. 3. Personal data exposure and surveillance risks. 4. Cyberattacks on vehicle control and traffic grids. (Also job displacement and automation complacency).',
        examTip: 'Mention both technical hurdles (system errors/cyberattacks) and socioeconomic factors (cost/job displacement).'
      }
    ],
    flashcards: [
      {
        front: 'What are the six major disadvantages of AI in transportation on Page 11?',
        back: '1. High costs, 2. System errors, 3. Personal data exposure, 4. Cyberattacks, 5. Job displacement, 6. Excessive dependence.'
      },
      {
        front: 'What is automation complacency/excessive dependence in AI transportation?',
        back: 'When human drivers rely so heavily on automated systems that their attention drops and their manual driving skills atrophy.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which of the following is identified on Page 11 of the PDF as a significant risk or disadvantage of AI in transportation?',
        options: [
          'High development and installation costs along with cyberattack risks',
          'Excessive fuel savings that lower energy costs',
          'Elimination of all computing processors from modern cars',
          'Reduction in emergency response times'
        ],
        correctIndex: 0,
        explanation: 'Page 11 identifies high costs, system errors, personal data exposure, cyberattacks, job displacement, and excessive dependence.'
      }
    ]
  },
  {
    pageNumber: 12,
    moduleId: 'module-12',
    title: 'Future of AI in Transportation',
    subtitle: 'Autonomous robo-taxis, flying eVTOLs, V2V communications, smart airports, and zero-accident mobility',
    iconName: 'Rocket',
    category: 'Impact & Future',
    summary: 'The frontier of transportation encompasses fully autonomous vehicle fleets, electric flying cars (eVTOL), digital twin traffic grids, vehicle-to-vehicle (V2V) communication, smart airports, and automated delivery drones.',
    pdfExcerpt: 'The future of AI in transportation will redefine human mobility and urban spaces:\n- Autonomous vehicles: Ubiquitous Level 4 and Level 5 self-driving passenger fleets and commercial trucks.\n- Flying cars (eVTOL): Electric vertical takeoff and landing aircraft managing urban sky corridors with AI deconfliction.\n- Intelligent traffic management: City-wide digital twins dynamically harmonizing traffic across entire metropolitan areas.\n- Vehicle-to-Vehicle (V2V) & V2X communication: Cars sharing sensor perceptions beyond physical line-of-sight around blind corners.\n- Smart airports: Biometric passenger processing, automated baggage logistics, and AI-guided tarmac taxiing.\n- Accident prevention: Striving toward Vision Zero—eliminating human fatality through algorithmic fail-safes.\n- Drone delivery: Autonomous aerial courier corridors delivering life-saving medical supplies and consumer goods within minutes.',
    importantPoints: [
      'Level 5 Autonomy: Steering-wheel-free vehicles capable of operating in any geographic terrain and weather.',
      'Urban Air Mobility (UAM / eVTOL): Autonomous aerial taxis alleviating surface road congestion in mega-cities.',
      'V2X Collective Intelligence: Vehicles wirelessly broadcasting brake status and hazard alerts within 300 meters.',
      'Smart Aviation Terminals: AI automating aircraft turnaround, luggage sorting, and passenger queue management.',
      'Vision Zero: The international goal to achieve zero fatal road traffic accidents through AI safety interlocks.',
      'Drone Logistics: Autonomous sky corridors handling rapid point-to-point delivery of critical cargo.'
    ],
    realWorldExamples: [
      {
        title: 'eVTOL Urban Air Corridors',
        description: 'Autonomous electric aircraft navigating predetermined digital 3D corridors above dense metropolitan traffic.',
        impact: 'Shrinks 90-minute rush hour ground commutes down to 12-minute quiet electric flights.'
      },
      {
        title: 'V2V Collaborative Braking Broadcasts',
        description: 'A lead car hitting an unseen patch of black ice immediately transmits a deceleration warning to trailing vehicles.',
        impact: 'Trailing vehicles begin gentle braking 200 meters before reaching the hazard, preventing highway pile-ups.'
      }
    ],
    advantages: [
      'Near-elimination of traffic fatalities through collaborative machine perception',
      'Reclaiming urban land previously dedicated to sprawling parking lots for green public parks',
      'Rapid equitable mobility access for non-drivers, children, and elderly citizens'
    ],
    limitations: [
      'Requires unified global communication protocols and dedicated 5G/6G spectrum allocation',
      'Airspace management regulations and acoustic noise standards for low-altitude urban drones'
    ],
    keyTakeaways: [
      'The future of transportation will be collaborative, multi-dimensional (land and sky), and fundamentally anchored in AI-driven safety.'
    ],
    sampleQuestions: [
      {
        question: 'Identify and describe three groundbreaking future developments in AI transportation from Page 12.',
        answer: '1. Flying cars / eVTOL aircraft (autonomous electric urban air transit). 2. Vehicle-to-Vehicle (V2V) communication (cars broadcasting hazard telemetry to surrounding vehicles). 3. Drone delivery and smart airports (aerial courier networks and automated passenger terminals).',
        examTip: 'Highlight V2V communication and flying cars as prominent future milestones.'
      }
    ],
    flashcards: [
      {
        front: 'What is V2V communication in future AI transportation?',
        back: 'Vehicle-to-Vehicle communication: vehicles wirelessly sharing sensor perceptions and safety warnings beyond line-of-sight.'
      },
      {
        front: 'What are eVTOL vehicles and what role will AI play in them?',
        back: 'Electric Vertical Takeoff and Landing (flying cars); AI will manage flight stabilization, 3D air corridors, and collision deconfliction.'
      }
    ],
    quizQuestions: [
      {
        question: 'Which future technology highlighted on Page 12 allows vehicles to wirelessly share sensor data beyond physical line-of-sight?',
        options: [
          'Vehicle-to-Vehicle (V2V) and V2X communication',
          'Underground analog pneumatic tubes',
          'Paper telegraph roadside bulletins',
          'Mechanical semaphore flags on car antennas'
        ],
        correctIndex: 0,
        explanation: 'Page 12 highlights Vehicle-to-Vehicle (V2V) and V2X communication as the key mechanism for collaborative vehicle sensing.'
      }
    ]
  },
  {
    pageNumber: 13,
    moduleId: 'module-13',
    title: 'Conclusion',
    subtitle: 'Synthesizing safety, daily convenience, and the intelligent mobility paradigm',
    iconName: 'Award',
    category: 'Synthesis',
    summary: 'Artificial Intelligence marks a generational leap in global mobility—drastically improving human safety, elevating daily commuter convenience, and revolutionizing urban traffic management.',
    pdfExcerpt: 'Conclusion:\nArtificial Intelligence is fundamentally transforming how humanity moves. By systematically eliminating human error, streamlining multi-modal transit networks, and orchestrating complex logistics, AI elevates safety, commuter convenience, and environmental efficiency. While challenges around cost, cyber defense, and workforce transition remain, responsible stewardship and human oversight ensure an intelligent, accessible, and zero-accident mobility future.',
    importantPoints: [
      'Safety Transformation: Shifting from reactive post-accident investigation to proactive automated collision prevention.',
      'Unprecedented Commuter Convenience: Seamless routing, predictive public transit arrivals, and reduced time wasted in gridlock.',
      'Urban Traffic Mastery: Dynamically synchronizing metropolitan traffic to lower carbon emissions and eliminate bottlenecks.',
      'Human-Centric Future: Maintaining human ethical oversight, regulatory safeguards, and equitable access for all communities.'
    ],
    realWorldExamples: [
      {
        title: 'Integrated Intelligent Mobility Ecosystems',
        description: 'Modern smart cities linking autonomous transit shuttles, dynamic traffic signals, and shared micro-mobility into a unified AI transit grid.',
        impact: 'Delivers door-to-door transit reliability while reducing municipal carbon emissions by up to 30%.'
      }
    ],
    advantages: [
      'Holistic integration of road, rail, air, and marine transport',
      'Sustainable urban environments with cleaner air and fewer traffic fatalities'
    ],
    limitations: [
      'Requires ongoing international collaboration between technologists, city planners, and ethicists'
    ],
    keyTakeaways: [
      'AI in transportation is not just about autonomous cars; it is an intelligent ecosystem that makes the entire world safer and more connected.'
    ],
    sampleQuestions: [
      {
        question: 'Summarize the core conclusion of the 14-page PDF on AI in transportation.',
        answer: 'The conclusion emphasizes that AI fundamentally improves three core pillars of mobility: 1. Safety (eliminating human error), 2. Convenience (predictive transit and seamless navigation), and 3. Traffic management (optimizing urban flow and reducing emissions), while requiring human oversight to address ethical and security challenges.',
        examTip: 'Anchor your answer around safety, convenience, and traffic management.'
      }
    ],
    flashcards: [
      {
        front: 'What are the three core areas improved by AI according to the conclusion on Page 13?',
        back: '1. Safety, 2. Convenience, and 3. Traffic management.'
      }
    ],
    quizQuestions: [
      {
        question: 'According to Page 13 of the PDF, what are the three primary dimensions improved by AI in transportation?',
        options: [
          'Safety, convenience, and traffic management',
          'Vehicle noise, tire wear, and fuel prices',
          'Manual paper ticketing, highway tolls, and road paint',
          'Engine weight, battery size, and chassis length'
        ],
        correctIndex: 0,
        explanation: 'Page 13 summarizes that AI elevates safety, convenience, and traffic management across global transportation.'
      }
    ]
  },
  {
    pageNumber: 14,
    moduleId: 'module-14',
    title: 'Thank You & Educational Journey',
    subtitle: 'Curriculum mastery, continuing learning resources, and certification readiness',
    iconName: 'GraduationCap',
    category: 'Synthesis',
    summary: 'Congratulations on completing the 14-page AI in Transportation curriculum. Review your learning metrics, test your knowledge in the AI Quiz, and explore specialized transport research.',
    pdfExcerpt: 'Thank you for exploring AI in Transportation. You have navigated the full 14-page curriculum spanning foundational principles, historical evolution, sensor mechanics, sector applications across road, rail, logistics and aviation, key benefits and risks, and the future of intelligent mobility. Continue your journey with practical projects, policy research, and technological innovation.',
    importantPoints: [
      'Curriculum Completion: Full mastery of all 14 pages and key topics from the primary textbook.',
      'Knowledge Retention: Reinforce learning through the interactive AI Quiz Generator and Flashcard system.',
      'AI Assistant Access: Use Transport AI to generate exam-ready revision notes and deep dive into specific concepts.',
      'Certification Readiness: Claim your verified Certificate of Learning upon completing quiz assessments.'
    ],
    realWorldExamples: [
      {
        title: 'Next-Generation Mobility Careers',
        description: 'Engineers, data scientists, urban planners, and aviation specialists designing tomorrow\'s autonomous systems.',
        impact: 'High-growth sector creating millions of tech and sustainability jobs globally.'
      }
    ],
    advantages: [
      'Comprehensive holistic understanding of modern intelligent transportation systems',
      'Strong academic foundation for engineering, computer science, and urban studies'
    ],
    limitations: [],
    keyTakeaways: [
      'You are now equipped with the knowledge driving the next era of global intelligent mobility!'
    ],
    sampleQuestions: [
      {
        question: 'What is the recommended next step after completing the 14-page AI in Transportation curriculum?',
        answer: 'Take the comprehensive AI Quiz, review module flashcards, generate customized revision notes, and explore hands-on research in autonomous mobility and intelligent traffic engineering.',
        examTip: 'Mention taking the quiz to test knowledge retention across all 14 pages.'
      }
    ],
    flashcards: [
      {
        front: 'How many total modules/pages compose the official curriculum?',
        back: '14 comprehensive pages covering fundamentals, sensor mechanics, sector applications, benefits, challenges, and future mobility.'
      }
    ],
    quizQuestions: [
      {
        question: 'How many total pages/modules comprise the primary "AI IN TRANSPORTATION.pdf" curriculum?',
        options: [
          '7 modules',
          '10 modules',
          '14 modules',
          '25 modules'
        ],
        correctIndex: 2,
        explanation: 'The primary curriculum is structured across exactly 14 modules corresponding to the 14-page PDF.'
      }
    ]
  }
];

export const ALL_QUIZ_QUESTIONS = PDF_MODULES.flatMap(m => m.quizQuestions.map(q => ({
  ...q,
  moduleId: m.moduleId,
  pageNumber: m.pageNumber,
  moduleTitle: m.title
})));
