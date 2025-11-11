// smartBenchmarks.ts - SISTEMA INTELIGENTE COM APIs REAIS + ATUALIZAÇÃO AUTOMÁTICA
// Localização: RAIZ DO PROJETO (mesmo nível do package.json)

// ✅ IMPORTA OS DADOS ESTÁTICOS
import { STATIC_BENCHMARKS, NicheBenchmark, getStaticBenchmark } from './data/benchmarks';

// ============= TIPOS =============
interface SmartBenchmarkData {
  // ✅ Campos BASE da API
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
  
  // ✅ Campos EXTENDIDOS para a página
  season_factor: number;
  economic_factor: number;
  api_used: string[];
  category: string;
  niche?: string;
}

// ============= CORRELAÇÃO DE NICHOS (100+ palavras-chave) =============
const NICHE_CORRELATION: Record<string, string> = {
  // FITNESS (15)
  'academia': 'academia', 'gym': 'academia', 'fitness': 'academia', 
  'musculação': 'academia', 'musculacao': 'academia', 'crossfit': 'academia',
  'personal': 'personal trainer', 'personal trainer': 'personal trainer',
  'yoga': 'yoga', 'pilates': 'yoga', 'meditação': 'yoga', 'meditacao': 'yoga',
  'nutrição': 'nutricao', 'nutricao': 'nutricao', 'nutricionista': 'nutricao',
  
  // SAÚDE (20)
  'fisioterapia': 'fisioterapia', 'fisioterapeuta': 'fisioterapia',
  'psicólogo': 'psicologo', 'psicologo': 'psicologo', 'psicologia': 'psicologo',
  'terapia': 'psicologo', 'terapeuta': 'psicologo',
  'dentista': 'dentista', 'odontologia': 'dentista', 'dental': 'dentista',
  'ortodontia': 'dentista', 'clareamento': 'dentista',
  'clínica estética': 'clinica estetica', 'clinica estetica': 'clinica estetica',
  'estética': 'clinica estetica', 'estetica': 'clinica estetica',
  'botox': 'clinica estetica', 'harmonização': 'clinica estetica',
  'veterinário': 'veterinario', 'veterinario': 'veterinario', 'vet': 'veterinario',
  'farmácia': 'farmacia', 'farmacia': 'farmacia', 'drogaria': 'farmacia',
  
  // ALIMENTAÇÃO (20)
  'restaurante': 'restaurante', 'comida': 'restaurante', 'delivery': 'restaurante',
  'gastronomia': 'restaurante', 'culinária': 'restaurante', 'culinaria': 'restaurante',
  'pizza': 'pizzaria', 'pizzaria': '
