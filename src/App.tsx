import React, { useState } from 'react';
import { Bug } from './types/bug';
import { BugForm } from './components/BugForm';
import { BugList } from './components/BugList';
import { Import as BugReport } from 'lucide-react';

function App() {
  const [bugs, setBugs] = useState<Bug[]>([]);

  const handleSubmit = (data: Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBug: Bug = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBugs((prev) => [...prev, newBug]);
  };

  const handleStatusChange = (bugId: string, newStatus: Bug['status']) => {
    setBugs((prev) =>
      prev.map((bug) =>
        bug.id === bugId
          ? { ...bug, status: newStatus, updatedAt: new Date() }
          : bug
      )
    );
  };

  const handleDelete = (bugId: string) => {
    setBugs((prev) => prev.filter((bug) => bug.id !== bugId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-600 rounded-lg shadow-lg">
              <BugReport className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bug Tracker</h1>
              <p className="text-gray-600 mt-1">Track and manage project issues efficiently</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Report New Bug</h2>
              <p className="text-indigo-100 text-sm">Submit a new bug report</p>
            </div>
            <div className="p-6">
              <BugForm onSubmit={handleSubmit} />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-xl rounded-2xl">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Bug List</h2>
              <p className="text-indigo-100 text-sm">View and manage reported bugs</p>
            </div>
            <div className="p-6">
              <BugList
                bugs={bugs}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
              {bugs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No bugs reported yet.</p>
                  <p className="text-gray-400 text-sm">Submit a new bug report to get started.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;