import { useState, useEffect } from 'react';

const PREMIUM_KEY = 'nebula-is-premium';

export const usePremium = () => {
    const [isPremium, setIsPremium] = useState<boolean>(() => {
        const saved = localStorage.getItem(PREMIUM_KEY);
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === PREMIUM_KEY) {
                setIsPremium(e.newValue ? JSON.parse(e.newValue) : false);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const togglePremium = () => {
        const newValue = !isPremium;
        setIsPremium(newValue);
        localStorage.setItem(PREMIUM_KEY, JSON.stringify(newValue));
         // Dispatch a storage event to sync across tabs
        window.dispatchEvent(new StorageEvent('storage', {
            key: PREMIUM_KEY,
            newValue: JSON.stringify(newValue),
            oldValue: JSON.stringify(!newValue),
        }));
    };

    return { isPremium, togglePremium };
};
