
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';

export function SystemConfigPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">System Configuration</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure global system parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* System configuration content will go here */}
            <p>Manage global system settings, user permissions, and integration configurations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
