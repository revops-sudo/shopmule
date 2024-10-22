// lib/analysis/fetchGoogleTrendsData.ts

import googleTrends from 'google-trends-api';
import { GoogleTrendsData as ImportedGoogleTrendsData } from './types';

export interface GoogleTrendsData {
  monthlySearchVolume: number;
  searchVolumeScore: number;
  searchVolumeExplanation: string;
  trendiness: number;
  trendinessScore: number;
  trendinessExplanation: string;
}

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

    const searchVolumeScore = getSearchVolumeScore(monthlySearchVolume);
    const searchVolumeExplanation = getSearchVolumeExplanation(monthlySearchVolume, searchVolumeScore);

    const trendinessScore = getTrendinessScore(trendiness);
    const trendinessExplanation = getTrendinessExplanation(trendiness, trendinessScore);

    const googleTrendsData: GoogleTrendsData = {
      monthlySearchVolume,
      searchVolumeScore,
      searchVolumeExplanation,
      trendiness,
      trendinessScore,
      trendinessExplanation,
    };

    return googleTrendsData;
  } catch (error) {
    console.error('Error fetching Google Trends data:', error);
    return {
      monthlySearchVolume: 0,
      searchVolumeScore: 0,
      searchVolumeExplanation: 'Error occurred while fetching Google Trends data',
      trendiness: 0,
      trendinessScore: 0,
      trendinessExplanation: 'Error occurred while fetching Google Trends data',
    };
  }
}

function getSearchVolumeScore(monthlySearchVolume: number): number {
  if (monthlySearchVolume > 10000 || monthlySearchVolume < 100) return 1;
  if (monthlySearchVolume >= 5000 && monthlySearchVolume <= 10000) return 2;
  if (monthlySearchVolume >= 3000 && monthlySearchVolume < 5000) return 3;
  if (monthlySearchVolume >= 2000 && monthlySearchVolume < 3000) return 4;
  if (monthlySearchVolume >= 100 && monthlySearchVolume < 2000) return 5;
  return 0; // This should never happen, but it's here for completeness
}

function getSearchVolumeExplanation(monthlySearchVolume: number, score: number): string {
  const explanations = {
    1: "Very low or extremely high search volume, potentially indicating niche interest or oversaturation",
    2: "Moderate to high search volume, suggesting significant interest",
    3: "Balanced search volume, indicating steady interest",
    4: "Good search volume, showing strong and consistent interest",
    5: "Ideal search volume, suggesting a sweet spot of interest without oversaturation",
  };
  return `Monthly search volume: ${monthlySearchVolume}. ${explanations[score as keyof typeof explanations]}`;
}

function getTrendinessScore(trendiness: number): number {
  if (trendiness >= 80) return 5;
  if (trendiness >= 60) return 4;
  if (trendiness >= 40) return 3;
  if (trendiness >= 20) return 2;
  return 1;
}

function getTrendinessExplanation(trendiness: number, score: number): string {
  const explanations = {
    1: "Low trendiness, indicating minimal current interest",
    2: "Below average trendiness, suggesting moderate current interest",
    3: "Average trendiness, indicating steady current interest",
    4: "Above average trendiness, showing strong current interest",
    5: "High trendiness, indicating very high current interest and potential for growth",
  };
  return `Current trendiness: ${trendiness}. ${explanations[score as keyof typeof explanations]}`;
}
