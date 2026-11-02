export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
}

export class CricketAudioAnnouncer {
  private static instance: CricketAudioAnnouncer;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onStateChangeCallback: ((state: SpeechState) => void) | null = null;

  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
  };

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public static getInstance(): CricketAudioAnnouncer {
    if (!CricketAudioAnnouncer.instance) {
      CricketAudioAnnouncer.instance = new CricketAudioAnnouncer();
    }
    return CricketAudioAnnouncer.instance;
  }

  public onStateChange(callback: (state: SpeechState) => void) {
    this.onStateChangeCallback = callback;
  }

  private updateState(partial: Partial<SpeechState>) {
    this.state = { ...this.state, ...partial };
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(this.state);
    }
  }

  public cleanMarkdownForSpeech(text: string): string {
    return text
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italics
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
      .replace(/[-*+]\s+/g, '. ') // Lists to pauses
      .replace(/⚡|🎯|🌟|🔥|🏏|🏆/g, '') // Emojis
      .replace(/➔/g, ' to ')
      .replace(/\n+/g, '. ') // Newlines to sentences
      .trim();
  }

  public speak(rawText: string, rate: number = 1.0) {
    if (!this.synth) return;

    this.stop();

    const cleanText = this.cleanMarkdownForSpeech(rawText);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick best natural sounding English voice
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Cricket') || v.lang.startsWith('en')) &&
        (v.lang === 'en-GB' || v.lang === 'en-IN' || v.lang === 'en-US' || v.lang === 'en-AU')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.updateState({ isPlaying: true, isPaused: false, currentText: cleanText });
    };

    utterance.onend = () => {
      this.updateState({ isPlaying: false, isPaused: false, currentText: '' });
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.updateState({ isPlaying: false, isPaused: false, currentText: '' });
      this.currentUtterance = null;
    };

    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.updateState({ isPaused: true });
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.updateState({ isPaused: false });
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.updateState({ isPlaying: false, isPaused: false, currentText: '' });
      this.currentUtterance = null;
    }
  }

  public togglePlay(text: string, rate: number = 1.0) {
    if (this.state.isPlaying) {
      if (this.state.isPaused) {
        this.resume();
      } else {
        this.pause();
      }
    } else {
      this.speak(text, rate);
    }
  }
}
