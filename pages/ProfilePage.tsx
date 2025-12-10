import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePremium } from '../hooks/usePremium';

const ASSETS = {
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
    work1: "https://i.pinimg.com/1200x/98/d2/d6/98d2d6deaae94c56da14af01bfcd11df.jpg",
    work2: "https://i.pinimg.com/736x/75/eb/51/75eb51e1b9933291d591159470ac8f1e.jpg",
    work3: "https://plus.unsplash.com/premium_photo-1709311450621-6ce6545e2564?w=900&auto=format&fit=crop&q=60"
};

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { isPremium } = usePremium();
    const [isEditing, setIsEditing] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(true); // Toggle for demo

    const [profile, setProfile] = useState({
        name: "Jordan Peele",
        role: "Director & DP",
        location: "Los Angeles, CA",
        bio: "Exploring the intersection of genre and art-house cinema. Always chasing the perfect frame.",
        rating: 4.9,
        reviews: 128
    });

    return (
        <div className="min-h-screen bg-background-dark pb-32">
            {/* Header / Cover */}
            <div className="relative h-64 w-full overflow-hidden">
                <img src={ASSETS.cover} className="w-full h-full object-cover opacity-60" alt="Cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
                
                {/* Navbar Area */}
                <div className="absolute top-0 w-full p-6 flex justify-between items-start z-10">
                    <button onClick={() => navigate(-1)} className="h-10 w-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    
                    {/* Demo Toggle */}
                    <button 
                        onClick={() => setIsMyProfile(!isMyProfile)}
                        className="px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs text-text-secondary-dark"
                    >
                        View as: {isMyProfile ? "Owner" : "Visitor"}
                    </button>

                    {isMyProfile && (
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`h-10 px-4 rounded-full glass border border-white/20 flex items-center justify-center text-sm font-bold transition-all ${isEditing ? 'bg-primary border-primary text-white' : 'text-white hover:bg-white/10'}`}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    )}
                </div>
            </div>

            <div className="px-6 relative -mt-20">
                <div className="flex justify-between items-end">
                    <div className="h-32 w-32 rounded-3xl overflow-hidden border-4 border-background-dark shadow-2xl relative group">
                        <img src={ASSETS.avatar} className="w-full h-full object-cover" alt="Profile" />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">photo_camera</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex gap-6 pb-2">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">24</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary-dark">Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-1 text-2xl font-bold text-white">
                                {profile.rating} <span className="material-symbols-outlined text-warning fill text-sm">star</span>
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary-dark">{profile.reviews} Reviews</div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {isEditing ? (
                        <div className="space-y-4 animate-fade-in">
                            <input 
                                value={profile.name}
                                onChange={(e) => setProfile({...profile, name: e.target.value})}
                                className="w-full bg-surface-dark border-none rounded-xl p-4 text-2xl font-bold text-white focus:ring-2 focus:ring-primary"
                            />
                            <input 
                                value={profile.role}
                                onChange={(e) => setProfile({...profile, role: e.target.value})}
                                className="w-full bg-surface-dark border-none rounded-xl p-4 text-lg text-primary font-medium focus:ring-2 focus:ring-primary"
                            />
                            <textarea 
                                value={profile.bio}
                                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                className="w-full h-32 bg-surface-dark border-none rounded-xl p-4 text-text-secondary-dark focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <h1 className="text-4xl font-bold text-white tracking-tight">{profile.name}</h1>
                            <p className="text-lg text-primary font-medium">{profile.role}</p>
                            <div className="flex items-center gap-1 text-text-secondary-dark text-sm mt-1">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                {profile.location}
                            </div>
                            <p className="mt-4 text-text-secondary-dark leading-relaxed font-light text-lg">
                                {profile.bio}
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions for Visitor */}
                {!isMyProfile && (
                    <div className="flex gap-3 mt-8">
                        <button className="flex-1 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:scale-[1.02] transition-transform">
                            Connect
                        </button>
                        <button 
                            onClick={() => !isPremium && navigate('/premium')}
                            className={`flex-1 py-4 rounded-2xl border border-white/10 glass text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors relative overflow-hidden`}
                        >
                            <span className="material-symbols-outlined text-lg">{isPremium ? 'chat_bubble' : 'lock'}</span>
                            Message
                            {!isPremium && <div className="absolute inset-0 bg-white/5" />}
                        </button>
                         <button className="h-14 w-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-warning hover:bg-white/10">
                            <span className="material-symbols-outlined">star</span>
                        </button>
                    </div>
                )}

                {/* Portfolio */}
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">Featured Work</h3>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest cursor-pointer">View All</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[ASSETS.work1, ASSETS.work2, ASSETS.work3].map((img, i) => (
                            <div key={i} className={`rounded-2xl overflow-hidden aspect-[3/4] relative group shadow-cinematic ring-1 ring-white/10 cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : ''}`}>
                                <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Work" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">play_circle</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;