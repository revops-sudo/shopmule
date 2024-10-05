// lib/analysis/types.ts

export interface AmazonData {
    reviewCount: number;
    reviewRating: number;
    avgListingDate?: Date;
    unitsSoldPerMonth: number;
    pricing: number;
    minPrice: number;
    maxPrice: number;
    // Add other fields as needed
  }
  
  export interface GoogleTrendsData {
    monthlySearchVolume: number;
    trendiness: number;
  }
  
  export interface DerivedMetrics {
    revenuePerMonth: number;
    pricingDisparity: number;
    marginFactor: number;
  }
  
  export interface EvaluationScores {
    liability: number;
    complexity: number;
    seasonality: number;
  }
  
  export interface MuleScoreCriteria
    extends AmazonData,
      GoogleTrendsData,
      DerivedMetrics,
      EvaluationScores {}
  
  export interface AnalysisResultData extends MuleScoreCriteria {
    muleScore: number;
  }

export type LiabilityEvaluation = {
  score: number;
  explanation: string;
};