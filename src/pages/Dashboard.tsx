import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Zap, BrainCircuit, Globe, Users, DollarSign, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useUser } from '../context/UserContext';
import { generatePDFReport } from '../utils/generatePDF';

const COLORS = ['#00f0ff', '#8a2be2', '#00ff88', '#ff3366', '#ffaa00'];

export const Dashboard: React.FC = () => {
  const { profile, plan, isProcessing, submitProfile } = useUser();
  const [salary, setSalary] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (salary && familyMembers && location) {
      submitProfile({
        salary: Number(salary),
        familyMembers: Number(familyMembers),
        location
      });
    }
  };

  if (isProcessing) {
    return (
      <motion.div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <BrainCircuit size={64} color="#00f0ff" />
          </motion.div>
          <h2 style={{ fontSize: '1.5rem' }}>AI is Syncing with Global Data...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Analyzing cost of living in {location}, projecting inflation, and structuring your hyper-personalized wealth matrix.</p>
        </div>
      </motion.div>
    );
  }

  if (!profile || !plan) {
    return (
      <motion.div className="page-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="page-header">
          <h1 className="page-title">Initialize Nexus Profile</h1>
          <p className="page-subtitle">Provide your baseline parameters. The AI will pull regional data to generate your strategy.</p>
        </div>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><DollarSign size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Monthly Income (INR)</label>
              <input type="number" required value={salary} onChange={e => setSalary(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Users size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Total Family Members</label>
              <input type="number" required value={familyMembers} onChange={e => setFamilyMembers(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Globe size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Living Location (City, Country)</label>
              <input type="text" required placeholder="e.g. New York, USA" value={location} onChange={e => setLocation(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            <button type="submit" className="glow-button" style={{ marginTop: '20px', justifyContent: 'center' }}>
              Initialize AI Engine
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="page-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Welcome to the Nexus</h1>
          <p className="page-subtitle">AI has processed {profile.location} cost data and optimized for your {profile.familyMembers}-person household.</p>
        </div>
        <button onClick={() => generatePDFReport(profile, plan)} className="glow-button" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <Download size={16} style={{ marginRight: '8px' }} /> Download Report
        </button>
      </div>

      <div className="grid-3">
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span>Projected Monthly Expenses</span>
            <Activity size={16} color="#ff3366" />
          </div>
          <div className="stat-value">₹{Math.round(plan.totalExpenses).toLocaleString()}</div>
          <div className="stat-change negative">Based on {profile.location} API Data</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span>Available For Investment</span>
            <Zap size={16} color="#00ff88" />
          </div>
          <div className="stat-value">₹{Math.round(plan.totalSavings).toLocaleString()}</div>
          <div className="stat-change positive">Optimize this via AI tab</div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-header">
            <span>Baseline Income</span>
            <Activity size={16} color="#00f0ff" />
          </div>
          <div className="stat-value">₹{Math.round(profile.salary).toLocaleString()}</div>
          <div className="stat-change positive">
            <ArrowUpRight size={16} /> Verified Input
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '24px', marginTop: '12px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Simulated Net Worth Forecast (7 Mos)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={plan.netWorthProjection}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#8b9bb4" tickLine={false} axisLine={false} />
                <YAxis stroke="#8b9bb4" tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(4, 8, 20, 0.9)', border: '1px solid #00f0ff', borderRadius: '8px' }} itemStyle={{ color: '#00f0ff' }} />
                <Area type="monotone" dataKey="value" stroke="#00f0ff" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', marginTop: '12px' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Expense Breakdown ({profile.location})</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={plan.expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {plan.expenseBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(4, 8, 20, 0.9)', border: '1px solid #8a2be2', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
