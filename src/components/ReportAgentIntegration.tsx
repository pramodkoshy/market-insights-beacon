
import React from 'react';
import { useAgentData } from '@/agents/hooks/useAgentData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Download } from 'lucide-react';
import { toast } from "sonner";

interface ReportAgentIntegrationProps {
  reportType: string;
  onInsightsGenerated?: (insights: any) => void;
}

export function ReportAgentIntegration({ reportType, onInsightsGenerated }: ReportAgentIntegrationProps) {
  // Map report types to agent types
  const agentTypeMap: Record<string, string> = {
    'comprehensive': 'marketTrends',
    'campaign': 'campaignPerformance',
    'customer': 'customerSegmentation',
    'roi': 'roiAnalysis',
    'channel': 'marketTrends',
    'summary': 'marketTrends',
  };

  const agentType = agentTypeMap[reportType] || 'marketTrends';
  
  // Use agent data for insights with custom parameters for reporting
  const { 
    data: agentData, 
    loading,
    refreshData,
    error,
    lastUpdate
  } = useAgentData(agentType, { 
    reportType,
    reportId: `report-${Date.now()}`,
    reportName: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`
  });

  React.useEffect(() => {
    if (agentData && onInsightsGenerated) {
      onInsightsGenerated(agentData);
    }
  }, [agentData, onInsightsGenerated]);

  const handleRefreshInsights = () => {
    refreshData();
    toast.info("Generating new insights...", {
      description: "This may take a few moments.",
    });
  };

  const handleDownloadReport = () => {
    if (!agentData) {
      toast.error("No report data available");
      return;
    }
    
    // Create a downloadable version of the report
    const reportData = {
      ...agentData,
      generatedAt: new Date().toISOString(),
      reportType
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}-report-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Report downloaded successfully!");
  };

  return (
    <Card className="border-dashed bg-muted/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <RefreshCw className="h-4 w-4 mr-2 text-primary" />
          AI-Generated Insights
        </CardTitle>
        <CardDescription>
          {lastUpdate ? `Last updated: ${new Date(lastUpdate).toLocaleString()}` : 'No data yet'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 text-red-500">
            Error loading insights: {error}
          </div>
        ) : loading ? (
          <div className="p-4 text-center">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
            <p>Generating insights...</p>
          </div>
        ) : agentData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {agentData.insights && (
                <div>
                  <h4 className="font-medium mb-2">Key Insights:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {agentData.insights.map((insight: string, i: number) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}
              {agentData.recommendations && (
                <div>
                  <h4 className="font-medium mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {agentData.recommendations.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadReport}
                className="flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleRefreshInsights}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Insights</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p>No insights available. Click Refresh to generate.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshInsights}
              className="mt-2"
            >
              Generate Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
