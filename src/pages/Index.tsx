
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { AgentProvider } from '@/agents/AgentContext';
import { toast } from 'sonner';

const Index = () => {
  return (
    <AgentProvider>
      <Dashboard />
    </AgentProvider>
  );
};

export default Index;
