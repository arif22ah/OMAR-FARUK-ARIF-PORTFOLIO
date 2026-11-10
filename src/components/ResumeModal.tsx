"use client";

import React from "react";
import { candidateProfile, academicAwards, coreSkills, productionProjects } from "@/data/portfolioData";
import { X, Printer } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarSrc: string;
}

export default function ResumeModal({ isOpen, onClose, avatarSrc }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <span className="font-mono text-xs text-cyan-400">
            Omar_Faruk_Arif_Data_Scientist_CV.pdf
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div id="resumePrintArea" className="p-8 overflow-y-auto space-y-6 text-slate-200 text-xs leading-relaxed">
          <div className="border-b border-slate-700 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={avatarSrc}
                alt={candidateProfile.name}
                className="w-20 h-24 rounded-xl object-cover object-top border border-slate-600"
              />
              <div>
                <h1 className="text-2xl font-extrabold text-white uppercase">
                  {candidateProfile.name}
                </h1>
                <p className="text-cyan-400 font-semibold text-sm">
                  {candidateProfile.title}
                </p>
                <p className="text-slate-400 mt-1">{candidateProfile.address}</p>
              </div>
            </div>
            <div className="font-mono text-xs space-y-1 sm:text-right">
              <div>{candidateProfile.phone}</div>
              <div>{candidateProfile.email}</div>
              <div>github.com/{candidateProfile.githubHandle}</div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2">
              Education & University Honors
            </h2>
            <div className="flex justify-between font-semibold text-white">
              <span>{candidateProfile.university}</span>
              <span className="font-mono text-emerald-400">Graduated</span>
            </div>
            <p className="text-slate-300">
              {candidateProfile.degree} ({candidateProfile.major})
            </p>
            <ul className="mt-2 space-y-1 text-slate-300 list-disc list-inside">
              {academicAwards.map((a) => (
                <li key={a.id}>
                  <strong className="text-amber-400">{a.rank}</strong> — {a.course} ({a.institution})
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2">
              Core Technical Stack
            </h2>
            <p className="text-slate-200 font-mono">
              {coreSkills.map((s) => s.name).join(" • ")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2">
              Production Data Science Projects
            </h2>
            <div className="space-y-3">
              {productionProjects.map((p) => (
                <div key={p.id}>
                  <div className="font-bold text-white">
                    {p.id}. {p.title} |{" "}
                    <span className="font-mono text-cyan-400 font-normal">
                      {p.stack.join(", ")}
                    </span>
                  </div>
                  <p className="text-slate-300">{p.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
