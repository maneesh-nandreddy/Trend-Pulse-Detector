'use client';

import { useStore } from '@/store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TrendingGrid() {
  const { trends } = useStore();

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          Top Trending Topics
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="border-slate-800">
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-slate-400">Topic</TableHead>
              <TableHead className="text-slate-400">Volume</TableHead>
              <TableHead className="text-slate-400">Momentum</TableHead>
              <TableHead className="text-slate-400">Sentiment</TableHead>
              <TableHead className="text-slate-400 text-right">Platforms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trends.slice(0, 5).map((trend) => (
              <TableRow key={trend.id} className="border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                <TableCell className="font-medium text-slate-200">
                  <div className="flex items-center gap-2">
                    {trend.topic}
                    {trend.isSpiking && (
                      <Badge className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border-0 px-1.5 py-0 text-[10px]">
                        SPIKING
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">
                  {new Intl.NumberFormat('en-US', { compactDisplay: 'short', notation: 'compact'}).format(trend.volume)}
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 text-xs font-semibold ${trend.momentum > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trend.momentum > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(trend.momentum)}%
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 max-w-[80px]">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${trend.sentimentScore}%`, backgroundColor: `oklch(0.6 ${trend.sentimentScore/100 * 0.2} ${130 - (trend.sentimentScore/100 * 100)})` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {trend.topPlatforms.map(p => (
                      <Badge key={p} variant="outline" className="text-[10px] text-slate-400 border-slate-700 bg-slate-900">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
