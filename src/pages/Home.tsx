import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AppGrid from '../components/AppGrid';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <AppGrid />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
