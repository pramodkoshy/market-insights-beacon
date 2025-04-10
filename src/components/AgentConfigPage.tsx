
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';

export function AgentConfigPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Agent Configuration</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Agent Settings</CardTitle>
            <CardDescription>Configure AI agent behavior and parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Agent configuration content will go here */}
            <p>Configure your AI agents' behavior, parameters, and integration settings.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
