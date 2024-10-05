// lib/analysis/evaluateComplexity.ts

import { OpenAI } from 'openai';

interface ComplexityEvaluation {
  score: number;
  explanation: string;
}

export async function evaluateComplexity(openai: OpenAI, productName: string): Promise<ComplexityEvaluation> {
  const prompt = `
Evaluate the manufacturing complexity of the product "${productName}" on a scale of 1 to 5, where:

1: Many components, highly intricate assembly or manufacturing processes.
Difficult to source; relies on rare materials or specialized suppliers.
High degree of customization; each product may need to be tailored to specific needs.
Difficult logistics; very fragile, large, or requires temperature control or other special conditions.
Extensive regulatory requirements across multiple regions.
High need for customer support, maintenance, and after-sales service.
Complex marketing, requiring detailed explanations, demonstrations, or consultations.
Examples: Medical devices, complex electronics (e.g., drones), large furniture.

2: Several components or parts with more complex assembly.
Sourcing involves multiple suppliers or less common materials.
High level of customization or variants (e.g., different models or styles).
Complex logistics; could be bulky, fragile, or require special shipping conditions.
Requires regulatory compliance (e.g., electronics or specialized products).
High customer support requirements.
Marketing requires a significant amount of consumer education or demonstration.
Examples: Electronics accessories, home appliances, bicycles.

3: Multiple parts, moderate assembly complexity.
Sourcing requires some effort but is manageable.
Multiple variations or sizes/colors increase inventory management complexity.
Moderate logistics considerations (e.g., moderately fragile, requires some special packaging).
Basic regulatory requirements (e.g., labeling or standard certifications).
Moderate level of customer support needed.
Requires some effort to market; benefits/features need to be explained.
Examples: Shoes, headphones, insulated water bottles.

4: Few parts, relatively straightforward assembly or production.
Sourcing is easy with reliable suppliers.
Limited customization or variants.
Simple logistics; may require standard packaging.
Few or no regulatory requirements.
Minimal customer support needed.
Easy to market with basic consumer education.
Examples: T-shirts, coffee mugs, simple kitchen gadgets.

5: Single-part or very few parts.
Easy to source and produce.
Minimal or no customization required.
Simple logistics; lightweight, non-fragile, easy to pack and ship.
No regulatory requirements.
Low need for customer support or after-sales service.
Easy to market and understand.
Examples: Spatula, cutting board, wallet, phone case.

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
      max_tokens: 300,
      temperature: 0,
    }); 

    console.log('OpenAI response:', response);

    const content = response.choices[0]?.message?.content?.trim() ?? 'No response';
    console.log('Parsed content:', content);

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
    console.error('Error evaluating complexity:', error);
    return {
      score: 0,
      explanation: 'Error occurred while evaluating complexity'
    };
  }
}