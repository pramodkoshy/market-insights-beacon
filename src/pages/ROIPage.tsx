
import React from 'react';
import { TopNavigation } from '@/components/TopNavigation';
import { ROIAnalytics } from '@/components/ROIAnalytics';
import { AgentProvider } from '@/agents/AgentContext';

export function ROIPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">ROI Analysis</h2>
        </div>
        <AgentProvider>
          <ROIAnalytics />
        </AgentProvider>
      </div>
    </div>
  );
}

export default ROIPage;
