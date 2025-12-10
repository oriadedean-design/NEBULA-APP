import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectPhases } from '../data/projectTasks';

const StartCollabStep4Page: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTasks, setSelectedTasks] = useState<Record<string, boolean>>(() => {
        const saved = localStorage.getItem('nebula-task-prefs');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        // Pre-select all tasks if no preferences are saved yet
        if (Object.keys(selectedTasks).length === 0) {
            const allTasks: Record<string, boolean> = {};
            projectPhases.forEach(phase => {
                phase.tasks.forEach(task => {
                    allTasks[task] = true;
                });
            });
            setSelectedTasks(allTasks);
        }
    }, []);

    const toggleTask = (task: string) => {
        setSelectedTasks(prev => ({
            ...prev,
            [task]: !prev[task],
        }));
    };

    const handleContinue = () => {
        localStorage.setItem('nebula-task-prefs', JSON.stringify(selectedTasks));
        navigate('/collab-initiated');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <header className="sticky top-0 z-10 flex w-full flex-col bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <div className="flex w-full items-center p-4">
                    <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center text-text-light dark:text-text-dark">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-text-light dark:text-text-dark">Start a Collab</h1>
                    <div className="size-10 shrink-0"></div>
                </div>
                <div className="flex w-full flex-row items-center justify-center gap-2 pb-4">
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex w-full flex-col text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">Customize Your Project Plan</h2>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Deselect any tasks you won't need. Your settings will be saved for next time.</p>
                </div>
                <div className="flex flex-col gap-6">
                    {projectPhases.map(phase => (
                        <div key={phase.name}>
                            <h3 className="text-sm font-medium tracking-widest uppercase text-text-secondary-light dark:text-text-secondary-dark pb-3">{phase.name}</h3>
                            <div className="flex flex-col gap-2">
                                {phase.tasks.map(task => (
                                    <label key={task} className="flex items-center gap-3 rounded-lg bg-surface-light dark:bg-surface-dark p-3 cursor-pointer border border-border-light/50 dark:border-border-dark/50">
                                        <input
                                            type="checkbox"
                                            checked={!!selectedTasks[task]}
                                            onChange={() => toggleTask(task)}
                                            className="form-checkbox h-5 w-5 rounded bg-border-light dark:bg-border-dark text-primary border-border-light dark:border-border-dark focus:ring-primary/50"
                                        />
                                        <span className="text-text-light dark:text-text-dark text-sm">{task}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="sticky bottom-0 w-full bg-background-light/80 dark:bg-background-dark/80 p-4 pt-2 backdrop-blur-sm">
                <button onClick={handleContinue} className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-primary text-white text-base font-bold leading-normal tracking-wide transition-opacity hover:opacity-90">
                    <span className="truncate">Start Collab</span>
                </button>
            </footer>
        </div>
    );
};

export default StartCollabStep4Page;