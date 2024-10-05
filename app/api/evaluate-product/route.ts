import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { evaluateLiability } from '@/lib/analysis/evaluateLiability';
import { evaluateComplexity } from '@/lib/analysis/evaluateComplexity';
import { evaluateSeasonality } from '@/lib/analysis/evaluateSeasonality';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { productName } = await req.json();
  console.log('API received product name:', productName);

  if (!productName) {
    return NextResponse.json({ message: 'Product name is required' }, { status: 400 });
  }

  try {
    const liabilityScore = await evaluateLiability(openai, productName);
    const complexityScore = await evaluateComplexity(openai, productName);
    const seasonalityScore = await evaluateSeasonality(openai, productName);
    console.log('Liability evaluation result:', liabilityScore);
    console.log('Complexity evaluation result:', complexityScore);
    console.log('Seasonality evaluation result:', seasonalityScore);
    return NextResponse.json({ liabilityScore, complexityScore, seasonalityScore });
  } catch (error) {
    console.error('Error evaluating product:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}