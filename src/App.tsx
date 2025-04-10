
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AgentConfigPage } from "./components/AgentConfigPage";
import { EntitiesConfigPage } from "./components/EntitiesConfigPage";
import { ReportingConfigPage } from "./components/ReportingConfigPage";
import { SystemConfigPage } from "./components/SystemConfigPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<Index />} />
          <Route path="/customers" element={<Index />} />
          <Route path="/roi" element={<Index />} />
          <Route path="/reports" element={<Index />} />
          
          {/* Configuration routes */}
          <Route path="/agent-config" element={<AgentConfigPage />} />
          <Route path="/entities-config" element={<EntitiesConfigPage />} />
          <Route path="/reporting-config" element={<ReportingConfigPage />} />
          <Route path="/system-config" element={<SystemConfigPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
