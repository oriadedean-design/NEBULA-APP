import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CollabsPage: React.FC = () => {
    const [selectedCollab, setSelectedCollab] = useState<any>(null);

    const Modal = ({ collab, onClose }: { collab: any, onClose: () => void }) => {
        const [step, setStep] = useState(1);
        
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
                <div className="relative w-full max-w-lg bg-surface-dark rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl animate-slide-up">
                    
                    {/* Header Image */}
                    <div className="h-32 w-full relative">
                        <img src={collab.img} className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-dark" />
                        <button onClick={onClose} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>

                    <div className="p-8 -mt-12 relative">
                        {step === 1 && (
                            <div className="text-center">
                                <div className="h-16 w-16 mx-auto rounded-full bg-surface-dark border-4 border-surface-dark flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-3xl text-warning">lock_person</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">NDA Required</h2>
                                <p className="text-text-secondary-dark mb-6 text-sm leading-relaxed">
                                    The project "{collab.title}" contains confidential intellectual property. 
                                    To view the synopsis and available roles, you must agree to the Non-Disclosure Agreement.
                                </p>
                                <div className="h-32 bg-black/30 rounded-xl p-4 text-left mb-6 overflow-y-auto border border-white/5">
                                    <p className="text-[10px] text-text-secondary-dark font-mono">
                                        I, the undersigned, agree to maintain strict confidentiality regarding all materials...
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setStep(2)}
                                    className="w-full py-4 rounded-xl bg-white text-black font-bold hover:scale-[1.02] transition-transform"
                                >
                                    Sign & Reveal Project
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">{collab.title}</h2>
                                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Applications Open</p>
                                
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold text-white mb-2">Logline</h3>
                                    <p className="text-text-secondary-dark text-sm italic">"A silent musician finds a way to be heard in a deafening world."</p>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-sm font-bold text-white mb-3">Select Role</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {collab.tags.map((tag: string) => (
                                            <button key={tag} className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all text-sm text-text-secondary-dark">
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={() => { alert('Applied!'); onClose(); }}
                                    className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                                >
                                    Submit Application
                                </button>
                                <p className="text-center text-[10px] text-text-secondary-dark mt-4">
                                    Project Lead response deadline: <span className="text-white">Oct 24</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background-dark pb-32 pt-12">
            <div className="px-6 mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">Collaborations</h1>
                <p className="text-text-secondary-dark mt-1">Join the next breakout hit.</p>
            </div>

            {/* Create CTA */}
            <div className="px-6 mb-12">
                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-surface-dark to-black border border-white/10 shadow-cinematic relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Start a Project</h2>
                            <p className="text-text-secondary-dark text-sm">Assemble your dream team today.</p>
                        </div>
                        <Link to="/start-collab/step1" className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-glow">
                            <span className="material-symbols-outlined">add</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Festival Showcase */}
            <div className="pl-6 mb-12">
                <div className="flex items-center justify-between pr-6 mb-4">
                    <h2 className="text-lg font-bold text-white">Festival Showcase</h2>
                    <span className="text-primary text-xs font-bold uppercase">Quarterly Winners</span>
                </div>
                <div className="pr-6">
                    <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
                        <img src="https://images.unsplash.com/photo-1596727147705-54a9d0c20945?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                            <span className="material-symbols-outlined text-4xl text-warning mb-2">trophy</span>
                            <h3 className="text-2xl font-bold text-white">Golden Lens Winners</h3>
                            <button className="mt-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-white hover:text-black transition-all">
                                View Showcase
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lists */}
            <div className="space-y-8">
                <div>
                    <h2 className="px-6 mb-4 text-lg font-bold text-white">Recommended For You</h2>
                    <div className="flex overflow-x-auto gap-4 px-6 pb-4 scrollbar-hide">
                        {[1, 2, 3].map(i => (
                            <div 
                                key={i} 
                                onClick={() => setSelectedCollab({ title: "Project " + i, img: `https://picsum.photos/seed/${i}/400/300`, tags: ['Editor', 'Sound'] })}
                                className="shrink-0 w-72 rounded-2xl overflow-hidden bg-surface-dark border border-white/5 cursor-pointer hover:border-white/20 transition-colors"
                            >
                                <div className="aspect-video bg-black relative">
                                    <img src={`https://picsum.photos/seed/${i}/400/300`} className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase border border-white/10">
                                        Seeking
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-white">Project Title {i}</h3>
                                    <p className="text-xs text-text-secondary-dark mt-1">Sci-Fi • Feature Film</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedCollab && <Modal collab={selectedCollab} onClose={() => setSelectedCollab(null)} />}
        </div>
    );
};

export default CollabsPage;