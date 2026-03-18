import React from "react";
import { MessageSquare, Sparkles, ShieldCheck, Zap } from "lucide-react";

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100/60 px-4 py-3 shadow-sm">
    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
      <Icon className="size-5 text-primary" />
    </div>
    <div className="leading-tight">
      <div className="text-xs text-base-content/60">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  </div>
);

const AuthShowcase = ({ title, subtitle, accent = "primary" }) => {
  const accentClasses =
    accent === "secondary"
      ? "from-secondary/30 via-primary/10 to-transparent"
      : "from-primary/30 via-secondary/10 to-transparent";

  return (
    <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-base-200 p-12">
      {/* background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${accentClasses}`} />
        <div className="absolute -top-24 -left-24 size-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,theme(colors.base-content)_1px,transparent_0)] [background-size:20px_20px]" />
      </div>

      <div className="relative max-w-md w-full">
        {/* floating card stack */}
        <div className="relative">
          <div className="absolute -top-8 -left-6 rotate-[-6deg] opacity-90">
            <div className="rounded-3xl border border-base-300 bg-base-100/60 backdrop-blur px-5 py-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Zynk Spaces</div>
                  <div className="text-xs text-base-content/60">Stay close, stay synced.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-base-300 bg-base-100/65 backdrop-blur-xl p-7 shadow-lg animate-[float_7s_ease-in-out_infinite]">
            <div className="flex items-center gap-2 text-xs text-base-content/60 mb-3">
              <Sparkles className="size-4" />
              <span>New vibe. Same Zynk.</span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight mb-3">{title}</h2>
            <p className="text-base-content/60 mb-6">{subtitle}</p>

            <div className="grid grid-cols-1 gap-3">
              <Stat icon={ShieldCheck} label="Session" value="Secure cookies" />
              <Stat icon={Zap} label="Speed" value="Instant UI feedback" />
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-base-content/50">
              <span>Built for focus</span>
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" />
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default AuthShowcase;

