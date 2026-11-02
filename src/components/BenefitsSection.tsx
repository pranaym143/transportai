import React from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  ShieldCheck, 
  Leaf, 
  Fuel, 
  Wrench, 
  Package, 
  Navigation, 
  AlertTriangle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const { openAssistantWithQuery, openModuleReader } = useLearning();

  const benefits = [
    {
      title: 'Danger Detection & Collision Prevention',
      desc: 'Sub-35 millisecond reaction time prevents crashes caused by human distraction, fatigue, or intoxication.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      metric: '90% error reduction'
    },
    {
      title: 'Pollution & Emissions Reduction',
      desc: 'Eco-routing, smooth vehicle acceleration, and synchronized smart traffic signals cut urban carbon and PM2.5 particulates.',
      icon: <Leaf className="w-5 h-5 text-emerald-600" />,
      metric: '15-20% emission drop'
    },
    {
      title: 'Fuel Consumption Optimization',
      desc: 'Platooning trucks, aerodynamic drafting, and minimal red-light idling save millions of gallons of diesel and energy.',
      icon: <Fuel className="w-5 h-5 text-emerald-600" />,
      metric: 'Up to 15-20% fuel savings'
    },
    {
      title: 'Predictive Vehicle Maintenance',
      desc: 'Acoustic and vibration sensors identify component wear in jet turbines and automotive engines before catastrophic breakdown.',
      icon: <Wrench className="w-5 h-5 text-emerald-600" />,
      metric: 'Zero unexpected failures'
    },
    {
      title: 'Streamlined Cargo Transportation',
      desc: 'Dynamic re-balancing of freight capacity, automated warehouse sortation, and reduced deadhead miles.',
      icon: <Package className="w-5 h-5 text-emerald-600" />,
      metric: '99% on-time dispatch'
    },
    {
      title: 'Dynamic Intelligent Navigation',
      desc: 'Continuous real-time road condition analysis rerouting traffic around sudden accidents and hazardous weather.',
      icon: <Navigation className="w-5 h-5 text-emerald-600" />,
      metric: '25-35% delay reduction'
    }
  ];

  const disadvantages = [
    {
      title: 'High Development & Installation Costs',
      desc: 'Automotive-grade LiDAR, GPUs, and connected roadside sensor infrastructure require substantial upfront investment.'
    },
    {
      title: 'System Errors & Edge-Case Hazards',
      desc: 'Blinding blizzards, sensor mud occlusion, and novel unstructured road environments challenge neural networks.'
    },
    {
      title: 'Personal Data & Location Privacy',
      desc: 'Connected vehicles capturing cabin video and 25GB of telemetry per hour raise significant surveillance concerns.'
    },
    {
      title: 'Cybersecurity Threat Surface',
      desc: 'Potential remote intrusion into electronic brake controllers or spoofing of municipal traffic signal grids.'
    },
    {
      title: 'Commercial Workforce Displacement',
      desc: 'Socioeconomic transition for long-haul truck drivers, taxi operators, and delivery personnel requiring reskilling.'
    },
    {
      title: 'Excessive Dependence & Skill Atrophy',
      desc: 'Automation complacency where human drivers lose manual handling proficiency and vigilance during disengagements.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E7E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF690F] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAGES 10 & 11: BALANCED IMPACT ANALYSIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-display tracking-tight">
            Benefits and Challenges of AI in Transportation
          </h2>
          <p className="text-[#77716E] text-sm sm:text-base mt-3 leading-relaxed">
            A comprehensive, academically rigorous overview of both the transformative safety benefits and the critical socioeconomic risks outlined in the curriculum.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#171717] font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Core Benefits (Page 10)</span>
            </h3>
            <button
              onClick={() => openModuleReader('module-10')}
              className="text-xs font-bold text-[#FF690F] hover:underline"
            >
              Read Page 10 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div 
                key={i}
                className="bg-[#F7F3EF] rounded-3xl p-6 border border-[#E7E0D8] warm-card-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-4 border border-[#E7E0D8]">
                    {b.icon}
                  </div>
                  <h4 className="text-base font-bold text-[#171717] font-display mb-1.5">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#77716E] leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7E0D8] text-[11px] font-bold text-emerald-800">
                  Impact: {b.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Disadvantages & Challenges Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#171717] font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Critical Challenges & Limitations (Page 11)</span>
            </h3>
            <button
              onClick={() => openModuleReader('module-11')}
              className="text-xs font-bold text-[#FF690F] hover:underline"
            >
              Read Page 11 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disadvantages.map((d, i) => (
              <div 
                key={i}
                className="bg-[#F1EBE5]/60 rounded-3xl p-6 border border-[#E7E0D8] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mb-4 border border-[#E7E0D8] text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#171717] font-display mb-1.5">
                    {d.title}
                  </h4>
                  <p className="text-xs text-[#77716E] leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openAssistantWithQuery('Compare the benefits and disadvantages of AI in transportation in a student exam format with key points.')}
            className="px-7 py-3 rounded-full bg-[#171717] hover:bg-black text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Ask Transport AI: Compare Benefits vs Risks</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF690F]" />
          </button>
        </div>

      </div>
    </section>
  );
};
