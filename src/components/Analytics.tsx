import React, { useState } from 'react';
import {
    TrendingUp,
    Activity,
    Eye,
    ArrowLeft,
    Home,
    User,
    Settings
} from 'lucide-react';

// Reuse GlassCard from Dashboard
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

interface AnalyticsProps {
    onNavigate: (tab: string) => void;
    activeTab: string;
    onBack: () => void;
}

export default function Analytics({ onNavigate, activeTab, onBack }: AnalyticsProps) {
    const [timeRange, setTimeRange] = useState('7d');

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
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-full" />
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
                        <Settings size={16} className="text-white/40" />
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide" style={{ gap: 'var(--grid-gap)' }}>
                    {/* Time Range Selector */}
                    <div className="flex justify-end mb-3">
                        <div className="bg-white/5 p-1 rounded-lg flex border border-white/5">
                            {['24h', '7d', '30d', '90d'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${timeRange === range ? 'bg-white text-black shadow-sm' : 'text-white/40 hover:text-white/60'}`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
                        {/* Visual Analysis Summary */}
                        <GlassCard className="lg:col-span-2" title="Visual Check Analysis">
                            <div className="space-y-4">
                                {/* AI Detection Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                                        <div className="text-xs text-green-400/70 uppercase tracking-wider mb-1">Healthy</div>
                                        <div className="text-2xl font-bold text-green-400">87%</div>
                                        <div className="text-xs text-white/40 mt-1">↑ 5% from last week</div>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                                        <div className="text-xs text-yellow-400/70 uppercase tracking-wider mb-1">Monitor</div>
                                        <div className="text-2xl font-bold text-yellow-400">11%</div>
                                        <div className="text-xs text-white/40 mt-1">→ Stable</div>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                        <div className="text-xs text-red-400/70 uppercase tracking-wider mb-1">Critical</div>
                                        <div className="text-2xl font-bold text-red-400">2%</div>
                                        <div className="text-xs text-white/40 mt-1">↓ 3% improvement</div>
                                    </div>
                                </div>

                                {/* Weekly Trend Chart */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Health Score Trend</div>
                                    <svg className="w-full h-32" viewBox="0 0 400 80">
                                        <defs>
                                            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0,60 L50,55 L100,50 L150,45 L200,40 L250,38 L300,35 L350,32 L400,30" fill="none" stroke="#34d399" strokeWidth="2" />
                                        <path d="M0,60 L50,55 L100,50 L150,45 L200,40 L250,38 L300,35 L350,32 L400,30 L400,80 L0,80 Z" fill="url(#healthGradient)" />
                                    </svg>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Quick Stats */}
                        <GlassCard title="Key Metrics">
                            <div className="space-y-3">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <Eye size={16} className="text-blue-400" />
                                        <div className="text-xs text-white/40">Daily Scans</div>
                                    </div>
                                    <div className="text-xl font-bold text-white">1,247</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity size={16} className="text-green-400" />
                                        <div className="text-xs text-white/40">Avg Response</div>
                                    </div>
                                    <div className="text-xl font-bold text-white">2.3h</div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <TrendingUp size={16} className="text-purple-400" />
                                        <div className="text-xs text-white/40">Improvement</div>
                                    </div>
                                    <div className="text-xl font-bold text-white">+12%</div>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* AI Herd Intelligence - Detailed Analysis */}
                    <GlassCard className="mb-3" title="AI Herd Intelligence">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <h4 className="text-sm font-semibold text-white">Growth Trajectory Analysis</h4>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed mb-3">
                                    Based on the last 30 days of weight data, the herd is outperforming the projected growth curve by <span className="text-green-400 font-medium">12%</span>. The current feed efficiency ratio of 6.2 indicates optimal nutrient absorption.
                                </p>
                                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                                    <div className="text-[10px] text-green-400 uppercase tracking-wider font-bold mb-1">Suggestion</div>
                                    <p className="text-xs text-white/90">
                                        Maintain current ration formulation. Consider increasing protein supplementation by 2% for the bottom 10% of the herd to align them with the top performers.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                    <h4 className="text-sm font-semibold text-white">Behavioral Anomalies</h4>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed mb-3">
                                    Movement patterns show a slight decrease in activity during peak heat hours (12 PM - 3 PM), which is normal. However, <span className="text-yellow-400 font-medium">3 calves</span> are showing consistently lower gait speeds in the morning.
                                </p>
                                <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                                    <div className="text-[10px] text-yellow-400 uppercase tracking-wider font-bold mb-1">Action Item</div>
                                    <p className="text-xs text-white/90">
                                        Schedule a hoof check for the flagged calves (ID: #482, #991, #102). Verify water trough accessibility in the North-East quadrant.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Behavior Patterns Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
                        <GlassCard title="Movement Patterns">
                            <div className="space-y-3">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-xs text-white/50 uppercase">Activity Level</div>
                                        <div className="text-sm font-semibold text-green-400">Normal</div>
                                    </div>
                                    <div className="h-24 flex items-end gap-1">
                                        {[65, 72, 68, 80, 78, 85, 82].map((height, i) => (
                                            <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t" style={{ height: `${height}%` }}></div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40 mt-2">
                                        <span>Mon</span>
                                        <span>Sun</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard title="Growth Metrics">
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Avg Weight Gain</div>
                                        <div className="text-2xl font-bold text-white">2.8 <span className="text-sm font-normal text-white/50">lbs/day</span></div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Feed Efficiency</div>
                                        <div className="text-2xl font-bold text-white">6.2 <span className="text-sm font-normal text-white/50">F:G</span></div>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="text-xs text-white/50 uppercase tracking-wider mb-2">7-Day Trend</div>
                                    <svg className="w-full h-16" viewBox="0 0 200 40">
                                        <polyline points="0,30 30,25 60,28 90,22 120,20 150,18 180,15 200,12" fill="none" stroke="#34d399" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
