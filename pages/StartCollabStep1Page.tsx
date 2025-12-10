
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StartCollabStep1Page: React.FC = () => {
  const [synopsis, setSynopsis] = useState('');
  const synopsisMaxLength = 300;
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="sticky top-0 z-10 flex w-full flex-col bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex w-full items-center p-4">
          <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center text-text-light dark:text-text-dark">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-text-light dark:text-text-dark">Start a Collab</h1>
          <div className="size-10 shrink-0"></div>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-2 pb-4">
          <div className="h-1.5 w-8 rounded-full bg-primary"></div>
          <div className="h-1.5 w-8 rounded-full bg-border-light dark:bg-border-dark"></div>
          <div className="h-1.5 w-8 rounded-full bg-border-light dark:bg-border-dark"></div>
        </div>
      </div>
      <main className="flex flex-1 flex-col gap-6 p-4">
        <div className="flex w-full flex-col">
          <label className="flex flex-col">
            <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">Project Name</p>
            <input className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 text-base font-normal leading-normal text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40" placeholder="Enter a name for your project" />
          </label>
        </div>
        <div className="flex flex-col">
          <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">Upload Cover Image</p>
          <div className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border-light dark:border-border-dark p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/10">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-base font-bold leading-tight tracking-tight text-text-light dark:text-text-dark">Add a Cover</p>
              <p className="text-sm font-normal leading-normal text-text-secondary-light dark:text-text-secondary-dark">Tap to upload a JPG, PNG, or GIF</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <label className="flex flex-col">
            <div className="flex items-baseline justify-between">
              <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">Project Synopsis</p>
              <p className="text-xs font-normal text-text-secondary-light dark:text-text-secondary-dark">{synopsis.length}/{synopsisMaxLength}</p>
            </div>
            <textarea
              className="form-textarea flex min-h-36 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-4 text-base font-normal leading-normal text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/40"
              placeholder="Briefly describe your vision..."
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              maxLength={synopsisMaxLength}
            ></textarea>
          </label>
        </div>
      </main>
      <footer className="sticky bottom-0 w-full bg-background-light/80 dark:bg-background-dark/80 p-4 pt-2 backdrop-blur-sm">
        <Link to="/start-collab/step2" className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-primary text-white text-base font-bold leading-normal tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          <span className="truncate">Next Step</span>
        </Link>
      </footer>
    </div>
  );
};

export default StartCollabStep1Page;