// smartBenchmarks.ts - SISTEMA HÍBRIDO SIMPLES

// DADOS ATUAIS (já existem no benchmarks.ts)
const BASE_DATA = {
  "academia": { cpm: 22.62, cpc: 1.74, ctr: 1.75 },
  "restaurante": { cpm: 16.80, cpc: 1.20, ctr: 2.35 },
  "sexshop": { cpm: 18.50, cpc: 1.45, ctr: 2.10 },
  "ecommerce": { cpm: 18.50, cpc: 1.45, ctr: 2.10 }
};

// SIMULA API GRATUITA
const simulateLiveData = (niche: string) => {
  const trends = {
    "academia": 85, "restaurante": 92, "sexshop": 45, "ecommerce": 95
  };
  
  const base = BASE_DATA[niche] || BASE_DATA["academia"];
  const trend = trends[niche] || 70;
  
  // Ajusta com tendência simulada
  return {
    ...base,
    cpm: base.cpm * (1 + (trend - 70) / 200),
    trend_score: trend,
    last_updated: new Date().toISOString(),
    source: "live_simulation"
  };
};

// SISTEMA HÍBRIDO
export const getSmartData = async (niche: string) => {
  try {
    // Tenta dados ao vivo (simulados)
    const liveData = simulateLiveData(niche);
    return liveData;
  } catch (error) {
    // Fallback para dados base
    return BASE_DATA[niche] || BASE_DATA["academia"];
  }
};
