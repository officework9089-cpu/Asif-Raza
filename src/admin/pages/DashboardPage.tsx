import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, BriefcaseBusiness, Code2, FolderKanban, MessageSquareQuote, Newspaper, Sparkles, Tags, Wrench } from 'lucide-react';
import { supabase } from '../lib/supabase';

const cards = [
  { key: 'projects', label: 'Projects', icon: FolderKanban, color: 'cyan', to: '/admin/projects' },
  { key: 'features', label: 'Project Features', icon: Tags, color: 'violet', to: '/admin/project-features' },
  { key: 'skills', label: 'Skills', icon: Code2, color: 'blue', to: '/admin/skills' },
  { key: 'timeline', label: 'Timeline', icon: BriefcaseBusiness, color: 'emerald', to: '/admin/timeline' },
  { key: 'services', label: 'Services', icon: Wrench, color: 'amber', to: '/admin/services' },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, color: 'pink', to: '/admin/testimonials' },
  { key: 'blog', label: 'Blog Posts', icon: Newspaper, color: 'indigo', to: '/admin/blog' },
] as const;

export default function DashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [recentProjects, setRecentProjects] = useState<Array<{ id: string; title: string; category: string }>>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [projects, features, skills, timeline, services, testimonials, blog] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('project_features').select('id', { count: 'exact', head: true }),
      supabase.from('skills').select('id', { count: 'exact', head: true }),
      supabase.from('timeline_items').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    ]);
    setCounts({ projects: projects.count ?? 0, features: features.count ?? 0, skills: skills.count ?? 0, timeline: timeline.count ?? 0, services: services.count ?? 0, testimonials: testimonials.count ?? 0, blog: blog.count ?? 0 });
    const { data } = await supabase.from('projects').select('id,title,category').order('created_at', { ascending: false }).limit(5);
    setRecentProjects(data ?? []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  return (
    <div className="admin-page-stack">
      <div className="admin-command-banner"><div><div className="admin-section-eyebrow">SYSTEM OVERVIEW</div><h2>Portfolio command center <Sparkles size={20} /></h2><p>Manage production content, skills, services, social proof, and articles from one place.</p></div><div className="admin-banner-badge">LIVE <span /></div></div>

      <div className="admin-metric-grid">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return <motion.div key={card.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}><Link to={card.to} className={`admin-metric-card ${card.color}`}><div className="admin-metric-icon"><Icon size={20} /></div><div className="admin-metric-value">{loading ? '—' : counts[card.key] ?? 0}</div><div className="admin-metric-label">{card.label}</div><ArrowUpRight className="admin-metric-arrow" size={17} /></Link></motion.div>;
        })}
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-header"><div><div className="admin-section-eyebrow">CONTENT STREAM</div><h3>Recent projects</h3></div><Link to="/admin/projects" className="admin-text-link">Manage <ArrowUpRight size={14} /></Link></div>
          {recentProjects.length === 0 ? <div className="admin-empty-inline">No project records yet.</div> : <div className="admin-mini-list">{recentProjects.map((project, index) => <motion.div className="admin-mini-row" key={project.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}><div className="admin-mini-index">0{index + 1}</div><div><strong>{project.title}</strong><span>{project.category}</span></div><FolderKanban size={15} /></motion.div>)}</div>}
        </section>

        <section className="admin-panel system-panel">
          <div className="admin-panel-header"><div><div className="admin-section-eyebrow">SYSTEM HEALTH</div><h3>Control signals</h3></div><Sparkles size={17} /></div>
          <div className="signal"><span>Supabase Auth</span><b className="signal-ok">CONNECTED</b></div>
          <div className="signal"><span>Content RLS</span><b className="signal-ok">READY</b></div>
          <div className="signal"><span>CRUD Console</span><b className="signal-ok">ONLINE</b></div>
          <div className="signal"><span>Realtime UI</span><b className="signal-muted">LOCAL</b></div>
        </section>
      </div>
    </div>
  );
}
