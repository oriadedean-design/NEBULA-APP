import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StartCollabStep3Page: React.FC = () => {
    const navigate = useNavigate();
    const [ndaRequired, setNdaRequired] = useState(true);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center">
                    <span className="material-symbols-outlined text-text-light dark:text-text-dark">arrow_back</span>
                </button>
                <h2 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Step 3: Final Details</h2>
                <div className="size-12 shrink-0"></div>
            </header>
            <div className="flex w-full flex-row items-center justify-center gap-2 pb-4">
              <div className="h-1.5 w-8 rounded-full bg-primary"></div>
              <div className="h-1.5 w-8 rounded-full bg-primary"></div>
              <div className="h-1.5 w-8 rounded-full bg-primary"></div>
              <div className="h-1.5 w-8 rounded-full bg-border-light dark:bg-border-dark"></div>
            </div>
            <main className="flex-grow px-4">
                <h1 className="text-text-light dark:text-text-dark tracking-tight text-[32px] font-bold leading-tight text-left pb-3 pt-4">Final Details</h1>
                <section className="mt-6">
                    <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">Protect Your Idea</h3>
                    <div className="flex items-center gap-4 bg-surface-light dark:bg-surface-dark rounded-lg min-h-[72px] p-4 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-12">
                                <span className="material-symbols-outlined text-primary">shield</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Require NDA Signature</p>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Collaborators must sign a standard NDA.</p>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full p-0.5 transition-colors ${ndaRequired ? 'bg-primary' : 'bg-border-light dark:bg-border-dark'}`}>
                                <div className={`h-full w-[27px] rounded-full bg-white transition-transform ${ndaRequired ? 'translate-x-[calc(100%-8px)]' : 'translate-x-0'}`} style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px'}}></div>
                                <input checked={ndaRequired} onChange={() => setNdaRequired(!ndaRequired)} className="invisible absolute" type="checkbox"/>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="mt-6">
                    <h3 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">Set a Timeline</h3>
                    <div className="relative">
                        <label className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal absolute left-4 top-2.5" htmlFor="completion-date">Ideal Completion Date</label>
                        <input className="w-full rounded-lg border-0 bg-surface-light dark:bg-surface-dark p-4 pt-8 text-base text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:ring-2 focus:ring-primary focus:ring-inset" id="completion-date" placeholder="Select a date" type="date"/>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 pt-3">
                            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">calendar_month</span>
                        </div>
                    </div>
                </section>
                <section className="mt-10">
                    <div className="flex flex-col items-center gap-4 rounded-lg bg-warning/20 p-5 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full bg-warning/30">
                            <span className="material-symbols-outlined text-warning fill">local_fire_department</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-lg font-bold text-text-light dark:text-text-dark">Heads Up: Chat Timer</h4>
                            <p className="text-sm leading-relaxed text-text-secondary-light dark:text-text-secondary-dark">A 2-week chat 'burn' timer begins immediately after starting the collab. This encourages focused and timely communication.</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="sticky bottom-0 p-4 pt-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark to-transparent">
                <Link to="/start-collab/step4" className="w-full block text-center rounded-lg bg-primary py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">Next: Select Tasks</Link>
            </footer>
        </div>
    );
};

export default StartCollabStep3Page;