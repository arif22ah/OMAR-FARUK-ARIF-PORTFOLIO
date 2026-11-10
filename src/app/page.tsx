"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";
import SimulatorSandbox from "@/components/SimulatorSandbox";
import ResumeModal from "@/components/ResumeModal";
import { candidateProfile, academicAwards, coreSkills } from "@/data/portfolioData";
import { SkillCategory } from "@/types/portfolio";
import { Award, Terminal, Play } from "lucide-react";

const defaultSvgAvatar =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><rect width="200" height="240" fill="#0f172a"/><circle cx="100" cy="86" r="42" fill="#1e293b"/><path d="M24 240 C28 168 172 168 176 240 Z" fill="#1e293b"/><text x="100" y="96" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-weight="bold" font-size="24">OFA</text></svg>`
  );

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "simulators">("portfolio");
  const [selectedSim, setSelectedSim] = useState<number>(1);
  const [skillFilter, setSkillFilter] = useState<SkillCategory>("all");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>(defaultSvgAvatar);

  useEffect(() => {
    const saved = localStorage.getItem("omar_portfolio_photo");
    if (saved) setAvatarSrc(saved);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setAvatarSrc(result);
      try {
        localStorage.setItem("omar_portfolio_photo", result);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const filteredSkills =
    skillFilter === "all"
      ? coreSkills
      : coreSkills.filter((s) => s.category === skillFilter);

  const handleLaunchSimulator = (projectId: number) => {
    setSelectedSim(projectId);
    setActiveTab("simulators");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenResume={() => setIsResumeOpen(true)}
        avatarSrc={avatarSrc}
        onPhotoUpload={handlePhotoUpload}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto space-y-12">
        {activeTab === "portfolio" ? (
          <>
            <section className="relative rounded-3xl overflow-hidden glass-card p-6 sm:p-10 border border-slate-800">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-mono text-cyan-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Data Science • Causal Inference • Agentic SQL • Model Monitoring</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Turning Complex Data into <span className="gradient-text">Validated Production</span> Decisions.
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    I am <strong className="text-white">{candidateProfile.name}</strong>, a{" "}
                    <strong className="text-cyan-400">{candidateProfile.title}</strong> and{" "}
                    <strong className="text-emerald-400">
                      B.Sc. in Computer Science & Engineering (Major: Data Science) Graduate
                    </strong>{" "}
                    from <strong className="text-white">{candidateProfile.university}</strong>. I specialize in building
                    end-to-end analytical systems with read-only SQL guardrails, automated drift retraining, causal
                    uplift modeling, and statistically rigorous A/B testing.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab("simulators")}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Test Live Simulators</span>
                    </button>
                    <button
                      onClick={() => setIsResumeOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-medium text-sm transition"
                    >
                      View Printable CV
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-72">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="text-2xl font-extrabold text-cyan-400 font-mono">94.2%</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Text-to-SQL Eval Acc</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">+$148K</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Causal Uplift ROI</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="text-2xl font-extrabold text-amber-400 font-mono">3 Honors</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">UIU Course Awards</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="text-2xl font-extrabold text-violet-400 font-mono">18 ms</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">PyTorch Stream Latency</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Academic Distinction • United International University
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  University Course Awards & Honors
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {academicAwards.map((award) => (
                  <div
                    key={award.id}
                    className="glass-card glass-card-hover p-5 rounded-2xl border border-amber-500/20 flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {award.rank}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-0.5">
                        {award.course}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{award.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Focused Technical Stack
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    14 Core Data Science Tools & Frameworks
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(["all", "core", "ml", "mlops"] as SkillCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSkillFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                        skillFilter === cat
                          ? "bg-cyan-500 text-slate-950 font-semibold"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {cat === "all"
                        ? "All Core Tools (14)"
                        : cat === "core"
                        ? "Analytics & SQL"
                        : cat === "ml"
                        ? "Machine Learning & DL"
                        : "Production & Agentic AI"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card glass-card-hover p-4 rounded-2xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-white">{skill.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        {skill.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <ProjectGrid onLaunchSimulator={handleLaunchSimulator} />
          </>
        ) : (
          <SimulatorSandbox
            selectedSim={selectedSim}
            setSelectedSim={setSelectedSim}
            onBack={() => setActiveTab("portfolio")}
          />
        )}
      </main>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        avatarSrc={avatarSrc}
      />
    </div>
  );
}
