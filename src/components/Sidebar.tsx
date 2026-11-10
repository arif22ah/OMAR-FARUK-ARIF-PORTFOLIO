"use client";

import React, { useRef } from "react";
import { candidateProfile, academicAwards } from "@/data/portfolioData";
import { FileText, Terminal, Layers, Phone, Mail, MapPin, Camera, Award as TrophyIcon } from "lucide-react";

interface SidebarProps {
  activeTab: "portfolio" | "simulators";
  setActiveTab: (tab: "portfolio" | "simulators") => void;
  onOpenResume: () => void;
  avatarSrc: string;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onOpenResume,
  avatarSrc,
  onPhotoUpload,
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-0 lg:h-screen bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800/90 flex flex-col justify-between overflow-y-auto shrink-0 p-6 space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPhotoUpload}
      />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer shrink-0"
            title="Click to update portrait photo"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-emerald-500 p-0.5 shadow-lg shadow-cyan-500/20 overflow-hidden">
              <img
                src={avatarSrc}
                alt={candidateProfile.name}
                className="w-full h-full object-cover object-top rounded-[14px] bg-slate-950"
              />
            </div>
            <div className="absolute inset-0 bg-slate-950/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available Full-Time
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight mt-1">
              {candidateProfile.name}
            </h1>
            <p className="text-xs text-cyan-400 font-semibold font-mono">
              {candidateProfile.title}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-850/90 border border-slate-800 space-y-1 text-xs">
          <div className="flex items-center justify-between text-emerald-400 font-semibold">
            <span>🎓 {candidateProfile.status}</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              B.Sc. Completed
            </span>
          </div>
          <p className="text-slate-100 font-semibold pt-0.5">{candidateProfile.degree}</p>
          <p className="text-cyan-400 font-mono text-[11px]">{candidateProfile.major}</p>
          <p className="text-slate-300 font-medium pt-1.5 border-t border-slate-800/80 mt-1.5">
            {candidateProfile.university}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-1">
            Workspace View
          </p>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "portfolio"
                ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                : "text-slate-300 hover:bg-slate-800/60"
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Portfolio & Honors</span>
          </button>

          <button
            onClick={() => setActiveTab("simulators")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
              activeTab === "simulators"
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                : "text-slate-300 hover:bg-slate-800/60"
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Live System Simulators</span>
            <span className="ml-auto text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
              5 Live
            </span>
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <TrophyIcon className="w-3.5 h-3.5" />
            <span>UIU Academic Honors (3)</span>
          </p>
          <div className="space-y-1.5">
            {academicAwards.map((award) => (
              <div
                key={award.id}
                className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px]"
              >
                <span className="text-amber-400 font-mono font-bold block">
                  ★ {award.rank}
                </span>
                <span className="text-slate-200 font-medium">{award.course}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 text-xs pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <a href={`tel:${candidateProfile.phone}`} className="font-mono hover:text-cyan-400">
              {candidateProfile.phone}
            </a>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <a href={`mailto:${candidateProfile.email}`} className="font-mono truncate hover:text-emerald-400">
              {candidateProfile.email}
            </a>
          </div>
          <div className="flex items-start gap-2.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-snug text-[11px] text-slate-400">
              {candidateProfile.address}
            </span>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <button
            onClick={onOpenResume}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition"
          >
            <FileText className="w-4 h-4" />
            <span>Open Printable CV / Resume</span>
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>GitHub: @{candidateProfile.githubHandle}</span>
        <span>Data Scientist</span>
      </div>
    </aside>
  );
}
