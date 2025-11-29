import React, { useState } from 'react';
import {
    ChevronDown,
    Info,
    Calendar,
    Settings,
    Ruler,
    Activity,
    Thermometer,
    Droplets,
    CloudFog,
    SunDim,
    Wind,
    X,
    Home,
    User,
    ArrowLeft
} from 'lucide-react';


// --- Components ---

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

// --- Main Dashboard ---

const calfImages = [
    { id: 1, url: '/assets/cow-front.jpg', time: '10:42 AM' },
    { id: 2, url: '/assets/cow-side.jpg', time: '10:30 AM' },
    { id: 3, url: '/assets/cow-rear.jpg', time: '10:15 AM' },
    { id: 4, url: '/assets/cow-front.jpg', time: '09:55 AM' },
    { id: 5, url: '/assets/cow-side.jpg', time: '09:30 AM' },
];

interface DashboardProps {
    onNavigate: (tab: string) => void;
    activeTab: string;
    onBack: () => void;
}

export default function Dashboard({ onNavigate, activeTab, onBack }: DashboardProps) {
    const [metricMode, setMetricMode] = useState('Growth');
    const [selectedImage, setSelectedImage] = useState<{ id: number, url: string, time: string } | null>(null);

    return (
        <div className="min-h-screen bg-black text-white relative">
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
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4">
                            <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                        </div>
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
                        <ChevronDown size={16} className="text-white/40" />
                    </div>
                </header>

                {/* Main Grid - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 flex-1 min-h-0" style={{ gap: 'var(--grid-gap)' }}>

                    {/* Left Column */}
                    <div className="md:col-span-1 lg:col-span-4 md:order-2 lg:order-none flex flex-col h-full min-h-0 overflow-y-auto scrollbar-hide" style={{ gap: 'var(--panel-gap)' }}>
                        {/* Visual Check Panel */}
                        <GlassCard className="flex flex-col flex-shrink-0 lg:min-h-[300px] lg:max-h-[450px] overflow-hidden" title="Visual Check Panel">
                            <div className="text-xs text-white/40 mb-2 -mt-1">Last update 1 min ago</div>

                            {/* Carousel Container */}
                            <div className="flex overflow-x-scroll snap-x snap-mandatory gap-2.5 pb-2 -mx-4 px-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                                {calfImages.map((img) => (
                                    <div
                                        key={img.id}
                                        className="relative flex-none w-28 h-28 snap-center cursor-pointer group"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors rounded-2xl z-10" />
                                        <img
                                            src={img.url}
                                            alt={`Calf ${img.id} `}
                                            className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-lg"
                                        />
                                        {/* Timestamp Tag */}
                                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 z-20">
                                            <span className="text-[10px] text-white font-medium">{img.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Health Analysis */}
                            <div className="space-y-1 my-1.5">
                                <div className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1">AI Health Analysis</div>

                                {/* Health Indicators Grid */}
                                <div className="grid grid-cols-1 gap-1">
                                    {/* Ears */}
                                    <div className="bg-white/5 rounded-xl p-1.5 border border-white/5">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-medium text-white/70">Ears 🐮👂</span>
                                            <div className="px-1.5 py-0.5 rounded-full bg-green-500/20 border border-green-500/30">
                                                <span className="text-[9px] font-semibold text-green-400">Up</span>
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-medium text-white/50 mt-0.5">Alert and active</p>
                                    </div>

                                    {/* Eyes */}
                                    <div className="bg-white/5 rounded-xl p-1.5 border border-white/5">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-medium text-white/70">Eyes 👁️</span>
                                            <div className="px-1.5 py-0.5 rounded-full bg-green-500/20 border border-green-500/30">
                                                <span className="text-[9px] font-semibold text-green-400">Bright</span>
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-medium text-white/50 mt-0.5">Clear and alert</p>
                                    </div>

                                    {/* Tail/Hind Legs */}
                                    <div className="bg-white/5 rounded-xl p-1.5 border border-white/5">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-medium text-white/70">Tail/Legs</span>
                                            <div className="px-1.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                                                <span className="text-[9px] font-semibold text-yellow-400">Dirty</span>
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-medium text-white/50 mt-0.5">Needs cleaning</p>
                                    </div>

                                    {/* Body Condition */}
                                    <div className="bg-white/5 rounded-xl p-1.5 border border-white/5">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="text-[10px] font-medium text-white/70">Body Condition</span>
                                            <div className="flex items-center gap-1">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <div
                                                            key={i}
                                                            className={`w-1.5 h-4 rounded-full ${i <= 3 ? 'bg-green-400' : 'bg-white/20'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[9px] font-semibold text-green-400">3/5</span>
                                            </div>
                                        </div>
                                        <p className="text-[9px] font-medium text-white/50 mt-0.5">Healthy weight</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-white/40 mt-auto">
                                <Info size={12} />
                                <span>Tap to enlarge. Swipe to view history.</span>
                            </div>
                        </GlassCard>

                        {/* Drone Summary */}
                        <GlassCard className="flex-shrink-0" title="Drone Summary">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Drone ID</div>
                                    <div className="text-sm font-semibold text-white">DRN-SK-042</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Flights Today</div>
                                    <div className="text-sm font-semibold text-white">4 flights</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Duration</div>
                                    <div className="text-sm font-semibold text-white">28 mins</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Coverage</div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                                            <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                            <path className="text-green-500" strokeDasharray="87, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                        <span className="text-sm font-semibold text-white">87%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                    <div className="text-xs text-white/40 uppercase tracking-wider">Flags Detected</div>
                                    <div className="px-2 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30">
                                        <span className="text-sm font-bold text-orange-400">2</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Alerts */}
                        <GlassCard className="flex-1 min-h-0 flex flex-col flex-shrink-0 lg:max-h-[400px]" title="Alerts (7)">
                            <div className="space-y-1 overflow-y-auto scrollbar-hide">
                                {/* CRITICAL */}
                                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Calf not moving.</span>
                                    </div>
                                </div>
                                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Dirty hind legs detected.</span>
                                    </div>
                                </div>
                                {/* WARNING */}
                                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Reduced movement noticed.</span>
                                    </div>
                                </div>
                                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Droopy ears detected — possible fever.</span>
                                    </div>
                                </div>
                                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Tail moisture increasing — early scours.</span>
                                    </div>
                                </div>
                                {/* MILD */}
                                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Calf slightly away from herd.</span>
                                    </div>
                                </div>
                                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-2">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></div>
                                        <span className="text-xs text-white/90 leading-relaxed">Drone battery low during scan.</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Center Column - Visual */}
                    <div className="md:col-span-2 lg:col-span-4 md:order-1 lg:order-none h-full min-h-[400px] md:min-h-[500px] lg:min-h-0 relative group order-first">
                        <div className="absolute inset-0 bg-[#1c1c1e]/40 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                            <img
                                src="/assets/cow-center.jpg"
                                alt="Cattle"
                                className="w-full h-full object-cover opacity-60 mix-blend-overlay hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                            {/* Overlay Info */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <h2 className="text-2xl font-semibold text-white mb-1">North Pasture Pen</h2>
                                <div className="text-sm text-white/60 mb-6">Herd Zone B</div>

                                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-6">
                                    <div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">RFID ID</div>
                                        <div className="text-base font-semibold text-white">CA982-4F7E-11B2</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">Date of Birth</div>
                                        <div className="text-base font-semibold text-white">Feb 01, 2022</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">Weight</div>
                                        <div className="text-2xl font-semibold text-white">1,247 <span className="text-base font-medium text-white/60">lbs</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6 mt-6">
                                    <div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">Breed</div>
                                        <div className="text-base font-semibold text-white">Hereford Cross</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/50 uppercase tracking-wider mb-1.5">Farm Location</div>
                                        <div className="text-base font-semibold text-white">Qu'Appelle Valley, Regina SK</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-1 lg:col-span-4 md:order-3 lg:order-none flex flex-col h-full min-h-0 overflow-y-auto scrollbar-hide" style={{ gap: 'var(--panel-gap)' }}>
                        {/* Header for Right Col */}
                        <div className="flex justify-between items-center px-2">
                            <div className="flex items-center gap-2 text-white/50 text-sm">
                                <Calendar size={14} />
                                <span>Today</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/40 text-xs">
                                <span>07/20/2025 - 07/20/2025</span>
                                <Settings size={14} className="text-white/80 hover:text-white cursor-pointer ml-2" />
                            </div>
                        </div>

                        {/* Behavior Patterns */}
                        <GlassCard className="flex-shrink-0" title="Behavior Patterns">
                            <div className="space-y-1.5">
                                {/* Movement Score - Large Badge */}
                                <div className="flex items-center justify-between bg-green-500/20 border border-green-500/30 rounded-xl p-2.5">
                                    <div className="text-xs text-white/50 uppercase tracking-wider">Movement</div>
                                    <div className="text-lg font-bold text-green-400">Normal</div>
                                </div>

                                {/* Gait Speed - Sparkline */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider">Gait Speed</div>
                                        <div className="text-xs font-medium text-white">3.2 mph</div>
                                    </div>
                                    <svg className="w-full h-6" viewBox="0 0 100 20">
                                        <polyline points="0,15 10,12 20,14 30,10 40,13 50,9 60,11 70,8 80,10 90,7 100,9" fill="none" stroke="#34d399" strokeWidth="2" />
                                    </svg>
                                </div>

                                {/* Stride Stability & Activity Heat Score */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                                        <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Stride Stability</div>
                                        <div className="text-base font-semibold text-white">92%</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-2 border border-white/5 relative overflow-hidden">
                                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 opacity-50"></div>
                                        <div className="text-[9px] text-white/40 uppercase tracking-wider mb-1">Activity Heat</div>
                                        <div className="text-base font-semibold text-green-400">Low</div>
                                    </div>
                                </div>

                                {/* Isolation Distance */}
                                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-2">
                                    <div className="flex justify-between items-center">
                                        <div className="text-[10px] text-white/50 uppercase tracking-wider">Isolation Dist.</div>
                                        <div className="text-xs font-semibold text-blue-300">12 ft</div>
                                    </div>
                                </div>

                                {/* Time Spent Standing vs Lying */}
                                <div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Time Allocation</div>
                                    <div className="flex h-5 rounded-lg overflow-hidden bg-white/5">
                                        <div className="bg-green-500 flex items-center justify-center" style={{ width: '65%' }}>
                                            <span className="text-[9px] text-white font-medium">Standing 65%</span>
                                        </div>
                                        <div className="bg-blue-500 flex items-center justify-center" style={{ width: '35%' }}>
                                            <span className="text-[9px] text-white font-medium">Lying 35%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Contextual Metrics */}
                        <GlassCard className="flex-1 min-h-0 flex flex-col">
                            <div className="flex justify-between items-center mb-2 shrink-0">
                                <h3 className="text-sm font-medium text-white/90">Contextual Metrics</h3>
                                <div className="bg-white/5 p-0.5 rounded-lg flex border border-white/5">
                                    <button
                                        className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all ${metricMode === 'Growth' ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                                        onClick={() => setMetricMode('Growth')}
                                    >
                                        Growth
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all ${metricMode === 'Environment' ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                                        onClick={() => setMetricMode('Environment')}
                                    >
                                        Env
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
                                {metricMode === 'Growth' ? (
                                    <div className="flex flex-col h-full gap-2">
                                        {/* Size Category */}
                                        <div className="bg-white/5 rounded-2xl p-2 border border-white/5 flex flex-col justify-between gap-1.5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Size Category</div>
                                                    <div className="text-lg font-semibold text-white">Medium Frame</div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                                    <Ruler size={20} className="text-blue-400" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-1.5">
                                                <div>
                                                    <div className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">Hip Height</div>
                                                    <div className="text-xs font-medium text-white">48 in</div>
                                                </div>
                                                <div>
                                                    <div className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">Frame Score</div>
                                                    <div className="text-xs font-medium text-white">5.5</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rate of Gain */}
                                        <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex-1 flex flex-col justify-center relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Daily Gain</div>
                                                    <div className="flex items-center gap-1 bg-green-500/20 px-1.5 py-0.5 rounded-lg border border-green-500/20">
                                                        <Activity size={10} className="text-green-400" />
                                                        <span className="text-[10px] font-bold text-green-400">+12%</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-baseline gap-2 mb-2">
                                                    <span className="text-3xl font-bold text-white">2.8</span>
                                                    <span className="text-xs font-medium text-white/50">lbs / day</span>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-[10px] font-medium">
                                                        <span className="text-white/40">0</span>
                                                        <span className="text-white/80">Target: 2.5</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
                                                        {/* Target Marker */}
                                                        <div className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10" style={{ left: '80%' }}></div>
                                                        {/* Actual Bar */}
                                                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{ width: '90%' }}></div>
                                                    </div>
                                                    <div className="text-right text-[9px] text-green-400 font-medium">Exceeding Target</div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-2 mt-2">
                                                    <div>
                                                        <div className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">Feed Eff.</div>
                                                        <div className="text-xs font-medium text-white">6.2 <span className="text-[9px] text-white/40">F:G</span></div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[9px] text-white/40 uppercase tracking-wider mb-0.5">Proj. Finish</div>
                                                        <div className="text-xs font-medium text-white">Aug 15</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 h-full">
                                        {/* Temp */}
                                        <div className="relative rounded-2xl p-3 border border-white/10 flex flex-col justify-between overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex justify-between items-start">
                                                <Thermometer size={16} className="text-white drop-shadow-md" />
                                                <span className="text-[10px] text-white/90 font-medium">Temp</span>
                                            </div>
                                            <div className="relative z-10 text-lg font-bold text-white mt-1 drop-shadow-md">72°<span className="text-xs font-medium text-white/90">F</span></div>
                                        </div>

                                        {/* Humidity */}
                                        <div className="relative rounded-2xl p-3 border border-white/10 flex flex-col justify-between overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex justify-between items-start">
                                                <Droplets size={16} className="text-white drop-shadow-md" />
                                                <span className="text-[10px] text-white/90 font-medium">Hum</span>
                                            </div>
                                            <div className="relative z-10 text-lg font-bold text-white mt-1 drop-shadow-md">45<span className="text-xs font-medium text-white/90">%</span></div>
                                        </div>

                                        {/* Ammonia */}
                                        <div className="relative rounded-2xl p-3 border border-white/10 flex flex-col justify-between overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex justify-between items-start">
                                                <CloudFog size={16} className="text-white drop-shadow-md" />
                                                <span className="text-[10px] text-white/90 font-medium">NH3</span>
                                            </div>
                                            <div className="relative z-10 text-lg font-bold text-white mt-1 drop-shadow-md">12<span className="text-xs font-medium text-white/90">ppm</span></div>
                                        </div>

                                        {/* Light */}
                                        <div className="relative rounded-2xl p-3 border border-white/10 flex flex-col justify-between overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex justify-between items-start">
                                                <SunDim size={16} className="text-white drop-shadow-md" />
                                                <span className="text-[10px] text-white/90 font-medium">Light</span>
                                            </div>
                                            <div className="relative z-10 text-lg font-bold text-white mt-1 drop-shadow-md">240<span className="text-xs font-medium text-white/90">lx</span></div>
                                        </div>

                                        {/* Dust */}
                                        <div className="relative rounded-2xl p-3 border border-white/10 flex flex-col justify-between overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-slate-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 flex justify-between items-start">
                                                <Wind size={16} className="text-white drop-shadow-md" />
                                                <span className="text-[10px] text-white/90 font-medium">Dust</span>
                                            </div>
                                            <div className="relative z-10 text-lg font-bold text-white mt-1 drop-shadow-md">Low</div>
                                        </div>

                                        {/* Comfort Index Pie */}
                                        <div className="bg-white/5 rounded-2xl p-2 border border-white/5 flex items-center justify-center relative">
                                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    className="text-white/10"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                />
                                                <path
                                                    className="text-green-500"
                                                    strokeDasharray="85, 100"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-xs font-bold text-white">85%</span>
                                                <span className="text-[8px] text-white/40">Comfort</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    </div>

                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
                        <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage.url}
                                alt="Enlarged view"
                                className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                            />
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <span className="text-sm font-medium text-white">{selectedImage.time}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
