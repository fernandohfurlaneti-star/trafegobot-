// data/benchmarks.ts
// DADOS ESTÁTICOS - 50+ NICHOS DE MERCADO

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
  // ============= FITNESS & SAÚDE (10) =============
  "academia": {
    cpm: 22.62, cpc: 1.74, ctr: 1.75, conversion_rate: 3.2, suggested_daily: 90.48,
    interests: ["academia", "musculação", "crossfit", "personal trainer", "suplementos"],
    category: "fitness", lookalikes: ["saúde e bem-estar", "esportes", "vida saudável"]
  },
  "personal trainer": {
    cpm: 24.50, cpc: 1.95, ctr: 1.60, conversion_rate: 3.5, suggested_daily: 98.00,
    interests: ["personal trainer", "treinamento", "fitness", "emagrecimento"],
    category: "fitness", lookalikes: ["coaching fitness", "nutrição", "saúde"]
  },
  "nutricao": {
    cpm: 21.80, cpc: 1.68, ctr: 1.85, conversion_rate: 3.8, suggested_daily: 87.20,
    interests: ["nutrição", "nutricionista", "dieta", "alimentação saudável", "emagrecimento"],
    category: "saude", lookalikes: ["saúde", "bem-estar", "vida saudável"]
  },
  "yoga": {
    cpm: 19.50, cpc: 1.45, ctr: 2.05, conversion_rate: 2.9, suggested_daily: 78.00,
    interests: ["yoga", "meditação", "pilates", "bem-estar", "mindfulness"],
    category: "fitness", lookalikes: ["saúde mental", "relaxamento", "espiritualidade"]
  },
  "fisioterapia": {
    cpm: 23.40, cpc: 1.88, ctr: 1.65, conversion_rate: 3.6, suggested_daily: 93.60,
    interests: ["fisioterapia", "reabilitação", "dor", "tratamento", "saúde"],
    category: "saude", lookalikes: ["clínicas", "terapias", "ortopedia"]
  },
  "psicologo": {
    cpm: 22.90, cpc: 1.95, ctr: 1.60, conversion_rate: 3.9, suggested_daily: 92.00,
    interests: ["psicólogo", "psicologia", "terapia", "saúde mental", "autoconhecimento"],
    category: "saude", lookalikes: ["bem-estar mental", "desenvolvimento pessoal", "coaching"]
  },
  "dentista": {
    cpm: 25.30, cpc: 2.10, ctr: 1.45, conversion_rate: 4.5, suggested_daily: 105.00,
    interests: ["dentista", "odontologia", "saúde bucal", "clínica dental", "clareamento"],
    category: "saude", lookalikes: ["saúde bucal", "estética dental", "ortodontia"]
  },
  "clinica estetica": {
    cpm: 26.50, cpc: 2.25, ctr: 1.40, conversion_rate: 4.2, suggested_daily: 112.00,
    interests: ["estética", "beleza", "procedimentos", "harmonização", "botox"],
    category: "beleza", lookalikes: ["clínicas", "dermatologia", "spa"]
  },
  "veterinario": {
    cpm: 20.40, cpc: 1.58, ctr: 1.90, conversion_rate: 3.4, suggested_daily: 81.60,
    interests: ["veterinário", "pet", "animais", "cachorro", "gato"],
    category: "pet", lookalikes: ["pet shop", "cuidados pet", "saúde animal"]
  },
  "farmacia": {
    cpm: 18.90, cpc: 1.42, ctr: 2.10, conversion_rate: 3.1, suggested_daily: 75.60,
    interests: ["farmácia", "medicamentos", "saúde", "remédios", "drogaria"],
    category: "saude", lookalikes: ["saúde", "bem-estar", "produtos"]
  },

  // ============= ALIMENTAÇÃO (8) =============
  "restaurante": {
    cpm: 16.80, cpc: 1.20, ctr: 2.35, conversion_rate: 3.8, suggested_daily: 68.00,
    interests: ["restaurante", "comida brasileira", "culinária", "gastronomia", "ifood"],
    category: "alimentacao", lookalikes: ["delivery", "culinária", "experiências gastronômicas"]
  },
  "pizzaria": {
    cpm: 15.50, cpc: 1.10, ctr: 2.50, conversion_rate: 4.0, suggested_daily: 62.00,
    interests: ["pizza", "pizzaria", "delivery", "comida italiana"],
    category: "alimentacao", lookalikes: ["restaurante", "delivery", "fast food"]
  },
  "hamburgueria": {
    cpm: 16.20, cpc: 1.15, ctr: 2.45, conversion_rate: 3.9, suggested_daily: 64.80,
    interests: ["hambúrguer", "burger", "fast food", "delivery"],
    category: "alimentacao", lookalikes: ["comida rápida", "sanduíches", "delivery"]
  },
  "padaria": {
    cpm: 14.80, cpc: 1.05, ctr: 2.60, conversion_rate: 3.5, suggested_daily: 59.20,
    interests: ["padaria", "pão", "confeitaria", "café da manhã"],
    category: "alimentacao", lookalikes: ["café", "confeitaria", "alimentos"]
  },
  "confeitaria": {
    cpm: 17.40, cpc: 1.28, ctr: 2.25, conversion_rate: 3.3, suggested_daily: 69.60,
    interests: ["confeitaria", "bolos", "doces", "festas", "eventos"],
    category: "alimentacao", lookalikes: ["festas", "eventos", "buffet"]
  },
  "bar": {
    cpm: 15.90, cpc: 1.18, ctr: 2.40, conversion_rate: 2.8, suggested_daily: 63.60,
    interests: ["bar", "bebidas", "drinks", "happy hour", "cerveja"],
    category: "alimentacao", lookalikes: ["entretenimento", "noite", "eventos"]
  },
  "lanchonete": {
    cpm: 14.50, cpc: 1.02, ctr: 2.55, conversion_rate: 3.6, suggested_daily: 58.00,
    interests: ["lanchonete", "lanches", "fast food", "delivery"],
    category: "alimentacao", lookalikes: ["comida rápida", "delivery", "snacks"]
  },
  "cafeteria": {
    cpm: 18.20, cpc: 1.35, ctr: 2.15, conversion_rate: 3.1, suggested_daily: 72.80,
    interests: ["café", "cafeteria", "coffee", "coworking"],
    category: "alimentacao", lookalikes: ["café especial", "espaços", "trabalho"]
  },

  // ============= E-COMMERCE & VAREJO (12) =============
  "ecommerce": {
    cpm: 18.50, cpc: 1.45, ctr: 2.10, conversion_rate: 2.8, suggested_daily: 75.00,
    interests: ["compras online", "shopee", "mercado livre", "amazon", "ofertas"],
    category: "varejo", lookalikes: ["tecnologia", "moda", "consumo digital"]
  },
  "sexshop": {
    cpm: 18.50, cpc: 1.45, ctr: 2.10, conversion_rate: 2.8, suggested_daily: 75.00,
    interests: ["intimidade", "relacionamento", "bem-estar", "casal", "produtos adultos"],
    category: "ecommerce", lookalikes: ["cosméticos", "bem-estar íntimo"]
  },
  "moda feminina": {
    cpm: 19.80, cpc: 1.52, ctr: 1.95, conversion_rate: 2.9, suggested_daily: 79.20,
    interests: ["moda", "roupas femininas", "vestidos", "tendências", "fashion"],
    category: "moda", lookalikes: ["varejo", "beleza", "acessórios"]
  },
  "moda masculina": {
    cpm: 18.90, cpc: 1.48, ctr: 2.00, conversion_rate: 2.7, suggested_daily: 75.60,
    interests: ["moda masculina", "roupas", "estilo", "casual", "formal"],
    category: "moda", lookalikes: ["varejo", "acessórios", "lifestyle"]
  },
  "calcados": {
    cpm: 17.60, cpc: 1.38, ctr: 2.20, conversion_rate: 3.0, suggested_daily: 70.40,
    interests: ["calçados", "sapatos", "tênis", "sandálias", "botas"],
    category: "moda", lookalikes: ["moda", "varejo", "acessórios"]
  },
  "joias": {
    cpm: 24.80, cpc: 2.05, ctr: 1.50, conversion_rate: 2.2, suggested_daily: 99.20,
    interests: ["joias", "bijuterias", "ouro", "prata", "acessórios"],
    category: "luxo", lookalikes: ["luxo", "presentes", "moda"]
  },
  "eletronicos": {
    cpm: 21.50, cpc: 1.68, ctr: 1.80, conversion_rate: 2.5, suggested_daily: 86.00,
    interests: ["eletrônicos", "celulares", "tecnologia", "gadgets"],
    category: "tecnologia", lookalikes: ["tech", "inovação", "digital"]
  },
  "informatica": {
    cpm: 22.40, cpc: 1.75, ctr: 1.75, conversion_rate: 2.6, suggested_daily: 89.60,
    interests: ["informática", "computadores", "notebooks", "hardware"],
    category: "tecnologia", lookalikes: ["TI", "games", "escritório"]
  },
  "moveis": {
    cpm: 20.80, cpc: 1.62, ctr: 1.85, conversion_rate: 2.4, suggested_daily: 83.20,
    interests: ["móveis", "decoração", "casa", "design", "arquitetura"],
    category: "casa", lookalikes: ["decoração", "construção", "reforma"]
  },
  "pet shop": {
    cpm: 17.20, cpc: 1.32, ctr: 2.25, conversion_rate: 3.2, suggested_daily: 68.80,
    interests: ["pet shop", "ração", "acessórios pet", "cachorro", "gato"],
    category: "pet", lookalikes: ["animais", "cuidados pet", "veterinário"]
  },
  "brinquedos": {
    cpm: 16.50, cpc: 1.25, ctr: 2.30, conversion_rate: 3.1, suggested_daily: 66.00,
    interests: ["brinquedos", "crianças", "jogos", "educação infantil"],
    category: "infantil", lookalikes: ["crianças", "família", "educação"]
  },
  "livraria": {
    cpm: 15.80, cpc: 1.20, ctr: 2.35, conversion_rate: 2.9, suggested_daily: 63.20,
    interests: ["livros", "leitura", "literatura", "educação", "cultura"],
    category: "educacao", lookalikes: ["cultura", "conhecimento", "estudos"]
  },

  // ============= SERVIÇOS PROFISSIONAIS (10) =============
  "advogado": {
    cpm: 23.60, cpc: 2.05, ctr: 1.55, conversion_rate: 3.6, suggested_daily: 95.00,
    interests: ["advogado", "direito", "jurídico", "consultoria legal", "processos"],
    category: "servicos", lookalikes: ["consultoria", "serviços profissionais"]
  },
  "contabilidade": {
    cpm: 21.50, cpc: 1.85, ctr: 1.70, conversion_rate: 2.5, suggested_daily: 87.00,
    interests: ["contabilidade", "contador", "impostos", "MEI", "declaração"],
    category: "servicos", lookalikes: ["finanças", "gestão", "empresarial"]
  },
  "consultoria": {
    cpm: 20.75, cpc: 1.95, ctr: 1.65, conversion_rate: 2.2, suggested_daily: 85.00,
    interests: ["consultoria", "negócios", "empresarial", "gestão", "estratégia"],
    category: "servicos", lookalikes: ["business", "empresarial", "treinamentos"]
  },
  "marketing digital": {
    cpm: 22.80, cpc: 1.88, ctr: 1.68, conversion_rate: 2.8, suggested_daily: 91.20,
    interests: ["marketing", "digital", "redes sociais", "tráfego pago", "SEO"],
    category: "servicos", lookalikes: ["publicidade", "agências", "digital"]
  },
  "agencia publicidade": {
    cpm: 21.90, cpc: 1.82, ctr: 1.72, conversion_rate: 2.6, suggested_daily: 87.60,
    interests: ["publicidade", "propaganda", "branding", "criação"],
    category: "servicos", lookalikes: ["marketing", "design", "comunicação"]
  },
  "web design": {
    cpm: 20.50, cpc: 1.65, ctr: 1.88, conversion_rate: 2.7, suggested_daily: 82.00,
    interests: ["web design", "sites", "UX", "UI", "desenvolvimento"],
    category: "tecnologia", lookalikes: ["design", "digital", "criação"]
  },
  "arquitetura": {
    cpm: 24.20, cpc: 2.00, ctr: 1.58, conversion_rate: 2.4, suggested_daily: 96.80,
    interests: ["arquitetura", "projetos", "construção", "design interiores"],
    category: "servicos", lookalikes: ["construção", "engenharia", "decoração"]
  },
  "engenharia": {
    cpm: 23.50, cpc: 1.92, ctr: 1.62, conversion_rate: 2.3, suggested_daily: 94.00,
    interests: ["engenharia", "projetos", "construção civil", "obras"],
    category: "servicos", lookalikes: ["construção", "arquitetura", "infraestrutura"]
  },
  "coaching": {
    cpm: 21.40, cpc: 1.78, ctr: 1.75, conversion_rate: 2.9, suggested_daily: 85.60,
    interests: ["coaching", "desenvolvimento pessoal", "motivação", "liderança"],
    category: "servicos", lookalikes: ["psicologia", "treinamentos", "palestras"]
  },
  "fotografia": {
    cpm: 19.80, cpc: 1.55, ctr: 1.92, conversion_rate: 3.0, suggested_daily: 79.20,
    interests: ["fotografia", "fotos", "eventos", "casamento", "ensaios"],
    category: "servicos", lookalikes: ["eventos", "arte", "vídeo"]
  },

  // ============= BELEZA & ESTÉTICA (6) =============
  "salao beleza": {
    cpm: 19.40, cpc: 1.55, ctr: 2.00, conversion_rate: 3.5, suggested_daily: 78.00,
    interests: ["salão", "cabelo", "beleza", "estética", "manicure"],
    category: "beleza", lookalikes: ["cosméticos", "cuidados pessoais"]
  },
  "barbearia": {
    cpm: 18.60, cpc: 1.48, ctr: 2.05, conversion_rate: 3.3, suggested_daily: 74.40,
    interests: ["barbearia", "barba", "cabelo masculino", "estilo"],
    category: "beleza", lookalikes: ["grooming", "estética masculina"]
  },
  "spa": {
    cpm: 22.80, cpc: 1.85, ctr: 1.68, conversion_rate: 2.8, suggested_daily: 91.20,
    interests: ["spa", "massagem", "relaxamento", "bem-estar"],
    category: "beleza", lookalikes: ["saúde", "turismo", "luxo"]
  },
  "maquiagem": {
    cpm: 20.20, cpc: 1.62, ctr: 1.88, conversion_rate: 3.1, suggested_daily: 80.80,
    interests: ["maquiagem", "makeup", "beleza", "cosméticos"],
    category: "beleza", lookalikes: ["produtos", "tutoriais", "influencers"]
  },
  "cosmeticos": {
    cpm: 19.50, cpc: 1.58, ctr: 1.95, conversion_rate: 3.0, suggested_daily: 78.00,
    interests: ["cosméticos", "produtos beleza", "skincare", "cuidados"],
    category: "beleza", lookalikes: ["beleza", "saúde", "bem-estar"]
  },
  "manicure": {
    cpm: 17.80, cpc: 1.42, ctr: 2.12, conversion_rate: 3.4, suggested_daily: 71.20,
    interests: ["manicure", "unhas", "nail art", "esmalteria"],
    category: "beleza", lookalikes: ["beleza", "estética", "cuidados"]
  },

  // ============= IMÓVEIS & CONSTRUÇÃO (4) =============
  "imobiliaria": {
    cpm: 24.80, cpc: 2.20, ctr: 1.50, conversion_rate: 2.0, suggested_daily: 100.00,
    interests: ["imóveis", "apartamento", "casa", "aluguel", "compra"],
    category: "imoveis", lookalikes: ["construção", "decoração", "financiamento"]
  },
  "construcao": {
    cpm: 23.20, cpc: 1.95, ctr: 1.62, conversion_rate: 2.3, suggested_daily: 92.80,
    interests: ["construção", "obras", "materiais", "reforma"],
    category: "construcao", lookalikes: ["engenharia", "arquitetura", "infraestrutura"]
  },
  "materiais construcao": {
    cpm: 21.40, cpc: 1.75, ctr: 1.78, conversion_rate: 2.5, suggested_daily: 85.60,
    interests: ["materiais construção", "ferragens", "tintas", "acabamentos"],
    category: "construcao", lookalikes: ["reforma", "construção", "ferramentas"]
  },
  "decoracao": {
    cpm: 20.60, cpc: 1.68, ctr: 1.85, conversion_rate: 2.7, suggested_daily: 82.40,
    interests: ["decoração", "interiores", "design", "móveis", "casa"],
    category: "casa", lookalikes: ["arquitetura", "móveis", "lifestyle"]
  },
};

// Função helper
export const getStaticBenchmark = (niche: string): NicheBenchmark => {
  const normalized = niche.toLowerCase().trim();
  return STATIC_BENCHMARKS[normalized] || STATIC_BENCHMARKS["academia"];
};

// Lista todos os nichos
export const getAvailableNiches = (): string[] => {
  return Object.keys(STATIC_BENCHMARKS);
};

// Verifica se nicho existe
export const nicheExists = (niche: string): boolean => {
  return niche.toLowerCase().trim() in STATIC_BENCHMARKS;
};

// Busca por categoria
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

// Estatísticas
export const getBenchmarkStats = () => {
  const niches = Object.values(STATIC_BENCHMARKS);
  const count = niches.length;
  
  return {
    total_niches: count,
    avg_cpm: (niches.reduce((sum, n) => sum + n.cpm, 0) / count).toFixed(2),
    avg_cpc: (niches.reduce((sum, n) => sum + n.cpc, 0) / count).toFixed(2),
    avg_ctr: (niches.reduce((sum, n) => sum + n.ctr, 0) / count).toFixed(2),
    avg_conversion: (niches.reduce((sum, n) => sum + n.conversion_rate, 0) / count).toFixed(2),
    categories: [...new Set(niches.map(n => n.category))].sort()
  };
};
