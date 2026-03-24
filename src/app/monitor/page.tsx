'use client';

import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, PieChart as PieChartIcon, BarChart3, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';

export default function MonitorPage() {
  const { chartData, liveMentions } = useStore();

  // Calculate sentiment composition
  const sentimentCounts = liveMentions.reduce((acc, m) => {
    acc[m.sentiment] = (acc[m.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = [
    { name: 'Positive', value: sentimentCounts['Positive'] || 10 },
    { name: 'Neutral', value: sentimentCounts['Neutral'] || 25 },
    { name: 'Negative', value: sentimentCounts['Negative'] || 5 },
  ];
  const COLORS = ['#34d399', '#94a3b8', '#fb7185']; // emerald-400, slate-400, rose-400

  // Calculate platform breakdown
  const platformCounts = liveMentions.reduce((acc, m) => {
    acc[m.platform] = (acc[m.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const barData = Object.entries(platformCounts).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  if (barData.length === 0) {
    barData.push({ name: 'Twitter', value: 42 }, { name: 'LinkedIn', value: 18 }, { name: 'Reddit', value: 15 }, { name: 'TikTok', value: 25 });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
            Live Monitor
            <span className="relative flex h-3 w-3 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </h1>
          <p className="text-slate-400 mt-1">Granular real-time analytics stream</p>
        </div>
        <Badge variant="outline" className="border-red-500/30 bg-red-500/10 text-red-500 flex gap-2">
          <Radio className="w-4 h-4" />
          Live Metrics
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3 bg-slate-900/50 border-slate-800 relative overflow-hidden backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-200">
              <Activity className="h-5 w-5 text-blue-400" />
              Engagement Pulse (Last 24h)
            </CardTitle>
            <CardDescription className="text-slate-400">Aggregated engagement velocity across all tracked topics</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-slate-900/50 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-200">
              <PieChartIcon className="h-5 w-5 text-emerald-400" />
              Live Sentiment Share
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-200">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              Platform Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
                 <XAxis type="number" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis type="category" dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} width={80} />
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                 <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} />
                 <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
