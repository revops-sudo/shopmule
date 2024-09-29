// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  // Authenticate the user
//   const { userId } = getAuth(req);

//   if (!userId) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

  // Parse the request body
  const { messages } = await req.json();

  if (!messages) {
    return NextResponse.json(
      { message: "Messages are required" },
      { status: 400 }
    );
  }

  try {
    // Include a system prompt to guide the assistant
    const systemMessage = {
      role: "system",
      content:
        "You are a helpful assistant experienced in Ecommerce and dropshipping. Your objective is to help users find products to sell based on their interests. You need to start with broad product categories (e.g., Kitchen, Sports/Gym, Pets) and continue asking questions until you get to a specific product (or products) that they would like to sell. Examples of acceptable products (this is the level of specificity you need to collect from the user during your chat): Stainless Steel Cutting Board, Wood Bath Spa Mat, All-natural energy drink, Touch-free kitchen trash can, Healthy Dog Treats. Once you narrow down to specific product(s), you should look to end the conversation by getting the user to approve their choice.",
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...messages],
    });

    const assistantMessage = response.choices[0].message?.content;

    return NextResponse.json({ reply: assistantMessage }, { status: 200 });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}