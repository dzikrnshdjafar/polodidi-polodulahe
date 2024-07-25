import React from 'react';
import './App.css';
import { CompoNav } from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KabkotaList from './components/KabkotaList';
import KabkotaDetail from './components/KabkotaDetail';
import CompoSour from './components/CompoSour';
import CompoFoot from './components/Footer';
import Count from './components/Count';

function App() {
  return (
    <div className="app-container flex flex-col min-h-screen">
      <CompoNav />
      <Count />
      <Router>
        <Routes>
          <Route path="/" element={<KabkotaList />} />
          <Route path="/kabkota/:id" element={<KabkotaDetail />} />
        </Routes>
      </Router>
      <CompoSour />
      <CompoFoot />
    </div>
  );
}

export default App;
