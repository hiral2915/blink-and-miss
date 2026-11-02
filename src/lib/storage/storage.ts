import { UserPreferences, MatchCheckpoint } from '@/lib/types/cricket';

const PREFERENCES_KEY = 'blink_and_miss_preferences_v2';

export const DEFAULT_PREFERENCES: UserPreferences = {
  favouriteTeam: 'IND',
  favouritePlayer: 'Virat Kohli',
  summaryStyle: 'detailed',
  autoSpeech: false,
  speechRate: 1.0,
};

export function loadUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load preferences from localStorage', e);
    return DEFAULT_PREFERENCES;
  }
}

export function saveUserPreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save preferences to localStorage', e);
  }
}

export function loadCheckpoint(matchId: string = 'ind-aus-t20-final-2024'): MatchCheckpoint | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = `blink_checkpoint_${matchId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as MatchCheckpoint;
    if (parsed.matchId !== matchId || !Number.isInteger(parsed.ballIndex) || parsed.ballIndex < 0) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch (e) {
    console.error(`Failed to load checkpoint for ${matchId}`, e);
    return null;
  }
}

export function saveCheckpoint(checkpoint: MatchCheckpoint): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `blink_checkpoint_${checkpoint.matchId}`;
    localStorage.setItem(key, JSON.stringify(checkpoint));
  } catch (e) {
    console.error('Failed to save checkpoint to localStorage', e);
  }
}

export function clearCheckpoint(matchId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`blink_checkpoint_${matchId}`);
  } catch (e) {
    console.error(`Failed to clear checkpoint for ${matchId}`, e);
  }
}

export function loadMatchProgress(matchId: string, defaultBall: number = 36): number {
  if (typeof window === 'undefined') return defaultBall;
  try {
    const key = `blink_progress_${matchId}`;
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultBall;
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) ? defaultBall : parsed;
  } catch (e) {
    console.error(`Failed to load progress for ${matchId}`, e);
    return defaultBall;
  }
}

export function saveMatchProgress(matchId: string, ballIndex: number): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `blink_progress_${matchId}`;
    localStorage.setItem(key, ballIndex.toString());
  } catch (e) {
    console.error(`Failed to save progress for ${matchId}`, e);
  }
}
