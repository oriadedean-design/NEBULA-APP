import React, { useState } from 'react';

const ASSETS = {
    p1: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop",
    p2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2544&auto=format&fit=crop",
    p3: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    p4: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2544&auto=format&fit=crop",
};

const SwipeCard = ({ name, role, img, index }: { name: string, role: string, img: string, index: number }) => (
    <div className="shrink-0 w-[85vw] md:w-[400px] h-[65vh] rounded-[2.5rem] overflow-hidden relative shadow-cinematic snap-center ring-1 ring-white/10 bg-surface-dark group">
        <img src={img} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 pb-10 flex flex-col items-start gap-4">
            <div>
                <div className="flex gap-2 mb-2">
                     <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase text-white border border-white/10">Available</span>
                     <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-[10px] font-bold uppercase text-primary border border-primary/30">Top Rated</span>
                </div>
                <h2 className="text-5xl font-bold text-white tracking-tighter leading-none">{name}</h2>
                <p className="text-xl text-primary font-medium mt-1">{role}</p>
            </div>
            
            <p className="text-text-secondary-dark text-sm line-clamp-2">
                Award-winning visual storyteller with a focus on high-contrast lighting and emotional narrative.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <button className="py-4 rounded-2xl bg-white text-black font-bold text-sm hover:scale-[1.02] transition-transform">
                    Connect
                </button>
                <button className="py-4 rounded-2xl glass border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors">
                    View Profile
                </button>
            </div>
        </div>
    </div>
);

const DiscoverPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'foryou' | 'creators' | 'iso'>('foryou');

    return (
        <div className="min-h-screen bg-background-dark pb-32">
            <div className="pt-8 px-6 pb-6 sticky top-0 z-20 bg-background-dark/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Connect</h1>
                <div className="flex bg-surface-dark rounded-full p-1 border border-white/10">
                    <button 
                        onClick={() => setActiveTab('foryou')}
                        className={`h-10 w-14 rounded-full flex items-center justify-center transition-all ${activeTab === 'foryou' ? 'bg-primary text-white shadow-glow' : 'text-text-secondary-dark hover:text-white'}`}
                    >
                        <span className="material-symbols-outlined">auto_awesome</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('creators')}
                        className={`h-10 px-5 rounded-full text-sm font-bold transition-all ${activeTab === 'creators' ? 'bg-white text-black' : 'text-text-secondary-dark hover:text-white'}`}
                    >
                        Creators
                    </button>
                    <button 
                        onClick={() => setActiveTab('iso')}
                        className={`h-10 px-5 rounded-full text-sm font-bold transition-all ${activeTab === 'iso' ? 'bg-white text-black' : 'text-text-secondary-dark hover:text-white'}`}
                    >
                        ISO
                    </button>
                </div>
            </div>

            <main className="pt-4">
                {activeTab === 'foryou' && (
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-between px-6 mb-4">
                            <h2 className="text-sm font-bold text-text-secondary-dark uppercase tracking-widest">Curated Matches</h2>
                            <span className="material-symbols-outlined text-text-secondary-dark">tune</span>
                        </div>
                        <div className="flex overflow-x-auto gap-4 px-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                            <SwipeCard name="Alina Petrova" role="Director of Photography" img={ASSETS.p1} index={0} />
                            <SwipeCard name="Marcus Cole" role="VFX Artist" img={ASSETS.p2} index={1} />
                            <SwipeCard name="Sarah Jenkins" role="Editor" img={ASSETS.p3} index={2} />
                        </div>
                    </div>
                )}

                {activeTab === 'creators' && (
                    <div className="px-6 animate-fade-in flex flex-col gap-4">
                         <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-dark">search</span>
                            <input className="w-full h-14 pl-12 rounded-2xl bg-surface-dark border-none text-white focus:ring-1 focus:ring-primary placeholder:text-text-secondary-dark" placeholder="Search by role, name, city..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="bg-surface-dark rounded-2xl p-4 border border-white/5">
                                    <div className="h-24 w-24 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-white/10">
                                        <img src={`https://picsum.photos/seed/${i}/200`} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-center font-bold text-white">Creator {i}</h3>
                                    <p className="text-center text-xs text-primary font-bold uppercase tracking-wide">Sound Design</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DiscoverPage;