// lib/analysis/calculateMuleScore.ts

import { MuleScoreCriteria } from './types';

export function calculateMuleScore(criteria: MuleScoreCriteria): number {
  // Implement the scoring logic based on the MuleScore framework
  // For demonstration, sum up all the scores (assuming they are all numbers between 1 and 5)

  const {
    reviewCount,
    reviewRating,
    monthlySearchVolume,
    trendiness,
    seasonality,
    revenuePerMonth,
    unitsSoldPerMonth,
    pricing,
    pricingDisparity,
    marginFactor,
    liability,
    complexity,
    // Exclude fields that are not part of the scoring
  } = criteria;

  // Map each criterion to a score between 1 and 5 according to your scoring matrix
  const scores = [
    mapToScore(reviewCount),
    mapToScore(reviewRating),
    mapToScore(monthlySearchVolume),
    mapToScore(trendiness),
    seasonality, // Assuming already a score between 1-5
    mapToScore(revenuePerMonth),
    mapToScore(unitsSoldPerMonth),
    mapToScore(pricing),
    mapToScore(pricingDisparity),
    mapToScore(marginFactor),
    liability,   // Assuming already a score between 1-5
    complexity,  // Assuming already a score between 1-5
  ];

  // Sum the scores to get the MuleScore
  const muleScore = scores.reduce((sum, score) => sum + score, 0);

  return muleScore;
}

function mapToScore(value: number): number {
  // Placeholder mapping function
  // Replace with your actual scoring matrix logic
  if (value >= 80) return 5;
  if (value >= 60) return 4;
  if (value >= 40) return 3;
  if (value >= 20) return 2;
  return 1;
}