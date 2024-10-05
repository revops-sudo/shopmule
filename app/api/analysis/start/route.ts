import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { performAnalysis } from '@/lib/analysis'; 
import { getAuth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  console.log('Received request to /api/analysis/start');

  // Authenticate the user
  const { userId } = getAuth(req);

  if (!userId) {
    console.log('Unauthorized request');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { productName } = await req.json();
  console.log('Product name:', productName);

  if (!productName) {
    console.log('Product name is missing');
    return NextResponse.json({ message: 'Product name is required' }, { status: 400 });
  }

  // Generate a unique task ID
  const taskId = uuidv4();
  console.log('Generated task ID:', taskId);

  try {
    // Create a new analysis result with default values
    await prisma.analysis.create({
      data: {
        task_id: taskId,
        user_id: userId,
        product_name: productName,
        mule_score: 0, // Default value
        // Initialize other fields if necessary
      },
    });

    console.log('Analysis record created in database');

    // Initiate the analysis process
    // Run performAnalysis without awaiting to allow the API to respond immediately
    performAnalysis(taskId, productName);

    console.log('Analysis process initiated');

    return NextResponse.json({ message: 'Analysis started', taskId });
  } catch (error) {
    console.error('Error initiating analysis:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}