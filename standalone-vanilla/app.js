// Separated JavaScript Application Controller for Omar Faruk Arif's Portfolio
const profile = {
  name: "Omar Faruk Arif",
  title: "Data Scientist",
  status: "Graduated — B.Sc. in CSE (Major: Data Science)",
  university: "United International University (UIU)",
  phone: "+880 1948-121182",
  email: "arifahmed26610@gmail.com",
  address: "K-268, Ward-8, Konabari-1746, Gazipur City Corporation, Bangladesh",
  github: "https://github.com/arif22ah"
};

const awards = [
  "2nd Place — Microprocessor & Microcontroller Lab (UIU)",
  "3rd Place — System Analysis & Design (UIU)",
  "3rd Place — Database Management System (UIU)"
];

document.getElementById("app").innerHTML = `
  <div class="max-w-6xl mx-auto p-6 sm:p-10 space-y-8">
    <header class="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row justify-between gap-6">
      <div class="space-y-2">
        <span class="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ${profile.status}
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white">${profile.name}</h1>
        <p class="text-cyan-400 font-mono text-sm">${profile.title} • ${profile.university}</p>
        <p class="text-xs text-slate-400">${profile.address} | ${profile.phone} | ${profile.email}</p>
      </div>
      <div class="space-y-1.5 text-xs">
        <div class="font-mono uppercase text-amber-400 font-bold">UIU Academic Honors</div>
        ${awards.map(a => `<div class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">★ ${a}</div>`).join("")}
      </div>
    </header>
  </div>
`;
