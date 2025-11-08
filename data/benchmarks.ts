// data/benchmarks.ts
// DADOS ESTÁTICOS - FONTE DE VERDADE DO SISTEMA

/**
 * Interface que define a estrutura de benchmark de um nicho
 */
export interface NicheBenchmark {
  cpm: number;                    // Custo por 1000 impressões (R$)
  cpc: number;                    // Custo por clique (R$)
  ctr: number;                    // Taxa de clique (%)
  conversion_rate: number;        // Taxa de conversão (%)
  suggested_daily: number;        // Investimento diário sugerido (R$)
  interests: string[];            // Interesses relacionados
  category: string;               // Categoria principal
  lookalikes: string[];          // Públicos similares
}

/**
 * Dados estáticos de benchmarks por nicho
 * Fonte: Meta Ads Manager + pesquisa de mercado (Novembro 2024)
 */
export const STATIC_BENCHMARKS: Record<string, NicheBenchmark> = {
  "academia": {
    cpm: 22.62,
    cpc: 1.74,
    ctr: 1.75,
    conversion_rate: 3.2,
    suggested_daily: 90.48,
    interests: ["academia", "musculação", "crossfit", "personal trainer", "suplementos"],
    category: "fitness",
    lookalikes: ["saúde e bem-estar", "esportes", "vida saudável"]
  },
  "restaurante": {
    cpm: 16.80,
    cpc: 1.20,
    ctr: 2.35,
    conversion_rate: 3.8,
    suggested_daily: 68.00,
    interests: ["restaurante", "comida brasileira", "culinária", "gastronomia", "ifood"],
    category: "alimentacao",
    lookalikes: ["delivery", "culinária", "experiências gastronômicas"]
  },
  "sexshop": {
    cpm: 18.50,
    cpc: 1.45,
    ctr: 2.10,
    conversion_rate: 2.8,
    suggested_daily: 75.00,
    interests: ["sexualidade", "relacionamentos", "intimidade", "casal", "life style"],
    category: "ecommerce",
    lookalikes: ["cosméticos", "bem-estar", "produtos pessoais"]
  },
  "ecommerce": {
    cpm: 18.50,
    cpc: 1.45,
    ctr: 2.10,
    conversion_rate: 2.8,
    suggested_daily: 75.00,
    interests: ["compras online", "shopee", "mercado livre", "amazon", "nubank"],
    category: "varejo",
    lookalikes: ["tecnologia", "moda", "consumo digital"]
  },
  "psicologo": {
    cpm: 22.90,
    cpc: 1.95,
    ctr: 1.60,
    conversion_rate: 3.9,
    suggested_daily: 92.00,
    interests: ["psicólogo", "psicologia", "terapia", "saúde mental", "autoconhecimento"],
    category: "saude",
    lookalikes: ["bem-estar mental", "desenvolvimento pessoal", "coaching"]
  },
  "dentista": {
    cpm: 25.30,
    cpc: 2.10,
    ctr: 1.45,
    conversion_rate: 4.5,
    suggested_daily: 105.00,
    interests: ["dentista", "odontologia", "saúde bucal", "clínica dental", "clareamento"],
    category: "saude",
    lookalikes: ["saúde bucal", "estética dental", "clínicas médicas"]
  }
};

/**
 * Busca benchmark estático por nicho (case-insensitive)
 * @param niche - Nome do nicho (ex: "academia", "ACADEMIA", "Academia")
 * @returns Benchmark do nicho ou fallback para "academia"
 * 
 * @example
 * getStaticBenchmark("academia") // { cpm: 22.62, ... }
 * getStaticBenchmark("FITNESS")  // { cpm: 22.62, ... } (fallback)
 * getStaticBenchmark("xyz")      // { cpm: 22.62, ... } (fallback)
 */
export const getStaticBenchmark = (niche: string): NicheBenchmark => {
  const normalized = niche.toLowerCase().trim();
  return STATIC_BENCHMARKS[normalized] || STATIC_BENCHMARKS["academia"];
};

/**
 * Lista todos os nichos disponíveis
 * @returns Array com nomes dos nichos
 * 
 * @example
 * getAvailableNiches() // ["academia", "restaurante", "sexshop", ...]
 */
export const getAvailableNiches = (): string[] => {
  return Object.keys(STATIC_BENCHMARKS);
};

/**
 * Verifica se um nicho existe nos dados estáticos
 * @param niche - Nome do nicho
 * @returns true se existir, false caso contrário
 * 
 * @example
 * nicheExists("academia")  // true
 * nicheExists("xyz")       // false
 */
export const nicheExists = (niche: string): boolean => {
  return niche.toLowerCase().trim() in STATIC_BENCHMARKS;
};

/**
 * Busca benchmarks por categoria
 * @param category - Categoria (fitness, saude, alimentacao, etc)
 * @returns Array de benchmarks da categoria
 * 
 * @example
 * getBenchmarksByCategory("saude") 
 * // [{ psicologo: {...} }, { dentista: {...} }]
 */
export const getBenchmarksByCategory = (category: string): Record<string, NicheBenchmark> => {
  const normalized = category.toLowerCase();
  const result: Record<string, NicheBenchmark> = {};
  
  for (const [niche, data] of Object.entries(STATIC_BENCHMARKS)) {
    if (data.category === normalized) {
      result[niche] = data;
    }
  }
  
  return result;
};

/**
 * Estatísticas gerais dos benchmarks
 * @returns Objeto com médias e totais
 */
export const getBenchmarkStats = () => {
  const niches = Object.values(STATIC_BENCHMARKS);
  const count = niches.length;
  
  return {
    total_niches: count,
    avg_cpm: (niches.reduce((sum, n) => sum + n.cpm, 0) / count).toFixed(2),
    avg_cpc: (niches.reduce((sum, n) => sum + n.cpc, 0) / count).toFixed(2),
    avg_ctr: (niches.reduce((sum, n) => sum + n.ctr, 0) / count).toFixed(2),
    avg_conversion: (niches.reduce((sum, n) => sum + n.conversion_rate, 0) / count).toFixed(2),
    categories: [...new Set(niches.map(n => n.category))]
  };
};
