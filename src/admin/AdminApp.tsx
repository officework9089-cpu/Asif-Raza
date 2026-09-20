import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import { supabase } from './lib/supabase';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectFeaturesPage from './pages/ProjectFeaturesPage';
import SkillsPage from './pages/SkillsPage';
import TimelinePage from './pages/TimelinePage';
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';

export default function AdminApp() {
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="admin-boot">
        <div className="admin-loader-ring" />
        <span>AUTHENTICATING CONTROL MATRIX…</span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="login" element={session ? <Navigate to="/admin" replace /> : <LoginPage />} />
      <Route
        element={
          session ? (
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="project-features" element={<ProjectFeaturesPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}
