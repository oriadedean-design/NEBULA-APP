
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Role } from '../types';

const StartCollabStep2Page: React.FC = () => {
    const navigate = useNavigate();
    const [newRole, setNewRole] = useState('');
    const [roles, setRoles] = useState<Role[]>([
        { id: 1, title: 'Fashion Retoucher', compensation: 'Paid' },
        { id: 2, title: 'Director of Photography', compensation: 'Unpaid' },
        { id: 3, title: 'VFX Artist', compensation: 'Paid' },
    ]);

    const addRole = () => {
        if (newRole.trim() !== '') {
            setRoles([...roles, { id: Date.now(), title: newRole.trim(), compensation: 'Paid' }]);
            setNewRole('');
        }
    };

    const removeRole = (id: number) => {
        setRoles(roles.filter(role => role.id !== id));
    };
    
    const toggleCompensation = (id: number, comp: 'Paid' | 'Unpaid') => {
        setRoles(roles.map(role => role.id === id ? { ...role, compensation: comp } : role));
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-display">
            <div className="flex flex-col flex-1 pb-24">
                <header className="flex items-center p-4 justify-between">
                    <button onClick={() => navigate(-1)} className="text-text-light dark:text-text-dark flex size-10 shrink-0 items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
                    </button>
                </header>
                <div className="flex w-full flex-row items-center justify-center gap-2 py-4 px-4">
                    <div className="h-1 flex-1 rounded-full bg-border-light/50 dark:bg-border-dark/50"><div className="h-1 w-full rounded-full bg-primary"></div></div>
                    <div className="h-1 flex-1 rounded-full bg-border-light/50 dark:bg-border-dark/50"><div className="h-1 w-full rounded-full bg-primary"></div></div>
                    <div className="h-1 flex-1 rounded-full bg-border-light/50 dark:bg-border-dark/50"></div>
                </div>
                <h1 className="text-text-light dark:text-text-dark tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-1 pt-4">Define Roles</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-relaxed pb-6 pt-1 px-4">
                    What kind of talent do you need? Add the roles for your project and specify the compensation for each.
                </p>
                <div className="flex w-full items-center gap-3 px-4 py-3">
                    <div className="relative flex-1">
                        <input 
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-14 placeholder:text-text-secondary-light/70 dark:placeholder:text-text-secondary-dark/70 p-4 text-base font-normal leading-normal pr-12" 
                          placeholder="Enter role title..." 
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addRole()}
                        />
                    </div>
                    <button onClick={addRole} className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                        <span className="material-symbols-outlined text-3xl">add</span>
                    </button>
                </div>
                <div className="flex flex-col gap-3 px-4 pt-6">
                    {roles.map(role => (
                        <div key={role.id} className="flex items-center justify-between rounded-lg bg-surface-light dark:bg-surface-dark p-4 border border-border-light/50 dark:border-border-dark/50">
                            <p className="text-text-light dark:text-text-dark font-medium">{role.title}</p>
                            <div className="flex items-center gap-2">
                                <div className="flex rounded-full bg-background-light dark:bg-background-dark p-1">
                                    <button onClick={() => toggleCompensation(role.id, 'Paid')} className={`rounded-full px-3 py-1 text-sm font-semibold ${role.compensation === 'Paid' ? 'bg-primary text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Paid</button>
                                    <button onClick={() => toggleCompensation(role.id, 'Unpaid')} className={`rounded-full px-3 py-1 text-sm font-semibold ${role.compensation === 'Unpaid' ? 'bg-primary text-white' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>Unpaid</button>
                                </div>
                                <button onClick={() => removeRole(role.id)} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500">
                                    <span className="material-symbols-outlined text-2xl">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pt-3">
                <Link to="/start-collab/step3" className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-lg shadow-primary/20">
                    Next: Add Details
                </Link>
            </div>
        </div>
    );
};

export default StartCollabStep2Page;