// app/api/analysis/result/route.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // Authenticate the user
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { taskId } = req.query;

  if (!taskId || typeof taskId !== 'string') {
    return res.status(400).json({ message: 'taskId is required' });
  }

  try {
    const analysisResult = await prisma.analysis.findUnique({
      where: { task_id: taskId },
    });

    if (!analysisResult) {
      return res.status(404).json({ message: 'Analysis result not found' });
    }

    if (analysisResult.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.status(200).json({ analysisResult });
  } catch (error) {
    console.error('Error retrieving analysis result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}