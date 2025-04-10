
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { AgentProvider } from '@/agents/AgentContext';

const Index = () => {
  return (
    <AgentProvider>
      <Dashboard />
    </AgentProvider>
  );
};

export default Index;
