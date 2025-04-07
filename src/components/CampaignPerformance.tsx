
import React, { useState } from 'react';
import { 
  ChevronDown, 
  Filter, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  BarChart, 
  PieChart as PieChartIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer } from 'recharts';

export function CampaignPerformance() {
  const [timeFrame, setTimeFrame] = useState("This Quarter");
  
  // Sample campaign data
  const campaigns = [
    {
      id: 1,
      name: "Summer Sale Promotion",
      type: "Digital",
      status: "Active",
      budget: "$12,500",
      spent: "$8,750",
      reach: "245.8K",
      engagement: "23.5K",
      conversion: "3.2%",
      roi: "2.8x",
      performance: "High",
      trend: "up"
    },
    {
      id: 2,
      name: "Brand Awareness Billboard",
      type: "OOH",
      status: "Active",
      budget: "$25,000",
      spent: "$25,000",
      reach: "1.2M",
      engagement: "N/A",
      conversion: "N/A",
      roi: "1.4x",
      performance: "Medium",
      trend: "up"
    },
    {
      id: 3,
      name: "Content Marketing Series",
      type: "Content",
      status: "Active",
      budget: "$8,000",
      spent: "$5,600",
      reach: "78.5K",
      engagement: "12.3K",
      conversion: "2.7%",
      roi: "2.1x",
      performance: "Medium",
      trend: "up"
    },
    {
      id: 4,
      name: "Email Newsletter Campaign",
      type: "Digital",
      status: "Completed",
      budget: "$5,000",
      spent: "$5,000",
      reach: "152.6K",
      engagement: "18.7K",
      conversion: "4.3%",
      roi: "3.5x",
      performance: "High",
      trend: "up"
    },
    {
      id: 5,
      name: "Influencer Partnership",
      type: "Experimental",
      status: "Active",
      budget: "$15,000",
      spent: "$9,000",
      reach: "320.4K",
      engagement: "42.7K",
      conversion: "2.9%",
      roi: "1.9x",
      performance: "Medium",
      trend: "down"
    },
    {
      id: 6,
      name: "Product Launch Event",
      type: "OOH",
      status: "Completed",
      budget: "$30,000",
      spent: "$32,500",
      reach: "85.3K",
      engagement: "12.5K",
      conversion: "5.8%",
      roi: "3.2x",
      performance: "High",
      trend: "up"
    }
  ];
  
  // Performance by type data
  const campaignTypeData = [
    { name: "Digital", impressions: 850000, clicks: 42500, conversions: 12750 },
    { name: "OOH", impressions: 1500000, clicks: 0, conversions: 7500 },
    { name: "Content", impressions: 350000, clicks: 28000, conversions: 5600 },
    { name: "Experimental", impressions: 520000, clicks: 31200, conversions: 6240 }
  ];
  
  // Performance over time data
  const performanceOverTimeData = [
    { name: "Jan", digital: 65, ooh: 40, content: 35, experimental: 20 },
    { name: "Feb", digital: 68, ooh: 42, content: 33, experimental: 25 },
    { name: "Mar", digital: 72, ooh: 45, content: 37, experimental: 30 },
    { name: "Apr", digital: 75, ooh: 48, content: 42, experimental: 28 },
    { name: "May", digital: 80, ooh: 52, content: 45, experimental: 35 },
    { name: "Jun", digital: 85, ooh: 55, content: 50, experimental: 40 },
    { name: "Jul", digital: 90, ooh: 58, content: 55, experimental: 45 },
    { name: "Aug", digital: 95, ooh: 62, content: 60, experimental: 50 }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Campaign Performance</h2>
          <p className="text-muted-foreground">
            Track and analyze your marketing campaigns across all channels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-between">
                {timeFrame} <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeFrame("Today")}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("This Week")}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("This Month")}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("This Quarter")}>
                This Quarter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("This Year")}>
                This Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="digital">Digital</TabsTrigger>
          <TabsTrigger value="ooh">OOH</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="experimental">Experimental</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Campaigns
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  Across all campaign types
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Budget
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$245,000</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-green">+12.5%</span> vs. previous quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Conversion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-green">+0.6%</span> vs. previous quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. ROI
                </CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4x</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-analytics-green">+0.3x</span> vs. previous quarter
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Over Time</CardTitle>
              <CardDescription>Performance metrics for each campaign type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceOverTimeData}>
                  <Line 
                    type="monotone" 
                    dataKey="digital" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    name="Digital"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ooh" 
                    stroke="#14b8a6" 
                    strokeWidth={2} 
                    name="OOH"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="content" 
                    stroke="#a855f7" 
                    strokeWidth={2} 
                    name="Content"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="experimental" 
                    stroke="#f97316" 
                    strokeWidth={2} 
                    name="Experimental"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Campaign List</CardTitle>
              <CardDescription>Overview of all current campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Campaign</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Budget</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Reach</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Conversion</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">ROI</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr 
                          key={campaign.id} 
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{campaign.name}</td>
                          <td className="p-4 align-middle">{campaign.type}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              campaign.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">{campaign.budget}</td>
                          <td className="p-4 align-middle">{campaign.reach}</td>
                          <td className="p-4 align-middle">{campaign.conversion}</td>
                          <td className="p-4 align-middle">{campaign.roi}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                campaign.performance === 'High' 
                                  ? 'bg-green-100 text-green-800' 
                                  : campaign.performance === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {campaign.performance}
                              </span>
                              {campaign.trend === 'up' ? (
                                <TrendingUp className="h-4 w-4 text-analytics-green" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-analytics-red" />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Similar content structure would be repeated for other tabs */}
        <TabsContent value="digital" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Campaigns</CardTitle>
              <CardDescription>Performance metrics for digital campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Digital campaign data would be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
