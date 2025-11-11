// pages/api/benchmarks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSmartBenchmarks } from '../../smartBenchmarks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Só permite GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { niche } = req.query;

  // Validação
  if (!niche || typeof niche !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Parâmetro "niche" é obrigatório',
      example: '/api/benchmarks?niche=academia'
    });
  }

  try {
    console.log(`🔍 API /benchmarks: Buscando "${niche}"`);

    const startTime = Date.now();
    const data = await getSmartBenchmarks(niche);
    const responseTime = Date.now() - startTime;

    console.log(`✅ Dados retornados para "${niche}" em ${responseTime}ms`);

    // Sucesso
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    return res.status(200).json({
      success: true,
      data: data,
      meta: {
        niche_requested: niche,
        niche_matched: data.category || 'unknown',
        source: data.source,
        confidence: data.confidence,
        last_updated: data.last_updated,
        response_time_ms: responseTime,
        cache_status: data.source === 'cache' ? 'hit' : 'miss'
      }
    });

  } catch (error) {
    console.error('❌ Erro na API /benchmarks:', error);

    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}
