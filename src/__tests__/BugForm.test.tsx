import { render, screen, fireEvent } from '@testing-library/react';
import { BugForm } from '../components/BugForm';
import { describe, it, expect, vi } from 'vitest';

describe('BugForm', () => {
  it('renders all form fields', () => {
    render(<BugForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<BugForm onSubmit={() => {}} />);
    
    fireEvent.click(screen.getByText(/submit bug report/i));
    
    expect(await screen.findByText(/title must be at least 5 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/description must be at least 10 characters/i)).toBeInTheDocument();
  });

  it('calls onSubmit with form data when valid', async () => {
    const mockOnSubmit = vi.fn();
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Bug Title' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test bug description' },
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: 'high' },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'open' },
    });
    
    fireEvent.click(screen.getByText(/submit bug report/i));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Bug Title',
      description: 'This is a test bug description',
      priority: 'high',
      status: 'open',
    });
  });
});