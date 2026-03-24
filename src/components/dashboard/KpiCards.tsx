'use client';

import { Activity, MessageSquare, Flame, TrendingUp } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function KpiCards() {
  const { kpis } = useStore();

  const metrics = [
    {
      title: 'Total Mentions',
      value: new Intl.NumberFormat('en-US', { notation: 'compact' }).format(kpis.totalMentions),
      change: `+${kpis.mentionsChange}%`,
      icon: MessageSquare,
      color: 'text-blue-400',
      bgClass: 'bg-blue-500/10'
    },
    {
      title: 'Avg. Engagement',
      value: `${kpis.avgEngagementRate.toFixed(2)}%`,
      change: `${kpis.engagementChange}%`,
      icon: Activity,
      color: 'text-emerald-400',
      bgClass: 'bg-emerald-500/10',
      isDown: kpis.engagementChange < 0,
    },
    {
      title: 'Virality Score',
      value: kpis.viralityScore.toString(),
      change: `+${kpis.viralityChange}%`,
      icon: Flame,
      color: 'text-orange-400',
      bgClass: 'bg-orange-500/10'
    },
    {
      title: 'Active Trends',
      value: kpis.activeTrends.toString(),
      change: '+12 last hour',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgClass: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, ease: 'easeOut' }}
        >
          <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm overflow-hidden relative group">
            <div className={`absolute top-0 left-0 w-1 p-[80%] -ml-[50%] -mt-[30%] blur-3xl rounded-full ${metric.bgClass} opacity-20 group-hover:opacity-40 transition-opacity`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-400">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${metric.bgClass}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold tracking-tight text-slate-100">{metric.value}</div>
              <p className={`text-xs mt-1 ${metric.isDown ? 'text-rose-400' : 'text-emerald-400'}`}>
                {metric.change}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
