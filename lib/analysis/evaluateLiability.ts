// lib/analysis/evaluateLiability.ts

import { OpenAI } from 'openai';

export async function evaluateLiability(openai: OpenAI, productName: string): Promise<number> {
  const prompt = `On a scale of 1 to 5, rate the liability of selling the product "${productName}". Provide only the number without any explanation.`;

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

    const liabilityScore = parseInt(response.choices?.[0]?.message?.content?.trim() ?? '3', 10);
    return isNaN(liabilityScore) ? 3 : liabilityScore; // Default to 3 if parsing fails
  } catch (error) {
    console.error('Error evaluating liability:', error);
    return 3; // Default value in case of error
  }
}