"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { formatLargeNumber } from '@/lib/utils';

interface DerivedMetrics {
  revenuePerMonth: number;
  revenueEvaluation: EvaluationResult;
}

interface EvaluationResult {
  score: number;
  explanation: string;
}

interface GoogleTrendsData {
  searchVolumeScore: number;
  searchVolumeExplanation: string;
  trendinessScore: number;
  trendinessExplanation: string;
}

interface AmazonData {
  reviewCount: number;
  reviewRating: number;
  pricing: number;
  minPrice: number;
  maxPrice: number;
  reviewCountEvaluation: EvaluationResult;
  reviewRatingEvaluation: EvaluationResult;
  pricingEvaluation: EvaluationResult;
}

interface ProductEvaluation {
  amazonData: AmazonData;
  derivedMetrics: DerivedMetrics;
  liabilityScore: EvaluationResult;
  complexityScore: EvaluationResult;
  seasonalityScore: EvaluationResult;
  googleTrendsData: GoogleTrendsData;
}

export function ProductEvaluator() {
  const [productName, setProductName] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<ProductEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/evaluate-product', { productName });
      setEvaluationResult(response.data);
    } catch (error) {
      console.error('Error evaluating product:', error);
      setError('Failed to evaluate product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Evaluating...' : 'Evaluate Product'}
        </Button>
      </form>

      {error && (
        <div className="text-red-500">{error}</div>
      )}

      {evaluationResult && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Amazon Data</h3>
            <div className="pl-4 space-y-4">

              <div className="space-y-1">
                <p><span className="text-gray-600">Review Count:</span> {formatLargeNumber(evaluationResult.amazonData.reviewCount)}</p>
                <p><span className="text-gray-600">Score:</span> {evaluationResult.amazonData.reviewCountEvaluation.score}</p>
                <p><span className="text-gray-600">Explanation:</span> {evaluationResult.amazonData.reviewCountEvaluation.explanation}</p>
              </div>

              <div className="space-y-1">
                <p><span className="text-gray-600">Review Rating:</span> {evaluationResult.amazonData.reviewRating.toFixed(1)}</p>
                <p><span className="text-gray-600">Score:</span> {evaluationResult.amazonData.reviewRatingEvaluation.score}</p>
                <p><span className="text-gray-600">Explanation:</span> {evaluationResult.amazonData.reviewRatingEvaluation.explanation}</p>
              </div>

              <div className="space-y-1">
                <p><span className="text-gray-600">Average Price:</span> ${evaluationResult.amazonData.pricing.toFixed(2)}</p>
                <p><span className="text-gray-600">Score:</span> {evaluationResult.amazonData.pricingEvaluation.score}</p>
                <p><span className="text-gray-600">Explanation:</span> {evaluationResult.amazonData.pricingEvaluation.explanation}</p>
              </div>

              <div className="space-y-1">
                <p><span className="text-gray-600">Price Range:</span> ${evaluationResult.amazonData.minPrice.toFixed(2)} - ${evaluationResult.amazonData.maxPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Liability Evaluation</h3>
            <div className="pl-4 space-y-1">
              <p><span className="text-gray-600">Score:</span> {evaluationResult.liabilityScore.score}</p>
              <p><span className="text-gray-600">Explanation:</span> {evaluationResult.liabilityScore.explanation}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Complexity Evaluation</h3>
            <div className="pl-4 space-y-1">
              <p><span className="text-gray-600">Score:</span> {evaluationResult.complexityScore.score}</p>
              <p><span className="text-gray-600">Explanation:</span> {evaluationResult.complexityScore.explanation}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Seasonality Evaluation</h3>
            <div className="pl-4 space-y-1">
              <p><span className="text-gray-600">Score:</span> {evaluationResult.seasonalityScore.score}</p>
              <p><span className="text-gray-600">Explanation:</span> {evaluationResult.seasonalityScore.explanation}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Monthly Search Volume</h3>
            <div className="pl-4 space-y-1">
              <p><span className="text-gray-600">Score:</span> {evaluationResult.googleTrendsData.searchVolumeScore}</p>
              <p><span className="text-gray-600">Explanation:</span> {evaluationResult.googleTrendsData.searchVolumeExplanation}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Trendiness</h3>
            <div className="pl-4 space-y-1">
              <p><span className="text-gray-600">Score:</span> {evaluationResult.googleTrendsData.trendinessScore}</p>
              <p><span className="text-gray-600">Explanation:</span> {evaluationResult.googleTrendsData.trendinessExplanation}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Monthly Revenue</h3>
            <div className="pl-4 space-y-1">
              <p><span className="text-gray-600">Revenue:</span> ${evaluationResult.derivedMetrics.revenuePerMonth.toFixed(2)}</p>
              <p><span className="text-gray-600">Score:</span> {evaluationResult.derivedMetrics.revenueEvaluation.score}</p>
              <p><span className="text-gray-600">Explanation:</span> {evaluationResult.derivedMetrics.revenueEvaluation.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
