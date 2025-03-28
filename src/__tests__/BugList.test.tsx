import { render, screen, fireEvent } from '@testing-library/react';
import { BugList } from '../components/BugList';
import { describe, it, expect, vi } from 'vitest';
import { Bug } from '../types/bug';

const mockBugs: Bug[] = [
  {
    id: '1',
    title: 'Test Bug',
    description: 'Test Description',
    priority: 'high',
    status: 'open',
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-02-28'),
  },
];

describe('BugList', () => {
  it('renders bug items correctly', () => {
    render(
      <BugList
        bugs={mockBugs}
        onStatusChange={() => {}}
        onDelete={() => {}}
      />
    );
    
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('calls onStatusChange when status is updated', () => {
    const mockOnStatusChange = vi.fn();
    render(
      <BugList
        bugs={mockBugs}
        onStatusChange={mockOnStatusChange}
        onDelete={() => {}}
      />
    );
    
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'in-progress' },
    });
    
    expect(mockOnStatusChange).toHaveBeenCalledWith('1', 'in-progress');
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(
      <BugList
        bugs={mockBugs}
        onStatusChange={() => {}}
        onDelete={mockOnDelete}
      />
    );
    
    fireEvent.click(screen.getByText('Delete'));
    
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });
});