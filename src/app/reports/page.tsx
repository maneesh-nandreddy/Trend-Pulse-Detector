'use client';

import { Download, FileText, Database, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const reports = [
  { id: 1, name: 'Q3 Brand Sentiment Analysis', cohort: 'Global 18-35', date: '2025-10-01', size: '2.4 MB' },
  { id: 2, name: 'Competitor Share of Voice (YTD)', cohort: 'North America', date: '2025-09-15', size: '8.1 MB' },
  { id: 3, name: 'Hashtag Performance Tracking', cohort: 'Crypto / Web3', date: '2025-09-02', size: '1.2 MB' },
  { id: 4, name: 'Demographic Shift: TikTok vs Reels', cohort: 'Gen Z, Tier 1', date: '2025-08-20', size: '4.7 MB' },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
            Historical Reports
          </h1>
          <p className="text-slate-400 mt-1">Batch processed analytics generated from Hadoop/Hive cold storage</p>
        </div>
        <Badge variant="outline" className="border-yellow-500/30 bg-yellow-500/10 text-yellow-500 flex gap-2">
          <Database className="w-4 h-4" />
          Powered by Hadoop
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 grid gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="bg-slate-900/40 border-slate-800 hover:border-slate-700 transition-colors">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800/80 text-blue-400 rounded-lg">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-lg">{report.name}</h4>
                    <div className="flex items-center gap-3 mt-1.5 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {report.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600 border border-slate-500"></span>
                      <span>Cohort: {report.cohort}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600 border border-slate-500"></span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <Button variant="outline" className="border-slate-700 bg-transparent hover:bg-slate-800 hover:text-slate-200">
                    PDF
                  </Button>
                  <Button variant="outline" className="border-slate-700 bg-transparent hover:bg-slate-800 hover:text-slate-200">
                    CSV
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-indigo-900/40 to-slate-900/60 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-300">Generate Custom Report</CardTitle>
              <CardDescription className="text-indigo-200/60">
                Run a MapReduce job across petabytes of historical data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Launch Wizard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
