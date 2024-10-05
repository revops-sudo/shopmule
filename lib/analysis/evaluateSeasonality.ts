// lib/analysis/evaluateSeasonality.ts

import { OpenAI } from 'openai';

export interface SeasonalityEvaluation {
  score: number;
  explanation: string;
}

export async function evaluateSeasonality(openai: OpenAI, productName: string): Promise<SeasonalityEvaluation> {
  const prompt = `
Evaluate the seasonality of the product "${productName}" on a scale of 1 to 5, where:

1: Extremely seasonal (<2 months of demand)
2: High seasonality (2+ months of demand)
3: Moderate seasonality (6+ months of demand)
4: Nearly stable (8+ months of demand)
5: Stable (12 months of demand)

Based on these criteria, provide the numeric score (1, 2, 3, 4, or 5) for the product "${productName}" along with a brief explanation of why you chose that score. Format your response as follows:
Score: [numeric score]
Explanation: [your brief explanation]
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: prompt },
      ],
      max_tokens: 150,
      temperature: 0,
    });

    const content = response.choices[0]?.message?.content?.trim() ?? 'No response';
    
    const scoreMatch = content.match(/Score:\s*(\d+)/);
    const explanationMatch = content.match(/Explanation:\s*([\s\S]*)/);

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
    const explanation = explanationMatch ? explanationMatch[1].trim() : 'No explanation provided';

    return {
      score: score,
      explanation: explanation
    };
  } catch (error) {
    console.error('Error evaluating seasonality:', error);
    return {
      score: 0,
      explanation: 'Error occurred while evaluating seasonality'
    };
  }
}