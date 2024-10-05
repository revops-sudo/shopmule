// lib/analysis/fetchGoogleTrendsData.ts

import googleTrends from 'google-trends-api';
import { GoogleTrendsData } from './types';

export async function fetchGoogleTrendsData(productName: string): Promise<GoogleTrendsData> {
  try {
    const results = await googleTrends.interestOverTime({
      keyword: productName,
      startTime: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // Last 12 months
    });

    const data = JSON.parse(results);
    const timelineData = data.default.timelineData;

    // Calculate monthly search volume and trendiness
    const monthlySearchVolume = timelineData.reduce((sum: number, item: any) => sum + item.value[0], 0);
    const trendiness = timelineData[timelineData.length - 1].value[0]; // Latest value

    const googleTrendsData: GoogleTrendsData = {
      monthlySearchVolume,
      trendiness,
    };

    return googleTrendsData;
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    return {
      monthlySearchVolume: 0,
      trendiness: 0,
    };
  }
}