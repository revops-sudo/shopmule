// lib/analysis/index.ts

import { prisma } from '@/lib/prisma';
import { OpenAI } from 'openai';

import { fetchAmazonData } from './fetchAmazonData';
import { fetchGoogleTrendsData } from './fetchGoogleTrendsData';
import { calculateDerivedMetrics } from './calculateDerivedMetrics';
import { evaluateLiability } from './evaluateLiability';
import { evaluateComplexity } from './evaluateComplexity';
import { evaluateSeasonality } from './evaluateSeasonality';
import { calculateMuleScore } from './calculateMuleScore';
import { AnalysisResultData } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function performAnalysis(taskId: string, productName: string) {
  try {
    // Fetch data from Amazon
    const amazonData = await fetchAmazonData(productName);

    // Fetch data from Google Trends
    const googleTrendsData = await fetchGoogleTrendsData(productName);

    // Calculate derived metrics
    const derivedMetrics = calculateDerivedMetrics(amazonData);

    // Use GPT-4 for contextual evaluations
    const liability = await evaluateLiability(openai, productName);
    const complexity = await evaluateComplexity(openai, productName);
    const seasonality = await evaluateSeasonality(openai, productName);

    // Combine all criteria
    const criteria = {
      ...amazonData,
      ...googleTrendsData,
      ...derivedMetrics,
      liability,
      complexity,
      seasonality,
    };

    // Calculate MuleScore
    const muleScore = calculateMuleScore(criteria);

    // Prepare data for database insertion
    const analysisResultData: AnalysisResultData = {
      ...criteria,
      muleScore,
    };

    // Update the analysis result in the database
    await prisma.analysis.update({
      where: { task_id: taskId },
      data: analysisResultData,
    });
  } catch (error) {
    console.error('Error performing analysis:', error);
    // Optionally, update the analysis result with an error status
    await prisma.analysis.update({
      where: { task_id: taskId },
      data: { mule_score: 0 }, // Indicate failure
    });
  }
}