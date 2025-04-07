
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewMetrics } from "@/components/OverviewMetrics";
import { CampaignPerformance } from "@/components/CampaignPerformance";
import { CustomerInsights } from "@/components/CustomerInsights";
import { ROIAnalytics } from "@/components/ROIAnalytics";
import { ReportGenerator } from "@/components/ReportGenerator";

const Dashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Marketing Analytics Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewMetrics />
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4">
          <CampaignPerformance />
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <CustomerInsights />
        </TabsContent>
        
        <TabsContent value="roi" className="space-y-4">
          <ROIAnalytics />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <ReportGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
