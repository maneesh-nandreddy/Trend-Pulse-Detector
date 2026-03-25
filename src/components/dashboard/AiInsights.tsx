'use client';

import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Target, AlertTriangle, TrendingUp } from 'lucide-react';

export function AiInsights() {
  const { insights } = useStore();

  const getIcon = (type: string) => {
    switch(type) {
      case 'Demographic': return <Target className="w-5 h-5 text-indigo-400" />;
      case 'Anomaly': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'Predictive': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.slice(0,3).map((insight) => (
        <Card key={insight.id} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader className="pb-3 flex flex-row items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
              {getIcon(insight.type)}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-sm font-semibold text-slate-200 leading-tight">
                {insight.title}
              </CardTitle>
              <div className="text-[11px] text-slate-500 font-medium">
                {insight.confidence}% Confidence • Grok-Engine
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 leading-relaxed">
              {insight.content}
            </p>
            {insight.actionable && (
              <button className="mt-4 text-xs font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-full transition-colors w-full">
                Review Action
              </button>
            )}
          </CardContent>
          
        </Card>
      ))}
    </div>
  );
}
