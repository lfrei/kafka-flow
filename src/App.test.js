import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeAll(() => {
    window.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
    }
})

it('renders without crashing', () => {
    render(<App />);
});

it('renders title', () => {
    render(<App />);

    expect(screen.getByText('Kafka Flow')).toBeInTheDocument();
});

it('renders example topology', () => {
    render(<App />);

    //topology
    expect(screen.getByText('input')).toHaveClass('topic');
    expect(screen.getByText('KSTREAM-SOURCE-0000000000')).toHaveClass('processor');
    expect(screen.getByText('KSTREAM-FILTER-0000000001')).toHaveClass('processor');
    expect(screen.getByText('output')).toHaveClass('topic');
});

it('renders compacted topology', async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('compact-topology'));
    await screen.getByTestId('expand-topology');

    //topics shown
    expect(screen.queryByText('input')).toBeInTheDocument();
    expect(screen.queryByText('output')).toBeInTheDocument();

    //processors removed
    expect(screen.queryByText('KSTREAM-SOURCE-0000000000')).not.toBeInTheDocument();
    expect(screen.queryByText('KSTREAM-FILTER-0000000001')).not.toBeInTheDocument();
});

