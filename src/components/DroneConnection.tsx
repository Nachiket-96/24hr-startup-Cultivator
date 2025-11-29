import React, { useState } from 'react';
import {
    Home,
    User,
    Settings,
    Wifi,
    Battery,
    Signal,
    Power,
    RefreshCw,
    Search,
    Filter
} from 'lucide-react';

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`glass-panel flex flex-col ${className}`} style={{ padding: 'var(--panel-padding)' }}>
        {children}
    </div>
);

interface DroneConnectionProps {
    onNavigate: (tab: string) => void;
    activeTab: string;
}

export default function DroneConnection({ onNavigate, activeTab }: DroneConnectionProps) {
    const [drones, setDrones] = useState([
        { id: 'DRN-SK-042', model: 'SkyRanger R70', status: 'Connected', battery: 87, signal: 92, area: 'North Pasture' },
        { id: 'DRN-SK-031', model: 'SkyRanger R70', status: 'Connected', battery: 65, signal: 88, area: 'South Feedlot' },
        { id: 'DRN-SK-019', model: 'Mavic 3 Ent', status: 'Disconnected', battery: 0, signal: 0, area: 'Base Station' },
        { id: 'DRN-AG-105', model: 'Agras T40', status: 'Available', battery: 100, signal: 95, area: 'Hangar A' },
        { id: 'DRN-AG-106', model: 'Agras T40', status: 'Maintenance', battery: 45, signal: 0, area: 'Workshop' },
    ]);

    const toggleConnection = (id: string) => {
        setDrones(drones.map(d => {
            if (d.id === id) {
                if (d.status === 'Connected') return { ...d, status: 'Disconnected', signal: 0 };
                if (d.status === 'Disconnected' || d.status === 'Available') return { ...d, status: 'Connected', signal: 90 };
            }
            return d;
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Floating Navigation */}
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
                        className={`p-2 rounded-xl transition-colors group ${activeTab === 'DroneConnection' ? 'bg-white/20 text-white shadow-lg' : 'hover:bg-white/10'}`}
                    >
                        <div className={`w-4 h-4 border-2 rounded-sm ${activeTab === 'DroneConnection' ? 'border-white' : 'border-white/70 group-hover:border-white'}`} />
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

                {/* Main Content */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col" style={{ gap: 'var(--grid-gap)' }}>

                    {/* Controls */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                                <RefreshCw size={14} /> Scan for Drones
                            </button>
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

                    {/* Drone List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {drones.map((drone) => (
                            <GlassCard key={drone.id} className="relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-lg font-bold text-white">{drone.id}</div>
                                        <div className="text-xs text-white/50">{drone.model}</div>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${drone.status === 'Connected' ? 'bg-green-500/20 text-green-400' :
                                        drone.status === 'Available' ? 'bg-blue-500/20 text-blue-400' :
                                            drone.status === 'Maintenance' ? 'bg-red-500/20 text-red-400' :
                                                'bg-white/10 text-white/40'
                                        }`}>
                                        {drone.status}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Wifi size={16} />
                                            <span className="text-xs">Signal Strength</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Signal size={16} className={drone.signal > 50 ? 'text-green-400' : drone.signal > 0 ? 'text-yellow-400' : 'text-white/20'} />
                                            <span className="text-sm font-mono">{drone.signal}%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white/60">
                                            <Battery size={16} />
                                            <span className="text-xs">Battery Level</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className={`w-16 h-2 rounded-full bg-white/10 overflow-hidden`}>
                                                <div
                                                    className={`h-full rounded-full ${drone.battery > 60 ? 'bg-green-500' : drone.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${drone.battery}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-mono">{drone.battery}%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-white/40">Current Location</div>
                                        <div className="text-xs text-white/80">{drone.area}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => toggleConnection(drone.id)}
                                    disabled={drone.status === 'Maintenance'}
                                    className={`w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${drone.status === 'Connected'
                                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                                        : drone.status === 'Maintenance'
                                            ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                        }`}
                                >
                                    <Power size={16} />
                                    {drone.status === 'Connected' ? 'Disconnect' : 'Connect'}
                                </button>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
