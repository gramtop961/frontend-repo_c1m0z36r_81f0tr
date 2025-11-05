import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Shield, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-slate-950" id="home">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/70 to-slate-950" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 md:pt-28 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            AI Diagnostics, RAG + Knowledge Graph
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Clinical intelligence that thinks like a specialist
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            MedRag combines Retrieval-Augmented Generation with a medical knowledge graph to compare real records and reason through similar diseases — helping doctors reach accurate, explainable decisions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110"
            >
              Explore Dashboard
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3 text-slate-200 hover:border-slate-700"
            >
              <Shield className="h-4 w-4 text-slate-300" />
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
