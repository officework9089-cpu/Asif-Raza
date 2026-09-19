import { ReactNode, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  FolderKanban,
  Gauge,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Moon,
  PanelLeft,
  Settings2,
  Sparkles,
  Tags,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../admin.css';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/project-features', label: 'Project Features', icon: Tags },
  { to: '/admin/skills', label: 'Skills', icon: Code2 },
  { to: '/admin/timeline', label: 'Timeline', icon: BriefcaseBusiness },
  { to: '/admin/services', label: 'Services', icon: Gauge },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
];

function AnimatedBackdrop() {
  return (
    <div className="admin-backdrop" aria-hidden="true">
      <div className="admin-grid" />
      <motion.div className="admin-orb admin-orb-a" animate={{ x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="admin-orb admin-orb-b" animate={{ x: [0, -40, 30, 0], y: [0, 30, -15, 0], scale: [1, 0.92, 1.08, 1] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="admin-scanlines" />
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const pageTitle = navItems.find((item) => item.end ? location.pathname === item.to : location.pathname.startsWith(item.to))?.label ?? 'Admin';

  return (
    <div className={`admin-shell ${collapsed ? 'admin-sidebar-collapsed' : ''}`}>
      <AnimatedBackdrop />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="admin-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside className={`admin-sidebar ${mobileOpen ? 'admin-mobile-open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark"><Sparkles size={18} /></div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
                <div className="admin-brand-title">ASIF<span>CTRL</span></div>
                <div className="admin-brand-subtitle">PORTFOLIO COMMAND</div>
              </motion.div>
            )}
          </AnimatePresence>
          <button className="admin-icon-button admin-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close sidebar"><X size={18} /></button>
        </div>

        <div className="admin-live-card">
          <div className="admin-live-dot" />
          {!collapsed && <><span>System Online</span><Activity size={15} /></>}
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-label">CONTROL</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
                {item.to === '/admin' && !collapsed && <BarChart3 className="admin-nav-trail" size={14} />}
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <NavLink to="/" className="admin-nav-link" target="_blank">
            <ExternalLink size={18} />
            {!collapsed && <span>View Website</span>}
          </NavLink>
          <button className="admin-nav-link admin-logout-button" onClick={handleSignOut}>
            <LogOut size={18} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>

        <button className="admin-collapse-button" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-icon-button admin-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open sidebar"><Menu size={20} /></button>
            <div>
              <div className="admin-kicker"><PanelLeft size={13} /> CONTROL PANEL / {pageTitle.toUpperCase()}</div>
              <h1>{pageTitle}</h1>
            </div>
          </div>
          <div className="admin-topbar-actions">
            <div className="admin-user-chip"><Database size={15} /><span>Supabase Auth</span></div>
            <button className="admin-icon-button" title="Dark interface"><Moon size={17} /></button>
            <button className="admin-icon-button" title="Settings"><Settings2 size={17} /></button>
          </div>
        </header>

        <motion.div
          className="admin-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={location.pathname}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
