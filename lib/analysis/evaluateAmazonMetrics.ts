import { formatLargeNumber } from '../utils';

export function evaluateReviewCount(count: number): { score: number; explanation: string } {
    if (count >= 2000) {
      return { score: 1, explanation: `${formatLargeNumber(count)} reviews indicates extremely high competition` };
    } else if (count >= 1000) {
      return { score: 2, explanation: `${formatLargeNumber(count)} reviews suggests high market competition` };
    } else if (count >= 501) {
      return { score: 3, explanation: `${formatLargeNumber(count)} reviews indicates moderate competition` };
    } else if (count >= 250) {
      return { score: 4, explanation: `${formatLargeNumber(count)} reviews suggests good opportunity with manageable competition` };
    } else {
      return { score: 5, explanation: `${formatLargeNumber(count)} reviews indicates low competition and potential market opportunity` };
    }
  }
  
  export function evaluateReviewRating(rating: number): { score: number; explanation: string } {
    if (rating >= 4.6) {
      return { score: 1, explanation: `Rating of ${rating} suggests extremely high quality bar and customer expectations` };
    } else if (rating >= 4.4) {
      return { score: 2, explanation: `Rating of ${rating} indicates high customer expectations` };
    } else if (rating >= 4.2) {
      return { score: 3, explanation: `Rating of ${rating} suggests moderate quality requirements` };
    } else if (rating >= 4.0) {
      return { score: 4, explanation: `Rating of ${rating} indicates achievable quality standards` };
    } else {
      return { score: 5, explanation: `Rating of ${rating} suggests opportunity for quality improvement` };
    }
  }
  
  export function evaluatePricing(price: number): { score: number; explanation: string } {
    if (price < 7) {
      return { score: 1, explanation: `Average price of $${price.toFixed(2)} indicates very low margins` };
    } else if (price >= 7 && price < 10) {
      return { score: 2, explanation: `Average price of $${price.toFixed(2)} suggests limited profit potential` };
    } else if (price >= 10 && price < 15) {
      return { score: 3, explanation: `Average price of $${price.toFixed(2)} indicates moderate margin potential` };
    } else if (price >= 15 && price < 20) {
      return { score: 4, explanation: `Average price of $${price.toFixed(2)} suggests good profit opportunity` };
    } else {
      return { score: 5, explanation: `Average price of $${price.toFixed(2)} indicates excellent margin potential` };
    }
  }

  export function evaluateRevenue(revenuePerMonth: number): { score: number; explanation: string } {
    if (revenuePerMonth >= 7000) {
      return { score: 5, explanation: `Monthly revenue of $${revenuePerMonth.toFixed(2)} indicates excellent market potential` };
    } else if (revenuePerMonth >= 4000) {
      return { score: 4, explanation: `Monthly revenue of $${revenuePerMonth.toFixed(2)} suggests strong market performance` };
    } else if (revenuePerMonth >= 2000) {
      return { score: 3, explanation: `Monthly revenue of $${revenuePerMonth.toFixed(2)} shows moderate market presence` };
    } else if (revenuePerMonth >= 1000) {
      return { score: 2, explanation: `Monthly revenue of $${revenuePerMonth.toFixed(2)} indicates limited market potential` };
    } else {
      return { score: 1, explanation: `Monthly revenue of $${revenuePerMonth.toFixed(2)} suggests very low market potential` };
    }
  }