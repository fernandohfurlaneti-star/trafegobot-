{/* Site funcionando! */}
import { useState, FormEvent } from "react";

// VERSÃO SIMPLIFICADA - SEM COMPONENTES EXTERNOS
export default function Home() {
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setLoading(true);
    
    // Simulação de busca
    setTimeout(() => {
      setResult({
        niche,
        cpm: 22.50,
        cpc: 1.75,
        ctr: 1.80,
        suggested_daily: 85.00,
        message: `✅ Dados encontrados para: ${niche}`
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>🚀 TrafegoBot</h1>
      <p>Encontre benchmarks para seu nicho</p>
      
      <form onSubmit={handleSearch} style={{ margin: '20px 0' }}>
        <input
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="Digite seu nicho (ex: academia)..."
          style={{
            padding: '12px',
            width: '300px',
            fontSize: '16px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 24px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Buscando...' : '🔍 Buscar'}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>📊 Resultados para: "{result.niche}"</h2>
          <p>{result.message}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', margin: '20px 0' }}>
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <h3>💰 CPM</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>R$ {result.cpm}</p>
              <small>Custo por 1000 impressões</small>
            </div>
            
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <h3>🖱️ CPC</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>R$ {result.cpc}</p>
              <small>Custo por clique</small>
            </div>
            
            <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px', textAlign: 'center' }}>
              <h3>📈 CTR</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0070f3' }}>{result.ctr}%</p>
              <small>Taxa de clique</small>
            </div>
          </div>

          <div style={{ margin: '20px 0' }}>
            <h3>💡 Investimento Diário Sugerido</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#00a000' }}>R$ {result.suggested_daily}</p>
          </div>
        </div>
      )}
    </div>
  );
}
