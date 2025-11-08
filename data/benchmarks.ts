// data/benchmarks.ts
// DADOS ESTÁTICOS - NUNCA IMPORTA NADA, SÓ EXPORTA

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

// Função helper simples
export const getStaticBenchmark = (niche: string): NicheBenchmark => {
  return STATIC_BENCHMARKS[niche.toLowerCase()] || STATIC_BENCHMARKS["academia"];
};
