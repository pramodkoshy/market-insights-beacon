
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Settings, PieChart, Users, BarChart3, FileText, Bot } from 'lucide-react';

export function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="border-b sticky top-0 z-50 w-full bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 md:mr-6 flex items-center gap-2">
          <PieChart className="h-6 w-6" />
          <span className="font-bold text-xl hidden md:inline-block">Marketing Analytics</span>
        </div>
        
        <Menubar className="border-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className={`px-3 ${isActive('/') ? 'font-medium text-primary' : ''}`} onClick={() => navigate('/')}>
              Overview
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className={`px-3 ${isActive('/campaigns') ? 'font-medium text-primary' : ''}`} onClick={() => navigate('/campaigns')}>
              Campaigns
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className={`px-3 ${isActive('/customers') ? 'font-medium text-primary' : ''}`} onClick={() => navigate('/customers')}>
              Customers
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className={`px-3 ${isActive('/roi') ? 'font-medium text-primary' : ''}`} onClick={() => navigate('/roi')}>
              ROI Analysis
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className={`px-3 ${isActive('/reports') ? 'font-medium text-primary' : ''}`} onClick={() => navigate('/reports')}>
              Reports
            </MenubarTrigger>
          </MenubarMenu>
          
          <MenubarMenu>
            <MenubarTrigger className={`px-3 ${
              isActive('/agent-config') || 
              isActive('/entities-config') || 
              isActive('/reporting-config') || 
              isActive('/system-config') ? 'font-medium text-primary' : ''
            }`}>
              <Settings className="h-4 w-4 mr-1" />
              Configuration
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => navigate('/agent-config')}>
                <Bot className="h-4 w-4 mr-2" />
                Agent Configuration
              </MenubarItem>
              <MenubarItem onClick={() => navigate('/entities-config')}>
                <Users className="h-4 w-4 mr-2" />
                Entities Configuration
              </MenubarItem>
              <MenubarItem onClick={() => navigate('/reporting-config')}>
                <FileText className="h-4 w-4 mr-2" />
                Reporting Configuration
              </MenubarItem>
              <MenubarItem onClick={() => navigate('/system-config')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                System Configuration
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        
        <div className="ml-auto flex items-center gap-2">
          {/* Add any additional elements you want on the right side of the top navigation */}
        </div>
      </div>
    </div>
  );
}
