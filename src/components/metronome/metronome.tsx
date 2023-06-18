import React, { useState, useEffect, useRef } from 'react';
import './metronome.css';
import { playOscSound } from '../../helpers/sound';

const defaultBPM = 120;
const minBpm = 1;
const maxBpm = 300;
const beatsPerMeasure = 4;

const Metronome: React.FC = () => {
    const audioContext = new AudioContext();
    
    const validateBpm = (value: number) => {
        return Math.max(minBpm, Math.min(maxBpm, value));
    }

    const validateMeasure = (value: number) => {
        return Math.max(2, Math.min(16, value));
    }

    const [isRunning, setIsRunning] = useState(false);
    const [bpm, setBpm] = useState(defaultBPM);
    const [measure, setMeasure] = useState(beatsPerMeasure);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [currentBeat, setCurrentBeat] = useState(0);
    const workerRef = useRef<Worker | null>(null);

    const startMetronome = () => {
        if (workerRef.current || isRunning) {
            return
        }
    
        const worker = new Worker(new URL('./metronome.worker.js', import.meta.url) );
        workerRef.current = worker;

        const id = setInterval(() => {
            // setCurrentBeat((prevBeat) => (prevBeat + 1) % 4);
        }, (60 / bpm) * 1000);

        setIntervalId(id);
        setIsRunning(true);

        worker.onmessage = (e) => {
            const { beat } = e.data;
            setCurrentBeat(beat);
            if (beat === 0) {
                // playSound('met_hi');
                playOscSound(audioContext, 880, 0.11);
            } else {
                // playSound('met_lo');
                playOscSound(audioContext, 440, 0.1);
            }
        };

        worker.postMessage({ bpm, measure });
    
    };

    const stopMetronome = () => {
        if (!intervalId) {
            return
        }

        clearInterval(intervalId);
        setIntervalId(null);
        setCurrentBeat(0);
        setIsRunning(false);

        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            stopMetronome();
        };
    }, []);

    useEffect(() => {
        if (isRunning && workerRef.current) {
            workerRef.current.postMessage({ bpm });
        }
    }, [bpm]);

    return (
        <div className='bg-gray-100 p-4 rounded'>
            <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl'>Metronome</h1>
            <div className="grid gap-6 mb-6 md:grid-cols-4">
                <span className='p-2'>BPM: {bpm}</span>
                
                <input
                    className='block mb-2 text-sm font-medium disabled:bg-gray-200 p-2'
                    type="number"
                    value={bpm}
                    min="10"
                    disabled={isRunning}
                    onChange={(e) => setBpm(validateBpm(parseInt(e.target.value)))}
                />
                <span className='p-2'>Measure: {measure}</span>
                <input
                    className='block mb-2 text-sm font-medium disabled:bg-gray-200 p-2'
                    type="number"
                    value={measure}
                    min="2"
                    disabled={isRunning}
                    onChange={(e) => setMeasure(validateMeasure(parseInt(e.target.value)))}
                />
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-20 center" onClick={isRunning ? stopMetronome : startMetronome}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
            </div>
            <div className="visual-indicator grid gap-6 mb-6 grid-flow-row ">
                {Array.from(Array(measure).keys()).map((beat) => (
                    <div
                        key={beat}
                        className={`beat-indicator inline-block border-2 bg-yellow-900 border-gray-200 w-11 h-11 rounded-full items-center text-white-800 py-2 px-4 font-bold ${currentBeat === beat ? 'active' : ''}`}
                    >{(beat+1)}</div>
                ))}
            </div>
        </div>
    
    );
};

export default Metronome;
