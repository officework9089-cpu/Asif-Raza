import React, { useEffect, useState } from 'react';
import { supabase } from '@//admin/lib/supabase';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price_estimate: string;
  created_at?: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [inquireService, setInquireService] = useState<string | null>(null);

  const [projectScope, setProjectScope] = useState(
    'Classic Web System (Sub-sites)'
  );

  const [budgetRange, setBudgetRange] = useState<number>(1500);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('services')
        .select(
          'id, title, description, icon, price_estimate, created_at'
        )
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Failed to load services:', error);
        setError(error.message);
        return;
      }

      setServices(data || []);
    } catch (err) {
      console.error('Unexpected error loading services:', err);
      setError('Failed to load services.');
    } finally {
      setLoading(false);
    }
  };

  const getEstimatedDuration = (budget: number) => {
    if (budget < 1000) return '1 - 2 weeks';
    if (budget < 2500) return '2 - 4 weeks';
    if (budget < 5000) return '4 - 7 weeks';

    return '2+ months (Enterprise Agile Scrum cycles)';
  };

  const handleIncompleteFormSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!inquireService) return;

    const duration = getEstimatedDuration(budgetRange);

    alert(
      `Thank you for configuring your project inquiry!\n\n` +
      `Service: ${inquireService}\n` +
      `Scope: ${projectScope}\n` +
      `Estimated Budget: $${budgetRange}\n` +
      `Duration: ${duration}\n\n` +
      `We have loaded this into the Contact Form at the bottom of the page. ` +
      `Please scroll down, add your email, and hit Deliver to submit!`
    );

    const projectDetailText =
      `Inquiry Category: ${inquireService} (Standard Estimate Request)\n` +
      `Scope Model: ${projectScope}\n` +
      `Specified Budget Limit: $${budgetRange}\n` +
      `Estimated Release Phase: ${duration}`;

    const projectTextField =
      document.getElementById(
        'projectMessage'
      ) as HTMLTextAreaElement | null;

    const companyProjectField =
      document.getElementById(
        'companyProject'
      ) as HTMLInputElement | null;

    if (projectTextField) {
      projectTextField.value = projectDetailText;

      // Trigger React's input/change detection where applicable
      projectTextField.dispatchEvent(
        new Event('input', { bubbles: true })
      );

      projectTextField.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    if (companyProjectField) {
      companyProjectField.value = `${inquireService} Partnership`;

      companyProjectField.dispatchEvent(
        new Event('input', { bubbles: true })
      );

      companyProjectField.dispatchEvent(
        new Event('change', { bubbles: true })
      );
    }

    const contactElem =
      document.getElementById('contact');

    contactElem?.scrollIntoView({
      behavior: 'smooth',
    });

    setInquireService(null);
  };

  return (
    <section
      id="services"
      className="services py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Consultative{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-extrabold">
              Services
            </span>
          </h2>

          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>

          <p className="text-slate-400 mt-4 text-md">
            Architecting robust structures to streamline workflows,
            convert clients, and scale operations securely.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

              <span className="text-sm font-mono">
                Loading services...
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="max-w-xl mx-auto py-10 text-center">
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">
                Failed to load services.
              </p>

              <p className="text-red-400/70 text-xs mt-2">
                {error}
              </p>

              <button
                onClick={fetchServices}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/20 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!loading &&
          !error &&
          services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">

              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                >

                  {/* Ambient glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-[30px] group-hover:bg-cyan-500/10 transition-all duration-300"></div>

                  <div className="space-y-6">

                    {/* Icon */}
                    <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-cyan-400 text-2xl group-hover:border-cyan-500/30 transition-all duration-300 shadow-inner">
                      <i className={`fas ${srv.icon}`}></i>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-200">
                        {srv.title}
                      </h3>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="pt-6 border-t border-slate-900/60 mt-6 flex items-center justify-between">

                    <div>
                      <span className="text-xs text-slate-500 font-mono block">
                        estimate starts at
                      </span>

                      <span className="text-md font-bold text-white font-mono">
                        {srv.price_estimate}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setInquireService(srv.title)
                      }
                      className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-cyan-500 hover:text-white border border-slate-800 hover:border-transparent text-xs font-bold text-cyan-400 transition-all duration-300"
                    >
                      Configure Estimate
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}

        {/* Empty State */}
        {!loading &&
          !error &&
          services.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-sm font-mono">
                No services available.
              </p>
            </div>
          )}

        {/* PRICING INQUIRY BUILDER */}
        {inquireService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-scroll p-8 pt-20 sm:p-6 md:p-20">

            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() =>
                setInquireService(null)
              }
            />

            {/* Dialog */}
            <div className="relative z-10 w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl scale-100 transition-all duration-300 text-left my-auto max-h-[90vh] overflow-y-auto scrollbar-none">

              {/* Close */}
              <button
                onClick={() =>
                  setInquireService(null)
                }
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-20"
                aria-label="Close inquiry configurator"
              >
                <i className="fas fa-times"></i>
              </button>

              <div className="space-y-6">

                {/* Header */}
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    Inquiry Configurator
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1 leading-none font-sans">
                    {inquireService}
                  </h3>
                </div>

                <form
                  onSubmit={handleIncompleteFormSubmit}
                  className="space-y-5"
                >

                  {/* Project Scope */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Project Scope / Complexity
                    </label>

                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Classic Web System (Sub-sites)',
                        'Custom Multi-Vendor Portal Staging',
                        'Fully Integrated Business Suite (Admin Controls)',
                        'API Microservice & Database Optimization Nodes',
                      ].map((item) => (
                        <label
                          key={item}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 text-xs ${
                            projectScope === item
                              ? 'bg-cyan-500/10 border-cyan-500/50 text-white font-semibold'
                              : 'bg-slate-900/40 border-slate-900 text-slate-400 hover:bg-slate-900/70'
                          }`}
                        >
                          <input
                            type="radio"
                            name="projectScope"
                            value={item}
                            checked={
                              projectScope === item
                            }
                            onChange={() =>
                              setProjectScope(item)
                            }
                            className="text-cyan-500 accent-cyan-500 focus:ring-0"
                          />

                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400 uppercase">
                      <span>
                        Assigned Budget Limit
                      </span>

                      <span className="font-bold text-cyan-400">
                        ${budgetRange}
                      </span>
                    </div>

                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="250"
                      className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 p-0 hover:accent-cyan-300"
                      value={budgetRange}
                      onChange={(e) =>
                        setBudgetRange(
                          parseInt(e.target.value)
                        )
                      }
                    />

                    <div className="flex justify-between text-[10px] font-mono text-slate-600">
                      <span>
                        $100 (Small Project)
                      </span>

                      <span>
                        $10,000+ (Large Enterprise Solution)
                      </span>
                    </div>
                  </div>

                  {/* Estimate */}
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 text-xs space-y-1">

                    <p className="flex justify-between">
                      <span className="font-mono text-slate-500">
                        Estimated duration:
                      </span>

                      <strong className="text-white font-semibold">
                        {getEstimatedDuration(
                          budgetRange
                        )}
                      </strong>
                    </p>

                    <p className="flex justify-between">
                      <span className="font-mono text-slate-500">
                        Assurance:
                      </span>

                      <strong className="text-emerald-400 font-semibold">
                        100% Satisfaction SLA Guarantee
                      </strong>
                    </p>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
                  >
                    Load & Export Configuration to Contact Form
                  </button>

                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}