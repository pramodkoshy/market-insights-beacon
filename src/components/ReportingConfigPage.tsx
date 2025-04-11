
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TopNavigation } from './TopNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Mail, Table, PieChart, BarChart, Clock, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function ReportingConfigPage() {
  const handleSaveSettings = () => {
    toast.success("Reporting settings saved successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavigation />
      
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Reporting Configuration</h2>
        </div>
        
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Settings</TabsTrigger>
            <TabsTrigger value="design">Design & Branding</TabsTrigger>
            <TabsTrigger value="metrics">Metrics Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Report Templates
                </CardTitle>
                <CardDescription>Configure default report templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Executive Summary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Campaign Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">ROI Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Customer Insights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Template
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-template">Default Template</Label>
                  <Select defaultValue="executive">
                    <SelectTrigger id="default-template">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive">Executive Summary</SelectItem>
                      <SelectItem value="campaign">Campaign Performance</SelectItem>
                      <SelectItem value="roi">ROI Analysis</SelectItem>
                      <SelectItem value="customer">Customer Insights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Template Sections</CardTitle>
                <CardDescription>Configure which sections appear in reports by default</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Executive Summary</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance Metrics</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Visualization Charts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Detailed Tables</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Recommendations</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Historical Comparison</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Template Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Delivery Settings
                </CardTitle>
                <CardDescription>Configure report delivery preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-format">Default Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger id="default-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="ppt">PowerPoint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Default Email Subject</Label>
                  <Input id="email-subject" defaultValue="Your [ReportName] is ready" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-body">Default Email Body</Label>
                  <Input id="email-body" defaultValue="Your requested report is attached. Please let us know if you have any questions." />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="include-summary" defaultChecked />
                  <Label htmlFor="include-summary">Include report summary in email body</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="zip-attachments" />
                  <Label htmlFor="zip-attachments">ZIP attachments over 10MB</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Scheduling Defaults
                </CardTitle>
                <CardDescription>Configure default scheduling options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-frequency">Default Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="default-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-day">Default Day (for Weekly)</Label>
                  <Select defaultValue="monday">
                    <SelectTrigger id="default-day">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Monday</SelectItem>
                      <SelectItem value="tuesday">Tuesday</SelectItem>
                      <SelectItem value="wednesday">Wednesday</SelectItem>
                      <SelectItem value="thursday">Thursday</SelectItem>
                      <SelectItem value="friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-time">Default Time</Label>
                  <Input id="default-time" type="time" defaultValue="08:00" />
                </div>
                
                <Button onClick={handleSaveSettings}>Save Delivery Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="design" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Design & Branding</CardTitle>
                <CardDescription>Configure report appearance and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="primary-color" defaultValue="#3B82F6" />
                      <div className="w-6 h-6 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="accent-color" defaultValue="#10B981" />
                      <div className="w-6 h-6 rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo-url">Company Logo URL</Label>
                  <Input id="logo-url" defaultValue="https://example.com/logo.png" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="include-footer" defaultChecked />
                  <Label htmlFor="include-footer">Include footer with company info</Label>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Design Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Metrics Configuration
                </CardTitle>
                <CardDescription>Configure which metrics appear in reports by default</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Conversion Rate</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Cost per Acquisition (CPA)</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Return on Ad Spend (ROAS)</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Click-Through Rate (CTR)</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">Customer Lifetime Value (CLV)</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Custom Metric
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-date-range">Default Date Range</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="default-date-range">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                      <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="include-benchmarks" defaultChecked />
                  <Label htmlFor="include-benchmarks">Include industry benchmarks</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="show-growth" defaultChecked />
                  <Label htmlFor="show-growth">Show growth indicators</Label>
                </div>
                
                <Button onClick={handleSaveSettings}>Save Metrics Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
