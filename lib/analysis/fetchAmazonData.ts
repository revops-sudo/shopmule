// lib/analysis/fetchAmazonData.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { AmazonData } from './types';

export async function fetchAmazonData(productName: string): Promise<AmazonData> {
  try {
    const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Your User Agent String', // TODO: Replace with actual user agent string
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Initialize data variables
    let reviewCount = 0;
    let reviewRating = 0.0;
    let unitsSoldPerMonth = 0;
    let pricing = 0.0;
    let minPrice = 0;
    let maxPrice = -Infinity;

    // Example of extracting data from the first product listing
    $('.s-result-item').each((index, element) => {
      // Extract review count
      const reviewsText = $(element).find('.a-size-base').text();
      const reviews = parseInt(reviewsText.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(reviews)) {
        reviewCount += reviews;
      }

      // Extract review rating
      const ratingText = $(element).find('.a-icon-alt').text();
      const ratingMatch = ratingText.match(/([0-9.]+) out of 5 stars/);
      if (ratingMatch) {
        reviewRating += parseFloat(ratingMatch[1]);
      }

      // Extract pricing
      const priceWholeText = $(element).find('.a-price-whole').first().text();
      const priceFractionText = $(element).find('.a-price-fraction').first().text();
      const price = parseFloat(priceWholeText.replace(/[^0-9]/g, '') + '.' + priceFractionText.replace(/[^0-9]/g, ''));
      if (!isNaN(price)) {
        pricing += price;
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
      }

      // For demonstration, limit to the first 10 items
      if (index >= 9) {
        return false; // Break the loop
      }
    });

    // Calculate averages
    const itemCount = Math.min($('.s-result-item').length, 10);
    if (itemCount > 0) {
      reviewRating = reviewRating / itemCount;
      pricing = pricing / itemCount;
    }

    // Placeholder for units sold per month and avg listing date
    // Since this data isn't directly available, you might need to use estimations or third-party APIs

    const amazonData: AmazonData = {
      reviewCount,
      reviewRating,
      unitsSoldPerMonth, // Set to 0 or estimate
      pricing,
      minPrice,
      maxPrice,
      // Add other fields as needed
    };

    return amazonData;
  } catch (error) {
    console.error('Error fetching Amazon data:', error);
    throw error;
  }
}