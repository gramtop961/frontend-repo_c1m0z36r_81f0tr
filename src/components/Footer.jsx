export default function Footer() {
  return (
    <footer id="about" className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-white text-lg font-semibold">MedRag</div>
            <p className="mt-2 text-sm text-slate-400">
              Clinical AI that augments physicians with retrieval and structured reasoning.
            </p>
          </div>
          <div>
            <div className="text-slate-300 font-medium">Product</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-slate-300">Features</a></li>
              <li><a href="#dashboard" className="hover:text-slate-300">Dashboard</a></li>
              <li><a href="#patients" className="hover:text-slate-300">Patients</a></li>
            </ul>
          </div>
          <div>
            <div className="text-slate-300 font-medium">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-slate-300">About</a></li>
              <li><a href="#careers" className="hover:text-slate-300">Careers</a></li>
              <li><a href="#contact" className="hover:text-slate-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-slate-300 font-medium">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>HIPAA-ready</li>
              <li>Data residency</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} MedRag. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy</a>
            <a href="#terms" className="hover:text-slate-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
