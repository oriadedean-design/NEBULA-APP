import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group
    ${isActive 
      ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
      : 'text-text-secondary-dark hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2">
      <nav className="flex items-center gap-2 px-3 py-3 rounded-full glass border border-white/10 shadow-2xl shadow-black/80 ring-1 ring-white/5 backdrop-blur-2xl">
        <NavLink to="/" className={navLinkClass}>
          {({ isActive }) => (
            <span className={`material-symbols-outlined !text-[26px] ${isActive ? 'fill' : ''}`}>home_app_logo</span>
          )}
        </NavLink>
        <NavLink to="/discover" className={navLinkClass}>
          {({ isActive }) => (
            <span className={`material-symbols-outlined !text-[26px] ${isActive ? 'fill' : ''}`}>hub</span>
          )}
        </NavLink>
        <NavLink to="/projects" className={navLinkClass}>
          {({ isActive }) => (
            <span className={`material-symbols-outlined !text-[26px] ${isActive ? 'fill' : ''}`}>space_dashboard</span>
          )}
        </NavLink>
        <NavLink to="/collabs" className={navLinkClass}>
          {({ isActive }) => (
            <span className={`material-symbols-outlined !text-[26px] ${isActive ? 'fill' : ''}`}>movie</span>
          )}
        </NavLink>
        <NavLink to="/opportunities" className={navLinkClass}>
          {({ isActive }) => (
            <span className={`material-symbols-outlined !text-[26px] ${isActive ? 'fill' : ''}`}>explore</span>
          )}
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNav;