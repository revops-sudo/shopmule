declare module 'google-trends-api' {
    interface TrendsOptions {
      keyword: string | string[];
      startTime?: Date;
      endTime?: Date;
      geo?: string;
      hl?: string;
      category?: number;
      property?: string;
    }
  
    interface ResultObject {
      default: {
        timelineData: Array<{
          time: string;
          formattedTime: string;
          formattedAxisTime: string;
          value: number[];
          hasData: boolean;
          formattedValue: string[];
        }>;
      };
    }
  
    function interestOverTime(options: TrendsOptions): Promise<string>;
    function interestByRegion(options: TrendsOptions): Promise<string>;
    function relatedTopics(options: TrendsOptions): Promise<string>;
    function relatedQueries(options: TrendsOptions): Promise<string>;
    function realTimeTrends(options: TrendsOptions): Promise<string>;
    function dailyTrends(options: TrendsOptions): Promise<string>;
  
    // You might want to add more specific return types for each method
    // instead of using Promise<string> for all of them.
  
    const googleTrends: {
      interestOverTime: typeof interestOverTime;
      interestByRegion: typeof interestByRegion;
      relatedTopics: typeof relatedTopics;
      relatedQueries: typeof relatedQueries;
      realTimeTrends: typeof realTimeTrends;
      dailyTrends: typeof dailyTrends;
    };
  
    export = googleTrends;
  }