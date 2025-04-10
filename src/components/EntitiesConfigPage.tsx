
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';

export function EntitiesConfigPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Entities Configuration</h2>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Entity Management</CardTitle>
            <CardDescription>Configure business entities and relationships</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Entities configuration content will go here */}
            <p>Define and manage your business entities, their properties, and relationships.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
