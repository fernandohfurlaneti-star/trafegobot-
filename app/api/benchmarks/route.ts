import { NextResponse } from 'next/server';
import { getSmartBenchmarks } from '../../../smartBenchmarks';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const niche = searchParams.get('niche');

    if (!niche) {
      return NextResponse.json(
        { error: 'Parâmetro "niche" é obrigatório' },
        { status: 400 }
      );
    }

    console.log(`🔍 Buscando benchmark para: ${niche}`);
    const data = await getSmartBenchmarks(niche);

    return NextResponse.json({
      success: true,
      data: data,
      meta: {
        niche_requested: niche,
        source: data.source,
        confidence: data.confidence,
        last_updated: data.last_updated
      }
    });

  } catch (error) {
    console.error('❌ Erro na API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
