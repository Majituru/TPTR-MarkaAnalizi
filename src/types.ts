export type Brand = 'Overview' | 'TP-Link' | 'Tapo';

export interface MetricData {
  id: string;
  title: string;
  value: string | number;
  trend: number;
  format: 'number' | 'currency' | 'percentage';
}

export interface TrafficData {
  date: string;
  organic: number;
  paid: number;
  referral: number;
}

export interface MarketShareData {
  category: string;
  share: number;
  fill: string;
}

export interface BrandData {
  metrics: MetricData[];
  traffic: TrafficData[];
  marketShare: MarketShareData[];
  demographics: { age: string; percentage: number }[];
}
