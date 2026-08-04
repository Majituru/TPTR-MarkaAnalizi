export type Brand = 'Overview' | 'TP-Link' | 'Tapo';

export interface AmazonTopProduct {
  name: string;
  units: number;
  views: number;
}

export interface AmazonState {
  name: string;
  units: number;
}

export interface AmazonFunnel {
  impressions: number;
  clicks: number;
  basketAdds: number;
  purchases: number;
}

export interface MonthlyYoY {
  month: string;
  currentUnits: number;
  previousUnits: number;
}

export interface MonthlyGlance {
  month: string;
  glanceViews: number;
  orderedUnits: number;
}

export interface WeeklyTraffic {
  week: string;
  glanceViews: number;
  conversionRate: number;
}

export interface WeeklyReturns {
  week: string;
  shippedUnits: number;
  returns: number;
}

export interface AmazonTimeSeries {
  monthlyYoY: MonthlyYoY[];
  monthlyGlance: MonthlyGlance[];
  weeklyTraffic: WeeklyTraffic[];
  weeklyReturns: WeeklyReturns[];
}

export interface AmazonData {
  totalUnits: number;
  glanceViews: number;
  returns: number;
  avgConversion: number;
  topProductsByUnits: AmazonTopProduct[];
  topProductsByViews: AmazonTopProduct[];
  funnel: AmazonFunnel;
  topStates: AmazonState[];
  timeSeries: AmazonTimeSeries;
}

export interface WebsiteTrafficHour {
  time: string;
  visitors: number;
  newVisitors: number;
}

export interface WebsiteCategoryMetric {
  name: string;
  value: number;
}

export interface WebsiteData {
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  totalPages: number;
  totalChats: number;
  bounceRate: number;
  trafficByHour: WebsiteTrafficHour[];
  devices: WebsiteCategoryMetric[];
  sources: WebsiteCategoryMetric[];
}

export interface BrandData {
  amazon: AmazonData;
  website: WebsiteData;
}
