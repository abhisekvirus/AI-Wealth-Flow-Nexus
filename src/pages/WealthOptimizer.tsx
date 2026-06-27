import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, ShieldAlert, Rocket, Building, Briefcase } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const getIcon = (type: string) => {
  switch (type) {
    case 'emergency': return <ShieldAlert size={20} color="#00f0ff" />;
    case 'equity': return <Rocket size={20} color="#8a2be2" />;
    case 'realestate': return <Building size={20} color="#00ff88" />;
    case 'business': return <Briefcase size={20} color="#ff3366" />;
    default: return <BrainCircuit size={20} color="#fff" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'emergency': return '#00f0ff';
    case 'equity': return '#8a2be2';
    case 'realestate': return '#00ff88';
    case 'business': return '#ff3366';
    default: return '#fff';
  }
};

export const WealthOptimizer: React.FC = () => {
  const { profile, plan } = useUser();

  if (!profile || !plan) {
    return (
      <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <BrainCircuit size={48} color="#8a2be2" style={{ margin: '0 auto 20px' }} />
          <h2>AI Optimizer Offline</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>Please initialize your profile data on the Dashboard so the AI can analyze your location and income.</p>
          <NavLink to="/" className="glow-button" style={{ textDecoration: 'none' }}>Go to Dashboard</NavLink>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <h1 className="page-title">AI Wealth Optimizer</h1>
        <p className="page-subtitle">Hyper-personalized allocation strategies based on real-time {profile.location} cost data.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(138, 43, 226, 0.2)', padding: '16px', borderRadius: '50%' }}>
          <BrainCircuit size={40} color="#8a2be2" />
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Optimization Status: Active</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Based on {profile.location} economics and your family size of {profile.familyMembers}, the AI has allocated your ₹{Math.round(plan.totalSavings).toLocaleString()} monthly surplus into these optimized vehicles.</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button className="glow-button">Execute Strategy</button>
        </div>
      </div>

      <h2 style={{ fontSize: '1.2rem', marginTop: '12px', marginBottom: '12px', color: 'var(--text-secondary)' }}>AI Recommended Allocations</h2>

      <div className="grid-2">
        {plan.recommendations.map((rec, index) => (
          <motion.div key={index} whileHover={{ scale: 1.02 }} className="stat-card glass-panel">
            <div className="stat-header">
              <span>{rec.title}</span>
              {getIcon(rec.type)}
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {rec.description}
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
              <span style={{ color: getColor(rec.type), fontWeight: 600 }}>{rec.impact}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
