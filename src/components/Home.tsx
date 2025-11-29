import React, { useState } from 'react';
import {
    Home as HomeIcon,
    User,
    Settings,
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    AlertTriangle,
    ChevronRight,
    Play,
    Eye
} from 'lucide-react';

const GlassCard = ({ children, className = "", title, actionIcon, onClick }: { children: React.ReactNode, className?: string, title?: string, actionIcon?: React.ReactNode, onClick?: () => void }) => (
    <div onClick={onClick} className={`glass-panel flex flex-col ${className}`} style={{ padding: 'var(--panel-padding)' }}>
        {(title || actionIcon) && (
            <div className="flex justify-between items-start mb-3">
                {title && <h3 className="text-base font-medium text-white/90">{title}</h3>}
                {actionIcon && <button className="text-white/40 hover:text-white/80 transition-colors">{actionIcon}</button>}
            </div>
        )}
        {children}
    </div>
);

interface HomeProps {
    onNavigate: (tab: string) => void;
    activeTab: string;
}

export default function Home({ onNavigate, activeTab }: HomeProps) {
    const [selectedDate, setSelectedDate] = useState(0); // 0 = Today

    // Mock Calendar Data
    const dates = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d,
            active: i === 0
        };
    }).reverse();

    // Mock Pen Ride Data
    const penRides = [
        {
            id: 'PR-2025-084',
            pen: 'North Pasture - Zone A',
            time: '10:42 AM',
            duration: '45m',
            status: 'Completed',
            issues: 2,
            drone: 'DRN-SK-042',
            thumbnail: '/assets/cow-front.jpg',
            scanned: 124,
            concerns: 2,
            locations: 'North Ridge, Creek Bed'
        },
        {
            id: 'PR-2025-083',
            pen: 'South Feedlot',
            time: '09:15 AM',
            duration: '32m',
            status: 'Completed',
            issues: 0,
            drone: 'DRN-SK-031',
            thumbnail: '/assets/cow-side.jpg',
            scanned: 89,
            concerns: 0,
            locations: 'Main Feed Bunk'
        },
        {
            id: 'PR-2025-082',
            pen: 'Quarantine Pen B',
            time: '08:30 AM',
            duration: '15m',
            status: 'Completed',
            issues: 1,
            drone: 'DRN-SK-019',
            thumbnail: '/assets/cow-rear.jpg',
            scanned: 12,
            concerns: 1,
            locations: 'Isolation Stall 4'
        },
        {
            id: 'PR-2025-085',
            pen: 'East Grazing Field',
            time: '11:30 AM',
            duration: 'In Progress',
            status: 'Live',
            issues: 0,
            drone: 'DRN-SK-042',
            thumbnail: '/assets/cow-center.jpg',
            scanned: 45,
            concerns: 0,
            locations: 'Sector 7 (Active)'
        }
    ].sort((a, _b) => (a.status === 'Live' ? -1 : 1));

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Floating Navigation */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">


                <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-col gap-1.5 shadow-lg">
                    <button
                        onClick={() => onNavigate('Home')}
                        className={`p-2 rounded-xl transition-colors group ${activeTab === 'Home' ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10'}`}
                    >
                        <HomeIcon size={18} className={activeTab === 'Home' ? 'text-white' : 'text-white/70 group-hover:text-white'} />
                    </button>
                    <button
                        onClick={() => onNavigate('DroneConnection')}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                        <div className="w-4 h-4 border-2 border-white/70 group-hover:border-white rounded-sm" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-white/10 transition-colors group">
                        <User size={18} className="text-white/70 group-hover:text-white" />
                    </button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto pl-16 pr-4 h-screen flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 h-12 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-full" />
                        </div>
                        {/* Title removed as per previous style */}
                    </div>



                    <div className="hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="text-right">
                            <div className="text-sm font-semibold text-white">Joshua Oriade</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider">Free Plan</div>
                        </div>
                        <Settings size={16} className="text-white/40" />
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col" style={{ gap: 'var(--grid-gap)' }}>

                    {/* Calendar Bar */}
                    <div className="flex-shrink-0">
                        <GlassCard className="!p-2">
                            <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-1">
                                <div className="flex items-center gap-2 text-white/50 pr-4 border-r border-white/10 sticky left-0 bg-[#121212]/90 backdrop-blur-sm z-10 pl-2">
                                    <CalendarIcon size={16} />
                                    <span className="text-xs font-medium whitespace-nowrap">July 2025</span>
                                </div>
                                {dates.map((date, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDate(i)}
                                        className={`flex flex-col items-center justify-center min-w-[48px] h-12 rounded-xl transition-all ${i === selectedDate ? 'bg-white text-black shadow-lg scale-105' : 'hover:bg-white/5 text-white/40 hover:text-white'}`}
                                    >
                                        <span className="text-[10px] uppercase tracking-wider font-medium">{date.day}</span>
                                        <span className="text-sm font-bold">{date.date}</span>
                                    </button>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Pen Ride Logs */}
                    <div className="flex-1 min-h-0">
                        <div className="flex items-center justify-between mb-3 px-1">
                            <h2 className="text-lg font-semibold text-white">Pen Ride Logs</h2>
                            <button className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                                View All History <ChevronRight size={14} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {penRides.map((ride) => (
                                <GlassCard
                                    key={ride.id}
                                    className="group hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden"
                                    onClick={() => onNavigate('LogDetails')}
                                >
                                    {/* Status Badge */}
                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 ${ride.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-green-500/20 text-green-400'}`}>
                                        {ride.status}
                                    </div>

                                    {/* Image/Thumbnail */}
                                    <div className="h-40 -mx-[var(--panel-padding)] -mt-[var(--panel-padding)] mb-3 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                        <img
                                            src={ride.thumbnail}
                                            alt={ride.pen}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-3 left-3 z-20">
                                            <div className="text-white font-semibold text-sm">{ride.pen}</div>
                                            <div className="text-white/60 text-xs flex items-center gap-1">
                                                <MapPin size={10} /> {ride.drone}
                                            </div>
                                        </div>
                                        {ride.status === 'Live' && (
                                            <div className="absolute center inset-0 flex items-center justify-center z-20">
                                                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                                    <Play size={16} className="text-white fill-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-1.5 text-white/60">
                                                <Clock size={14} />
                                                <span>{ride.time}</span>
                                            </div>
                                            <div className="text-white/40">{ride.duration}</div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-white/5 rounded-lg p-2 flex items-center gap-2">
                                                <Eye size={14} className="text-blue-400" />
                                                <div>
                                                    <div className="text-xs font-bold text-white">{ride.scanned}</div>
                                                    <div className="text-[10px] text-white/40">Scanned</div>
                                                </div>
                                            </div>
                                            <div className={`bg-white/5 rounded-lg p-2 flex items-center gap-2 ${ride.concerns > 0 ? 'bg-red-500/10 border border-red-500/20' : ''}`}>
                                                <AlertTriangle size={14} className={ride.concerns > 0 ? 'text-red-400' : 'text-white/40'} />
                                                <div>
                                                    <div className={`text-xs font-bold ${ride.concerns > 0 ? 'text-red-400' : 'text-white'}`}>{ride.concerns}</div>
                                                    <div className={`text-[10px] ${ride.concerns > 0 ? 'text-red-400/70' : 'text-white/40'}`}>Concerns</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Locations */}
                                        <div className="flex items-start gap-1.5 pt-2 border-t border-white/5">
                                            <MapPin size={12} className="text-white/40 mt-0.5 flex-shrink-0" />
                                            <div className="text-xs text-white/60 truncate">{ride.locations}</div>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
