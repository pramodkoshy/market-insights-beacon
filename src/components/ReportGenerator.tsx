import React, { useState } from 'react';
import { FileText, Calendar, Download, Mail, Clock, Plus, CheckCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ReportAgentIntegration } from './ReportAgentIntegration';

export function ReportGenerator() {
  const [reportType, setReportType] = useState("comprehensive");
  const [frequency, setFrequency] = useState("weekly");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [reportInsights, setReportInsights] = useState<any>(null);
  
  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Marketing Summary",
      type: "Summary",
      recipients: ["marketing@example.com", "leadership@example.com"],
      frequency: "Weekly",
      nextDelivery: "Apr 14, 2025",
      status: "Active"
    },
    {
      id: 2,
      name: "Campaign Performance Report",
      type: "Campaign",
      recipients: ["campaigns@example.com"],
      frequency: "Monthly",
      nextDelivery: "May 01, 2025",
      status: "Active"
    },
    {
      id: 3,
      name: "Quarterly ROI Analysis",
      type: "ROI",
      recipients: ["finance@example.com", "executive@example.com"],
      frequency: "Quarterly",
      nextDelivery: "Jun 30, 2025",
      status: "Active"
    },
    {
      id: 4,
      name: "Monthly Customer Insights",
      type: "Customer",
      recipients: ["customer-success@example.com"],
      frequency: "Monthly",
      nextDelivery: "May 01, 2025",
      status: "Paused"
    }
  ];
  
  const recentReports = [
    {
      id: 1,
      name: "Weekly Marketing Summary",
      type: "Summary",
      date: "Apr 07, 2025",
      downloads: 12
    },
    {
      id: 2,
      name: "Campaign Performance Report",
      type: "Campaign",
      date: "Apr 01, 2025",
      downloads: 8
    },
    {
      id: 3,
      name: "Monthly Customer Insights",
      type: "Customer",
      date: "Apr 01, 2025",
      downloads: 15
    },
    {
      id: 4,
      name: "Social Media Analytics",
      type: "Channel",
      date: "Mar 28, 2025",
      downloads: 6
    }
  ];
  
  const reportMetrics = [
    { id: "campaign-performance", label: "Campaign Performance" },
    { id: "roi-analysis", label: "ROI Analysis" },
    { id: "customer-insights", label: "Customer Insights" },
    { id: "channel-performance", label: "Channel Performance" },
    { id: "conversion-metrics", label: "Conversion Metrics" },
    { id: "engagement-metrics", label: "Engagement Metrics" },
  ];
  
  const handleGenerateReport = () => {
    const downloadReport = () => {
      const reportData = {
        type: reportType,
        date: new Date().toISOString(),
        metrics: reportMetrics.map(m => m.label),
        data: "Sample report data"
      };
      
      let fileContent, fileType, fileExtension;
      
      switch(reportFormat) {
        case "pdf":
          fileContent = "PDF content would be generated server-side";
          fileType = "application/pdf";
          fileExtension = "pdf";
          break;
        case "excel":
          fileContent = "Excel content would be generated server-side";
          fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          fileExtension = "xlsx";
          break;
        case "csv":
          fileContent = "Date,Metric,Value\n" + 
                        reportMetrics.map(m => `${new Date().toISOString()},${m.label},100`).join("\n");
          fileType = "text/csv";
          fileExtension = "csv";
          break;
        case "ppt":
          fileContent = "PowerPoint content would be generated server-side";
          fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
          fileExtension = "pptx";
          break;
        default:
          fileContent = JSON.stringify(reportData, null, 2);
          fileType = "application/json";
          fileExtension = "json";
      }
      
      if (reportFormat === "csv") {
        const blob = new Blob([fileContent], { type: fileType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}_report.${fileExtension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.log(`Downloading ${reportFormat} file: ${reportType}_report.${fileExtension}`);
        toast.info(`${reportFormat.toUpperCase()} reports require server-side generation. This is a demo.`);
      }
    };
    
    toast.success("Report generated successfully!", {
      description: "Your report is ready to download.",
      action: {
        label: "Download",
        onClick: downloadReport,
      },
    });
  };
  
  const handleScheduleReport = () => {
    toast.success("Report scheduled successfully!", {
      description: "Your report has been scheduled for regular delivery.",
    });
  };
  
  const handleInsightsGenerated = (insights: any) => {
    setReportInsights(insights);
  };
  
  const handleFormatChange = (value: string) => {
    setReportFormat(value);
  };
  
  const handleDownloadReport = (format: string) => {
    toast.success(`Downloading report in ${format.toUpperCase()} format`, {
      description: "Your download will begin shortly.",
    });
    
    setTimeout(() => {
      if (format === "csv") {
        const csvContent = "Date,Metric,Value\n2025-04-10,Conversions,156\n2025-04-10,Clicks,2403";
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${new Date().getTime()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        toast.info(`${format.toUpperCase()} reports require server-side generation. This is a demo.`);
      }
    }, 500);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Report Generator</h2>
          <p className="text-muted-foreground">
            Create, schedule, and manage marketing reports
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create Custom Report</CardTitle>
                <CardDescription>Configure your custom marketing report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select defaultValue={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                      <SelectItem value="campaign">Campaign Performance</SelectItem>
                      <SelectItem value="customer">Customer Insights</SelectItem>
                      <SelectItem value="roi">ROI Analysis</SelectItem>
                      <SelectItem value="channel">Channel Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select defaultValue="last-30-days">
                    <SelectTrigger id="date-range">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="format">Report Format</Label>
                  <Select defaultValue={reportFormat} onValueChange={handleFormatChange}>
                    <SelectTrigger id="format">
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
                  <Label>Include Metrics</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {reportMetrics.map((metric) => (
                      <div key={metric.id} className="flex items-center space-x-2">
                        <Checkbox id={metric.id} defaultChecked />
                        <Label htmlFor={metric.id}>{metric.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between space-x-2">
                <Button variant="outline">Preview</Button>
                <Button onClick={handleGenerateReport}>Generate Report</Button>
              </CardFooter>
            </Card>
            
            <ReportAgentIntegration 
              reportType={reportType}
              onInsightsGenerated={handleInsightsGenerated}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Schedule Reports</CardTitle>
              <CardDescription>Set up automated report delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input id="report-name" placeholder="Weekly Marketing Summary" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-report-type">Report Type</Label>
                <Select defaultValue="summary">
                  <SelectTrigger id="schedule-report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Marketing Summary</SelectItem>
                    <SelectItem value="campaign">Campaign Performance</SelectItem>
                    <SelectItem value="customer">Customer Insights</SelectItem>
                    <SelectItem value="roi">ROI Analysis</SelectItem>
                    <SelectItem value="channel">Channel Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select defaultValue={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
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
                <Label htmlFor="recipients">Recipients</Label>
                <Input id="recipients" placeholder="email@example.com, email2@example.com" />
              </div>
              
              {frequency === "weekly" && (
                <div className="space-y-2">
                  <Label htmlFor="day-of-week">Day of Week</Label>
                  <Select defaultValue="monday">
                    <SelectTrigger id="day-of-week">
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
              )}
              
              {(frequency === "monthly" || frequency === "quarterly") && (
                <div className="space-y-2">
                  <Label htmlFor="day-of-month">Day of Month</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="day-of-month">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st</SelectItem>
                      <SelectItem value="5">5th</SelectItem>
                      <SelectItem value="10">10th</SelectItem>
                      <SelectItem value="15">15th</SelectItem>
                      <SelectItem value="last">Last day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="schedule-format">Report Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="schedule-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleScheduleReport}>Schedule Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Reports set for automated delivery</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" /> New Schedule
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Report Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Recipients</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Frequency</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Next Delivery</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledReports.map((report) => (
                        <tr 
                          key={report.id} 
                          className="border-b transition-colors hover:bg-muted/50"
                        >
                          <td className="p-4 align-middle">{report.name}</td>
                          <td className="p-4 align-middle">{report.type}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <span>{report.recipients.length}</span>
                              <Button variant="ghost" size="sm">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{report.frequency}</td>
                          <td className="p-4 align-middle">{report.nextDelivery}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              report.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-500">
                                {report.status === 'Active' ? 'Pause' : 'Activate'}
                              </Button>
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
      
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>View and download previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <div className="flex items-center p-4">
                      <div className="mr-4 p-2 bg-primary/10 rounded-full">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium">{report.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span className="mr-3">{report.date}</span>
                          <Download className="h-3.5 w-3.5 mr-1" />
                          <span>{report.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Download <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownloadReport("pdf")}>
                              PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadReport("excel")}>
                              Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadReport("csv")}>
                              CSV
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
