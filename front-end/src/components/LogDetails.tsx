import React from 'react';
import {
    AlertTriangle,
    CheckCircle,
    MoreHorizontal,
    Filter,
    Search,
    Home,
    User,
    Settings
} from 'lucide-react';

const GlassCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
    <div onClick={onClick} className={`glass-panel ${className}`} style={{ padding: 'var(--panel-padding)' }}>
        {children}
    </div>
);

interface LogDetailsProps {
    onNavigate: (tab: string) => void;
    activeTab: string;
    logId?: string;
}

export default function LogDetails({ onNavigate, logId = "PR-2025-084" }: LogDetailsProps) {
    // Mock Cow Data
    const cows = [
        { id: '8492', rfid: 'RFID-992-102', breed: 'Angus', age: '14mo', status: 'Healthy', img: '/assets/cow-front.jpg' },
        { id: '8493', rfid: 'RFID-992-103', breed: 'Hereford', age: '13mo', status: 'Warning', img: '/assets/cow-side.jpg', issue: 'Limping' },
        { id: '8494', rfid: 'RFID-992-104', breed: 'Angus', age: '15mo', status: 'Healthy', img: '/assets/cow-rear.jpg' },
        { id: '8495', rfid: 'RFID-992-105', breed: 'Charolais', age: '12mo', status: 'Critical', img: '/assets/cow-front.jpg', issue: 'High Temp' },
        { id: '8496', rfid: 'RFID-992-106', breed: 'Angus', age: '14mo', status: 'Healthy', img: '/assets/cow-side.jpg' },
        { id: '8497', rfid: 'RFID-992-107', breed: 'Angus', age: '14mo', status: 'Healthy', img: '/assets/cow-rear.jpg' },
        { id: '8498', rfid: 'RFID-992-108', breed: 'Hereford', age: '13mo', status: 'Warning', img: '/assets/cow-front.jpg', issue: 'Isolation' },
        { id: '8499', rfid: 'RFID-992-109', breed: 'Angus', age: '15mo', status: 'Healthy', img: '/assets/cow-side.jpg' },
    ];

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Floating Navigation (No Back Button) */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
                <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-col gap-1.5 shadow-lg">
                    <button
                        onClick={() => onNavigate('Home')}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                        <Home size={18} className="text-white/70 group-hover:text-white" />
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
                {/* Header with Tab Bar */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 h-12 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    </div>



                    <div className="hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="text-right">
                            <div className="text-sm font-semibold text-white">Joshua Oriade</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider">Free Plan</div>
                        </div>
                        <Settings size={16} className="text-white/40" />
                    </div>
                </header>

                {/* Sub-Header / Breadcrumb */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <div>
                        <h1 className="text-xl font-semibold text-white">Pen Ride Log Details</h1>
                        <div className="text-xs text-white/40">ID: {logId} • North Pasture - Zone A</div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                            <Search size={18} className="text-white/60" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
                            <Filter size={18} className="text-white/60" />
                        </button>
                    </div>
                </div>

                {/* Main List Content */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide pb-4">
                    <div className="space-y-2">
                        {cows.map((cow) => (
                            <GlassCard
                                key={cow.id}
                                className="!p-3 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer group"
                                onClick={() => onNavigate('Overview')}
                            >
                                {/* Photo/Silhouette */}
                                <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 border border-white/10 relative">
                                    <img src={cow.img} alt={cow.breed} className="w-full h-full object-cover" />
                                    {cow.status !== 'Healthy' && (
                                        <div className={`absolute inset-0 border-2 ${cow.status === 'Critical' ? 'border-red-500' : 'border-yellow-500'} rounded-lg`} />
                                    )}
                                </div>

                                {/* Main Info */}
                                <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">RFID ID</div>
                                        <div className="text-sm font-mono text-white/90">{cow.rfid}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Breed</div>
                                        <div className="text-sm text-white/90">{cow.breed}</div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Age</div>
                                        <div className="text-sm text-white/90">{cow.age}</div>
                                    </div>

                                    {/* Status Flag */}
                                    <div className="flex justify-end md:justify-start">
                                        {cow.status === 'Healthy' ? (
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                                <CheckCircle size={12} className="text-green-400" />
                                                <span className="text-xs font-medium text-green-400">Healthy</span>
                                            </div>
                                        ) : (
                                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${cow.status === 'Critical' ? 'bg-red-500/10 border-red-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
                                                <AlertTriangle size={12} className={cow.status === 'Critical' ? 'text-red-400' : 'text-yellow-400'} />
                                                <span className={`text-xs font-medium ${cow.status === 'Critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                                                    {cow.issue || cow.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action */}
                                <button className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal size={18} />
                                </button>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
