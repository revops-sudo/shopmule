// lib/analysis/fetchAmazonData.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { AmazonData, AmazonDataWithEvaluation } from './types';
import { evaluateReviewCount, evaluateReviewRating, evaluatePricing } from './evaluateAmazonMetrics';

export async function fetchAmazonData(productName: string): Promise<AmazonDataWithEvaluation> {
  console.log('Starting Amazon data fetch for product:', productName);
  
  try {
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}`;
    console.log('Making request to URL:', searchUrl);

    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
    });
    console.log('Received response from Amazon. Status:', response.status);

    const html = response.data;
    const $ = cheerio.load(html);
    console.log('Successfully loaded HTML with Cheerio');

    let reviewCount = 0;
    let reviewRating = 0.0;
    let pricing = 0.0;
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let processedItems = 0;
    let unitsSoldPerMonth = 0;

    $('.s-result-item[data-component-type="s-search-result"]').each((index, element) => {
      console.log(`Processing item ${index + 1}`);

      // Add units sold parsing
      const unitsSoldText = $(element).find('.a-size-base.a-color-secondary:contains("bought in past month")').text().trim();
      if (unitsSoldText) {
        console.log('Found units sold text:', unitsSoldText);
        const match = unitsSoldText.match(/(\d+)K?\+?\s*bought/i);
        if (match) {
          let amount = parseInt(match[1], 10);
          if (unitsSoldText.includes('K')) {
            amount *= 1000;
          }
          unitsSoldPerMonth += amount;
          console.log(`Added units sold to total: ${amount} (Running total: ${unitsSoldPerMonth})`);
        }
      }

      // Extract review count - simplified parsing
      const reviewsText = $(element).find('span.a-size-base.s-underline-text').text().trim();
      console.log('Found reviews text:', reviewsText);
      
      // Convert the review text to number, handling commas
      const reviews = parseInt(reviewsText.replace(/,/g, ''), 10);
      if (!isNaN(reviews)) {
        reviewCount += reviews;
        console.log(`Added reviews to total: ${reviews} (Running total: ${reviewCount})`);
      }

      // Extract review rating
      const ratingText = $(element).find('span.a-icon-alt').text().trim();
      const ratingMatch = ratingText.match(/([0-9.]+)\s*out of\s*5/i);
      if (ratingMatch) {
        const rating = parseFloat(ratingMatch[1]);
        if (!isNaN(rating)) {
          reviewRating += rating;
          console.log(`Found rating: ${rating}`);
        }
      }

      // Extract pricing
      const priceWholeText = $(element).find('.a-price-whole').first().text();
      const priceFractionText = $(element).find('.a-price-fraction').first().text();
      const price = parseFloat(priceWholeText.replace(/[^0-9]/g, '') + '.' + priceFractionText.replace(/[^0-9]/g, ''));
      if (!isNaN(price)) {
        pricing += price;
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
        console.log(`Found price: $${price}`);
      }

      processedItems++;
      
      // For demonstration, limit to the first 10 items
      if (index >= 9) {
        console.log('Reached maximum items limit (10)');
        return false; // Break the loop
      }
    });

    // Sanity check for review count
    if (reviewCount > 1000000000) { // If over 1 billion, something's wrong
      console.warn('Unrealistic review count detected, resetting to 0:', reviewCount);
      reviewCount = 0;
    }

    // Calculate averages
    const itemCount = processedItems;
    console.log(`Processed ${itemCount} items total`);

    if (itemCount > 0) {
      // Round to 1 decimal place during calculation
      reviewRating = Number((reviewRating / itemCount).toFixed(1));
      pricing = pricing / itemCount;
      console.log('Calculated averages:', {
        averageRating: reviewRating,
        averagePrice: pricing,
        totalReviews: reviewCount
      });
    }

    const amazonData: AmazonDataWithEvaluation = {
      reviewCount,
      reviewRating,  // This will now be rounded to 1 decimal
      unitsSoldPerMonth,
      pricing,
      minPrice: minPrice === Infinity ? 0 : minPrice,
      maxPrice: maxPrice === -Infinity ? 0 : maxPrice,
      reviewCountEvaluation: evaluateReviewCount(reviewCount),
      reviewRatingEvaluation: evaluateReviewRating(reviewRating),
      pricingEvaluation: evaluatePricing(pricing)
    };

    console.log('Final Amazon data:', {
      ...amazonData,
      reviewCount: formatLargeNumber((amazonData as any).reviewCount),
      // other fields...
    });
    return amazonData;
    
  } catch (error) {
    console.error('Error fetching Amazon data:', {
      error,
      productName,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export function formatLargeNumber(num: number): string {
  if (!num) return '0';
  
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1);
    return formatted.endsWith('.0') 
      ? formatted.slice(0, -2) + 'M' 
      : formatted + 'M';
  } 
  
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.endsWith('.0') 
      ? formatted.slice(0, -2) + 'K' 
      : formatted + 'K';
  }
  
  return num.toString();
}