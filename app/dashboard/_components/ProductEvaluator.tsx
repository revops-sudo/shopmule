"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

interface ProductEvaluation {
  liabilityScore: EvaluationResult;
  complexityScore: EvaluationResult;
  seasonalityScore: EvaluationResult;
  googleTrendsData: GoogleTrendsData;
}

interface EvaluationResult {
  score: number;
  explanation: string;
}

interface GoogleTrendsData {
  searchVolumeScore: number;
  searchVolumeExplanation: string;
}

export function ProductEvaluator() {
  const [productName, setProductName] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<ProductEvaluation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/evaluate-product', { productName });
      setEvaluationResult(response.data);
    } catch (error) {
      console.error('Error evaluating product:', error);
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
      {evaluationResult && (
        <div>
          <h3>Liability Evaluation:</h3>
          <p>Score: {evaluationResult.liabilityScore.score}</p>
          <p>Explanation: {evaluationResult.liabilityScore.explanation}</p>
          <h3>Complexity Evaluation:</h3>
          <p>Score: {evaluationResult.complexityScore.score}</p>
          <p>Explanation: {evaluationResult.complexityScore.explanation}</p>
          <h3>Seasonality Evaluation:</h3>
          <p>Score: {evaluationResult.seasonalityScore.score}</p>
          <p>Explanation: {evaluationResult.seasonalityScore.explanation}</p>
          <h3>Google Trends Data:</h3>
          <p>Search Volume Score: {evaluationResult.googleTrendsData.searchVolumeScore}</p>
          <p>Search Volume Explanation: {evaluationResult.googleTrendsData.searchVolumeExplanation}</p>
        </div>
      )}
    </div>
  )
}
