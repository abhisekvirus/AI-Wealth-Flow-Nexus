import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, LineChart, Wallet, Settings } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-logo">
        <BrainCircuit size={28} color="#00f0ff" />
        <span>Nexus AI</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard /> Dashboard
        </NavLink>
        <NavLink to="/optimizer" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <BrainCircuit /> AI Optimizer
        </NavLink>
        <NavLink to="/insights" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <LineChart /> Market Insights
        </NavLink>
        <NavLink to="/portfolio" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <Wallet /> Portfolio
        </NavLink>
      </div>

      <div className="nav-links" style={{ flexGrow: 0 }}>
        <NavLink to="/settings" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <Settings /> Settings
        </NavLink>
      </div>
    </div>
  );
};
