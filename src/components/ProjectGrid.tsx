"use client";

import React, { useState } from "react";
import { productionProjects } from "@/data/portfolioData";
import { ProjectCategory } from "@/types/portfolio";
import { Sliders, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface ProjectGridProps {
  onLaunchSimulator: (projectId: number) => void;
}

export default function ProjectGrid({ onLaunchSimulator }: ProjectGridProps) {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    filter === "all"
      ? productionProjects
      : productionProjects.filter((p) => p.category === filter);

  return (
    <section id="projects-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Production Data Science Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            5 End-to-End Data Science Systems
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(["all", "genai", "mlops", "causal"] as ProjectCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                filter === cat
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat === "all"
                ? "All Systems (5)"
                : cat === "genai"
                ? "Agentic SQL"
                : cat === "mlops"
                ? "Drift & Streaming"
                : "Causality & A/B"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-400">
                    #{project.number}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>

              <button
                onClick={() => onLaunchSimulator(project.id)}
                className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 font-mono text-xs font-semibold transition flex items-center gap-2 shrink-0"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Launch Interactive Simulator</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-1.5">
                  <div className="text-xs font-mono uppercase text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Business Bottleneck:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Data Science Architecture:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                  <ul className="space-y-1.5 pt-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                      Validation Metrics
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center"
                        >
                          <div className="text-sm sm:text-base font-extrabold text-white font-mono">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase text-slate-400">
                      Execution Pipeline
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.workflow.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-200">
                            {step}
                          </span>
                          {idx < project.workflow.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-cyan-400" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
