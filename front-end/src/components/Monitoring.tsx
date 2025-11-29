import React, { useState } from 'react';
import {
    Radio,
    Battery,
    MapPin,
    AlertTriangle,
    CheckCircle,
    XCircle,
    ArrowLeft,
    Home,
    User,
    Settings,
    TrendingUp
} from 'lucide-react';

const GlassCard = ({ children, className = "", title, actionIcon }: { children: React.ReactNode, className?: string, title?: string, actionIcon?: React.ReactNode }) => (
    <div className={`glass-panel flex flex-col ${className}`} style={{ padding: 'var(--panel-padding)' }}>
        {(title || actionIcon) && (
            <div className="flex justify-between items-start mb-3">
                {title && <h3 className="text-base font-medium text-white/90">{title}</h3>}
                {actionIcon && <button className="text-white/40 hover:text-white/80 transition-colors">{actionIcon}</button>}
            </div>
        )}
        {children}
    </div>
);

interface MonitoringProps {
    onNavigate: (tab: string) => void;
    activeTab: string;
    onBack: () => void;
}

export default function Monitoring({ onNavigate, activeTab, onBack }: MonitoringProps) {
    const [alertFilter, setAlertFilter] = useState('all');

    return (
        <div className="min-h-screen bg-black text-white relative">
            {/* Floating Navigation */}
            <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
                <button
                    onClick={onBack}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/10 transition-colors group shadow-lg"
                >
                    <ArrowLeft size={18} className="text-white/70 group-hover:text-white" />
                </button>


                <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex flex-col gap-1.5 shadow-lg">
                    <button
                        onClick={() => onNavigate('Home')}
                        className="p-2 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                        <Home size={18} className="text-white/70 group-hover:text-white" />
                    </button>
                    <button
                        onClick={() => onNavigate('DroneConnection')}
                        className="p-2 rounded-xl bg-white/20 text-white shadow-lg transition-colors"
                    >
                        <div className="w-4 h-4 border-2 border-white rounded-sm" />
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
                    <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 gap-1 border border-white/5 w-full md:w-auto">
                        {['Overview', 'Analytics', 'Monitoring'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => onNavigate(tab)}
                                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeTab === tab ? 'bg-white/10 text-white shadow-lg' : 'text-white/50 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
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
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Left: Drone Fleet Status */}
                    <div className="lg:col-span-2 space-y-3">
                        <GlassCard title="Drone Fleet Overview">
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                                    <Radio size={20} className="text-green-400 mb-2" />
                                    <div className="text-2xl font-bold text-white">4</div>
                                    <div className="text-xs text-green-400">Active</div>
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                                    <Battery size={20} className="text-yellow-400 mb-2" />
                                    <div className="text-2xl font-bold text-white">2</div>
                                    <div className="text-xs text-yellow-400">Charging</div>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                                    <MapPin size={20} className="text-blue-400 mb-2" />
                                    <div className="text-2xl font-bold text-white">87%</div>
                                    <div className="text-xs text-blue-400">Coverage</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { id: 'DRN-SK-042', status: 'active', battery: 87, location: 'North Pasture', duration: '28 mins' },
                                    { id: 'DRN-SK-031', status: 'active', battery: 65, location: 'South Field', duration: '45 mins' },
                                    { id: 'DRN-SK-019', status: 'charging', battery: 34, location: 'Base Station', duration: 'Est. 12 mins' },
                                ].map((drone) => (
                                    <div key={drone.id} className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="text-sm font-semibold text-white">{drone.id}</div>
                                                <div className="text-xs text-white/40">{drone.location}</div>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${drone.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {drone.status}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1">
                                                <div className="flex justify-between text-xs text-white/50 mb-1">
                                                    <span>Battery</span>
                                                    <span>{drone.battery}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${drone.battery > 60 ? 'bg-green-500' : drone.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${drone.battery}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-white/40">{drone.duration}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Alert Timeline */}
                        <GlassCard title="Alert Timeline">
                            <div className="flex gap-2 mb-3">
                                {['all', 'critical', 'warning', 'info'].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setAlertFilter(filter)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${alertFilter === filter ? 'bg-white text-black shadow-sm' : 'bg-white/5 text-white/40 hover:text-white/60'}`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {[
                                    { type: 'critical', title: 'Calf not moving', time: '2 mins ago', status: 'investigating' },
                                    { type: 'warning', title: 'Dirty hind legs detected', time: '15 mins ago', status: 'pending' },
                                    { type: 'warning', title: 'Reduced movement noticed', time: '1 hour ago', status: 'resolved' },
                                    { type: 'info', title: 'Routine health check completed', time: '2 hours ago', status: 'resolved' },
                                ].map((alert, i) => (
                                    <div key={i} className={`bg-white/5 rounded-xl p-3 border ${alert.type === 'critical' ? 'border-red-500/30' : alert.type === 'warning' ? 'border-yellow-500/30' : 'border-blue-500/30'}`}>
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-start gap-2">
                                                {alert.type === 'critical' ? <XCircle size={16} className="text-red-400 mt-0.5" /> : alert.type === 'warning' ? <AlertTriangle size={16} className="text-yellow-400 mt-0.5" /> : <CheckCircle size={16} className="text-blue-400 mt-0.5" />}
                                                <div>
                                                    <div className="text-sm text-white">{alert.title}</div>
                                                    <div className="text-xs text-white/40">{alert.time}</div>
                                                </div>
                                            </div>
                                            <div className={`px-2 py-0.5 rounded-full text-xs ${alert.status === 'resolved' ? 'bg-green-500/20 text-green-400' : alert.status === 'investigating' ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                {alert.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right: Stats & System Health */}
                    <div className="space-y-3">
                        <GlassCard title="System Health">
                            <div className="space-y-3">
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-xs text-green-400/70 uppercase">Operational</div>
                                        <CheckCircle size={16} className="text-green-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-green-400">98.7%</div>
                                    <div className="text-xs text-white/40 mt-1">Uptime</div>
                                </div>

                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Response Times</div>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-white/60">Critical</span>
                                                <span className="text-white">1.2 min</span>
                                            </div>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-white/60">Warning</span>
                                                <span className="text-white">3.7 min</span>
                                            </div>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard title="Today's Summary">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40">Total Alerts</div>
                                    <div className="text-sm font-semibold text-white">23</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40">Resolved</div>
                                    <div className="text-sm font-semibold text-green-400">18</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40">In Progress</div>
                                    <div className="text-sm font-semibold text-yellow-400">3</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40">Pending</div>
                                    <div className="text-sm font-semibold text-red-400">2</div>
                                </div>
                                <div className="border-t border-white/10 pt-2 mt-2">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={14} className="text-green-400" />
                                        <div className="text-xs text-green-400">78% resolution rate</div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
