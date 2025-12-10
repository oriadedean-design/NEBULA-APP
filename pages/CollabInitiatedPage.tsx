
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex grow basis-0 flex-col items-stretch gap-2">
        <div className="flex h-20 grow items-center justify-center rounded-lg border border-border-light dark:border-border-dark bg-transparent">
            <p className="text-primary text-3xl font-bold leading-tight">{String(value).padStart(2, '0')}</p>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-normal leading-normal">{label}</p>
        </div>
    </div>
);


const CollabInitiatedPage: React.FC = () => {
    const [endTime] = useState(() => new Date().getTime() + 14 * 24 * 60 * 60 * 1000);

    const calculateTimeLeft = (): TimeLeft => {
        const difference = endTime - new Date().getTime();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return {};
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endTime]);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-between p-6 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <div className="flex flex-col items-center w-full max-w-md">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
                    <span className="material-symbols-outlined text-primary text-4xl">hourglass_top</span>
                </div>
                <h1 className="text-text-light dark:text-text-dark text-4xl font-bold leading-tight text-center pb-3 pt-2">The Clock is Ticking</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-relaxed text-center pb-6 pt-1">
                    This collaboration chat will self-destruct in 14 days. This 'burn period' encourages focused communication, rapid team formation, and maintains project momentum.
                </p>
                <div className="flex gap-4 py-6 w-full max-w-sm">
                    <CountdownUnit value={timeLeft.days ?? 13} label="Days" />
                    <CountdownUnit value={timeLeft.hours ?? 23} label="Hours" />
                    <CountdownUnit value={timeLeft.minutes ?? 59} label="Minutes" />
                    <CountdownUnit value={timeLeft.seconds ?? 59} label="Seconds" />
                </div>
            </div>
            <div className="w-full max-w-md pt-8">
                <div className="flex px-4 py-3 w-full">
                    <Link to="/" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Enter Collaboration Space</span>
                    </Link>
                </div>
                <div className="flex px-4 py-3 w-full">
                    <Link to="/" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-transparent text-text-light dark:text-text-dark text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Return to Hub</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CollabInitiatedPage;