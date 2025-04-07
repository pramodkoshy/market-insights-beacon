
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp,
  BarChart4, 
  PieChart as PieChartIcon, 
  ChevronDown, 
  Filter 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer } from 'recharts';

export function ROIAnalytics() {
  const [timeFrame, setTimeFrame] = useState("Last Quarter");
  
  // Sample ROI data
  const roiByChannel = [
    { name: "Email", roi: 4.2 },
    { name: "Social Media", roi: 2.8 },
    { name: "Search", roi: 3.5 },
    { name: "Display", roi: 1.9 },
    { name: "Content", roi: 2.2 },
    { name: "OOH", roi: 1.3 },
  ];
  
  // ROI over time data
  const roiOverTime = [
    { month: "Jan", value: 1.8 },
    { month: "Feb", value: 2.1 },
    { month: "Mar", value: 2.3 },
    { month: "Apr", value: 2.0 },
    { month: "May", value: 2.4 },
    { month: "Jun", value: 2.6 },
    { month: "Jul", value: 2.9 },
    { month: "Aug", value: 3.1 },
  ];
  
  // Top campaigns by ROI
  const topCampaigns = [
    { name: "Email Newsletter Series", roi: 4.8, investment: "$12,000", return: "$57,600" },
    { name: "Social Media Contest", roi: 3.9, investment: "$8,500", return: "$33,150" },
    { name: "Search Engine Marketing", roi: 3.7, investment: "$15,000", return: "$55,500" },
    { name: "Content Marketing Blog", roi: 3.2, investment: "$7,200", return: "$23,040" },
    { name: "Video Ad Campaign", roi: 2.8, investment: "$20,000", return: "$56,000" },
  ];
  
  // ROI vs Budget data
  const roiVsBudgetData = [
    { name: "Campaign A", budget: 12000, roi: 4.2 },
    { name: "Campaign B", budget: 25000, roi: 2.8 },
    { name: "Campaign C", budget: 8500, roi: 3.7 },
    { name: "Campaign D", budget: 15000, roi: 3.1 },
    { name: "Campaign E", budget: 30000, roi: 1.9 },
    { name: "Campaign F", budget: 22000, roi: 2.5 },
    { name: "Campaign G", budget: 18000, roi: 2.9 },
    { name: "Campaign H", budget: 10000, roi: 3.3 },
  ];
  
  // ROI Distribution by campaign type
  const roiDistribution = [
    { name: "High ROI (3.5+)", value: 28 },
    { name: "Medium ROI (2-3.5)", value: 45 },
    { name: "Low ROI (<2)", value: 27 }
  ];
  
  // Colors for charts
  const COLORS = ['#3b82f6', '#14b8a6', '#a855f7', '#f97316', '#ef4444', '#22c55e'];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ROI Analytics</h2>
          <p className="text-muted-foreground">
            Analyze return on investment across campaigns and channels
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
              <DropdownMenuItem onClick={() => setTimeFrame("This Month")}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("Last Quarter")}>
                Last Quarter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("This Year")}>
                This Year
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("All Time")}>
                All Time
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average ROI
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.7x</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-analytics-green">+0.4x</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investment
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-analytics-green">+12.5%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Return
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$661,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-analytics-green">+18.2%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Highest ROI
            </CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8x</div>
            <p className="text-xs text-muted-foreground">
              Email Newsletter Series
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ROI by Channel</CardTitle>
            <CardDescription>Return on investment across marketing channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={roiByChannel}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <Bar 
                  dataKey="roi" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  label={{ position: 'top', formatter: (val: any) => `${val}x` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ROI Over Time</CardTitle>
            <CardDescription>Monthly ROI trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={roiOverTime}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Budget vs. ROI</CardTitle>
            <CardDescription>Relationship between campaign budget and ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={roiVsBudgetData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <Bar 
                  dataKey="budget" 
                  fill="#14b8a6" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.7}
                />
                <Bar 
                  dataKey="roi" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  yAxisId="right"
                  scale="pow"
                  opacity={0.9}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ROI Distribution</CardTitle>
            <CardDescription>Campaigns by ROI range</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roiDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}: {name: string, percent: number}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {roiDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns (by ROI)</CardTitle>
          <CardDescription>Highest return on investment campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Campaign</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">ROI</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Investment</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Return</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {topCampaigns.map((campaign, index) => (
                    <tr 
                      key={index} 
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4 align-middle">{campaign.name}</td>
                      <td className="p-4 align-middle">{campaign.roi}x</td>
                      <td className="p-4 align-middle">{campaign.investment}</td>
                      <td className="p-4 align-middle">{campaign.return}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          campaign.roi >= 3.5 
                            ? 'bg-green-100 text-green-800' 
                            : campaign.roi >= 2
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {campaign.roi >= 3.5 ? 'High' : campaign.roi >= 2 ? 'Medium' : 'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
