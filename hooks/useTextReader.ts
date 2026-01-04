import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTextReaderReturn {
    speak: (text: string, onEnd?: () => void) => void;
    pause: () => void;
    resume: () => void;
    cancel: () => void;
    isSpeaking: boolean;
    isPaused: boolean;
    isSupported: boolean;
}

export const useTextReader = (): UseTextReaderReturn => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const synth = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            synth.current = window.speechSynthesis;
            setIsSupported(true);
        }
    }, []);

    const cancel = useCallback(() => {
        if (synth.current) {
            synth.current.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }, []);

    const speak = useCallback((text: string, onEnd?: () => void) => {
        if (!synth.current) return;

        // Cancel any current speech
        synth.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        // Select a British voice if available
        const voices = synth.current.getVoices();

        // Priority: 
        // 1. "Google UK English Female" or similar specific high quality ones
        // 2. Any voice with "GB", "UK", or "British" in the name
        // 3. Any voice with "en-GB" lang
        // 4. Fallback to default

        const preferredVoice = voices.find(v =>
            v.name.includes('Google UK English') ||
            v.name.includes('Great Britain') ||
            v.lang === 'en-GB'
        ) || voices.find(v => v.lang.includes('en')) || voices[0];

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // Adjust rate/pitch for "news anchor" or "AI" feel
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            if (onEnd) {
                onEnd();
            }
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error', event);
            setIsSpeaking(false);
            setIsPaused(false);
        };

        synth.current.speak(utterance);
    }, []);

    const pause = useCallback(() => {
        if (synth.current && !synth.current.paused && synth.current.speaking) {
            synth.current.pause();
            setIsPaused(true);
        }
    }, []);

    const resume = useCallback(() => {
        if (synth.current && synth.current.paused) {
            synth.current.resume();
            setIsPaused(false);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (synth.current) {
                synth.current.cancel();
            }
        };
    }, []);

    return {
        speak,
        pause,
        resume,
        cancel,
        isSpeaking,
        isPaused,
        isSupported
    };
};
