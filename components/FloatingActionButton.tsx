import React from 'react';
import { Link } from 'react-router-dom';
import { usePremium } from '../hooks/usePremium';

const FloatingActionButton: React.FC = () => {
  const { isPremium } = usePremium();
  const to = isPremium ? '/ai-assistant/1' : '/premium';

  return (
    <div className="fixed bottom-24 right-4 z-40">
      <Link
        to={to}
        state={{ background: location }}
        className={`flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
        aria-label="Ask The Line AI"
      >
        <span className="material-symbols-outlined !text-3xl">star</span>
      </Link>
    </div>
  );
};

export default FloatingActionButton;