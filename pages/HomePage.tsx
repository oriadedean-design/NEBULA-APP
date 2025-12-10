import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PROJECTS, Project } from '../data/projects';
import { usePremium } from '../hooks/usePremium';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

// High-Fidelity Cinematic Assets
const ASSETS = {
    hero: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop", // Cinematic Set
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    news1: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop",
    news2: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
};

const HeroSection = () => (
    <div className="relative w-full h-[75vh] overflow-hidden">
        <div className="absolute inset-0 bg-black">
            <img src={ASSETS.hero} className="w-full h-full object-cover opacity-80" alt="Featured Project" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 pb-12 flex flex-col items-start gap-4 max-w-2xl animate-slide-up">
            <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">Featured Premiere</span>
                <span className="px-2 py-0.5 rounded-md bg-transparent border border-white/30 text-[10px] font-bold uppercase tracking-widest text-white/80">Sci-Fi</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none drop-shadow-2xl">
                CHRONOS<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">DRIFT</span>
            </h1>
            <p className="text-lg text-white/80 font-medium leading-relaxed max-w-lg line-clamp-3">
                When a rogue editor discovers a frame that shouldn't exist, reality begins to desync. 
                <span className="text-white block mt-2 text-sm opacity-60">Directed by Sarah Jenkins • Starring You</span>
            </p>
            <div className="flex items-center gap-4 mt-4">
                <button className="h-12 px-8 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                    <span className="material-symbols-outlined fill">play_arrow</span>
                    Watch Trailer
                </button>
                <button className="h-12 w-12 rounded-full glass border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </div>
        </div>
    </div>
);

const SectionHeader = ({ title, action }: { title: string, action?: string }) => (
    <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
        {action && (
            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
                {action}
            </button>
        )}
    </div>
);

const ProjectCard: React.FC<{ project: Project, index: number }> = ({ project, index }) => (
    <Link to={`/project/${project.id}`} className="shrink-0 w-48 md:w-64 snap-center group relative">
        <div className="aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-surface-dark relative shadow-cinematic ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.02]">
             <img src={`https://picsum.photos/seed/${project.title}/400/600`} className="w-full h-full object-cover" alt={project.title} />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute top-2 left-2 h-8 w-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center font-bold text-white border border-white/10">
                 {index + 1}
             </div>
        </div>
        <div className="px-1">
            <h3 className="font-bold text-white text-lg truncate leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-xs text-text-secondary-dark mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">movie_filter</span> {project.genre}
            </p>
            <p className="text-xs text-text-secondary-dark mt-0.5">Lead: <span className="text-white">{project.lead}</span></p>
        </div>
    </Link>
);

const VoteCard = () => {
    const [voted, setVoted] = useState(false);
    
    return (
        <div className="shrink-0 w-80 snap-center p-1">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                <img src={ASSETS.news1} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" alt="Vote" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-warning mb-1">Nebula Awards</span>
                    <h3 className="text-xl font-bold text-white leading-tight mb-3">Vote for Best Cinematography</h3>
                    {!voted ? (
                        <button 
                            onClick={(e) => { e.preventDefault(); setVoted(true); }}
                            className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white text-center hover:text-black transition-all"
                        >
                            Cast Your Vote
                        </button>
                    ) : (
                        <div className="w-full py-3 rounded-xl bg-success/20 border border-success/50 text-success font-bold text-sm text-center flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">check</span> Voted
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SubmitCard = () => (
    <Link to="/collabs" className="shrink-0 w-80 snap-center p-1">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 group">
            <img src={ASSETS.news2} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" alt="Submit" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Open Call</span>
                <h3 className="text-xl font-bold text-white leading-tight mb-3">Nebula Showcase 2025</h3>
                <div className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm text-center shadow-lg shadow-primary/20">
                    Submit Project
                </div>
            </div>
        </div>
    </Link>
);

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen pb-32 w-full overflow-x-hidden">
            {/* Top Navigation Overlay */}
            <div className="fixed top-0 left-0 w-full z-30 p-6 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <h1 className="text-2xl font-bold tracking-tighter text-white drop-shadow-lg">Nebula</h1>
                </div>
                <Link to="/profile" className="pointer-events-auto group relative">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white transition-colors">
                        <img src={ASSETS.avatar} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                </Link>
            </div>

            <HeroSection />

            <div className="relative z-10 -mt-12 bg-gradient-to-b from-transparent to-background-dark pb-8">
                <SectionHeader title="Top Ranked Projects" action="View All" />
                <div className="flex overflow-x-auto gap-4 px-6 pb-8 scrollbar-hide snap-x snap-mandatory">
                    {MOCK_PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>

                <SectionHeader title="Industry Competitions" />
                <div className="flex overflow-x-auto gap-4 px-6 pb-8 scrollbar-hide snap-x snap-mandatory">
                    <VoteCard />
                    <SubmitCard />
                    <div className="shrink-0 w-80 snap-center p-1 flex items-center justify-center rounded-2xl border border-white/5 bg-white/5">
                        <span className="text-text-secondary-dark text-sm font-medium">More coming soon...</span>
                    </div>
                </div>

                <SectionHeader title="Ongoing Collaborations" action="Manage" />
                 <div className="flex flex-col gap-4 px-6">
                    {MOCK_PROJECTS.slice(0, 2).map(p => (
                        <Link to={`/project/${p.id}`} key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-surface-dark border border-white/5 hover:bg-white/5 transition-colors group">
                            <div className="h-16 w-24 rounded-lg overflow-hidden relative">
                                <img src={`https://picsum.photos/seed/${p.title}/200/150`} className="w-full h-full object-cover" alt={p.title}/>
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold truncate group-hover:text-primary transition-colors">{p.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{width: `${p.progress}%`}} />
                                    </div>
                                    <span className="text-xs text-text-secondary-dark">{p.progress}%</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-text-secondary-dark group-hover:text-white">chevron_right</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;