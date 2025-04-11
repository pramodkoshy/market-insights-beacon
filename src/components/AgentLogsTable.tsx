
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AgentLog {
  id: string;
  timestamp: string;
  agentType: string;
  status: 'success' | 'warning' | 'error';
  message: string;
  duration: number;
}

interface AgentLogsTableProps {
  logs: AgentLog[];
  limit?: number;
}

export function AgentLogsTable({ logs, limit = 5 }: AgentLogsTableProps) {
  const displayLogs = limit ? logs.slice(0, limit) : logs;
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Agent Type</TableHead>
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
                <TableCell>
                  <span 
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      log.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : log.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {log.status}
                  </span>
                </TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.duration}ms</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No logs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
