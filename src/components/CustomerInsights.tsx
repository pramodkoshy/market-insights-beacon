
import React, { useState } from 'react';
import { Users, UserPlus, Activity, Filter, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export function CustomerInsights() {
  const [timeFrame, setTimeFrame] = useState("Last 30 Days");
  
  // Sample customer segments data
  const customerSegments = [
    { name: "New Customers", value: 28 },
    { name: "Returning Customers", value: 42 },
    { name: "Loyal Customers", value: 30 }
  ];
  
  // Sample age distribution data
  const ageDistribution = [
    { name: "18-24", value: 18 },
    { name: "25-34", value: 32 },
    { name: "35-44", value: 25 },
    { name: "45-54", value: 14 },
    { name: "55+", value: 11 }
  ];
  
  // Sample engagement by channel data
  const engagementByChannel = [
    { name: "Website", value: 35 },
    { name: "Social Media", value: 28 },
    { name: "Email", value: 22 },
    { name: "Mobile App", value: 15 }
  ];

  // Sample customer journey data
  const customerJourneyData = [
    { stage: "Awareness", count: 8500 },
    { stage: "Consideration", count: 5200 },
    { stage: "Purchase", count: 3100 },
    { stage: "Retention", count: 2400 },
    { stage: "Advocacy", count: 1200 }
  ];
  
  // Sample customers list
  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      segment: "Loyal",
      purchases: 12,
      totalSpent: "$1,245",
      lastActivity: "3 days ago",
      engagement: "High"
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@example.com",
      segment: "Returning",
      purchases: 5,
      totalSpent: "$520",
      lastActivity: "1 week ago",
      engagement: "Medium"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      segment: "New",
      purchases: 1,
      totalSpent: "$89",
      lastActivity: "2 days ago",
      engagement: "Low"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      segment: "Loyal",
      purchases: 18,
      totalSpent: "$2,150",
      lastActivity: "5 days ago",
      engagement: "High"
    },
    {
      id: 5,
      name: "David Lee",
      email: "david.l@example.com",
      segment: "Returning",
      purchases: 7,
      totalSpent: "$685",
      lastActivity: "2 weeks ago",
      engagement: "Medium"
    }
  ];
  
  // Colors for pie charts
  const COLORS = ['#3b82f6', '#14b8a6', '#a855f7', '#f97316', '#ef4444', '#22c55e'];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customer Insights</h2>
          <p className="text-muted-foreground">
            Analyze customer behavior and segment your audience
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
              <DropdownMenuItem onClick={() => setTimeFrame("Last 7 Days")}>
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("Last 30 Days")}>
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFrame("Last 90 Days")}>
                Last 90 Days
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,824</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-analytics-green">+12.3%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Customers
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-analytics-green">+8.4%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Engagement Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-analytics-green">+3.6%</span> vs. previous period
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution by customer type</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Customer demographics by age</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Engagement by Channel</CardTitle>
            <CardDescription>Customer engagement across channels</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementByChannel}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {engagementByChannel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Journey Funnel</CardTitle>
          <CardDescription>Customer progression through marketing funnel</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={customerJourneyData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <Bar 
                dataKey="count" 
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]}
              />
              <Tooltip formatter={(value) => [`${value} Customers`, "Count"]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>Detailed information about your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Segment</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Purchases</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Total Spent</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Last Activity</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr 
                      key={customer.id} 
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4 align-middle">{customer.name}</td>
                      <td className="p-4 align-middle">{customer.email}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          customer.segment === 'Loyal' 
                            ? 'bg-green-100 text-green-800' 
                            : customer.segment === 'Returning'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {customer.segment}
                        </span>
                      </td>
                      <td className="p-4 align-middle">{customer.purchases}</td>
                      <td className="p-4 align-middle">{customer.totalSpent}</td>
                      <td className="p-4 align-middle">{customer.lastActivity}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          customer.engagement === 'High' 
                            ? 'bg-green-100 text-green-800' 
                            : customer.engagement === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {customer.engagement}
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
