
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AgentLog {
  id: string;
  timestamp: string;
  agentType: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  duration: number;
  workflowId?: string;
  workflowName?: string;
  channel?: string;
}

interface AgentLogsTableProps {
  logs: AgentLog[];
  limit?: number;
  showWorkflow?: boolean;
}

export function AgentLogsTable({ logs, limit = 5, showWorkflow = false }: AgentLogsTableProps) {
  const displayLogs = limit ? logs.slice(0, limit) : logs;
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Agent Type</TableHead>
            {showWorkflow && <TableHead>Workflow</TableHead>}
            {showWorkflow && <TableHead>Channel</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayLogs.length > 0 ? (
            displayLogs.map(log => (
              <TableRow key={log.id}>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.agentType}</TableCell>
                {showWorkflow && <TableCell>{log.workflowName || '-'}</TableCell>}
                {showWorkflow && <TableCell>{log.channel || '-'}</TableCell>}
                <TableCell>
                  <Badge 
                    variant={
                      log.status === 'success' 
                        ? 'success' 
                        : log.status === 'warning'
                          ? 'warning'
                          : 'destructive'
                    }
                    className="capitalize"
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.duration}ms</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={showWorkflow ? 7 : 5} className="text-center py-4 text-muted-foreground">
                No logs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
