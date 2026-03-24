'use client';

import { useWebSockets } from '@/hooks/useWebSockets';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { LiveFeed } from '@/components/dashboard/LiveFeed';
import { TrendingGrid } from '@/components/dashboard/TrendingGrid';
import { AiInsights } from '@/components/dashboard/AiInsights';
import { Badge } from '@/components/ui/badge';
import { Database } from 'lucide-react';

export default function Home() {
  // Initialize the WebSocket simulation on the home page
  useWebSockets();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
            TrendPulse Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Real-time social intelligence & monitoring</p>
        </div>
        <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 flex gap-2">
          <Database className="w-4 h-4" />
          Powered by Spark & Kafka
        </Badge>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 flex flex-col gap-6">
          <TrendingGrid />
          <AiInsights />
        </div>
        <div className="xl:col-span-1 border border-slate-800 rounded-xl bg-slate-900/50 backdrop-blur-md overflow-hidden relative shadow-lg h-[600px]">
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}
