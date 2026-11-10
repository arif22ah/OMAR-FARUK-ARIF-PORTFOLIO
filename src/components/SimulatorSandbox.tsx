"use client";

import React, { useState, useEffect } from "react";

interface SimulatorSandboxProps {
  selectedSim: number;
  setSelectedSim: (id: number) => void;
  onBack: () => void;
}

const sqlScenarios = [
  {
    prompt: "Which region had the biggest drop in sales last quarter?",
    guard: "✓ AST Validated (Read-Only SELECT)",
    isBlocked: false,
    sql: `WITH quarterly_totals AS (\n  SELECT region, DATE_TRUNC('quarter', sale_date) AS qtr, SUM(revenue_usd) AS rev\n  FROM regional_sales GROUP BY 1, 2\n)\nSELECT region, ROUND(100.0 * (rev - LAG(rev) OVER (PARTITION BY region ORDER BY qtr)) / LAG(rev) OVER (PARTITION BY region ORDER BY qtr), 2) AS pct_drop\nFROM quarterly_totals ORDER BY pct_drop ASC LIMIT 3;`,
    synthesis: "North-West Region contracted -18.4% QoQ (-$142,800), driven by delayed enterprise renewals.",
  },
  {
    prompt: "Top 3 product categories by repeat customer retention?",
    guard: "✓ AST Validated (Read-Only SELECT)",
    isBlocked: false,
    sql: `SELECT p.category_name,\n       ROUND(COUNT(DISTINCT CASE WHEN o.order_count > 1 THEN o.customer_id END) * 100.0 / COUNT(DISTINCT o.customer_id), 1) AS retention_pct\nFROM customer_orders o JOIN products p USING (product_id)\nGROUP BY 1 ORDER BY 2 DESC LIMIT 3;`,
    synthesis: "Cloud Analytics Add-ons lead repeat retention at 68.5%, outperforming accessories by +29.5 points.",
  },
  {
    prompt: "[Adversarial Injection] DROP TABLE regional_sales; --",
    guard: "⛔ BLOCKED BY AST GUARDRAIL (DML/DDL Prohibited)",
    isBlocked: true,
    sql: `-- INTERCEPTED BEFORE POSTGRESQL EXECUTION:\nDROP TABLE regional_sales; --\n\n[GuardrailSecurityException]: Statement type 'DROP' violates read-only policy.`,
    synthesis: "Adversarial injection blocked in 0.8ms at the AST parser layer before reaching PostgreSQL.",
  },
];

const driftTimeline = [
  { week: "Week 1 (Baseline)", psi: 0.04, auc: 0.892, status: "HEALTHY", note: "PSI = 0.04 (<0.25). Feature distributions match training baseline." },
  { week: "Week 2", psi: 0.12, auc: 0.880, status: "HEALTHY", note: "Minor seasonal variance in customer_tenure. PSI = 0.12." },
  { week: "Week 3", psi: 0.21, auc: 0.849, status: "WATCH", note: "Moderate covariate shift detected (KS-test p = 0.03)." },
  { week: "Week 4 (Drift Breach!)", psi: 0.32, auc: 0.789, status: "RETRAINING TRIGGERED", note: "ALERT: PSI = 0.32 breached 0.25 threshold! Triggering automated XGBoost retraining..." },
  { week: "Week 5 (Model v1.3)", psi: 0.05, auc: 0.896, status: "PROMOTED IN MLFLOW", note: "Challenger model v1.3 validated (ROC-AUC = 0.896) and promoted to Production." },
];

export default function SimulatorSandbox({
  selectedSim,
  setSelectedSim,
  onBack,
}: SimulatorSandboxProps) {
  const [sqlIdx, setSqlIdx] = useState(0);
  const [driftIdx, setDriftIdx] = useState(0);
  const [causalStrat, setCausalStrat] = useState<"blanket" | "predictive" | "uplift">("uplift");
  const [telemetry, setTelemetry] = useState<number[]>([18, 22, 19, 24, 20, 21, 23, 19, 22, 20, 24, 18]);
  const [abSessions, setAbSessions] = useState(20000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => [...prev.slice(1), Math.floor(16 + Math.random() * 12)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const injectAnomaly = () => {
    setTelemetry((prev) => [...prev.slice(1), 95]);
  };

  const causalMetrics = {
    blanket: { targeted: "100,000", cost: "$150,000", roi: "+$18,400" },
    predictive: { targeted: "45,000", cost: "$67,500", roi: "+$64,100" },
    uplift: { targeted: "28,400", cost: "$42,600", roi: "+$148,200" },
  }[causalStrat];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Interactive Architecture Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Live System Simulators
          </h2>
        </div>
        <button
          onClick={onBack}
          className="self-start px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200"
        >
          ← Back to Portfolio Overview
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 1, name: "1. Multi-Agent Text-to-SQL" },
          { id: 2, name: "2. Data Drift & Retraining" },
          { id: 3, name: "3. Causal Uplift Modeling" },
          { id: 4, name: "4. Streaming Anomaly Detection" },
          { id: 5, name: "5. Hybrid RecSys + A/B Test" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSim(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition ${
              selectedSim === tab.id
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {selectedSim === 1 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white">
            1. Multi-Agent Text-to-SQL Engine with AST Guardrails
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2.5">
              {sqlScenarios.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSqlIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition ${
                    sqlIdx === idx
                      ? "bg-slate-800 border-cyan-500 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-300"
                  }`}
                >
                  {item.prompt}
                </button>
              ))}
            </div>
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">GENERATED SQL</span>
                  <span className={sqlScenarios[sqlIdx].isBlocked ? "text-rose-400 font-bold" : "text-emerald-400"}>
                    {sqlScenarios[sqlIdx].guard}
                  </span>
                </div>
                <pre className="text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                  {sqlScenarios[sqlIdx].sql}
                </pre>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
                {sqlScenarios[sqlIdx].synthesis}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedSim === 2 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">
              2. Production Data Drift (PSI) & Auto-Retraining Simulator
            </h3>
            <button
              onClick={() => setDriftIdx((prev) => (prev + 1) % driftTimeline.length)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Simulate Next Production Week (+1 Batch)
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Timeline</div>
              <div className="text-xl font-bold text-white font-mono mt-1">
                {driftTimeline[driftIdx].week}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">PSI Score (Threshold 0.25)</div>
              <div className={`text-xl font-bold font-mono mt-1 ${driftTimeline[driftIdx].psi >= 0.25 ? "text-rose-400" : "text-emerald-400"}`}>
                {driftTimeline[driftIdx].psi.toFixed(2)}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Live ROC-AUC</div>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                {driftTimeline[driftIdx].auc.toFixed(3)}
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
            [{driftTimeline[driftIdx].status}] {driftTimeline[driftIdx].note}
          </div>
        </div>
      )}

      {selectedSim === 3 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white">
            3. Causal Uplift Simulator: Promotional Discount Targeting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(["blanket", "predictive", "uplift"] as const).map((strat) => (
              <button
                key={strat}
                onClick={() => setCausalStrat(strat)}
                className={`p-4 rounded-xl border text-left transition ${
                  causalStrat === strat
                    ? "bg-violet-500/15 border-violet-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                <div className="font-bold text-xs uppercase font-mono">{strat} Strategy</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {strat === "blanket"
                    ? "Send 15% discount to all 100k users."
                    : strat === "predictive"
                    ? "Target high-propensity organic buyers."
                    : "Target strictly 'Persuadables' (CATE > +8%)."}
                </div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Users Targeted</div>
              <div className="text-xl font-bold text-white font-mono mt-1">{causalMetrics.targeted}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Promo Cost</div>
              <div className="text-xl font-bold text-amber-400 font-mono mt-1">{causalMetrics.cost}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Net Incremental ROI</div>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{causalMetrics.roi}</div>
            </div>
          </div>
        </div>
      )}

      {selectedSim === 4 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">
              4. Real-Time Telemetry Stream (PyTorch Autoencoder MSE)
            </h3>
            <button
              onClick={injectAnomaly}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
            >
              ⚡ Inject Sensor Anomaly Spike
            </button>
          </div>
          <div className="flex items-end gap-2 h-40 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            {telemetry.map((val, i) => (
              <div
                key={i}
                style={{ height: `${val}%` }}
                className={`flex-1 rounded-t transition-all duration-300 ${
                  val > 65 ? "bg-rose-500" : "bg-emerald-500/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {selectedSim === 5 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">
              5. Hybrid Recommender Statistical A/B Test Simulator
            </h3>
            <button
              onClick={() => setAbSessions((s) => s + 10000)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
            >
              + Simulate 10,000 User Sessions
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">CONTROL (Popularity)</div>
              <div className="text-2xl font-bold text-white font-mono mt-1">4.12% CTR</div>
              <div className="text-xs text-slate-400 mt-1">{abSessions.toLocaleString()} Sessions</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40">
              <div className="text-xs font-mono text-emerald-300">TREATMENT (Hybrid PyTorch)</div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">5.68% CTR (+37.8%)</div>
              <div className="text-xs text-slate-300 mt-1">{abSessions.toLocaleString()} Sessions</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-cyan-400">TWO-SAMPLE Z-TEST</div>
              <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">p = 0.00018</div>
              <div className="text-xs text-emerald-400 mt-1">✓ Statistically Significant</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
