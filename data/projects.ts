
import { projectPhases } from './projectTasks';

export interface Task {
    id: string;
    phase: string;
    text: string;
    completed: boolean;
    completedAt: Date | null;
    visibleToTeam: boolean;
    assignedTo: string; // Role name
    deadline: string | null;
}

export interface TeamMember {
    name: string;
    role: string;
}

export interface Project {
    id:string;
    title: string;
    genre: string;
    lead: string;
    progress: number;
    userRole: 'Leading' | 'Participating';
    deadline: string;
    budget: number;
    spent: number;
    team: TeamMember[];
    tasks: Task[];
}

// Helper to create initial tasks from the template
const createInitialTasks = (): Task[] => {
    let tasks: Task[] = [];
    let completedCount = 0;
    projectPhases.forEach(phase => {
        phase.tasks.forEach((taskText, index) => {
            const isCompleted = Math.random() > 0.7 && completedCount < 5;
            if (isCompleted) completedCount++;

            tasks.push({
                id: `${phase.name.replace(/\s+/g, '-')}-${index}`,
                phase: phase.name,
                text: taskText,
                completed: isCompleted,
                completedAt: isCompleted ? new Date(new Date().getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000) : null,
                visibleToTeam: true,
                assignedTo: 'Unassigned',
                deadline: new Date(new Date().getTime() + (Math.random() * 20 + 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            });
        });
    });
    return tasks;
};

export const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Nocturne',
        genre: 'Neo-Noir Thriller',
        lead: 'Anya Sharma',
        progress: 75,
        userRole: 'Leading',
        deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 15000,
        spent: 8200,
        team: [
            { name: 'Anya Sharma', role: 'Director' },
            { name: 'Leo Martinez', role: 'DP' },
            { name: 'Chloe Chen', role: 'Editor' },
        ],
        tasks: createInitialTasks(),
    },
    {
        id: '2',
        title: 'Echoes in Silence',
        genre: 'Documentary',
        lead: 'Jordan Peele',
        progress: 30,
        userRole: 'Participating',
        deadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        budget: 5000,
        spent: 1200,
        team: [
            { name: 'Jordan Peele', role: 'Director' },
            { name: 'You', role: 'Sound Designer' },
        ],
        tasks: createInitialTasks().map(t => t.text.includes("sound") ? {...t, assignedTo: 'Sound Designer'} : t),
    },
    {
        id: '3',
        title: 'Penumbra',
        genre: 'Sci-Fi Short',
        lead: 'Sarah Jenkins',
        progress: 50,
        userRole: 'Participating',
        deadline: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Deadline passed
        budget: 25000,
        spent: 24500,
         team: [
            { name: 'Some Director', role: 'Director' },
            { name: 'You', role: 'Actor' },
        ],
        tasks: createInitialTasks(),
    },
];
