import { NextRequest, NextResponse } from 'next/server';
import { generateAiMatchInsight, generateAiCatchUpSummary } from '@/lib/ai/gemini';
import { CurrentMatchState, UserPreferences, CatchUpData } from '@/lib/types/cricket';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { matchState, preferences, catchUpData } = body as {
      matchState: CurrentMatchState;
      preferences: UserPreferences;
      catchUpData?: CatchUpData;
    };

    if (catchUpData) {
      const summary = await generateAiCatchUpSummary(catchUpData, preferences);
      return NextResponse.json(summary);
    }

    if (!matchState) {
      return NextResponse.json({ error: 'Missing match state' }, { status: 400 });
    }

    const insight = await generateAiMatchInsight(matchState, preferences);
    return NextResponse.json(insight);
  } catch (error) {
    console.error('API /api/insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights', details: String(error) },
      { status: 500 }
    );
  }
}
