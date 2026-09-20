import React, { useState, useMemo } from 'react';
import { blogArticles } from '../data';
import { BlogItem } from '../types';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<BlogItem | null>(null);

  // Newsletter states
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Backend', 'Design Systems', 'AI Integration'];

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchCategory = selectedCategory === 'All' ? true : article.category === selectedCategory;
      const matchQuery =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsEmail('');
    }, 2000);
  };

  return (
    <section id="blog" className="blog py-24 bg-slate-950/20 relative">
      <div className="container mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight">
            Engineering <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent font-extrabold font-sans">Blogs</span>
          </h2>
          <div className="w-12 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
          <p className="text-slate-400 mt-4 text-md">
            Sharing guidelines, research journals, and performance benchmarks on deep full-stack optimizations.
          </p>
        </div>

        {/* Toolbar & Filter Tabs */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center max-w-5xl mx-auto mb-12 bg-slate-900/40 p-4 rounded-2xl border border-slate-900">
          
          {/* Category tabs */}
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === c
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Keyword Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search journals..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl outline-none focus:border-cyan-500 text-xs text-slate-100 placeholder-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search absolute left-3.5 top-3 text-xs text-slate-500"></i>
          </div>

        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {filteredArticles.map((article) => (
            <article 
              key={article.id}
              className="group flex flex-col justify-between bg-slate-900/40 rounded-2xl border border-slate-900 overflow-hidden hover:border-slate-800/80 transition-all duration-300"
            >
              <div>
                {/* Images */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-all duration-300"></div>
                  <span className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/15 uppercase tracking-wider">{article.category}</span>
                </div>

                {/* Content details */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-md sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-200">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Read button */}
              <div className="p-6 pt-0 mt-2">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 bg-slate-950 hover:bg-slate-900 px-3 py-2 rounded-lg border border-slate-900"
                >
                  Read Full Journal <i className="fas fa-angle-right"></i>
                </button>
              </div>

            </article>
          ))}
        </div>

        {/* Dynamic Newsletter Subscription Segment */}
        <div className="max-w-3xl mx-auto bg-slate-900/40 border border-slate-900 p-8 sm:p-12 rounded-3xl mt-24 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-[40px]"></div>
          
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Stay Updated</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Subscribe to receive exclusive deep dives on Laravel frameworks, core performance metrics, and database scaling pipelines directly to your inbox.</p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 transition-colors"
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              disabled={subscribed}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-95 text-white text-xs font-bold rounded-xl whitespace-nowrap transition-transform active:scale-[0.98]"
              disabled={subscribed}
            >
              {subscribed ? 'Subscribed! ✨' : 'Subscribe'}
            </button>
          </form>

          {subscribed && (
            <p className="text-xs font-semibold text-emerald-400 animate-pulse">✨ Success! You will receive notification logs when a new journal is published.</p>
          )}
        </div>

        {/* BLOG DETAILS MODAL DRAW */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl scale-100 transition-all duration-300 max-h-[80vh] overflow-y-auto text-left space-y-6">
              
              {/* Closing Trigger icon */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>

              <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-wider uppercase border border-cyan-500/25">{selectedArticle.category}</span>
              
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight font-sans">{selectedArticle.title}</h3>
                
                <div className="flex gap-4 text-[11px] font-mono text-slate-500">
                  <span>Published: {selectedArticle.date}</span>
                  <span>Read Period: {selectedArticle.readTime}</span>
                </div>
              </div>

              {/* Main descriptive journal */}
              <div className="space-y-4 border-t border-slate-900 pt-6">
                <p className="text-sm text-slate-300 leading-relaxed font-semibold italic">"{selectedArticle.summary}"</p>
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{selectedArticle.content}</p>
              </div>

              {/* Footer row */}
              <div className="pt-6 border-t border-slate-900 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">Author: Asif Raza Portfolio Logs</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Dismiss Article
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
