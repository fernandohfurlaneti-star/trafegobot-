export interface NicheBenchmark {
  cpm: number;
  cpc: number;
  ctr: number;
  conversion_rate: number;
  suggested_daily: number;
  interests: string[];
}

export const REAL_BENCHMARKS: Record<string, NicheBenchmark> = {
  "academia": {
    cpm: 22.62,
    cpc: 1.74,
    ctr: 1.75,
    conversion_rate: 3.2,
    suggested_daily: 90.48,
    interests: ["academia", "musculação", "crossfit", "personal trainer"]
  },
  "restaurante": {
    cpm: 16.80,
    cpc: 1.20,
    ctr: 2.35,
    conversion_rate: 3.8,
    suggested_daily: 68.00,
    interests: ["restaurante", "comida brasileira", "culinária", "gastronomia"]
  }
};

export const getNicheBenchmarks = (niche: string) => {
  return REAL_BENCHMARKS[niche] || REAL_BENCHMARKS["academia"];
};
