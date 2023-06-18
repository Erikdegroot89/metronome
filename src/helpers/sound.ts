const playOscSound = (audioContext: AudioContext, frequency: number, length: number) => {
        const { currentTime, destination } = audioContext;
        const gainNode = audioContext.createGain();
        const oscillator = audioContext.createOscillator();

        gainNode.connect(destination);
        oscillator.connect(gainNode).connect(destination);

        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(1, currentTime + length * 0.1);
        gainNode.gain.setValueAtTime(1, currentTime + length * 0.3);
        gainNode.gain.linearRampToValueAtTime(0, currentTime + length * 0.9);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, currentTime);
        oscillator.start();
        oscillator.stop(currentTime + length);
}
    
export { playOscSound };