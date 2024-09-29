// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  // Authenticate the user
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Parse the request body
  console.log('Received request to /api/chat');
  const { messages } = await req.json();
  console.log('Received messages:', messages);

  try {
    console.log('Sending request to OpenAI');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that helps users select products for analysis. When a user selects a product, respond with 'You've selected \"[product name]\".' to confirm their selection.",
        },
        ...messages,
      ],
      max_tokens: 150,
    });

    const reply = response.choices[0].message.content;
    console.log('OpenAI response:', reply);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "An error occurred during the conversation." }, { status: 500 });
  }
}