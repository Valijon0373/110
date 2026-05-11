import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import logoImg from "../assets/logo.jpg"

const TEAL = "#14b8a6"
const TEAL_BG = "bg-teal-500"
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "fakultetlar", label: "Fakultetlar", icon: "building" },
  { id: "kafedralar", label: "Kafedralar", icon: "cap" },
  { id: "foydalanuvchilar", label: "Foydalanuvchilar", icon: "user" },
]

const STATS = {
  fakultetlar: 5,
  kafedralar: 15,
  foydalanuvchilar: 302,
}

const RATING_SLICES = [
  { stars: 5, pct: 98, color: "#14b8a6" },
  { stars: 4, pct: 1.5, color: "#22c55e" },
  { stars: 3, pct: 0.3, color: "#eab308" },
  { stars: 2, pct: 0.1, color: "#f97316" },
  { stars: 1, pct: 0.1, color: "#ef4444" },
]

const CATEGORY_BARS = [
  { label: "Umumiy", value: 5 },
  { label: "Kasbiy kompetensiya", value: 5 },
  { label: "Pedagogik mahorat", value: 5 },
  { label: "Tadqiqot faoliyati", value: 5 },
  { label: "Ijodkorlik", value: 5 },
]

function NavIcon({ name }) {
  const cls = "h-5 w-5 shrink-0"
  switch (name) {
    case "grid":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM13.5 3.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z" />
        </svg>
      )
    case "building":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6v12H3V9z" />
        </svg>
      )
    case "cap":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
        </svg>
      )
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
  }
}

function pieGradient(slices) {
  let acc = 0
  const parts = slices.map((s) => {
    const start = acc
    acc += s.pct
    return `${s.color} ${start}% ${acc}%`
  })
  return `conic-gradient(${parts.join(", ")})`
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true
  )
  const [activeNav, setActiveNav] = useState("dashboard")
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (mq.matches) setSidebarOpen(true)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const pieStyle = useMemo(() => ({ background: pieGradient(RATING_SLICES) }), [])

  const mainTitle =
    activeNav === "dashboard"
      ? "Admin Dashboard"
      : NAV.find((n) => n.id === activeNav)?.label ?? "Admin"

  return (
    <div
      className={`flex min-h-screen font-sans ${dark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-800"}`}
    >
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r shadow-sm transition-transform duration-200 md:relative md:translate-x-0 ${
          dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className={`border-b px-5 py-6 ${dark ? "border-slate-700" : "border-slate-100"}`}>
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="" className="h-10 w-10 rounded-full border object-cover" />
            <div>
              <p className="text-lg font-bold leading-tight">UrSPI Admin</p>
              <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>Admin Panel</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const active = activeNav === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? `${TEAL_BG} text-white shadow-md shadow-teal-900/20`
                    : dark
                      ? "text-slate-300 hover:bg-slate-700/80"
                      : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <NavIcon name={item.icon} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className={`p-4 text-xs ${dark ? "text-slate-500" : "text-slate-400"}`}>
          <Link to="/" className={`font-medium hover:underline ${dark ? "text-teal-400" : "text-teal-600"}`}>
            Platformaga qaytish
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Menyuni yopish"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen flex-1 flex-col md:min-h-0">
        <header
          className={`sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 shadow-sm ${
            dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`rounded-lg p-2 md:hidden ${dark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Menyu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold">{mainTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              className={`rounded-lg p-2 ${dark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
              aria-label="Tungi rejim"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                AD
              </span>
              <div className="hidden text-sm sm:block">
                <p className="font-medium leading-none">admin</p>
              </div>
              <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeNav === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <article
                  className={`rounded-xl border p-5 shadow-sm ${dark ? "border-slate-700 bg-slate-800" : "border-slate-100 bg-white"}`}
                >
                  <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>Fakultetlar</p>
                  <p className="mt-2 text-3xl font-bold text-blue-600">{STATS.fakultetlar}</p>
                </article>
                <article
                  className={`rounded-xl border p-5 shadow-sm ${dark ? "border-slate-700 bg-slate-800" : "border-slate-100 bg-white"}`}
                >
                  <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>Kafedralar</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">{STATS.kafedralar}</p>
                </article>
                <article
                  className={`rounded-xl border p-5 shadow-sm ${dark ? "border-slate-700 bg-slate-800" : "border-slate-100 bg-white"}`}
                >
                  <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>Foydalanuvchilar</p>
                  <p className="mt-2 text-3xl font-bold text-violet-600">{STATS.foydalanuvchilar}</p>
                </article>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <article
                  className={`rounded-xl border p-5 shadow-sm ${dark ? "border-slate-700 bg-slate-800" : "border-slate-100 bg-white"}`}
                >
                  <h2 className="text-lg font-semibold">Reytinglar taqsimoti</h2>
                  <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                    <div
                      className="relative h-48 w-48 shrink-0 rounded-full shadow-inner ring-4 ring-white/10"
                      style={pieStyle}
                    />
                    <div className="w-full max-w-xs space-y-2">
                      {RATING_SLICES.map((s) => (
                        <div key={s.stars} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm" style={{ background: s.color }} />
                            {s.stars} yulduz
                          </span>
                          <span className="font-semibold">{s.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                <article
                  className={`rounded-xl border p-5 shadow-sm ${dark ? "border-slate-700 bg-slate-800" : "border-slate-100 bg-white"}`}
                >
                  <h2 className="text-lg font-semibold">Kategoriyalar bo&apos;yicha o&apos;rtacha reytinglar</h2>
                  <div className="mt-4 flex justify-between gap-1 border-b pb-1 text-[10px] font-medium text-slate-400">
                    {[0, 1, 2, 3, 4, 5].map((t) => (
                      <span key={t} className="w-0 flex-1 text-center">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex h-52 items-end justify-between gap-2 border-l border-slate-200 pl-2 pt-2 dark:border-slate-600">
                    {CATEGORY_BARS.map((c) => (
                      <div key={c.label} className="flex min-w-0 flex-1 flex-col items-center justify-end">
                        <div
                          className="w-full max-w-10 rounded-t-md"
                          style={{
                            height: `${Math.max(8, (c.value / 5) * 168)}px`,
                            backgroundColor: TEAL,
                          }}
                          title={`${c.label}: ${c.value}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between gap-1 px-0">
                    {CATEGORY_BARS.map((c) => (
                      <p
                        key={c.label}
                        className="min-w-0 flex-1 -rotate-[35deg] text-center text-[9px] leading-tight text-slate-600 sm:text-[10px] dark:text-slate-400"
                      >
                        {c.label}
                      </p>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          )}

          {activeNav === "fakultetlar" && (
            <Placeholder dark={dark} title="Fakultetlar" />
          )}
          {activeNav === "kafedralar" && (
            <Placeholder dark={dark} title="Kafedralar" />
          )}
          {activeNav === "foydalanuvchilar" && (
            <Placeholder dark={dark} title="Foydalanuvchilar" />
          )}
        </main>
      </div>
    </div>
  )
}

function Placeholder({ dark, title }) {
  return (
    <div
      className={`rounded-xl border p-8 text-center ${dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}
    >
      <p className={`text-lg font-semibold ${dark ? "text-slate-100" : "text-slate-900"}`}>{title}</p>
      <p className={`mt-2 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
        Bu bo&apos;lim tez orada to&apos;ldiriladi.
      </p>
    </div>
  )
}
