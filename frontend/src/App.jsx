import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DemoPresets from './components/DemoPresets';
import MessageInput from './components/MessageInput';
import ScanningLoader from './components/ScanningLoader';
import ResultCard from './components/ResultCard';
import Dashboard from './components/Dashboard';
import RedFlagGuide from './components/RedFlagGuide';
import Footer from './components/Footer';
import { analyzeMessage, getHealthStatus } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [text, setText] = useState('');
  const [analyzedText, setAnalyzedText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);

  const inputRef = useRef(null);

  // Fetch backend status and health on mount
  useEffect(() => {
    getHealthStatus()
      .then((data) => setHealthInfo(data))
      .catch((err) => {
        console.error('Could not reach backend health check:', err);
        setHealthInfo({ hasGeminiKey: false, demoMode: true });
      });
  }, []);

  const handleSelectPreset = (presetText) => {
    setText(presetText);
    setError(null);
    if (activeTab !== 'analyzer') {
      setActiveTab('analyzer');
    }
    // Smooth scroll to input
    setTimeout(() => {
      const textarea = document.getElementById('message-textarea');
      if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleAnalyze = async () => {
    if (!text || text.trim().length < 5) {
      setError('Please provide at least 5 characters to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setAnalyzedText(text);

    try {
      const data = await analyzeMessage(text);
      setResult(data);
      // Smooth scroll down to result card
      setTimeout(() => {
        const el = document.getElementById('analysis-result-card');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeAnother = () => {
    setText('');
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const textarea = document.getElementById('message-textarea');
      if (textarea) textarea.focus();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background cyber grid */}
      <div className="fixed inset-0 cyber-grid opacity-40 pointer-events-none -z-10" />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        healthInfo={healthInfo}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-12">
        {activeTab === 'analyzer' && (
          <>
            {/* Hero Header */}
            <Hero />

            <div className="max-w-4xl mx-auto">
              {/* 4 Hackathon Demo Preset Buttons */}
              <DemoPresets
                onSelectPreset={handleSelectPreset}
                currentText={text}
              />

              {/* Message Input Box */}
              <MessageInput
                text={text}
                setText={setText}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                error={error}
                setError={setError}
                isDemoMode={!healthInfo?.hasGeminiKey}
              />

              {/* Loading State Animation */}
              {isLoading && <ScanningLoader />}

              {/* Analysis Result Card */}
              {result && !isLoading && (
                <ResultCard
                  result={result}
                  originalText={analyzedText}
                  onReset={handleReset}
                  onAnalyzeAnother={handleAnalyzeAnother}
                />
              )}
            </div>
          </>
        )}

        {activeTab === 'dashboard' && (
          <div className="pt-6">
            <Dashboard
              onLoadSnippet={(snippetText) => {
                setText(snippetText);
                setActiveTab('analyzer');
              }}
            />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="pt-6">
            <RedFlagGuide />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
