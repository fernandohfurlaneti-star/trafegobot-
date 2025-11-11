// pages/api/test.ts - API SIMPLES DE TESTE
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('✅ API TESTE CHAMADA!');
  
  return res.status(200).json({
    success: true,
    message: '🚀 API TESTE FUNCIONANDO!',
    timestamp: new Date().toISOString(),
    data: {
      cpm: 22.50,
      cpc: 1.75,
      ctr: 1.8,
      conversion_rate: 3.2,
      suggested_daily: 85.00
    }
  });
}
