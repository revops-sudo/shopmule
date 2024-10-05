// lib/analysis/evaluateLiability.ts

import { OpenAI } from 'openai';

interface LiabilityEvaluation {
  score: number;
  explanation: string;
}

export async function evaluateLiability(openai: OpenAI, productName: string): Promise<LiabilityEvaluation> {
  const prompt = `
Evaluate the liability risk of the product "${productName}" on a scale of 1 to 5, where:

5: Products are extremely safe with no associated risks of injury or harm. 
Made from non-toxic, hypoallergenic, and non-flammable materials. 
No regulatory concerns or compliance requirements. 
Completely safe for use by any age group with no risk warnings needed. 
Examples: Pillows, blankets, paper products, simple stationery items.

4: Products with virtually no flammability or combustion risk. 
No hazardous chemicals or sharp edges. 
Electrical items with robust safety certifications and very low failure rates. 
Products that are safe for all ages and pose little to no risk of injury. 
Examples: Books, most clothing, non-electric kitchen utensils, simple toys without small parts.

3: Products that pose minimal safety risks but require some precautions. 
Non-toxic chemicals or materials that could cause minor irritation or discomfort. 
Electrical products that are generally safe with standard safety certifications. 
Items that may require warnings for proper use but have a low overall risk. 
Examples: Basic household cleaning supplies, handheld tools, children's products with no small parts.

2: Products that are flammable under certain conditions. 
Contains chemicals that may cause skin irritation or mild allergic reactions. 
Electrical products with minimal safety certifications. 
Products with some potential to cause injury but generally safe when used correctly. 
Requires some regulatory oversight or safety warnings. 
Examples: Hair dye, small kitchen appliances, low-voltage electronics, toys with larger parts that may still pose some risk.

1: Products that are highly flammable or combustible. 
Contains sharp edges or parts that can cause injury. 
Involves hazardous chemicals or toxic substances. 
Electrical devices with a high risk of malfunction, shock, or fire. 
Products with a high risk of causing injury or harm, including children's toys with small parts. 
Requires extensive regulatory compliance and has significant legal risks. Examples: Fireworks, knives, power tools, lithium batteries, paint thinners, choking hazard toys.

Based on these criteria, provide the numeric score (1, 2, 3, 4, or 5) for the product "${productName}" along with a detailed explanation of why you chose that score. Format your response as follows:
Score: [numeric score]
Explanation: [your detailed explanation]
`;

  console.log('Sending prompt to OpenAI:', prompt);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: prompt },
      ],
      max_tokens: 300,  // Increased to allow for a fuller explanation
      temperature: 0,
    }); 

    console.log('OpenAI response:', response);

    const content = response.choices[0]?.message?.content?.trim() ?? 'No response';
    console.log('Parsed content:', content);

    // New parsing logic
    const scoreMatch = content.match(/Score:\s*(\d+)/);
    const explanationMatch = content.match(/Explanation:\s*([\s\S]*)/);

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
    const explanation = explanationMatch ? explanationMatch[1].trim() : 'No explanation provided';

    const result = {
      score: score,
      explanation: explanation
    };

    console.log('Final result:', result);
    return result;
  } catch (error) {
    console.error('Error evaluating liability:', error);
    return {
      score: 0,
      explanation: 'Error occurred while evaluating liability'
    };
  }
}