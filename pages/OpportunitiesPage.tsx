import React, { useState } from 'react';

const OpportunitiesPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'map'>('list');
    const [showSearch, setShowSearch] = useState(false);

    // Mock Search State
    const [who, setWho] = useState('');
    const [goal, setGoal] = useState('');
    const [needs, setNeeds] = useState('');
    const [searching, setSearching] = useState(false);

    const handleSearch = () => {
        setSearching(true);
        setTimeout(() => {
            setSearching(false);
            setShowSearch(false);
            alert("This search is not exhaustive. Directing you to curated resources...");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background-dark pb-32 pt-12 relative">
            <div className="px-6 flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">The Industry</h1>
                    <p className="text-text-secondary-dark text-sm mt-1">Grants, Events & Resources.</p>
                </div>
                <div className="flex bg-surface-dark rounded-full p-1 border border-white/10">
                    <button onClick={() => setView('list')} className={`p-2 rounded-full transition-colors ${view === 'list' ? 'bg-white text-black' : 'text-text-secondary-dark'}`}>
                        <span className="material-symbols-outlined text-xl">list</span>
                    </button>
                    <button onClick={() => setView('map')} className={`p-2 rounded-full transition-colors ${view === 'map' ? 'bg-white text-black' : 'text-text-secondary-dark'}`}>
                        <span className="material-symbols-outlined text-xl">map</span>
                    </button>
                </div>
            </div>

            <div className="px-6 mb-8">
                <button 
                    onClick={() => setShowSearch(true)}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center gap-3 text-white font-bold hover:brightness-110 transition-all"
                >
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    Find Personalized Matches
                </button>
            </div>

            <main className="px-6">
                {view === 'map' ? (
                    <div className="w-full aspect-square md:aspect-video rounded-[2rem] bg-surface-dark border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center opacity-20 invert" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 bg-primary rounded-full animate-ping absolute" />
                            <div className="h-4 w-4 bg-primary rounded-full relative border-2 border-black" />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                            <h3 className="text-white font-bold">4 Events Near Los Angeles</h3>
                            <p className="text-xs text-text-secondary-dark">Tap markers to view details.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-surface-dark border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                                <div className="h-24 w-24 rounded-xl bg-black overflow-hidden shrink-0 relative">
                                    <img src={`https://picsum.photos/seed/${i + 'opp'}/200`} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[8px] font-bold text-white uppercase border border-white/10">
                                        Grant
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors">Indie Film Fund 2025</h3>
                                    <p className="text-xs text-text-secondary-dark mt-1 line-clamp-2">Providing up to $50k in finishing funds for narrative features.</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                                        <span className="material-symbols-outlined text-[14px]">calendar_month</span> Deadline: Nov 15
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* AI Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-end md:justify-center">
                    <button onClick={() => setShowSearch(false)} className="absolute top-6 right-6 text-white/50 hover:text-white">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                    
                    <div className="w-full max-w-lg mx-auto bg-surface-dark rounded-3xl p-8 border border-white/10 animate-slide-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">auto_awesome</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">AI Scout</h2>
                        </div>
                        
                        {!searching ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-text-secondary-dark uppercase tracking-wider block mb-2">Who are you?</label>
                                    <input 
                                        value={who} onChange={e => setWho(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. Emerging Horror Director"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-text-secondary-dark uppercase tracking-wider block mb-2">Current Goal?</label>
                                    <input 
                                        value={goal} onChange={e => setGoal(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. Funding for short film"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-text-secondary-dark uppercase tracking-wider block mb-2">Specific Needs?</label>
                                    <input 
                                        value={needs} onChange={e => setNeeds(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                                        placeholder="e.g. Grants under $10k"
                                    />
                                </div>
                                <button 
                                    onClick={handleSearch}
                                    className="w-full py-4 rounded-xl bg-white text-black font-bold mt-4 hover:scale-[1.02] transition-transform"
                                >
                                    Run Search
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="h-12 w-12 border-4 border-white/10 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-white font-bold">Scouring the web...</p>
                                <p className="text-xs text-text-secondary-dark mt-2">Finding tailored opportunities for you.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpportunitiesPage;