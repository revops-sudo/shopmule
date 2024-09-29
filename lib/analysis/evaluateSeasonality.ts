// lib/analysis/evaluateSeasonality.ts

import { OpenAI } from 'openai';

export async function evaluateSeasonality(openai: OpenAI, productName: string): Promise<number> {
  const prompt = `On a scale of 1 to 5, rate the seasonality of the product "${productName}". Provide only the number without any explanation.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1,
      temperature: 0,
    });

    const seasonalityScore = parseInt(response.choices?.[0]?.message?.content?.trim() ?? '3', 10);
    return isNaN(seasonalityScore) ? 3 : seasonalityScore; // Default to 3 if parsing fails
  } catch (error) {
    console.error('Error evaluating seasonality:', error);
    return 3; // Default value in case of error
  }
}