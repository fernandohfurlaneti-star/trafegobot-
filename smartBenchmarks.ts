// types/benchmarks.ts
// INTERFACES UNIFICADAS PARA TODO O SISTEMA

export interface SmartBenchmark {
  // ✅ Campos BASE (compatíveis com API e Frontend)
  cpm: number;
  cpc: number;
  ctr: number;
  conversion_rate: number;
  suggested_daily: number;
  interests: string[];
  lookalikes: string[];
  confidence: number;
  trend_score: number;
  source: 'real_api' | 'cache' | 'fallback_static';
  last_updated: string;
  
  // ✅ Campos EXTENDIDOS (para UI e lógica inteligente)
  season_factor: number;
  economic_factor: number;
  api_used: string[];
  category: string;
  niche?: string; // Opcional - só frontend precisa
}

// ✅ Response padrão da API
export interface ApiBenchmarkResponse {
  success: boolean;
  data: SmartBenchmark;
  meta: {
    niche_requested: string;
    niche_matched: string;
    source: string;
    confidence: number;
    last_updated: string;
    response_time_ms: number;
    cache_status: 'hit' | 'miss';
  };
}

// ✅ Para compatibilidade com dados estáticos
export interface NicheBenchmark {
  cpm: number;
  cpc: number;
  ctr: number;
  conversion_rate: number;
  suggested_daily: number;
  interests: string[];
  category: string;
  lookalikes: string[];
}
