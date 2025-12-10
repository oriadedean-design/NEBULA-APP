import React from 'react';
import { MOCK_PROJECTS, Project } from '../data/projects';
import { usePremium } from '../hooks/usePremium';
import { Link } from 'react-router-dom';

const BudgetCard: React.FC<{ project: Project }> = ({ project }) => {
    const { isPremium } = usePremium();
    const percent = Math.min((project.spent / project.budget) * 100, 100);

    return (
        <div className="rounded-2xl bg-surface-dark border border-white/5 p-5 relative overflow-hidden group">
            {!isPremium && (
                <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                    <span className="material-symbols-outlined text-3xl text-primary mb-2">lock</span>
                    <p className="text-white font-bold mb-1">Premium Feature</p>
                    <Link to="/premium" className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold">Unlock Budgets</Link>
                </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-white font-bold">{project.title}</h3>
                    <p className="text-xs text-text-secondary-dark">Budget: ${project.budget.toLocaleString()}</p>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${percent > 100 ? 'bg-danger/20 text-danger' : 'bg-success/20 text-success'}`}>
                    {percent > 100 ? 'Over' : 'On Track'}
                </div>
            </div>

            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className={`absolute left-0 top-0 h-full rounded-full ${percent > 100 ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${percent}%` }} />
            </div>
            
            <div className="flex justify-between text-xs font-medium">
                <span className="text-white">${project.spent.toLocaleString()} spent</span>
                <span className="text-text-secondary-dark">{percent.toFixed(0)}%</span>
            </div>
        </div>
    );
};

const CommandCenterPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-dark pb-32 pt-12 px-6">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
                <button className="h-10 w-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">notifications</span>
                </button>
            </header>

            <div className="grid gap-8">
                <section>
                    <h2 className="text-sm font-bold text-text-secondary-dark uppercase tracking-widest mb-4">My Projects</h2>
                    <div className="grid gap-4">
                        {MOCK_PROJECTS.map(p => (
                            <Link to={`/project/${p.id}`} key={p.id} className="flex gap-4 p-4 rounded-2xl bg-surface-dark border border-white/5 hover:border-white/20 transition-all">
                                <div className="h-20 w-28 rounded-xl bg-black overflow-hidden shrink-0">
                                    <img src={`https://picsum.photos/seed/${p.title}/200`} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">{p.userRole}</span>
                                    <h3 className="text-lg font-bold text-white leading-tight">{p.title}</h3>
                                    <p className="text-xs text-text-secondary-dark mt-1">Next Task: Location Scout</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-4">
                         <h2 className="text-sm font-bold text-text-secondary-dark uppercase tracking-widest">Financials</h2>
                         <span className="px-1.5 py-0.5 rounded bg-primary/20 text-[10px] font-bold text-primary border border-primary/20">PRO</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {MOCK_PROJECTS.filter(p => p.userRole === 'Leading').map(p => (
                            <BudgetCard key={p.id} project={p} />
                        ))}
                    </div>
                </section>
                
                <section>
                     <h2 className="text-sm font-bold text-text-secondary-dark uppercase tracking-widest mb-4">Production Calendar</h2>
                     <div className="p-6 rounded-2xl bg-surface-dark border border-white/5 text-center">
                         <span className="material-symbols-outlined text-4xl text-text-secondary-dark mb-2">calendar_month</span>
                         <p className="text-white font-bold">No shoots scheduled today.</p>
                         <button className="mt-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10">
                             View Full Schedule
                         </button>
                     </div>
                </section>
            </div>
        </div>
    );
};

export default CommandCenterPage;