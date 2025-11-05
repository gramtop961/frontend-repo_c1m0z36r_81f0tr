import { motion } from 'framer-motion';
import { Brain, Database, Activity, ChevronRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.5 } }),
};

export default function Sections() {
  return (
    <section id="features" className="relative bg-slate-950">
      {/* Feature Cards */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Designed for precise, explainable care
          </h2>
          <p className="mt-3 text-slate-300">
            A cohesive system that surfaces similar cases, reasons through possibilities, and communicates clearly.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Brain,
              title: 'Differential Reasoning',
              desc: 'Contrast sciatica vs lumbar stenosis with evidence pulled from comparable cases.'
            },
            {
              icon: Database,
              title: 'RAG on Real Records',
              desc: 'Retrieve clinically similar patient records to ground model outputs.'
            },
            {
              icon: Activity,
              title: 'Medical Knowledge Graph',
              desc: 'Graph-aware paths between symptoms, labs, and diagnoses for explainability.'
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="group rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 shadow-xl ring-1 ring-inset ring-white/5"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.desc}</p>
              <button className="mt-4 inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
                Learn more <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dashboard Preview */}
      <div id="dashboard" className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Stats */}
          <div className="col-span-2 grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Active Cases', value: '128', change: '+12%' },
              { label: 'Avg. Time to Dx', value: '18m', change: '-8%' },
              { label: 'Accuracy (last 30d)', value: '93.4%', change: '+2.1%' },
              { label: 'Retrieval Coverage', value: '87%', change: '+5%' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="text-sm text-slate-400">{s.label}</div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-2xl font-semibold text-white">{s.value}</div>
                  <div className="text-xs text-emerald-400">{s.change}</div>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: s.label === 'Active Cases' ? '70%' : s.label === 'Avg. Time to Dx' ? '60%' : s.label === 'Accuracy (last 30d)' ? '90%' : '80%' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Patients Table (mock) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white">Recent Patients</h4>
              <a href="#patients" className="text-sm text-cyan-400 hover:text-cyan-300">View all</a>
            </div>
            <div className="mt-4 divide-y divide-slate-800">
              {[
                { id: 'MR-2041', name: 'A. Johnson', age: 58, status: 'Review', score: 0.82 },
                { id: 'MR-2040', name: 'R. Chen', age: 41, status: 'Ready', score: 0.91 },
                { id: 'MR-2039', name: 'M. Diaz', age: 67, status: 'Pending', score: 0.76 },
              ].map((p) => (
                <div key={p.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-white">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.id} • {p.age}y</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${p.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-400' : p.status === 'Review' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-700/60 text-slate-300'}`}>{p.status}</span>
                    <span className="text-sm text-slate-200">{Math.round(p.score * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
