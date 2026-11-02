import { NextRequest, NextResponse } from 'next/server';
import { answerFanQuestion } from '@/lib/ai/gemini';
import { CurrentMatchState, UserPreferences } from '@/lib/types/cricket';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, matchState, preferences } = body as {
      question: string;
      matchState: CurrentMatchState;
      preferences: UserPreferences;
    };

    if (!question || question.trim() === '') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (!matchState) {
      return NextResponse.json({ error: 'Missing match state' }, { status: 400 });
    }

    const answer = await answerFanQuestion(question, matchState, preferences);
    return NextResponse.json(answer);
  } catch (error) {
    console.error('API /api/ask error:', error);
    return NextResponse.json(
      { error: 'Failed to answer question', details: String(error) },
      { status: 500 }
    );
  }
}
