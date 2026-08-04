import { BrandData } from '../types';

export const tplinkData: BrandData = {
  metrics: [
    { id: '1', title: 'Aylık Ziyaretçi', value: 1245000, trend: 12.5, format: 'number' },
    { id: '2', title: 'Pazar Payı (Ağ Ürünleri)', value: 42.3, trend: 2.1, format: 'percentage' },
    { id: '3', title: 'Dönüşüm Oranı', value: 3.8, trend: -0.4, format: 'percentage' },
    { id: '4', title: 'Hemen Çıkma Oranı', value: 41.2, trend: -2.3, format: 'percentage' },
  ],
  traffic: [
    { date: 'Oca', organic: 450000, paid: 120000, referral: 50000 },
    { date: 'Şub', organic: 480000, paid: 135000, referral: 55000 },
    { date: 'Mar', organic: 510000, paid: 140000, referral: 58000 },
    { date: 'Nis', organic: 490000, paid: 160000, referral: 52000 },
    { date: 'May', organic: 530000, paid: 155000, referral: 60000 },
    { date: 'Haz', organic: 580000, paid: 170000, referral: 65000 },
  ],
  marketShare: [
    { category: 'Router', share: 45, fill: '#06b6d4' }, // cyan-500
    { category: 'Menzil Genişletici', share: 30, fill: '#0891b2' }, // cyan-600
    { category: 'Switch', share: 15, fill: '#164e63' }, // cyan-900
    { category: 'Diğer', share: 10, fill: '#cffafe' }, // cyan-100
  ],
  demographics: [
    { age: '18-24', percentage: 15 },
    { age: '25-34', percentage: 45 },
    { age: '35-44', percentage: 25 },
    { age: '45+', percentage: 15 },
  ]
};

export const tapoData: BrandData = {
  metrics: [
    { id: '1', title: 'Aylık Ziyaretçi', value: 850000, trend: 24.8, format: 'number' },
    { id: '2', title: 'Pazar Payı (Akıllı Ev)', value: 28.5, trend: 5.4, format: 'percentage' },
    { id: '3', title: 'Dönüşüm Oranı', value: 4.2, trend: 1.2, format: 'percentage' },
    { id: '4', title: 'Hemen Çıkma Oranı', value: 38.5, trend: -4.1, format: 'percentage' },
  ],
  traffic: [
    { date: 'Oca', organic: 210000, paid: 150000, referral: 30000 },
    { date: 'Şub', organic: 240000, paid: 165000, referral: 35000 },
    { date: 'Mar', organic: 280000, paid: 180000, referral: 42000 },
    { date: 'Nis', organic: 310000, paid: 200000, referral: 48000 },
    { date: 'May', organic: 350000, paid: 210000, referral: 55000 },
    { date: 'Haz', organic: 410000, paid: 230000, referral: 65000 },
  ],
  marketShare: [
    { category: 'Güvenlik Kamerası', share: 50, fill: '#8b5cf6' }, // violet-500
    { category: 'Akıllı Priz', share: 25, fill: '#7c3aed' }, // violet-600
    { category: 'Akıllı Ampul', share: 15, fill: '#4c1d95' }, // violet-900
    { category: 'Diğer', share: 10, fill: '#ede9fe' }, // violet-100
  ],
  demographics: [
    { age: '18-24', percentage: 25 },
    { age: '25-34', percentage: 40 },
    { age: '35-44', percentage: 20 },
    { age: '45+', percentage: 15 },
  ]
};

export const overviewData: BrandData = {
    metrics: [
        { id: '1', title: 'Toplam Aylık Ziyaretçi', value: 2095000, trend: 17.2, format: 'number' },
        { id: '2', title: 'Genel Dönüşüm Oranı', value: 3.96, trend: 0.4, format: 'percentage' },
        { id: '3', title: 'Aktif Kampanyalar', value: 12, trend: 0, format: 'number' },
        { id: '4', title: 'Ortalama Sitede Kalma Süresi', value: '2:45', trend: 12, format: 'number' },
    ],
    traffic: [
        { date: 'Oca', organic: 660000, paid: 270000, referral: 80000 },
        { date: 'Şub', organic: 720000, paid: 300000, referral: 90000 },
        { date: 'Mar', organic: 790000, paid: 320000, referral: 100000 },
        { date: 'Nis', organic: 800000, paid: 360000, referral: 100000 },
        { date: 'May', organic: 880000, paid: 365000, referral: 115000 },
        { date: 'Haz', organic: 990000, paid: 400000, referral: 130000 },
    ],
    marketShare: [
        { category: 'TP-Link (Ağ)', share: 65, fill: '#06b6d4' },
        { category: 'Tapo (Akıllı Ev)', share: 35, fill: '#8b5cf6' },
    ],
    demographics: [
        { age: '18-24', percentage: 20 },
        { age: '25-34', percentage: 43 },
        { age: '35-44', percentage: 22 },
        { age: '45+', percentage: 15 },
    ]
}
