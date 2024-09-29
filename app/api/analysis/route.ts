// pages/api/analysis/start.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the path based on your project structure
import { performAnalysis } from '@/lib/analysis'; // Add this import
import { getAuth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // Authenticate the user
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json({ message: 'Product name is required' });
  }

  // Generate a unique task ID
  const taskId = uuidv4();

  try {
    // Create a new analysis record with status 'pending'
    await prisma.analysis.create({
      data: {
        taskId: taskId,
        userId: userId,
        productName: productName,
        // Initialize other fields as null or default values if necessary
      },
    });

    // Initiate the analysis process
    // Since we're using Next.js, we can call a function directly
    await performAnalysis(taskId, productName);

    res.status(200).json({ message: 'Analysis started', taskId });
  } catch (error) {
    console.error('Error initiating analysis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}