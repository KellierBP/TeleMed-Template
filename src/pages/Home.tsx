import React from 'react';
import Hero from '../components/Hero';
import Dashboard from '../components/Dashboard';
import Rehabilitation from '../components/Rehabilitation';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Dashboard />
      <Rehabilitation />
    </>
  );
};

export default Home; 