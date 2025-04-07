
import React from 'react';
import { Activity, TrendingUp, Users, DollarSign, BarChart4 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } from 'recharts';

export function OverviewMetrics() {
  // Sample data for the overview metrics
  const metrics = [
    {
      title: "Total Campaigns",
      value: "24",
      change: "+14.2%",
      icon: Activity,
      description: "vs. previous month",
      color: "text-analytics-blue"
    },
    {
      title: "Customer Reach",
      value: "573.2K",
      change: "+5.4%",
      icon: Users,
      description: "vs. previous month",
      color: "text-analytics-teal"
    },
    {
      title: "Revenue Generated",
      value: "$428.9K",
      change: "+12.8%",
      icon: DollarSign,
      description: "vs. previous month",
      color: "text-analytics-green"
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: "+2.1%",
      icon: TrendingUp,
      description: "vs. previous month",
      color: "text-analytics-purple"
    }
  ];

  // Sample data for the charts
  const revenueData = [
    { name: 'Jan', value: 120000 },
    { name: 'Feb', value: 140000 },
    { name: 'Mar', value: 180000 },
    { name: 'Apr', value: 220000 },
    { name: 'May', value: 260000 },
    { name: 'Jun', value: 310000 },
    { name: 'Jul', value: 350000 },
    { name: 'Aug', value: 428900 },
  ];

  const campaignTypeData = [
    { name: 'Digital', value: 40 },
    { name: 'OOH', value: 20 },
    { name: 'Content', value: 25 },
    { name: 'Experimental', value: 15 },
  ];

  const channelPerformanceData = [
    { name: 'Email', performance: 85 },
    { name: 'Social', performance: 78 },
    { name: 'Search', performance: 92 },
    { name: 'Display', performance: 65 },
    { name: 'Video', performance: 72 },
  ];

  // Array of colors for the pie chart
  const colors = ["#3b82f6", "#14b8a6", "#a855f7", "#f97316"];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${metric.change.startsWith('+') ? 'text-analytics-green' : 'text-analytics-red'}`}>{metric.change}</span> {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue from marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AreaChart 
              width={600} 
              height={250} 
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </CardContent>
        </Card>

        <Card className="col-span-3 animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle>Campaign Distribution</CardTitle>
            <CardDescription>By campaign type</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={250} height={250}>
              <Pie
                data={campaignTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {campaignTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-slideUp" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
          <CardDescription>Performance by marketing channel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <BarChart
              width={800}
              height={300}
              data={channelPerformanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <Bar dataKey="performance" fill="#14b8a6" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
