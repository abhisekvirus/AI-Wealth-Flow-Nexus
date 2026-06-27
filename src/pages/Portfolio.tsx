import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PieChart as PieChartIcon, CheckCircle2 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#00f0ff', '#8a2be2', '#00ff88', '#ff3366'];

export const Portfolio: React.FC = () => {
  const { plan } = useUser();

  if (!plan) return null;

  const allocationData = [
    { name: 'Quantum Emergency Fund', value: plan.totalSavings * 0.4 },
    { name: 'Global Tech ETFs', value: plan.totalSavings * 0.3 },
    { name: 'Fractional Real Estate', value: plan.totalSavings * 0.2 },
    { name: 'Crypto & Web3', value: plan.totalSavings * 0.1 },
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <h1 className="page-title">Active Portfolio Matrix</h1>
        <p className="page-subtitle">Your monthly surplus is being autonomously routed into these asset classes.</p>
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <PieChartIcon size={28} color="#00f0ff" />
            <h2 style={{ fontSize: '1.5rem' }}>Asset Allocation</h2>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                  {allocationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `₹${Math.round(value as number).toLocaleString()}`} contentStyle={{ backgroundColor: 'rgba(4, 8, 20, 0.9)', border: '1px solid #00f0ff', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Wallet size={28} color="#8a2be2" />
            <h2 style={{ fontSize: '1.5rem' }}>Active Smart Contracts</h2>
          </div>

          {allocationData.map((asset, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={20} color={COLORS[idx % COLORS.length]} />
                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{asset.name}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: COLORS[idx % COLORS.length] }}>
                ₹{Math.round(asset.value).toLocaleString()}/mo
              </span>
            </div>
          ))}
          
          <button className="glow-button" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Rebalance Portfolio</button>
        </div>
      </div>
    </motion.div>
  );
};
