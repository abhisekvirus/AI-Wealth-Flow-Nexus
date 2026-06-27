import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Globe, Bitcoin } from 'lucide-react';
import { useUser } from '../context/UserContext';

const tickers = [
  { symbol: 'BTC', price: '₹52,40,000', change: '+2.4%', isUp: true },
  { symbol: 'ETH', price: '₹2,90,000', change: '+1.8%', isUp: true },
  { symbol: 'RELIANCE', price: '₹2,950', change: '-0.5%', isUp: false },
  { symbol: 'TCS', price: '₹4,120', change: '+1.2%', isUp: true },
  { symbol: 'GOLD (10g)', price: '₹62,500', change: '+0.8%', isUp: true },
  { symbol: 'USD/INR', price: '₹83.20', change: '-0.1%', isUp: false },
];

export const MarketInsights: React.FC = () => {
  const { profile } = useUser();

  return (
    <motion.div className="page-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="page-header">
        <h1 className="page-title">Global Market Insights</h1>
        <p className="page-subtitle">Simulated real-time data flow via Nexus Oracle.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}>
        <Globe size={24} color="#00f0ff" style={{ marginRight: '16px', flexShrink: 0 }} />
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{ display: 'inline-flex', gap: '32px' }}
        >
          {[...tickers, ...tickers, ...tickers].map((ticker, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>{ticker.symbol}</span>
              <span>{ticker.price}</span>
              <span style={{ color: ticker.isUp ? '#00ff88' : '#ff3366', display: 'flex', alignItems: 'center' }}>
                {ticker.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />} {ticker.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid-2" style={{ marginTop: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Activity size={28} color="#ffaa00" />
            <h2 style={{ fontSize: '1.5rem' }}>Macro Sentiment</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>
            The AI detects a localized inflation rate of <strong style={{ color: '#ff3366' }}>6.2%</strong> in {profile?.location || 'your region'} over the last trailing quarter. Consumer goods and housing are driving the CPI index higher.
          </p>
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255, 170, 0, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 170, 0, 0.3)' }}>
            <strong style={{ color: '#ffaa00', display: 'block', marginBottom: '8px' }}>AI Verdict: Defensive Accumulation</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Pivot excess liquidity toward inflation-hedged assets like fractional real estate and gold ETFs.</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Bitcoin size={28} color="#8a2be2" />
            <h2 style={{ fontSize: '1.5rem' }}>Web3 & Quantum Assets</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Institutional accumulation of Tier-1 digital assets is accelerating. The Nexus algorithmic flow indicator shows heavy inflows into DeFi protocols and decentralized compute networks.
          </p>
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(138, 43, 226, 0.1)', borderRadius: '12px', border: '1px solid rgba(138, 43, 226, 0.3)' }}>
            <strong style={{ color: '#8a2be2', display: 'block', marginBottom: '8px' }}>AI Verdict: Aggressive Buy (SIP Only)</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Maintain dollar-cost averaging into top 5 market-cap tokens. Avoid micro-caps this quarter.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
