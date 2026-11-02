import React from 'react';
import { useLearning } from '../context/LearningContext';
import { 
  Rocket, 
  Send, 
  Radio, 
  Plane, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Car
} from 'lucide-react';

export const FutureMobilitySection: React.FC = () => {
  const { openAssistantWithQuery, openModuleReader } = useLearning();

  const futureTrends = [
    {
      title: 'Full Level 5 Autonomous Fleets',
      desc: 'Steering-wheel-free robo-taxis and commercial long-haul trucks operating seamlessly across any weather and complex topography.',
      icon: <Car className="w-5 h-5 text-[#FF690F]" />,
      tag: 'Zero Driver Intervention'
    },
    {
      title: 'Electric Flying Cars (eVTOL)',
      desc: 'Autonomous electric vertical takeoff and landing passenger aircraft navigating predetermined 3D urban skyways.',
      icon: <Rocket className="w-5 h-5 text-[#FF690F]" />,
      tag: 'Urban Air Mobility'
    },
    {
      title: 'V2V & V2X Collective Perception',
      desc: 'Vehicles wirelessly sharing sensor feeds up to 300 meters away, warning trailing cars of hazards around blind corners.',
      icon: <Radio className="w-5 h-5 text-[#FF690F]" />,
      tag: 'Cooperative Safety'
    },
    {
      title: 'Autonomous Drone Delivery Corridors',
      desc: 'Rapid point-to-point aerial courier networks delivering critical medical supplies, defibrillators, and parcel logistics within minutes.',
      icon: <Send className="w-5 h-5 text-[#FF690F]" />,
      tag: 'Sub-10 Min Transit'
    },
    {
      title: 'Smart Airports & Digital Terminals',
      desc: 'AI orchestrating aircraft ground taxiing, biometric passenger processing, and predictive baggage handling.',
      icon: <Plane className="w-5 h-5 text-[#FF690F]" />,
      tag: 'Tarmac AI Coordination'
    },
    {
      title: 'Vision Zero: Zero Fatal Collisions',
      desc: 'The global transportation objective to eliminate all fatal traffic accidents through algorithmic interlocks and fail-safe braking.',
      icon: <ShieldCheck className="w-5 h-5 text-[#FF690F]" />,
      tag: 'Target Zero Accidents'
    }
  ];

  return (
    <section className="py-20 bg-[#F7F3EF] border-b border-[#E7E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E7E0D8] text-[#FF690F] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PAGE 12: THE NEXT GENERATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-display tracking-tight">
            The Future of Intelligent Mobility
          </h2>
          <p className="text-[#77716E] text-sm sm:text-base mt-3 leading-relaxed">
            From city streets to urban air corridors, Artificial Intelligence will interconnect every transport mode into a unified, zero-accident mobility ecosystem.
          </p>
        </div>

        {/* 6 Futuristic Mobility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureTrends.map((trend, i) => (
            <div 
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E7E0D8] warm-card-shadow warm-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#F7F3EF] flex items-center justify-center border border-[#E7E0D8]">
                    {trend.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100/70 text-[#FF690F] border border-orange-200">
                    {trend.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#171717] font-display mb-2">
                  {trend.title}
                </h3>
                <p className="text-xs text-[#77716E] leading-relaxed">
                  {trend.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EAE3] flex items-center justify-between">
                <button
                  onClick={() => openModuleReader('module-12')}
                  className="text-xs font-bold text-[#FF690F] hover:text-[#E55705] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore in Module 12</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion Callout (Page 13) */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E0D8] warm-card-shadow flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#FF690F] uppercase tracking-wider">
              Curriculum Conclusion (Page 13)
            </span>
            <h4 className="text-lg font-bold text-[#171717] font-display">
              Elevating Human Safety, Convenience, and Urban Traffic Management
            </h4>
            <p className="text-xs text-[#77716E] max-w-xl">
              Artificial Intelligence transforms mobility by eliminating human error, streamlining multi-modal transit networks, and orchestrating sustainable logistics.
            </p>
          </div>

          <button
            onClick={() => openModuleReader('module-13')}
            className="px-6 py-3 rounded-full bg-[#171717] hover:bg-black text-white text-xs font-bold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <span>Read Conclusion (Page 13)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FF690F]" />
          </button>
        </div>

      </div>
    </section>
  );
};
