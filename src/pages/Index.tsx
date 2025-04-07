
import React from 'react';
import { 
  BarChart, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  FileText, 
  Settings, 
  HelpCircle, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Dashboard from '@/components/Dashboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { AgentProvider } from '@/agents/AgentContext';
import { AgentStatusIndicator } from '@/components/AgentStatusIndicator';

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Campaigns', icon: BarChart, active: false },
    { label: 'Customers', icon: Users, active: false },
    { label: 'ROI Analysis', icon: TrendingUp, active: false },
    { label: 'Reports', icon: FileText, active: false },
  ];

  return (
    <AgentProvider>
      <div className="min-h-screen flex bg-background">
        {/* Sidebar */}
        <div 
          className={`bg-sidebar fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <BarChart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-sidebar-foreground">MarketInsights</span>
              </div>
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            <Separator className="bg-sidebar-border" />
            
            <div className="flex flex-col flex-1 p-4 space-y-1">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`justify-start ${
                    item.active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground'
                  }`}
                >
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            <div className="p-4 mt-auto">
              <AgentStatusIndicator />
            </div>
            
            <div className="p-4 space-y-1">
              <Button variant="ghost" className="justify-start w-full text-sidebar-foreground">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
              <Button variant="ghost" className="justify-start w-full text-sidebar-foreground">
                <HelpCircle className="mr-2 h-5 w-5" />
                Help & Resources
              </Button>
            </div>
            
            <Separator className="bg-sidebar-border" />
            
            <div className="p-4">
              <Card className="bg-sidebar-accent text-sidebar-accent-foreground">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-sidebar-accent-foreground h-8 w-8 flex items-center justify-center">
                      <span className="text-sidebar-accent text-xs font-bold">JS</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Smith</span>
                      <span className="text-xs">Marketing Admin</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Mobile Sidebar Toggle */}
        {isMobile && !sidebarOpen && (
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed top-4 left-4 z-40 md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {/* Main Content */}
        <div className="flex-1">
          <Dashboard />
        </div>
      </div>
    </AgentProvider>
  );
};

export default Index;
