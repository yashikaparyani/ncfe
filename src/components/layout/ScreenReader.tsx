'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, Play, Pause, Square, Minus, Plus, X } from 'lucide-react';
import './ScreenReader.css';

type Status = 'idle' | 'playing' | 'paused';

const MIN_RATE = 0.5;
const MAX_RATE = 2;
const RATE_STEP = 0.25;
const DEFAULT_RATE = 1;

/** Keep each utterance short — long ones get truncated by Chrome's ~15s bug. */
const CHUNK_MAX = 220;

/** Read the visible main content (or the current selection, if any). */
function getReadableText(): string {
  const selection = window.getSelection?.()?.toString().trim();
  if (selection) return selection;
  const main = document.getElementById('main-content');
  const raw = main?.innerText ?? document.body.innerText ?? '';
  return raw.replace(/\s+/g, ' ').trim();
}

/** Split text into sentence-ish chunks so pause/stop stay responsive. */
function chunkText(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  const chunks: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if (current.length + sentence.length > CHUNK_MAX) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export default function ScreenReader() {
  const pathname = usePathname();
  const [supported, setSupported] = useState(true);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [rate, setRate] = useState(DEFAULT_RATE);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Detect support and pick the best English (preferably Indian) voice.
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      // Prefer OFFLINE (localService) voices: they start instantly and — unlike
      // browser "online/natural" voices — never send page text to a third party
      // (privacy, see CLAUDE.md §2.8). Fall back to any English voice last.
      voiceRef.current =
        voices.find((v) => v.localService && v.lang === 'en-IN') ??
        voices.find((v) => v.localService && v.lang.startsWith('en')) ??
        voices.find((v) => v.lang === 'en-IN') ??
        voices.find((v) => v.lang.startsWith('en')) ??
        voices[0] ??
        null;
    };
    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
  }, []);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setStatus('idle');
  }, [supported]);

  // Stop reading whenever the route changes (the content is now different).
  useEffect(() => {
    stop();
  }, [pathname, stop]);

  // Cancel any in-flight speech when the component unmounts.
  useEffect(() => () => stop(), [stop]);

  // Chrome silently pauses long sessions after ~15s; nudge it to keep going.
  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(() => {
      const synth = window.speechSynthesis;
      if (synth.speaking && !synth.paused) synth.resume();
    }, 10000);
    return () => window.clearInterval(id);
  }, [status]);

  const play = useCallback(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    // Resume if we were paused.
    if (status === 'paused' && synth.paused) {
      synth.resume();
      setStatus('playing');
      return;
    }

    const text = getReadableText();
    if (!text) return;

    synth.cancel();
    const chunks = chunkText(text);
    chunks.forEach((chunk, i) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = rate;
      utterance.lang = 'en-IN';
      if (voiceRef.current) utterance.voice = voiceRef.current;
      if (i === chunks.length - 1) {
        utterance.onend = () => setStatus('idle');
      }
      synth.speak(utterance);
    });
    setStatus('playing');
  }, [supported, status, rate]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [supported]);

  // Apply a changed rate to the current reading (utterance rate is fixed once
  // queued, so restart from the top at the new speed).
  const changeRate = (next: number) => {
    const clamped = Math.min(MAX_RATE, Math.max(MIN_RATE, Math.round(next * 100) / 100));
    setRate(clamped);
    if (status === 'playing' || status === 'paused') {
      window.speechSynthesis.cancel();
      // Defer so cancel settles before the new queue starts.
      window.setTimeout(() => {
        const synth = window.speechSynthesis;
        const text = getReadableText();
        if (!text) return;
        chunkText(text).forEach((chunk, i, arr) => {
          const u = new SpeechSynthesisUtterance(chunk);
          u.rate = clamped;
          u.lang = 'en-IN';
          if (voiceRef.current) u.voice = voiceRef.current;
          if (i === arr.length - 1) u.onend = () => setStatus('idle');
          synth.speak(u);
        });
        setStatus('playing');
      }, 60);
    }
  };

  const toggleOpen = () => {
    setOpen((wasOpen) => {
      if (wasOpen) stop();
      return !wasOpen;
    });
  };

  return (
    <>
      <button
        type="button"
        className={`sr-trigger${open ? ' sr-trigger--active' : ''}`}
        aria-label="Screen reader — read this page aloud"
        aria-pressed={open}
        onClick={toggleOpen}
        disabled={!supported}
        title={supported ? 'Read this page aloud' : 'Screen reader is not supported in this browser'}
      >
        <Volume2 size={15} aria-hidden="true" />
        <span className="sr-trigger__label">Screen Reader Access</span>
      </button>

      {open && supported && (
        <div className="sr-widget" role="region" aria-label="Screen reader controls">
          <div className="sr-widget__header">
            <span className="sr-widget__title">
              <Volume2 size={16} aria-hidden="true" />
              Screen Reader
            </span>
            <button
              type="button"
              className="sr-widget__close"
              aria-label="Close screen reader"
              onClick={toggleOpen}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <p className="sr-widget__status" role="status" aria-live="polite">
            {status === 'playing'
              ? 'Reading the page…'
              : status === 'paused'
                ? 'Paused'
                : 'Select text to read it, or press Play for the whole page.'}
          </p>

          <div className="sr-widget__controls">
            {status === 'playing' ? (
              <button
                type="button"
                className="sr-btn"
                onClick={pause}
                aria-label="Pause reading"
              >
                <Pause size={18} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="sr-btn sr-btn--primary"
                onClick={play}
                aria-label={status === 'paused' ? 'Resume reading' : 'Play — read the page aloud'}
              >
                <Play size={18} aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              className="sr-btn"
              onClick={stop}
              aria-label="Stop reading"
              disabled={status === 'idle'}
            >
              <Square size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="sr-widget__rate" role="group" aria-label="Reading speed">
            <button
              type="button"
              className="sr-btn sr-btn--sm"
              onClick={() => changeRate(rate - RATE_STEP)}
              aria-label="Decrease reading speed"
              disabled={rate <= MIN_RATE}
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <span className="sr-widget__rate-value" aria-live="polite">
              Speed {rate.toFixed(2)}×
            </span>
            <button
              type="button"
              className="sr-btn sr-btn--sm"
              onClick={() => changeRate(rate + RATE_STEP)}
              aria-label="Increase reading speed"
              disabled={rate >= MAX_RATE}
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
