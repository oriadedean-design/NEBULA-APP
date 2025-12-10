import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePremium } from '../hooks/usePremium';

const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-surface-light/50 dark:bg-surface-dark/50">
        <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-lg bg-primary/20 text-primary">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
            <h3 className="font-bold text-text-light dark:text-text-dark">{title}</h3>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{description}</p>
        </div>
    </div>
);

const PremiumPage: React.FC = () => {
    const navigate = useNavigate();
    const { isPremium, togglePremium } = usePremium();

    const features = [
        { icon: 'smart_toy', title: 'The Line AI Assistant', description: 'Your personal Production Manager, Line Producer, and Coordinator, all in one.' },
        { icon: 'event', title: 'AI-Powered Scheduling', description: 'Auto-generate shooting schedules, crew rotations, and call sheets.' },
        { icon: 'receipt_long', title: 'Automated Budget Tracking', description: 'Scan receipts and track expenses against your budget in real-time.' },
        { icon: 'forward_to_inbox', title: 'Smart Communication', description: 'Auto-draft and send daily call sheets, reminders, and notifications.' },
        { icon: 'inventory_2', title: 'Equipment & Logistics', description: 'Track rentals, manage inventory, and generate loss/damage reports.' },
        { icon: 'groups', title: 'Streamlined HR Admin', description: 'Manage contracts, track crew hours, and generate payroll summaries.' }
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <header className="sticky top-0 z-20 flex items-center p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center text-text-light dark:text-text-dark">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold">Nebula Premium</h1>
                <div className="size-10 shrink-0"></div>
            </header>

            <main className="flex-1 flex flex-col gap-8 px-4 pb-28">
                <div className="text-center pt-6">
                    <div className="inline-block p-3 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tighter text-text-light dark:text-text-dark">Meet "The Line"</h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 max-w-md mx-auto">Your AI Production Assistant, built to handle the tedious logistics so you can focus on the creative.</p>
                </div>

                <div className="flex flex-col gap-3">
                    {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-background-light via-background-light/90 to-transparent dark:from-background-dark dark:via-background-dark/90 to-transparent">
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-bold text-lg">$30.00 / month</p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Cancel anytime.</p>
                    </div>
                    <button 
                        onClick={togglePremium}
                        className={`px-6 py-3 rounded-full font-bold text-sm transition-colors ${
                            isPremium 
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                            : 'bg-primary text-white hover:opacity-90'
                        }`}
                    >
                        {isPremium ? 'Unsubscribe' : 'Subscribe Now'}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default PremiumPage;