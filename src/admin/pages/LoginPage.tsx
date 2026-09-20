import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, EyeOff, Fingerprint, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../admin.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (authError) setError(authError.message);
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-backdrop"><div className="admin-grid" /><div className="admin-scanlines" /></div>
      <motion.div className="login-glow login-glow-a" animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.div className="login-glow login-glow-b" animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 8, repeat: Infinity }} />

      <motion.div className="login-panel" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="login-brand"><div className="admin-brand-mark"><Sparkles size={20} /></div><div><strong>ASIF<span>CTRL</span></strong><small>PORTFOLIO COMMAND CENTER</small></div></div>
        <div className="login-status"><span className="admin-live-dot" /> SECURE ADMIN CHANNEL</div>
        <h1>Enter the control room.</h1>
        <p className="login-copy">Authenticate with your Supabase account to manage every portfolio dataset from one dark operations console.</p>

        <form onSubmit={signIn} className="admin-form">
          <label>Email<div className="admin-input-icon"><Mail size={17} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" autoComplete="email" required /></div></label>
          <label>Password<div className="admin-input-icon"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" autoComplete="current-password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
          {error && <div className="admin-alert error"><ShieldCheck size={16} /> {error}</div>}
          <button className="admin-login-button" disabled={loading}>{loading ? 'OPENING SECURE SESSION…' : 'AUTHENTICATE'} <ArrowRight size={17} /></button>
        </form>

        <div className="login-security"><Fingerprint size={16} /><span>Session persistence + token refresh enabled</span></div>
      </motion.div>
    </div>
  );
}
