import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Metronome from './metronome';

describe('Metronome', () => {
  it('should render Metronome component', () => {
    const { getByText, getByLabelText } = render(<Metronome />);
    
    // Assert the presence of the elements in the component
    expect(getByText('Metronome')).toBeInTheDocument();
    expect(getByText('BPM: 120')).toBeInTheDocument();
    expect(getByLabelText('BPM')).toBeInTheDocument();
    expect(getByText('Start')).toBeInTheDocument();
  });

  it('should start and stop the metronome on button click', () => {
    const { getByText } = render(<Metronome />);
    const startButton = getByText('Start');
    
    // Click the start button and verify the metronome starts
    fireEvent.click(startButton);
    expect(startButton.textContent).toBe('Stop');
    
    // Click the stop button and verify the metronome stops
    fireEvent.click(startButton);
    expect(startButton.textContent).toBe('Start');
  });

  it('should update the BPM value on input change', () => {
    const { getByLabelText } = render(<Metronome />);
    const bpmInput = getByLabelText('BPM');
    
    // Change the BPM input value and verify it updates
    fireEvent.change(bpmInput, { target: { value: '140' } });
    expect(bpmInput.value).toBe('140');
  });
});
