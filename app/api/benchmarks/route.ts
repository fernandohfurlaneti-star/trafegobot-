import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ 
    message: 'API funcionando!',
    data: {
      cpm: 22.50,
      cpc: 1.75,
      interests: ['teste1', 'teste2'],
      lookalikes: ['lookalike1', 'lookalike2']
    }
  });
}
