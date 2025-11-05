import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import ChatApp from './components/ChatApp';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'chat'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased">
      <Navbar />
      {view === 'landing' ? (
        <Landing onGetStarted={() => setView('chat')} />
      ) : (
        <ChatApp />
      )}
      <Footer />
    </div>
  );
}

export default App;
