/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroductionSection } from './components/IntroductionSection';
import { ModulesSection } from './components/ModulesSection';
import { AiAssistant } from './components/AiAssistant';
import { InteractiveExplorer } from './components/InteractiveExplorer';
import { ExtraAiTools } from './components/ExtraAiTools';
import { BenefitsSection } from './components/BenefitsSection';
import { FutureMobilitySection } from './components/FutureMobilitySection';
import { Dashboard } from './components/Dashboard';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

function MainContent() {
  const { activeTab } = useLearning();

  return (
    <main className="min-h-screen">
      {activeTab === 'home' && (
        <>
          <Hero />
          <IntroductionSection />
          <ModulesSection />
          <AiAssistant />
          <InteractiveExplorer />
          <ExtraAiTools />
          <BenefitsSection />
          <FutureMobilitySection />
          <Dashboard />
          <AboutSection />
        </>
      )}

      {activeTab === 'learn' && (
        <div className="pt-6">
          <ModulesSection />
        </div>
      )}

      {activeTab === 'assistant' && (
        <div className="pt-6">
          <AiAssistant />
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="pt-6">
          <InteractiveExplorer />
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="pt-6">
          <ExtraAiTools initialTab="quiz" />
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="pt-6">
          <ExtraAiTools initialTab="notes" />
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div className="pt-6">
          <Dashboard />
        </div>
      )}

      {activeTab === 'about' && (
        <div className="pt-6">
          <AboutSection />
        </div>
      )}
    </main>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <div className="min-h-screen bg-[#F7F3EF] text-[#171717] flex flex-col justify-between selection:bg-orange-500/20 selection:text-orange-600 relative overflow-x-hidden">
        {/* Global ambient background image layer */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.14] bg-cover bg-top bg-no-repeat filter contrast-110"
          style={{ 
            backgroundImage: `url('https://res.cloudinary.com/dqpsyh7yu/image/upload/v1793633136/Futuristic_Logistics_Hub_in_Motion_mxbink.png')` 
          }}
        />
        <div className="relative z-10 flex flex-col justify-between min-h-screen">
          <Navbar />
          <MainContent />
          <Footer />
        </div>
      </div>
    </LearningProvider>
  );
}
