import Hero from './Hero';
import Sections from './Sections';

export default function Landing({ onGetStarted }) {
  return (
    <main>
      <Hero onGetStarted={onGetStarted} />
      <Sections />
    </main>
  );
}
