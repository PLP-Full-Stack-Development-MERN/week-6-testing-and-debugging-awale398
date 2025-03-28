import { format } from 'date-fns';
import { Bug } from '../types/bug';
import { AlertCircle, Clock, Tag, Trash2 } from 'lucide-react';

interface BugListProps {
  bugs: Bug[];
  onStatusChange: (bugId: string, newStatus: Bug['status']) => void;
  onDelete: (bugId: string) => void;
}

export function BugList({ bugs, onStatusChange, onDelete }: BugListProps) {
  const getPriorityColor = (priority: Bug['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 ring-red-600/20';
      case 'high':
        return 'bg-orange-100 text-orange-800 ring-orange-600/20';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      case 'low':
        return 'bg-green-100 text-green-800 ring-green-600/20';
    }
  };

  const getStatusColor = (status: Bug['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 ring-blue-600/20';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800 ring-purple-600/20';
      case 'resolved':
        return 'bg-green-100 text-green-800 ring-green-600/20';
      case 'closed':
        return 'bg-gray-100 text-gray-800 ring-gray-600/20';
    }
  };

  return (
    <div className="space-y-4">
      {bugs.map((bug) => (
        <div
          key={bug.id}
          className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-xl p-6 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-gray-900">{bug.title}</h3>
              <p className="text-sm text-gray-600">{bug.description}</p>
            </div>
            <button
              onClick={() => onDelete(bug.id)}
              className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
              title="Delete bug"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span 
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getPriorityColor(bug.priority)}`}
            >
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              {bug.priority}
            </span>
            
            <select
              value={bug.status}
              onChange={(e) => onStatusChange(bug.id, e.target.value as Bug['status'])}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset cursor-pointer ${getStatusColor(bug.status)}`}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <span className="text-sm text-gray-500 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {format(bug.createdAt, 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}