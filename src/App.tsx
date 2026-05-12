/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Sparkles, 
  Clock, 
  Languages, 
  Layout, 
  Copy, 
  Check, 
  Send, 
  Loader2,
  ChevronRight,
  TrendingUp,
  Globe,
  Coins,
  Zap,
  ShieldCheck,
  Star
} from 'lucide-react';
import { generateVideoScript, VideoScript, VideoSegment } from './services/gemini.ts';

export default function App() {
  const [topic, setTopic] = useState('Le e-commerce en Afrique : Un potentiel illimité');
  const [duration, setDuration] = useState('2min 30s');
  const [language, setLanguage] = useState('Français');
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<VideoScript | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState(3);
  const [showPricing, setShowPricing] = useState(false);

  const handleGenerate = async () => {
    if (credits <= 0) {
      setError("Vous n'avez plus de crédits. Veuillez vous abonner pour continuer.");
      setShowPricing(true);
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateVideoScript(topic, duration, language);
      setScript(result);
      setCredits(prev => prev - 1);
    } catch (err) {
      console.error(err);
      setError("Désolé, une erreur est survenue lors de la génération. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Pre-generate on mount with user's specific request if topic is not custom
  useEffect(() => {
    // We could auto-generate here, but better to let user click to see the magic
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">AfriCommerce <span className="text-orange-500">Genius</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <Coins className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold">{credits} crédits</span>
            </div>
            <span 
              onClick={() => setShowPricing(true)}
              className="text-sm font-medium opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
            >
              Tarifs
            </span>
            <span className="text-sm font-medium opacity-60 hover:opacity-100 cursor-pointer transition-opacity">Expert IA</span>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors border border-white/10">
              Compte
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-10">
            <section className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter uppercase"
              >
                Créez votre <br />
                <span className="text-orange-500">Vidéo Impact</span>
              </motion.h1>
              <p className="text-xl text-white/60 leading-relaxed font-light max-w-md">
                Générez instantanément des scripts et des prompts visuels professionnels pour vos vidéos sur l'essor technologique en Afrique.
              </p>
            </section>

            <section className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
              <div className="space-y-4">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-orange-500" />
                  Sujet de la vidéo
                </label>
                <textarea 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-orange-500 transition-colors resize-none h-32 text-lg"
                  placeholder="Ex: Le e-commerce au Nigéria..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Durée
                  </label>
                  <input 
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-orange-500" />
                    Langue
                  </label>
                  <input 
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-orange-600 hover:bg-orange-500 disabled:bg-white/10 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all group overflow-hidden relative shadow-[0_0_20px_rgba(234,88,12,0.3)]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Calcul du script...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Générer le Storyboard {credits > 0 ? `(-1)` : ''}</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-white/40 pt-2 font-medium">
                <Coins className="w-3.5 h-3.5 text-orange-500" />
                <span>{credits} crédits restants</span>
                <span className="mx-2 opacity-20">|</span>
                <button 
                  onClick={() => setShowPricing(true)}
                  className="text-orange-500 hover:underline"
                >
                  Obtenir plus de crédits
                </button>
              </div>
              
              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                  {error}
                </p>
              )}
            </section>

            <section className="flex items-center gap-6 text-white/40">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Tendance 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Impact Local</span>
              </div>
            </section>
          </div>

          {/* Right Column: Result */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {script ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Le Storyboard Maître</h2>
                    <div className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-sm font-semibold border border-orange-500/20">
                      <Clock className="w-4 h-4" />
                      {script.totalDuration}
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {script.segments.map((segment, idx) => (
                      <SegmentCard 
                        key={idx} 
                        segment={segment} 
                        index={idx}
                        isCopied={copiedIndex === idx}
                        onCopy={() => copyToClipboard(segment.visualPrompt, idx)}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[600px] border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Prêt à commencer ?</h3>
                  <p className="text-white/40 max-w-xs mx-auto mb-8">
                    Saisissez votre sujet et laissez l'IA concevoir un storyboard millimétré avec des prompts visuels optimisés.
                  </p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">Exemple 1</p>
                      <p className="text-xs text-white/60">L'essor de la Fintech à Lagos</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">Exemple 2</p>
                      <p className="text-xs text-white/60">Logistique et dernier kilomètre</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Pricing Section / Modal Overlay */}
      <AnimatePresence>
        {showPricing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl overflow-y-auto px-6 py-20"
          >
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="flex flex-col items-center text-center space-y-4">
                <button 
                  onClick={() => setShowPricing(false)}
                  className="mb-8 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
                >
                  Fermer
                </button>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">Choisissez votre <span className="text-orange-500 underline underline-offset-8">Vitesse</span></h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                  Libérez tout le potentiel de l'IA pour vos contenus e-commerce. Des scripts illimités, des modèles premiums et un support expert.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <PricingCard 
                  title="Découverte"
                  price="0€"
                  description="Parfait pour tester le potentiel."
                  features={["3 scripts par mois", "Modèle standard", "Support communautaire"]}
                  icon={<Zap className="w-6 h-6 text-white" />}
                  buttonText="Actuel"
                  isActive={true}
                />
                <PricingCard 
                  title="Créateur Pro"
                  price="29€"
                  period="/mois"
                  description="Pour les créateurs de contenu sérieux."
                  features={["Scripts illimités", "Modèle Gemini Pro 1.5", "Prompts Image ultra-détaillés", "Export PDF/Doc"]}
                  icon={<Star className="w-6 h-6 text-orange-500" />}
                  buttonText="Commencer l'essai"
                  isFeatured={true}
                />
                <PricingCard 
                  title="Entreprise"
                  price="99€"
                  period="/mois"
                  description="Pour les agences et les marques mondiales."
                  features={["Collaboration équipe", "API Dédiée", "Formation IA personnalisée", "Droit d'utilisation complet"]}
                  icon={<ShieldCheck className="w-6 h-6 text-blue-500" />}
                  buttonText="Contacter la vente"
                />
              </div>
              
              <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] text-center space-y-6">
                <h3 className="text-2xl font-bold italic">Besoin juste de quelques scripts ?</h3>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="bg-black/50 border border-white/10 px-8 py-6 rounded-3xl space-y-2 min-w-[200px]">
                    <p className="text-3xl font-bold">10€</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Pack 20 Crédits</p>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">Acheter</button>
                  </div>
                  <div className="bg-black/50 border border-orange-500/30 px-8 py-6 rounded-3xl space-y-2 min-w-[200px] relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Populaire</div>
                    <p className="text-3xl font-bold">25€</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Pack 60 Crédits</p>
                    <button className="w-full py-2 bg-orange-600 hover:bg-orange-500 rounded-xl text-xs font-bold transition-colors">Acheter</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">© 2026 AfriCommerce Genius. Propulsé par Google Gemini.</p>
          <div className="flex items-center gap-8 text-white/40 text-sm font-medium">
            <span className="hover:text-white transition-colors cursor-pointer">Confidentialité</span>
            <span className="hover:text-white transition-colors cursor-pointer">Conditions</span>
            <span className="hover:text-white transition-colors cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SegmentCard({ segment, index, isCopied, onCopy }: { 
  segment: VideoSegment; 
  index: number; 
  isCopied: boolean;
  onCopy: () => void;
  key?: React.Key;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.07] transition-all hover:border-white/20"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Info */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs font-bold ring-1 ring-orange-500/50">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold tracking-tight">{segment.title}</h3>
            </div>
            <span className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">
              {segment.duration}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Voix-off</p>
            <p className="text-white/80 leading-relaxed italic border-l-2 border-orange-500/30 pl-4 py-1">
              "{segment.voiceover}"
            </p>
          </div>
        </div>

        {/* Right: Visual Prompt */}
        <div className="md:w-72 flex flex-col gap-3">
          <div className="relative group/prompt bg-black/40 rounded-2xl p-4 border border-white/10 h-full">
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">AI Visual Prompt</p>
            <p className="text-xs text-white/50 leading-relaxed line-clamp-6 group-hover/prompt:line-clamp-none transition-all">
              {segment.visualPrompt}
            </p>
            <button 
              onClick={onCopy}
              className="mt-4 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-95"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500">Copié</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier le prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PricingCard({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  icon, 
  buttonText, 
  isFeatured = false,
  isActive = false
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  buttonText: string;
  isFeatured?: boolean;
  isActive?: boolean;
}) {
  return (
    <div className={`
      relative p-8 rounded-[2.5rem] border transition-all flex flex-col space-y-6
      ${isFeatured ? 'bg-orange-600 border-orange-500 scale-105 z-10 shadow-[0_20px_50px_rgba(234,88,12,0.3)]' : 'bg-white/5 border-white/10'}
    `}>
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-2xl ${isFeatured ? 'bg-white/20' : 'bg-white/5 ring-1 ring-white/10'}`}>
          {icon}
        </div>
        {isActive && (
          <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded-full">Actuel</span>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className={`text-sm ${isFeatured ? 'text-white/80' : 'text-white/40'}`}>{description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-bold">{price}</span>
        {period && <span className={`text-lg font-medium ${isFeatured ? 'text-white/60' : 'text-white/20'}`}>{period}</span>}
      </div>

      <div className="flex-1 space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check className={`w-4 h-4 ${isFeatured ? 'text-white' : 'text-orange-500'}`} />
            <span className={`text-sm ${isFeatured ? 'text-white/90' : 'text-white/60'}`}>{feature}</span>
          </div>
        ))}
      </div>

      <button className={`
        w-full py-4 rounded-2xl font-bold text-sm transition-all
        ${isFeatured ? 'bg-white text-orange-600 hover:bg-white/90' : 'bg-white/10 hover:bg-white/20 border border-white/10'}
      `}>
        {buttonText}
      </button>
    </div>
  );
}
