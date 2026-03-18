import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES } from '../constants'
import { Send, Palette, Sparkles } from "lucide-react"

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];


const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 pt-20">
      <div className="container mx-auto px-4 max-w-6xl py-8 relative">
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-10 -left-10 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 size-72 rounded-full bg-secondary/15 blur-3xl" />
        </div>

        <div className="relative space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-xs text-base-content/70 mb-3">
                <Sparkles className="size-4" />
                <span>Personalize your vibe</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">Settings</h2>
              <p className="text-sm text-base-content/60 mt-1">Choose a theme for your chat interface</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-base-300 bg-base-200/60 px-4 py-3">
              <Palette className="size-5 text-primary" />
              <div className="leading-tight">
                <div className="text-xs text-base-content/60">Current theme</div>
                <div className="text-sm font-semibold">{theme}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Theme picker */}
            <div className="rounded-3xl border border-base-300 bg-base-200/60 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-base-300/60 bg-base-100/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Themes</h3>
                    <p className="text-sm text-base-content/60">Tap a theme to apply instantly</p>
                  </div>
                  <span className="badge badge-ghost">{THEMES.length}</span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      className={`group flex flex-col items-center gap-2 p-2.5 rounded-2xl border transition-all hover:-translate-y-0.5 active:translate-y-0
                        ${theme === t ? "border-primary/40 bg-base-100/70 shadow-sm" : "border-base-300 bg-base-100/40 hover:bg-base-100/60"}
                      `}
                      onClick={() => setTheme(t)}
                      title={t}
                    >
                      <div className="relative h-9 w-full rounded-xl overflow-hidden" data-theme={t}>
                        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                          <div className="rounded bg-primary"></div>
                          <div className="rounded bg-secondary"></div>
                          <div className="rounded bg-accent"></div>
                          <div className="rounded bg-neutral"></div>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium truncate w-full text-center opacity-90">
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live preview */}
            <div className="rounded-3xl border border-base-300 bg-base-200/60 shadow-sm overflow-hidden lg:sticky lg:top-24">
              <div className="px-6 py-5 border-b border-base-300/60 bg-base-100/50">
                <h3 className="text-lg font-semibold">Preview</h3>
                <p className="text-sm text-base-content/60">This preview updates with your selected theme</p>
              </div>

              <div className="p-4 sm:p-6" data-theme={theme}>
                <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden border border-base-300/60">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                        J
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/60">Online</p>
                      </div>
                      <span className="badge badge-success badge-outline text-xs">Live</span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 min-h-[220px] max-h-[220px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div key={message.id} className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm text-sm leading-snug
                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                        >
                          <p>{message.content}</p>
                          <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/60"}`}>
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-11 rounded-xl"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-11 min-h-0 rounded-xl px-4">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-base-content/60">
                  Tip: Themes also affect buttons, inputs, and chat bubbles across the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage