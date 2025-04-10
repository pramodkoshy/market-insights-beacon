
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';

export function ReportingConfigPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Reporting Configuration</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reporting Settings</CardTitle>
            <CardDescription>Configure report generation settings and defaults</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reporting configuration content will go here */}
            <p>Configure default reporting parameters, templates, and delivery options.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
