import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, RefreshCcw, ShieldAlert, UserCog, Download } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { generatePDFReport } from '../utils/generatePDF';

export const Settings: React.FC = () => {
  const { logout, resetProfile, profile, plan } = useUser();
  const navigate = useNavigate();

  const handleReset = () => {
    resetProfile();
    navigate('/');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div className="page-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <h1 className="page-title">System Settings</h1>
        <p className="page-subtitle">Manage your Nexus AI parameters and authentication.</p>
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <UserCog size={28} color="#00f0ff" />
            <h2 style={{ fontSize: '1.5rem' }}>AI Profile Config</h2>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Current Parameters:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Location Engine:</span> <strong>{profile?.location || 'Not Set'}</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Household Size:</span> <strong>{profile?.familyMembers || 0}</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Income Base:</span> <strong>₹{profile?.salary?.toLocaleString() || 0}</strong></li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => { if (profile && plan) generatePDFReport(profile, plan); }} className="glow-button" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={18} /> Download Financial PDF
            </button>
            <button onClick={handleReset} className="glow-button" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255, 170, 0, 0.1)', borderColor: '#ffaa00' }}>
              <RefreshCcw size={18} /> Reset AI Profile Data
            </button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <ShieldAlert size={28} color="#ff3366" />
            <h2 style={{ fontSize: '1.5rem' }}>Security & Access</h2>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
            Your session is securely encrypted via the simulated Nexus authentication protocol. Logging out will require you to re-authenticate using your mobile number and OTP.
          </p>

          <button onClick={handleLogout} className="glow-button" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255, 51, 102, 0.1)', borderColor: '#ff3366' }}>
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </div>
    </motion.div>
  );
};
