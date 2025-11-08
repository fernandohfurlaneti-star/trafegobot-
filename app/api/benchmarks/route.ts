// app/api/benchmarks/route.ts
// API Route para buscar benchmarks de nichos

import { NextResponse } from 'next/server';
import { getSmartBenchmarks } from '@/smartBenchmarks';

/**
 * GET /api/benchmarks?niche=academia
 * 
 * Retorna benchmarks inteligentes para o nicho solicitado
 * 
 * @example
 * fetch('/api/benchmarks?niche=academia')
 * fetch('/api/benchmarks?niche=fitness') // correlaciona para academia
 */
export async function GET(request: Request) {
  try {
    // 1. Extrai parâmetros da URL
    const { searchParams } = new URL(request.url);
    const niche = searchParams.get('niche');

    // 2. Validação
    if (!niche) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Parâmetro "niche" é obrigatório',
          example: '/api/benchmarks?niche=academia'
        },
        { status: 400 }
      );
    }

    // 3. Validação de tipo
    if (typeof niche !== 'string' || niche.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Parâmetro "niche" deve ser uma string válida'
        },
        { status: 400 }
      );
    }

    // 4. Log (✅ CORRIGIDO)
    console.log(`🔍 API /benchmarks: Buscando "${niche}"`);

    // 5. Busca dados inteligentes
    const startTime = Date.now();
    const data = await getSmartBenchmarks(niche);
    const responseTime = Date.now() - startTime;

    // 6. Log de sucesso
    console.log(`✅ Dados retornados para "${niche}" em ${responseTime}ms (fonte: ${data.source})`);

    // 7. Retorna resposta estruturada
    return NextResponse.json(
      {
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
      },
      {
        status: 200,
        headers: {
          // Cache por 1 hora no CDN da Vercel
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    // 8. Tratamento de erros robusto
    console.error('❌ Erro na API /benchmarks:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Log detalhado em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', errorStack);
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno do servidor',
        message: errorMessage,
        // Só mostra stack em desenvolvimento
        ...(process.env.NODE_ENV === 'development' && { stack: errorStack })
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/benchmarks
 * Body: { "niche": "academia" }
 * 
 * Alternativa ao GET usando POST (opcional)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { niche } = body;

    if (!niche) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Campo "niche" é obrigatório no body'
        },
        { status: 400 }
      );
    }

    console.log(`🔍 API POST /benchmarks: Buscando "${niche}"`);

    const data = await getSmartBenchmarks(niche);

    return NextResponse.json({
      success: true,
      data: data,
      meta: {
        niche_requested: niche,
        source: data.source,
        confidence: data.confidence
      }
    });

  } catch (error) {
    console.error('❌ Erro na API POST /benchmarks:', error);

    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao processar requisição',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
