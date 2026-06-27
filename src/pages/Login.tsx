import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Phone, Lock, KeyRound, UserPlus, LogIn } from 'lucide-react';
import { useUser } from '../context/UserContext';

type AuthState = 'LOGIN' | 'REGISTER_MOBILE' | 'REGISTER_OTP' | 'REGISTER_PASSWORD' | 'FORGOT_PASSWORD' | 'FORGOT_OTP' | 'FORGOT_SET_PASSWORD';

export const Login: React.FC = () => {
  const { login } = useUser();
  const [authState, setAuthState] = useState<AuthState>('LOGIN');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const simulateDelay = async () => {
    setIsProcessing(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsProcessing(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    const storedPass = localStorage.getItem(`nexus_user_${mobile}`);
    if (!storedPass) {
      setError('Account not found. Please create an account.');
    } else if (storedPass !== password) {
      setError('Incorrect password.');
    } else {
      login();
    }
  };

  const handleRegisterMobile = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    setOtp('');
    setAuthState('REGISTER_OTP');
  };

  const handleRegisterOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    if (otp === '1234') {
      setPassword('');
      setAuthState('REGISTER_PASSWORD');
    } else {
      setError('Invalid OTP. Use 1234 for testing.');
    }
  };

  const handleRegisterPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    localStorage.setItem(`nexus_user_${mobile}`, password);
    setAuthState('LOGIN');
    setPassword('');
    setError('Account created successfully! Please log in.');
  };

  const handleForgotMobile = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    const storedPass = localStorage.getItem(`nexus_user_${mobile}`);
    if (!storedPass) {
      setError('Account not found.');
    } else {
      setOtp('');
      setAuthState('FORGOT_OTP');
    }
  };

  const handleForgotOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    if (otp === '1234') {
      setPassword('');
      setAuthState('FORGOT_SET_PASSWORD');
    } else {
      setError('Invalid OTP. Use 1234 for testing.');
    }
  };

  const handleForgotSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await simulateDelay();
    localStorage.setItem(`nexus_user_${mobile}`, password);
    setAuthState('LOGIN');
    setPassword('');
    setError('Password reset successfully! Please log in.');
  };

  const renderContent = () => {
    if (isProcessing) {
      return (
        <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <BrainCircuit size={64} color="#00f0ff" style={{ margin: '0 auto' }} />
          </motion.div>
          <h2 style={{ marginTop: '20px' }}>Connecting to Nexus...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Decrypting credentials & securely verifying via Google Services simulation.</p>
        </motion.div>
      );
    }

    switch (authState) {
      case 'LOGIN':
        return (
          <motion.form key="login" onSubmit={handleLogin} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Nexus Gateway</h2>
            {error && <div style={{ color: error.includes('success') ? '#00ff88' : '#ff3366', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Phone size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Mobile Number</label>
              <input type="tel" required value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 98765 43210"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Lock size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: '#00f0ff', cursor: 'pointer' }} onClick={() => { setError(''); setAuthState('FORGOT_PASSWORD'); }}>Forgot Password?</span>
              <span style={{ color: '#00ff88', cursor: 'pointer' }} onClick={() => { setError(''); setAuthState('REGISTER_MOBILE'); }}>Create Account</span>
            </div>
            
            <button type="submit" className="glow-button" style={{ marginTop: '10px', justifyContent: 'center' }}>
              <LogIn size={18} /> Authenticate
            </button>
          </motion.form>
        );

      case 'REGISTER_MOBILE':
        return (
          <motion.form key="reg_mobile" onSubmit={handleRegisterMobile} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Create Account</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Phone size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Mobile Number</label>
              <input type="tel" required value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 98765 43210"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            <button type="submit" className="glow-button" style={{ marginTop: '10px', justifyContent: 'center', background: 'rgba(0, 255, 136, 0.2)', borderColor: '#00ff88' }}>
              <UserPlus size={18} /> Get OTP
            </button>
            <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem' }} onClick={() => setAuthState('LOGIN')}>Back to Login</span>
          </motion.form>
        );

      case 'REGISTER_OTP':
      case 'FORGOT_OTP':
        const isReg = authState === 'REGISTER_OTP';
        return (
          <motion.form key="otp" onSubmit={isReg ? handleRegisterOTP : handleForgotOTP} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Verify Identity</h2>
            {error && <div style={{ color: '#ff3366', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>A secure 4-digit code has been sent to {mobile}.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><KeyRound size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Enter OTP (Use 1234)</label>
              <input type="text" required value={otp} onChange={e => setOtp(e.target.value)} placeholder="1234" maxLength={4}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '8px' }} />
            </div>
            <button type="submit" className="glow-button" style={{ marginTop: '10px', justifyContent: 'center' }}>Verify & Continue</button>
            <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem' }} onClick={() => setAuthState('LOGIN')}>Cancel</span>
          </motion.form>
        );

      case 'REGISTER_PASSWORD':
      case 'FORGOT_SET_PASSWORD':
        const isRegPass = authState === 'REGISTER_PASSWORD';
        return (
          <motion.form key="set_password" onSubmit={isRegPass ? handleRegisterPassword : handleForgotSetPassword} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>{isRegPass ? 'Secure Your Account' : 'Reset Password'}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Lock size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> {isRegPass ? 'Create Password' : 'New Password'}</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            <button type="submit" className="glow-button" style={{ marginTop: '10px', justifyContent: 'center' }}>
              {isRegPass ? 'Complete Registration' : 'Confirm & Login'}
            </button>
          </motion.form>
        );

      case 'FORGOT_PASSWORD':
        return (
          <motion.form key="forgot" onSubmit={handleForgotMobile} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Reset Protocol</h2>
            {error && <div style={{ color: '#ff3366', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Phone size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }}/> Registered Mobile Number</label>
              <input type="tel" required value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 98765 43210"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '1.1rem' }} />
            </div>
            <button type="submit" className="glow-button" style={{ marginTop: '10px', justifyContent: 'center' }}>Send Reset OTP</button>
            <span style={{ color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'center', fontSize: '0.9rem' }} onClick={() => setAuthState('LOGIN')}>Cancel</span>
          </motion.form>
        );
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 100 }}>
      <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '450px', position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};
