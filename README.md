# 🏏 Blink & Miss — AI-Powered Live Cricket Companion

**Blink & Miss** is a high-performance, sports-tech web companion designed to keep cricket fans in sync with thrilling match events, turning points, and favourite players without requiring continuous screen watching.

Built from scratch using **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide React**, and **Gemini AI**.

---

## ⚡ Key Highlights & Features

1. **Live Match Dashboard (India vs Australia T20 Chase)**
   - Australia 1st Innings: `188/6 (20.0 ov)`
   - India 2nd Innings Target: `189`
   - Real-time Scoreboard: Runs, wickets, overs, balls remaining, runs needed, Current Run Rate (CRR), Required Run Rate (RRR), and live win probability bar.
   - Crease Status: Real-time striker & non-striker tracking (runs, balls, 4s, 6s, strike rate, on-strike indicator) and active bowler spell (overs, maidens, runs, wickets, economy).

2. **Deterministic Match Simulator Engine**
   - 20 complete overs (120 deliveries) with commentary, bowler speeds (km/h), and turning points.
   - Interactive simulation controls: `Next Ball`, `Next Over`, `Auto Simulate` (timer-driven), `Reset Chase`, and an interactive scrubber slider.
   - Quick scenarios: Powerplay (`6.0`), Midway (`10.0`), Turning Point (`13.0`), Death Overs (`16.0`), Final Over Thriller (`19.0`).

3. **Intelligent "Catch Me Up" (Signature Feature)**
   - Click **Save Checkpoint** at any point in the match (persisted to `localStorage`).
   - Simulate forward by multiple deliveries or overs.
   - Click **Catch Me Up** to generate a focused delta summary covering **only** what happened since your checkpoint:
     - Exact overs missed, runs added, and wickets lost.
     - Boundaries (4s and 6s) hit during your absence.
     - Specific wickets fallen (batter, bowler, dismissal method).
     - Impact on your selected favourite player.
     - AI narrative momentum breakdown.

4. **Gemini AI Intelligence & Secure Architecture**
   - Secure server-side API routes (`/api/insights` and `/api/ask`) that never expose API keys to the browser.
   - High-temperature-controlled prompts enforcing **strict interpretation of verified match data** without inventing hallucinated scores.
   - **Seamless AI Demo Fallback**: Functions out of the box with realistic context-aware cricket analysis even if no API key is provided, clearly badged for transparency.

5. **Natural Language "Ask AI" Cricket Assistant**
   - Interactive Q&A chat for questions like:
     - *"Why did India's momentum change?"*
     - *"What happened in the last three overs?"*
     - *"How is Virat Kohli performing today?"*
     - *"What does Australia need to do to win?"*
   - Pre-configured quick-prompt pills.

6. **Browser Speech Synthesis (Audio)**
   - Built-in text-to-speech audio reader with clean Markdown-to-speech conversion.
   - Floating audio visualizer bar with animated sound waves, Play, Pause, Resume, and Stop controls.
   - Adjustable speech rate (`0.8x` to `1.3x`) and optional auto-read preference.

7. **Fan Personalisation**
   - Choose favourite team (`IND` or `AUS`).
   - Choose favourite player (e.g., Virat Kohli, Rohit Sharma, Suryakumar Yadav, Hardik Pandya, Pat Cummins, etc.).
   - Choose summary style (`Concise` vs. `Detailed`).
   - Automatically saved and synced via browser `localStorage`.

---

## 🚀 Quick Start Guide

### 1. Navigate to Project
```bash
cd C:\Users\hiral\.gemini\antigravity\scratch\blink-and-miss
```

### 2. Configure Gemini API Key (Optional)
The companion works out of the box in **AI Demo Mode**. To connect live Gemini API inference:
1. Open `.env.local`
2. Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Production Build
```bash
npm run build
npm run start
```

---

## 🧪 Acceptance Testing Walkthrough

Follow these steps to test all core criteria:

1. **Open Dashboard**:
   - Navigate to `http://localhost:3000`. Observe the dark charcoal (`#0B0F14`) theme with electric lime (`#C6F36B`) accents, live score, win probability bar, and ball chips.
2. **Select Favourite Team & Player**:
   - Click the gear icon in the top header.
   - Choose **India** and **Virat Kohli** (or your preference), select **Detailed** or **Concise**, and click **Save Preferences**.
   - Note the favourite player badges (`★ Fav`) highlighting Kohli at the crease.
3. **Save a Checkpoint**:
   - In the **Match Simulator Engine** card, click **Save Checkpoint**.
   - The header displays `Checkpoint: Ov 6.0 (54/1)`.
4. **Simulate Multiple Overs**:
   - Click **Next Over** multiple times or jump to `Turning Point (13.0)`.
   - The match advances: Suryakumar Yadav arrives, Starc concedes 18 runs, score updates to `122/2`.
5. **Click "Catch Me Up"**:
   - The header and Catch Me Up card flag `+7.0 ov missed`.
   - Click **Generate Catch-Up Summary**.
   - Review the summary: `+68 runs`, `1 wicket (Rishabh Pant)`, `7 fours`, `2 sixes`, and Virat Kohli's progress.
6. **Ask AI**:
   - Scroll to **Ask AI Companion**.
   - Click the prompt *"Why did India's momentum change?"* or type your own question.
   - The AI answers based on the 13th over turning point and Zampa's wicket.
7. **Listen Aloud (Audio)**:
   - Click **Listen Aloud** on the Catch Me Up briefing, AI Insights card, or Ask AI answer.
   - Listen as Speech Synthesis reads the analysis aloud, accompanied by the floating audio visualizer bar.
