import { useState, FormEvent } from "react";
// ✅ Import correto - smartBenchmarks.ts na raiz do projeto
import { getSmartBenchmarks } from "../smartBenchmarks";

interface BenchmarkResult {
  niche: string;
  cpm: number;
  cpc: number;
  ctr: number;
  conversion_rate: number;
  suggested_daily: number;
  trend_score: number;
  season_factor: number;
  confidence: number;
  source: string;
  last_updated: string;
  interests: string[];
  category: string;
  lookalikes: string[];
}

export default function Home() {
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState<BenchmarkResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!niche.trim()) {
      setError("Digite um nicho para buscar");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await getSmartBenchmarks(niche);
      
      setResult({
        niche,
        ...data
      });
      
    } catch (err) {
      setError("Erro ao buscar dados. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#0070f3', margin: 0 }}>🚀 TrafegoBot</h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Benchmarks inteligentes com dados reais para seu nicho
        </p>
        
        <form onSubmit={handleSearch} style={{ margin: '30px 0' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Digite seu nicho (ex: academia, restaurante)..."
              style={{
                padding: '14px',
                flex: 1,
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '14px 32px',
                backgroundColor: loading ? '#ccc' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? '⏳ Buscando...' : '🔍 Buscar'}
            </button>
          </div>
          
          {error && (
            <p style={{ color: '#e00', marginTop: '10px', fontSize: '14px' }}>
              ⚠️ {error}
            </p>
          )}
        </form>

        {result && (
          <div style={{ marginTop: '30px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0 }}>
                📊 Resultados: <span style={{ color: '#0070f3' }}>"{result.niche}"</span>
              </h2>
              <span style={{
                padding: '4px 12px',
                backgroundColor: result.source === 'real_api' ? '#00a000' : '#ff9800',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {result.source === 'real_api' ? '✓ Dados Reais' : '⚡ Cache'}
              </span>
            </div>

            {/* Grid de Métricas */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '15px', 
              margin: '20px 0' 
            }}>
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#f0f8ff', 
                borderRadius: '8px',
                textAlign: 'center' 
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>💰 CPM</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0070f3', margin: 0 }}>
                  R$ {result.cpm.toFixed(2)}
                </p>
                <small style={{ color: '#999' }}>por 1000 impressões</small>
              </div>
              
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#f0fff0', 
                borderRadius: '8px',
                textAlign: 'center' 
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>🖱️ CPC</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00a000', margin: 0 }}>
                  R$ {result.cpc.toFixed(2)}
                </p>
                <small style={{ color: '#999' }}>por clique</small>
              </div>
              
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#fff8f0', 
                borderRadius: '8px',
                textAlign: 'center' 
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>📈 CTR</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff9800', margin: 0 }}>
                  {result.ctr.toFixed(2)}%
                </p>
                <small style={{ color: '#999' }}>taxa de clique</small>
              </div>

              <div style={{ 
                padding: '20px', 
                backgroundColor: '#f5f0ff', 
                borderRadius: '8px',
                textAlign: 'center' 
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>🎯 Conversão</h3>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#9c27b0', margin: 0 }}>
                  {result.conversion_rate.toFixed(1)}%
                </p>
                <small style={{ color: '#999' }}>taxa de conversão</small>
              </div>
            </div>

            {/* Investimento */}
            <div style={{
              marginTop: '25px',
              padding: '25px',
              backgroundColor: '#e8f5e9',
              borderRadius: '8px'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#00a000' }}>
                💡 Investimento Diário Sugerido
              </h3>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#00a000', margin: 0 }}>
                R$ {result.suggested_daily.toFixed(2)}
              </p>
              <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0 0' }}>
                📊 Tendência: {result.trend_score}/100 | 
                🌡️ Fator sazonal: {result.season_factor.toFixed(2)}x |
                💯 Confiança: {(result.confidence * 100).toFixed(0)}%
              </p>
            </div>

            {/* Interesses */}
            <div style={{ marginTop: '25px' }}>
              <h3 style={{ marginBottom: '12px' }}>🎯 Interesses Relacionados</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#e3f2fd',
                      color: '#0070f3',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '25px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#999',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0 }}>
                Atualizado: {new Date(result.last_updated).toLocaleString('pt-BR')}
              </p>
              <p style={{ margin: '4px 0 0 0' }}>
                Categoria: {result.category} | Fonte: BCB (IPCA)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
