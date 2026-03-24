'use client';

import { BellRing, Plus, Play, Pause, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const rules = [
  { id: 1, name: 'Viral Keyword Alert', condition: 'Volume > 10,000/hr', target: 'Keywords: NextJs15', active: true },
  { id: 2, name: 'Sentiment Crash', condition: 'Negative Sentiment > 40%', target: 'Brand: Vercel', active: true },
  { id: 3, name: 'Competitor Launch', condition: 'Any Mention Spike > 500%', target: 'Keywords: React19', active: false },
];

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
            Alert Rules
          </h1>
          <p className="text-slate-400 mt-1">Configure threshold triggers across the Kafka stream</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Plus className="w-4 h-4" /> New Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Active Triggers</h3>
          
          {rules.map((rule) => (
            <Card key={rule.id} className={`bg-slate-900/50 border-${rule.active ? 'blue-500/30' : 'slate-800'} backdrop-blur-md transition-colors`}>
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full mt-1.5 ${rule.active ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200 text-lg flex items-center gap-2">
                      {rule.name}
                      {!rule.active && <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-700">PAUSED</Badge>}
                    </h4>
                    <div className="text-sm text-slate-400 mt-1">
                      Trigger when <span className="text-indigo-400 font-mono text-xs bg-indigo-500/10 px-1 py-0.5 rounded">{rule.condition}</span> for <span className="text-slate-300">{rule.target}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200">
                    <Settings2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className={rule.active ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10' : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'}>
                    {rule.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="xl:col-span-1">
          <Card className="bg-slate-900/40 border-slate-800 h-full backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800/50 pb-4">
              <CardTitle className="text-lg">Recent Triggers</CardTitle>
              <CardDescription>Log of fired notifications in the last 24h</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-800/50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 hover:bg-slate-800/20 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-blue-400">Viral Keyword Alert</span>
                      <span className="text-[10px] text-slate-500">{i * 12} mins ago</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      &quot;NextJs15&quot; volume exceeded 10,000 mentions across Twitter and LinkedIn globally.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
