import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Home_About_deatils from '../components/Home_About_deatils';
import Home_Notice from '../components/Home_Notice';
import Home_Our_Facilities from '../components/Home_Our_Facilities';
import Home_Messages from '../components/Home_Messages';
import Home_Addmission from '../components/Home_Addmission';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-brand-bg-light flex flex-col justify-between">
      <div>
        <NavBar activePath="/" />
        <main>
          <Hero />
          <Home_About_deatils />
          <Home_Notice />
          <Home_Our_Facilities />
          <Home_Messages />
          <Home_Addmission />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;