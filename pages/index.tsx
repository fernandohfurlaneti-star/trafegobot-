import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, DollarSign, TrendingUp, Users, Sparkles, AlertCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { getNicheBenchmarks } from "@/data/benchmarks";

// COMPONENTE METRIC CARD
const MetricCard = ({ label, value, subtitle }: { label: string; value: string; subtitle: string }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div className="mb-2">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </div>
);

// COMPONENTE RESULT CARD
const ResultCard = ({ title, content }: { title: string; content: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Template copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copiado!" : "Copiar"}
        </Button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{content}</pre>
      </div>
    </div>
  );
};

// COMPONENTE PASSWORD GATE
const PasswordGate = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600">Digite a senha fornecida para acessar a ferramenta</p>
        </div>
        
        <Input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite a senha..."
          className="mb-4"
        />
        
        <Button 
          onClick={() => {
            if (input === "acesso123") {
              setAuthenticated(true);
              toast.success("Acesso liberado!");
            } else {
              toast.error("Senha incorreta");
            }
          }}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Acessar Ferramenta
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Ferramenta profissional para criação de públicos Instagram Ads
        </p>
      </div>
    </div>
  );
};

// POST TYPE AUTOMÁTICO (HELPER)
const getAutoPostType = (obj: string) => {
  const map: Record<string, string> = {
    "Reconhecimento de marca": "Feed (imagem única)",
    "Engajamento": "Carrossel",
    "Geração de cadastros": "Reels",
    "Conversão / Vendas": "Stories"
  };
  return map[obj] || "Feed (imagem única)";
};

// LÓGICA DE CÁLCULOS
const calculateScenarios = (niche: string, userBudget: number | undefined, days: number, objective: string, postType: string) => {
  const benchmarks = getNicheBenchmarks(niche);
  
  const REACH_MIN = 0.5;
  const REACH_MAX = 1.0;

  const userDaily = userBudget || 0;
  const userImpressions = userDaily > 0 ? Math.round((userDaily / benchmarks.cpm) * 1000) : 0;
  const userClicks = userDaily > 0 ? Math.round(userImpressions * (benchmarks.ctr / 100)) : 0;
  const userConversions = userDaily > 0 ? Math.round(userClicks * (benchmarks.conversion_rate / 100)) : 0;
  const userEffectiveCPC = userClicks > 0 ? userDaily / userClicks : 0;

  const suggestedDaily = benchmarks.suggested_daily;
  const suggestedImpressions = Math.round((suggestedDaily / benchmarks.cpm) * 1000);
  const suggestedClicks = Math.round(suggestedImpressions * (benchmarks.ctr / 100));
  const suggestedConversions = Math.round(suggestedClicks * (benchmarks.conversion_rate / 100));
  const suggestedEffectiveCPC = suggestedClicks > 0 ? suggestedDaily / suggestedClicks : 0;

  return {
    userScenario: {
      dailyBudget: userDaily,
      totalBudget: userDaily * days,
      dailyImpressions: userImpressions,
      dailyClicks: userClicks,
      dailyConversions: userConversions,
      reach: {
        min: Math.round(userImpressions * REACH_MIN),
        max: Math.round(userImpressions * REACH_MAX)
      },
      effectiveCPC: Number(userEffectiveCPC.toFixed(2))
    },
    suggestedScenario: {
      dailyBudget: suggestedDaily,
      totalBudget: suggestedDaily * days,
      dailyImpressions: suggestedImpressions,
      dailyClicks: suggestedClicks,
      dailyConversions: suggestedConversions,
      reach: {
        min: Math.round(suggestedImpressions * REACH_MIN),
        max: Math.round(suggestedImpressions * REACH_MAX)
      },
      effectiveCPC: Number(suggestedEffectiveCPC.toFixed(2))
    },
    benchmarks: {
      cpm: benchmarks.cpm,
      cpc: benchmarks.cpc,
      ctr: benchmarks.ctr,
      conversion_rate: benchmarks.conversion_rate,
      interests: benchmarks.interests
    },
    meta: {
      niche,
      objective,
      postType: postType || getAutoPostType(objective),
      days,
      generatedAt: new Date().toISOString()
    }
  };
};

// GERADOR DE TEMPLATES
const generateGerenciadorTemplate = (result: any) => {
  const { userScenario, suggestedScenario, benchmarks, meta } = result;
  
  return `════════════════════════════════════════
📱 PÚBLICO RECOMENDADO – ${meta.niche}
════════════════════════════════════════

🎯 OBJETIVO: ${meta.objective}
📸 TIPO DE POST: ${meta.postType}

👥 AUDIÊNCIA:
  Tipo: Novo Público
  Localização: Brasil
  Idade: 25–50
  Gênero: Todos

  Interesses (copie e cole no Insta):
    • ${benchmarks.interests[0]}
    • ${benchmarks.interests[1]}
    • ${benchmarks.interests[2]}
    • ${benchmarks.interests[3]}
    • ${benchmarks.interests[4]}

💰 INVESTIMENTOS COMPARADOS:
  💵 SEU ORÇAMENTO: R$ ${userScenario.dailyBudget.toFixed(2)} / dia
  💎 IDEAL RECOMENDADO: R$ ${suggestedScenario.dailyBudget.toFixed(2)} / dia
  📅 DURAÇÃO: ${meta.days} dias
  💰 TOTAL SUGERIDO: R$ ${suggestedScenario.totalBudget.toFixed(2)}

📊 RESULTADOS ESPERADOS:

  === COM SEU ORÇAMENTO ===
  👥 ${userScenario.dailyImpressions.toLocaleString()} impressões/dia
  🖱️ ${userScenario.dailyClicks.toLocaleString()} cliques/dia
  📈 ${userScenario.dailyConversions.toLocaleString()} conversões/dia
  👤 ${userScenario.reach.min.toLocaleString()}-${userScenario.reach.max.toLocaleString()} pessoas/dia

  === COM INVESTIMENTO IDEAL ===
  👥 ${suggestedScenario.dailyImpressions.toLocaleString()} impressões/dia
  🖱️ ${suggestedScenario.dailyClicks.toLocaleString()} cliques/dia
  📈 ${suggestedScenario.dailyConversions.toLocaleString()} conversões/dia
  👤 ${suggestedScenario.reach.min.toLocaleString()}-${suggestedScenario.reach.max.toLocaleString()} pessoas/dia

✅ JUSTIFICATIVA:
Campanhas de ${meta.objective.toLowerCase()} em nichos de ${meta.niche} 
costumam apresentar CPM médio de R$ ${benchmarks.cpm} e CTR de ${benchmarks.ctr}%.`;
};

const generateTurbinarTemplate = (result: any) => {
  const { userScenario, suggestedScenario, benchmarks, meta } = result;
  
  return `⚡ TURBINAR CAMPANHA - ${meta.niche.toUpperCase()}

🎯 OBJETIVO: ${meta.objective}
📅 DURAÇÃO: ${meta.days} dias
📍 PÚBLICO: Brasil, 25-50 anos

💵 ORÇAMENTOS:
• Seu investimento: R$ ${userScenario.dailyBudget.toFixed(2)}/dia
• Ideal para resultados: R$ ${suggestedScenario.dailyBudget.toFixed(2)}/dia
• Total sugerido: R$ ${suggestedScenario.totalBudget.toFixed(2)}

🎯 SUGESTÕES DE OTIMIZAÇÃO:
1. Use ${meta.postType} para ${meta.objective.toLowerCase()}
2. Interesses principais: ${benchmarks.interests.slice(0, 3).join(', ')}
3. Horário ideal: 19h-22h (alto engajamento)
4. Call-to-action: "Saiba mais"

📈 PROJEÇÃO DE RESULTADOS:

[SEU INVESTIMENTO]
→ ${userScenario.dailyImpressions.toLocaleString()} impressões/dia
→ ${userScenario.dailyClicks.toLocaleString()} cliques/dia
→ ${userScenario.dailyConversions.toLocaleString()} conversões/dia

[INVESTIMENTO IDEAL]
→ ${suggestedScenario.dailyImpressions.toLocaleString()} impressões/dia
→ ${suggestedScenario.dailyClicks.toLocaleString()} cliques/dia
→ ${suggestedScenario.dailyConversions.toLocaleString()} conversões/dia

💡 DICA: Ajuste o orçamento conforme resultados da primeira semana.`;
};

// COMPONENTE PRINCIPAL
const Index = () => {
  const [niche, setNiche] = useState("");
  const [objective, setObjective] = useState("Reconhecimento de marca");
  const [postType, setPostType] = useState("auto");
  const [days, setDays] = useState(7);
  const [dailyBudget, setDailyBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const formatBRL = (v: number) => `R$ ${Number(v).toFixed(2)}`;

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!niche.trim()) {
      toast.error("Por favor, insira um nicho");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const calcResult = calculateScenarios(
          niche,
          dailyBudget === "" ? undefined : Number(dailyBudget),
          Number(days) || 7,
          objective,
          postType === "auto" ? "" : postType
        );

        const response = {
          ...calcResult,
          templateGerenciador: generateGerenciadorTemplate(calcResult),
          templateTurbinar: generateTurbinarTemplate(calcResult),
        };

        setResult(response);
        toast.success("Público gerado com sucesso!");
      } catch (err) {
        toast.error("Erro ao gerar público");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const handleReset = () => {
    setNiche("");
    setObjective("Reconhecimento de marca");
    setPostType("auto");
    setDays(7);
    setDailyBudget("");
    setResult(null);
  };

  return (
    <PasswordGate>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* HEADER */}
        <header className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TrafegoBot</h1>
                <p className="text-sm text-gray-600">Seu assistente IA para públicos do Instagram</p>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* FORM SECTION */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
              Configuração do Público
            </h2>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="niche" className="text-gray-700">Nicho / Segmento</Label>
                  <Input
                    id="niche"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="ex: academia, ecommerce, restaurante..."
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="objective" className="text-gray-700">Objetivo da Campanha</Label>
                  <Select value={objective} onValueChange={(value) => {
                    setObjective(value);
                    // Sugerir post type mas não forçar
                    const suggestion = getAutoPostType(value);
                    if (postType === "auto") {
                      setPostType(suggestion);
                      toast.info(`Sugerimos: ${suggestion}`, { duration: 2000 });
                    }
                  }}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reconhecimento de marca">Reconhecimento de marca</SelectItem>
                      <SelectItem value="Engajamento">Engajamento</SelectItem>
                      <SelectItem value="Geração de cadastros">Geração de cadastros</SelectItem>
                      <SelectItem value="Conversão / Vendas">Conversão / Vendas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="postType" className="text-gray-700">Tipo de Post</Label>
                  <Select value={postType} onValueChange={setPostType}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Automático (pelo objetivo)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Automático (pelo objetivo)</SelectItem>
                      <SelectItem value="Feed (imagem única)">Feed (imagem única)</SelectItem>
                      <SelectItem value="Carrossel">Carrossel</SelectItem>
                      <SelectItem value="Reels">Reels</SelectItem>
                      <SelectItem value="Stories">Stories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="days" className="text-gray-700">Duração (dias)</Label>
                  <Input
                    id="days"
                    type="number"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    min={1}
                    max={30}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="dailyBudget" className="text-gray-700">Orçamento diário (opcional)</Label>
                  <Input
                    id="dailyBudget"
                    type="number"
                    min={0}
                    step="0.01"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    className="mt-2"
                    placeholder="Ex: 100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Se preencher, usaremos esse valor como Investimento Real/dia.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-initial bg-blue-500 hover:bg-blue-600"
                >
                  {loading ? "Gerando..." : "Gerar Público"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading}
                >
                  Limpar
                </Button>
              </div>
            </form>
          </div>

          {/* RESULTS SECTION */}
          {result && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* INVESTIMENTO COMPARADO */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm text-gray-600">Investimento Real</h3>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {formatBRL(result.userScenario.dailyBudget)} / dia
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Total ({result.meta.days} dias): <strong>{formatBRL(result.userScenario.totalBudget)}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{result.meta.postType}</p>
                      <p className="text-sm text-gray-500 mt-1">{result.meta.objective}</p>
                    </div>
                  </div>
                  
                  {result.userScenario.dailyBudget > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Impressões/dia</p>
                          <p className="font-semibold text-gray-900">{result.userScenario.dailyImpressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Cliques/dia</p>
                          <p className="font-semibold text-gray-900">{result.userScenario.dailyClicks.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 rounded-xl shadow border border-blue-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm text-blue-700">Investimento Recomendado</h3>
                      <p className="text-2xl font-bold text-blue-900 mt-2">
                        {formatBRL(result.suggestedScenario.dailyBudget)} / dia
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Total ({result.meta.days} dias): <strong>{formatBRL(result.suggestedScenario.totalBudget)}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-700">CPM: {formatBRL(result.benchmarks.cpm)}</p>
                      <p className="text-sm text-blue-600 mt-1">CPC: {formatBRL(result.benchmarks.cpc)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-blue-700">Impressões/dia</p>
                        <p className="font-semibold text-blue-900">{result.suggestedScenario.dailyImpressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-blue-700">Cliques/dia</p>
                        <p className="font-semibold text-blue-900">{result.suggestedScenario.dailyClicks.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MÉTRICAS POR CENÁRIO */}
              <div className="grid gap-6">
                {/* MÉTRICAS DO INVESTIMENTO REAL */}
                {result.userScenario.dailyBudget > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      📊 Métricas com Seu Investimento (R$ {result.userScenario.dailyBudget}/dia)
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <MetricCard label="Impressões/dia" value={result.userScenario.dailyImpressions.toLocaleString()} subtitle="Pessoas que verão seu anúncio" />
                      <MetricCard label="Cliques/dia" value={result.userScenario.dailyClicks.toLocaleString()} subtitle="Pessoas que clicarão" />
                      <MetricCard label="Conversões/dia" value={result.userScenario.dailyConversions.toLocaleString()} subtitle="Resultados esperados" />
                      <MetricCard label="Alcance/dia" value={`${result.userScenario.reach.min.toLocaleString()}-${result.userScenario.reach.max.toLocaleString()}`} subtitle="Pessoas alcançadas" />
                    </div>
                  </div>
                )}
                
                {/* MÉTRICAS DO INVESTIMENTO SUGERIDO */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💎 Métricas com Investimento Sugerido (R$ {result.suggestedScenario.dailyBudget}/dia)
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <MetricCard label="Impressões/dia" value={result.suggestedScenario.dailyImpressions.toLocaleString()} subtitle="Pessoas que verão seu anúncio" />
                    <MetricCard label="Cliques/dia" value={result.suggestedScenario.dailyClicks.toLocaleString()} subtitle="Pessoas que clicarão" />
                    <MetricCard label="Conversões/dia" value={result.suggestedScenario.dailyConversions.toLocaleString()} subtitle="Resultados esperados" />
                    <MetricCard label="Alcance/dia" value={`${result.suggestedScenario.reach.min.toLocaleString()}-${result.suggestedScenario.reach.max.toLocaleString()}`} subtitle="Pessoas alcançadas" />
                  </div>
                </div>
              </div>

              {/* TEMPLATES */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Templates Prontos</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ResultCard
                    title="📱 Template Gerenciador"
                    content={result.templateGerenciador}
                  />
                  <ResultCard
                    title="⚡ Template Turbinar"
                    content={result.templateTurbinar}
                  />
                </div>
              </div>

              {/* INFO FOOTER */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  <strong>Dica:</strong> Os valores apresentados são estimativas baseadas em benchmarks do mercado brasileiro. 
                  Ajuste conforme os resultados reais da sua campanha.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </PasswordGate>
  );
};

export default Index;
