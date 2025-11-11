// pages/api/benchmarks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSmartBenchmarks } from '../../smartBenchmarks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Pega o nicho da query string
    const { niche } = req.query;

    // Validação
    if (!niche || typeof niche !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro "niche" é obrigatório',
        example: '/api/benchmarks?niche=academia'
      });
    }

    console.log(`🔍 API /benchmarks: Buscando "${niche}"`);

    // Busca dados inteligentes
    const data = await getSmartBenchmarks(niche);

    console.log(`✅ Dados retornados para "${niche}" (fonte: ${data.source})`);

    // Retorna resposta
    return res.status(200).json({
      success: true,
      data: data,
      meta: {
        niche_requested: niche,
        source: data.source,
        confidence: data.confidence
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
