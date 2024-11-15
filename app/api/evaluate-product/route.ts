import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { evaluateLiability } from '@/lib/analysis/evaluateLiability';
import { evaluateComplexity } from '@/lib/analysis/evaluateComplexity';
import { evaluateSeasonality } from '@/lib/analysis/evaluateSeasonality';
import { fetchGoogleTrendsData } from '@/lib/analysis/fetchGoogleTrendsData';
import { fetchAmazonData } from '@/lib/analysis/fetchAmazonData';
import { evaluateRevenue } from '@/lib/analysis/evaluateAmazonMetrics';

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
    const amazonData = await fetchAmazonData(productName);
    const liabilityScore = await evaluateLiability(openai, productName);
    const complexityScore = await evaluateComplexity(openai, productName);
    const seasonalityScore = await evaluateSeasonality(openai, productName);
    const googleTrendsData = await fetchGoogleTrendsData(productName);

    // After fetching Amazon data, calculate revenue per month
    const revenuePerMonth = amazonData.unitsSoldPerMonth * amazonData.pricing;

    // Then calculate revenue evaluation
    const revenueEvaluation = evaluateRevenue(revenuePerMonth);

    console.log('Amazon data:', amazonData);
    console.log('Liability evaluation result:', liabilityScore);
    console.log('Complexity evaluation result:', complexityScore);
    console.log('Seasonality evaluation result:', seasonalityScore);
    console.log('Google Trends data:', googleTrendsData);

    return NextResponse.json({ 
      amazonData,
      liabilityScore, 
      complexityScore, 
      seasonalityScore, 
      googleTrendsData,
      derivedMetrics: {
        revenuePerMonth,
        revenueEvaluation
      }
    });
  } catch (error) {
    console.error('Error evaluating product:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
