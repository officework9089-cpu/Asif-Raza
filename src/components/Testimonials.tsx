import { useEffect, useState } from 'react';
import { supabase } from '@//admin/lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  created_at?: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('testimonials')
        .select(`
          id,
          name,
          role,
          company,
          feedback,
          rating,
          created_at
        `)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Failed to load testimonials:', error);
        setError(error.message);
        return;
      }

      setTestimonials(data || []);
      setCurrentIndex(0);
    } catch (err) {
      console.error('Unexpected error loading testimonials:', err);
      setError('Failed to load testimonials.');
    } finally {
      setLoading(false);
    }
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    if (testimonials.length === 0) return;

    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="testimonials py-24 bg-slate-950/40 relative"
    >
      <div className="container mx-auto px-4">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Client{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-extrabold">
              Endorsements
            </span>
          </h2>

          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>

          <p className="text-slate-400 mt-4 text-md">
            Reviews, feedback records, and verification parameters delivered
            by brand owners, developers, and agency executives.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3 text-cyan-400">
              <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

              <span className="text-sm font-mono">
                Loading testimonials...
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="max-w-xl mx-auto py-10 text-center">
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">
                Failed to load testimonials.
              </p>

              <p className="text-red-400/70 text-xs mt-2">
                {error}
              </p>

              <button
                onClick={fetchTestimonials}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/20 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* No Testimonials */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-sm font-mono">
              No testimonials available yet.
            </p>
          </div>
        )}

        {/* Testimonial Slider */}
        {!loading && !error && currentTestimonial && (
          <>
            <div className="max-w-4xl mx-auto relative px-4 sm:px-12">

              {/* Main Card */}
              <div className="p-8 sm:p-12 bg-slate-900/40 border border-slate-900 rounded-2xl md:min-h-[280px] flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden">

                {/* Decorative Quote */}
                <div className="absolute top-4 right-8 text-7xl font-serif text-cyan-500/10 select-none">
                  “
                </div>

                <div className="space-y-6 z-10">

                  {/* Star Rating */}
                  <div className="flex gap-1 text-yellow-400 text-sm">
                    {[...Array(Math.min(Math.max(currentTestimonial.rating, 0), 5))].map(
                      (_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      )
                    )}
                  </div>

                  {/* Feedback */}
                  <blockquote className="text-base sm:text-lg text-slate-300 leading-relaxed italic">
                    "{currentTestimonial.feedback}"
                  </blockquote>
                </div>

                {/* Profile Footer */}
                <div className="pt-6 border-t border-slate-800 mt-8 flex items-center gap-4">

                  {/* Initial Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-black text-sm uppercase">
                    {currentTestimonial.name?.charAt(0) || '?'}
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-md tracking-tight">
                      {currentTestimonial.name}
                    </h4>

                    <p className="text-xs text-slate-500 font-mono">
                      {currentTestimonial.role} —{' '}
                      {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              {testimonials.length > 1 && (
                <div className="flex justify-center md:justify-between items-center gap-4 mt-8 md:absolute md:inset-y-0 md:left-0 md:right-0 md:pointer-events-none md:mt-0">

                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-cyan-500/30 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl md:pointer-events-auto md:-translate-x-6"
                    aria-label="Previous testimonials slide"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-cyan-500/30 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl md:pointer-events-auto md:translate-x-6"
                    aria-label="Next testimonials slide"
                  >
                    <i className="fas fa-arrow-right"></i>
                  </button>

                </div>
              )}
            </div>

            {/* Slider Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'w-8 bg-cyan-400'
                        : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}