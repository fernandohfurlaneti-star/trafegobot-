// pages/api/benchmarks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSmartBenchmarks } from '../../smartBenchmarks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { niche } = req.query;

    if (!niche || typeof niche !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Parâmetro "niche" é obrigatório'
      });
    }

    const data = await getSmartBenchmarks(niche);

    return res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Erro interno'
    });
  }
}
