import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { projectPhases } from '../data/projectTasks';
import { usePremium } from '../hooks/usePremium';
import { MOCK_PROJECTS, type Project, type Task } from '../data/projects';


// --- MOCK DATA --- (MOVED TO data/projects.ts)

// --- COMPONENTS ---

const AIInsightPanel: React.FC<{ project: Project, tasks: Task[] }> = ({ project, tasks }) => {
    const { isPremium } = usePremium();
    const [insight, setInsight] = useState('');

    useEffect(() => {
        if (!isPremium) {
            setInsight("Upgrade to Premium to unlock proactive insights from The Line AI.");
            return;
        }

        const generateInsight = () => {
            const insights: string[] = [];
            const now = new Date();
            const projectDeadline = new Date(project.deadline);
            const daysToProjectDeadline = (projectDeadline.getTime() - now.getTime()) / (1000 * 3600 * 24);

            if (daysToProjectDeadline < 0) {
                insights.push(`This project is overdue! Let's prioritize critical path items to get it wrapped.`);
            } else if (daysToProjectDeadline < 3) {
                insights.push(`Heads up! The project deadline is in under 3 days. Let's make a big push!`);
            }

            const upcomingTasks = tasks.filter(t => !t.completed && t.deadline && (new Date(t.deadline).getTime() - now.getTime()) / (1000 * 3600 * 24) < 2);
            if (upcomingTasks.length > 0) {
                insights.push(`You have a task due soon: "${upcomingTasks[0].text}". Let me know if you need help.`);
            }

            const incompleteTasks = tasks.filter(t => !t.completed).length;
            if (incompleteTasks > 10) {
                insights.push(`There are ${incompleteTasks} tasks still open. Want me to help you identify the top 3 priorities?`);
            }
            
            if (project.userRole === 'Leading') {
                 insights.push(`As the project lead, ensuring tasks are clearly assigned can boost team momentum.`);
            } else {
                 insights.push(`Remember to update the status of your tasks as you complete them to keep the project lead informed.`);
            }

            insights.push(`Great progress so far! Keeping the momentum is key. What's our next move?`);

            setInsight(insights[Math.floor(Math.random() * insights.length)]);
        };

        generateInsight();
        const interval = setInterval(generateInsight, 20000); // New insight every 20 seconds
        return () => clearInterval(interval);

    }, [project, tasks, isPremium]);
    
    if (!isPremium) {
      return (
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-4 flex items-center gap-4 border border-primary/30">
            <span className="material-symbols-outlined text-primary text-3xl">lock</span>
            <div>
                <h4 className="font-bold text-text-light dark:text-text-dark">Unlock Proactive AI Insights</h4>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{insight}</p>
            </div>
        </div>
      )
    }

    return (
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-4 flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-3xl mt-1">auto_awesome</span>
            <div>
                <h4 className="font-bold text-text-light dark:text-text-dark">The Line's Log</h4>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{insight}</p>
            </div>
        </div>
    )
}


const CountdownTimer: React.FC<{ deadline: string }> = ({ deadline }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(deadline) - +new Date();
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const isOverdue = +new Date(deadline) < +new Date();

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    if (isOverdue) {
        return (
            <div className="flex flex-col items-center gap-3 rounded-lg bg-warning/20 p-4 text-center">
                 <div className="flex size-12 items-center justify-center rounded-full bg-warning/30">
                    <span className="material-symbols-outlined text-warning fill">local_fire_department</span>
                </div>
                <div>
                    <h4 className="font-bold text-text-light dark:text-text-dark">Project Deadline Passed</h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">This project is under threat of being burned. Secure it now.</p>
                </div>
                <Link to="/premium" className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Go Premium to Save</Link>
            </div>
        );
    }
    
    return (
        <div className="rounded-lg bg-surface-light dark:bg-surface-dark p-4">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-text-secondary-light dark:text-text-secondary-dark">Time to Deadline</p>
            <div className="mt-2 flex justify-center gap-4 text-center">
                <div><span className="text-2xl font-bold text-primary">{String(timeLeft.days).padStart(2, '0')}</span><span className="block text-xs text-text-secondary-light dark:text-text-secondary-dark">Days</span></div>
                <div><span className="text-2xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</span><span className="block text-xs text-text-secondary-light dark:text-text-secondary-dark">Hours</span></div>
                <div><span className="text-2xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="block text-xs text-text-secondary-light dark:text-text-secondary-dark">Mins</span></div>
            </div>
        </div>
    );
};


const ProjectDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();
    const { isPremium } = usePremium();

    const projectData = useMemo(() => MOCK_PROJECTS.find(p => p.id === projectId), [projectId]);

    const [tasks, setTasks] = useState<Task[]>(projectData?.tasks || []);
    const [activePhase, setActivePhase] = useState(projectPhases[0].name);
    
    useEffect(() => {
      if (projectData) {
        setTasks(projectData.tasks);
      }
    }, [projectData]);

    if (!projectData) {
        return <div className="p-8 text-center text-text-secondary-light dark:text-text-secondary-dark">Project not found.</div>;
    }
    
    const isLeader = projectData.userRole === 'Leading';

    const handleTaskChange = <K extends keyof Task>(id: string, key: K, value: Task[K]) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                const updatedTask = { ...task, [key]: value };
                if (key === 'completed') {
                    updatedTask.completedAt = value ? new Date() : null;
                }
                return updatedTask;
            }
            return task;
        }));
    };

    const visibleTasksForPhase = tasks.filter(task => {
        if (task.phase !== activePhase) return false;
        if (isLeader) return true;
        // For participants, show visible tasks that are unassigned or assigned to their role
        return task.visibleToTeam && (task.assignedTo === 'Unassigned' || task.assignedTo === 'Sound Designer' /* Hardcoded participant role */);
    });

    const AIAssistantButton = () => {
        const commonClasses = "w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-opacity";
        if (isPremium) {
            return (
                <Link to={`/ai-assistant/${projectId}`} state={{ project: projectData, tasks }} className={`${commonClasses} bg-primary text-white hover:opacity-90`}>
                    <span className="material-symbols-outlined !text-xl">chat</span>
                    Chat with The Line
                </Link>
            )
        }
        return (
            <div className="relative group">
                 <button disabled className={`${commonClasses} bg-border-light dark:bg-border-dark text-text-secondary-light dark:text-text-secondary-dark cursor-not-allowed`}>
                    <span className="material-symbols-outlined !text-xl">lock</span>
                    Chat with The Line
                </button>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-xs rounded-md shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" role="tooltip">
                    Go Premium to unlock
                </div>
            </div>
        )
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                 <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center text-text-light dark:text-text-dark">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold truncate px-2">Project: {projectData.title}</h1>
                <button className="flex size-10 shrink-0 items-center justify-center text-text-light dark:text-text-dark">
                    <span className="material-symbols-outlined text-2xl">more_horiz</span>
                </button>
            </header>

            <main className="flex flex-col flex-1">
                <div className="p-4 flex flex-col gap-4">
                    <CountdownTimer deadline={projectData.deadline} />
                    <AIInsightPanel project={projectData} tasks={tasks} />
                </div>
                
                <div className="border-y border-border-light dark:border-border-dark px-4">
                    <div className="flex -mx-4 overflow-x-auto scrollbar-hide">
                        <div className="flex flex-nowrap px-4">
                        {projectPhases.map(phase => (
                            <button 
                                key={phase.name} 
                                onClick={() => setActivePhase(phase.name)}
                                className={`flex-shrink-0 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activePhase === phase.name ? 'border-primary text-primary' : 'border-transparent text-text-secondary-light dark:text-text-secondary-dark'}`}
                            >
                                {phase.name}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 flex flex-col gap-3">
                    {visibleTasksForPhase.map(task => (
                        <div key={task.id} className="rounded-lg bg-surface-light dark:bg-surface-dark p-3 border border-border-light/50 dark:border-border-dark/50">
                            <div className="flex items-start gap-3">
                                <button disabled={!isLeader} onClick={() => handleTaskChange(task.id, 'completed', !task.completed)} className="mt-0.5">
                                    <span className={`material-symbols-outlined ${task.completed ? 'text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                                        {task.completed ? 'check_circle' : 'radio_button_unchecked'}
                                    </span>
                                </button>
                                <p className={`flex-1 text-text-light dark:text-text-dark ${task.completed ? 'line-through text-text-secondary-light dark:text-text-secondary-dark' : ''}`}>{task.text}</p>
                                {isLeader && (
                                     <button onClick={() => handleTaskChange(task.id, 'visibleToTeam', !task.visibleToTeam)} title="Toggle visibility for team">
                                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">
                                            {task.visibleToTeam ? 'visibility' : 'visibility_off'}
                                        </span>
                                    </button>
                                )}
                            </div>
                            {isLeader && (
                                <div className="mt-3 pl-9 flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark block mb-1">Assign To</label>
                                        <select
                                            value={task.assignedTo}
                                            onChange={(e) => handleTaskChange(task.id, 'assignedTo', e.target.value)}
                                            className="form-select w-full text-xs rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary"
                                        >
                                            <option>Unassigned</option>
                                            {projectData.team.map(member => <option key={member.role} value={member.role}>{member.role}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                         <label className="text-xs text-text-secondary-light dark:text-text-secondary-dark block mb-1">Deadline</label>
                                         <input
                                            type="date"
                                            value={task.deadline || ''}
                                            onChange={(e) => handleTaskChange(task.id, 'deadline', e.target.value)}
                                            className="form-input w-full text-xs rounded-md border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:border-primary focus:ring-primary"
                                         />
                                    </div>
                                </div>
                            )}
                            {!isLeader && (task.deadline || task.assignedTo !== 'Unassigned') && (
                                <div className="mt-2 pl-9 text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-4">
                                    {task.assignedTo !== 'Unassigned' && <span>Assigned to: <span className="font-semibold text-text-light dark:text-text-dark">{task.assignedTo}</span></span>}
                                    {task.deadline && <span>Due: <span className="font-semibold text-warning">{new Date(task.deadline).toLocaleDateString()}</span></span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-4 mt-auto border-t border-border-light dark:border-border-dark">
                    <h2 className="text-sm font-medium tracking-widest uppercase text-text-secondary-light dark:text-text-secondary-dark pb-4">Management Tools</h2>
                    <div className="flex flex-col gap-4">
                         <div className="group relative">
                            <AIAssistantButton />
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ProjectDetailPage;