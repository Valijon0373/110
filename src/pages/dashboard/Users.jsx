import { useRef, useState } from "react"
import { CircleCheck, CircleX, Eye, LockKeyhole, Pencil, Plus, ShieldCheck, SlidersHorizontal, Trash2 } from "lucide-react"

const TEAL_BG = "bg-teal-500"
const ROLES = ["Admin", "Foydalanuvchi", "Komissiya"]

function Modal({ open, onClose, dark, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 sm:pt-14">
      <button type="button" aria-label="Yopish" className="absolute inset-0 bg-black/40" onClick={() => onClose?.()} />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full max-w-lg rounded-2xl border p-6 text-lg shadow-xl ${
          dark ? "border-slate-700 bg-slate-800 text-slate-100" : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default function Users({ dark }) {
  const [rows, setRows] = useState([
    {
      id: "u-sample-1",
      role: "Admin",
      fio: "Shahnoza Qodirova",
      izoh: "Rektor o'rinbosari",
      login: "admin_shahnoza",
      password: "user123",
    },
    {
      id: "u-sample-2",
      role: "Komissiya",
      fio: "Dilshod Karimov",
      izoh: "Kafedra mudiri",
      login: "mod_dilshod",
      password: "user234",
    },
    {
      id: "u-sample-3",
      role: "Foydalanuvchi",
      fio: "Aziza Rahimova",
      izoh: "Xorijiy tillar bo'yicha",
      login: "teacher_aziza",
      password: "user345",
    },
    {
      id: "u-sample-4",
      role: "Foydalanuvchi",
      fio: "Javohir Sobirov",
      izoh: "3-kurs talabasi",
      login: "stu_javohir",
      password: "user456",
    },
    {
      id: "u-sample-5",
      role: "Komissiya",
      fio: "Malika Nurmatova",
      izoh: "Kafedra mudiri",
      login: "teacher_malika",
      password: "user567",
    },
    {
      id: "u-sample-6",
      role: "Foydalanuvchi",
      fio: "Sardor Islomov",
      izoh: "Stipendiya guruhi",
      login: "stu_sardor",
      password: "user678",
    },
  ])
  const [modal, setModal] = useState({
    open: false,
    type: /** @type {null | "view" | "edit" | "credentials" | "delete" | "create" | "permissions"} */ (null),
    row: null,
  })
  const [editDraft, setEditDraft] = useState({
    role: ROLES[0],
    fio: "",
    izoh: "",
    login: "",
    password: "",
  })
  const [createDraft, setCreateDraft] = useState({
    role: ROLES[0],
    fio: "",
    izoh: "",
    login: "",
    password: "",
  })
  const [credentialsDraft, setCredentialsDraft] = useState({
    password: "",
  })
  const [searchDraft, setSearchDraft] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [openActionsFor, setOpenActionsFor] = useState(/** @type {string | null} */ (null))
  const [notice, setNotice] = useState({ open: false, message: "", variant: /** @type {"success" | "danger"} */ ("success") })
  const noticeTimeoutRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null))

  const cardBase = dark ? "border-slate-600 bg-slate-800" : "border-slate-200 bg-white shadow-sm"
  const subtitle = dark ? "text-slate-400" : "text-slate-500"
  const title = dark ? "text-slate-100" : "text-slate-900"
  const meta = dark ? "text-slate-500" : "text-slate-400"

  const input = dark
    ? "border-slate-600 bg-slate-900/40 text-slate-100 placeholder:text-slate-600"
    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
  const selectInput = `${input} ${
    dark ? "[&>option]:bg-slate-800 [&>option]:text-slate-100" : "[&>option]:bg-white [&>option]:text-slate-900"
  }`

  const closeModal = () => setModal({ open: false, type: null, row: null })
  const closeNotice = () => setNotice({ open: false, message: "", variant: "success" })

  const showNotice = (message, variant = "success") => {
    setNotice({ open: true, message, variant })
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current)
    noticeTimeoutRef.current = setTimeout(() => {
      setNotice({ open: false, message: "", variant: "success" })
      noticeTimeoutRef.current = null
    }, 1300)
  }

  const openView = (row) => setModal({ open: true, type: "view", row })

  const openEdit = (row) => {
    setEditDraft({
      role: row?.role ?? ROLES[0],
      fio: row?.fio ?? "",
      izoh: row?.izoh ?? "",
      login: row?.login ?? "",
      password: row?.password ?? "",
    })
    setModal({ open: true, type: "edit", row })
  }

  const openDelete = (row) => setModal({ open: true, type: "delete", row })

  const openCredentials = (row) => {
    setCredentialsDraft({
      password: row?.password ?? "",
    })
    setModal({ open: true, type: "credentials", row })
  }

  const openPermissions = (row) => setModal({ open: true, type: "permissions", row })

  const openCreate = () => {
    setCreateDraft({
      role: ROLES[0],
      fio: "",
      izoh: "",
      login: "",
      password: "",
    })
    setModal({ open: true, type: "create", row: null })
  }

  const onSaveEdit = () => {
    const row = modal.row
    if (!row?.id) return

    const fio = editDraft.fio.trim()
    if (!fio) return

    setRows((prev) =>
      prev.map((r) =>
        r.id === row.id ? { ...r, role: editDraft.role, fio, izoh: editDraft.izoh.trim() } : r
      )
    )
    closeModal()
    showNotice("Muvaffaqiyatli o'zgartirildi")
  }

  const onConfirmDelete = () => {
    const row = modal.row
    if (!row?.id) return
    setRows((prev) => prev.filter((r) => r.id !== row.id))
    closeModal()
    showNotice("Muvaffaqiyatli o'chirildi", "danger")
  }

  const onSaveCredentials = () => {
    const row = modal.row
    if (!row?.id) return

    const password = credentialsDraft.password.trim()
    if (!password) return

    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, password } : r)))
    closeModal()
    showNotice("Muvaffaqiyatli o'zgartirildi")
  }

  const onSaveCreate = () => {
    const fio = createDraft.fio.trim()
    const login = createDraft.login.trim()
    const password = createDraft.password.trim()
    if (!fio || !login || !password) return

    const newRow = {
      id: `u-${Date.now()}`,
      role: createDraft.role,
      fio,
      izoh: createDraft.izoh.trim(),
      login,
      password,
    }
    setRows((prev) => [newRow, ...prev])
    closeModal()
    showNotice("Muvaffaqiyatli qo'shildi")
  }

  const roleOptions = Array.from(new Set([...ROLES, ...rows.map((row) => row.role)]))

  const filteredRows = rows.filter((row) => {
    if (roleFilter !== "all" && row.role !== roleFilter) return false

    const q = searchQuery.trim().toLowerCase()
    if (!q) return true
    return [row.role, row.fio, row.izoh, row.login].some((value) => String(value ?? "").toLowerCase().includes(q))
  })

  return (
    <div className={`rounded-2xl border ${dark ? "border-slate-700 bg-slate-800/40" : "border-slate-200 bg-white"} p-5 sm:p-6`}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className={`text-xl font-bold tracking-tight ${title}`}>Foydalanuvchilar</h2>
          <button
            type="button"
            onClick={openCreate}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 ${TEAL_BG}`}
          >
            <Plus className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden />
            Foydalanuvchi Qo'shish
          </button>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={`w-full sm:w-auto sm:min-w-[11rem] rounded-lg border px-3 py-2.5 text-sm outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${selectInput}`}
          >
            <option value="all">Barcha rollar</option>
            {roleOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder="Foydalanuvchini izlash"
            className={`min-w-[12rem] flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`}
          />
          <button
            type="button"
            onClick={() => setSearchQuery(searchDraft)}
            className={`inline-flex shrink-0 items-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
              dark ? "border-teal-500 text-teal-300 hover:bg-slate-700/70" : "border-teal-600 text-teal-700 hover:bg-teal-50"
            }`}
          >
            Qidirish
          </button>
        </div>

        <div className={`overflow-x-auto rounded-xl border ${cardBase}`}>
          <table className={`min-w-full border-collapse text-sm ${dark ? "border-slate-700" : "border-slate-200"}`}>
            <thead className={dark ? "bg-slate-900/40" : "bg-slate-50"}>
              <tr>
                <th className={`border px-4 py-3 text-center text-sm font-bold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>№</th>
                <th className={`border px-4 py-3 text-left text-sm font-bold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>F.I.O</th>
                <th className={`border px-4 py-3 text-left text-sm font-bold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>Izoh</th>
                <th className={`border px-4 py-3 text-left text-sm font-bold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>Role</th>
                <th className={`border px-4 py-3 text-left text-sm font-bold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>Login</th>
                <th className={`border px-4 py-3 text-right text-sm font-bold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={row.id}>
                  <td className={`border px-4 py-3 text-center text-sm font-semibold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>
                    {index + 1}
                  </td>
                  <td className={`border px-4 py-3 text-sm font-semibold ${dark ? "border-slate-700" : "border-slate-200"} ${title}`}>{row.fio}</td>
                  <td className={`border px-4 py-3 text-sm ${dark ? "border-slate-700" : "border-slate-200"} ${subtitle}`}>{row.izoh ?? ""}</td>
                  <td className={`border px-4 py-3 text-sm ${dark ? "border-slate-700" : "border-slate-200"} ${subtitle}`}>{row.role}</td>
                  <td className={`border px-4 py-3 text-sm ${dark ? "border-slate-700" : "border-slate-200"}`}>
                    <span className={`font-bold ${title}`}>{row.login}</span>
                  </td>
                  <td className={`border px-4 py-3 text-center ${dark ? "border-slate-700" : "border-slate-200"}`}>
                    <div className="relative inline-flex">
                      <button
                        type="button"
                        onClick={() => setOpenActionsFor((prev) => (prev === row.id ? null : row.id))}
                        className={`inline-flex items-center justify-center rounded-lg border p-2.5 transition-colors ${
                          dark ? "border-slate-600 text-slate-200 hover:bg-slate-700/70" : "border-slate-300 text-slate-700 hover:bg-slate-100"
                        }`}
                        aria-label="Amallar menyusi"
                        aria-expanded={openActionsFor === row.id}
                      >
                        <SlidersHorizontal className="h-5 w-5" strokeWidth={1.9} aria-hidden />
                      </button>

                      {openActionsFor === row.id && (
                        <div
                          className={`absolute right-0 top-full z-20 mt-2 min-w-52 rounded-xl border p-1 shadow-lg ${
                            dark ? "border-slate-600 bg-slate-800" : "border-slate-200 bg-white"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionsFor(null)
                              openPermissions(row)
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                              dark ? "text-violet-400 hover:bg-slate-700/80" : "text-violet-700 hover:bg-violet-50"
                            }`}
                          >
                            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                            Ruxsatlar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionsFor(null)
                              openCredentials(row)
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                              dark ? "text-amber-400 hover:bg-slate-700/80" : "text-amber-700 hover:bg-amber-50"
                            }`}
                          >
                            <LockKeyhole className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                            Parolni o'zgartirish
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionsFor(null)
                              openView(row)
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                              dark ? "text-blue-400 hover:bg-slate-700/80" : "text-blue-700 hover:bg-blue-50"
                            }`}
                          >
                            <Eye className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                            Ko'rish
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionsFor(null)
                              openEdit(row)
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                              dark ? "text-emerald-400 hover:bg-slate-700/80" : "text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            <Pencil className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                            Tahrirlash
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenActionsFor(null)
                              openDelete(row)
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                              dark ? "text-red-400 hover:bg-slate-700/80" : "text-red-700 hover:bg-red-50"
                            }`}
                          >
                            <Trash2 className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                            O'chirish
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRows.length === 0 && (
          <p className={`text-center text-sm ${subtitle}`}>{searchQuery ? "Qidiruv bo'yicha natija topilmadi." : "Hozircha foydalanuvchi yo'q."}</p>
        )}
      </div>

      <Modal open={modal.open} onClose={closeModal} dark={dark}>
        {modal.type === "view" && modal.row && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight">Foydalanuvchi ma'lumotlari</h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Yopish"
                className={`-mt-2 rounded-lg p-2 transition-colors ${dark ? "hover:bg-slate-700/70" : "hover:bg-slate-100"}`}
              >
                <CircleX className={`h-7 w-7 ${dark ? "text-white" : "text-slate-900"}`} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
            <div className="space-y-3 text-base">
              <div><p className={`text-xs font-semibold ${meta}`}>F.I.O:</p><p className="mt-1 font-semibold">{modal.row.fio}</p></div>
              <div><p className={`text-xs font-semibold ${meta}`}>Izoh:</p><p className="mt-1 font-semibold">{modal.row.izoh ?? "—"}</p></div>
              <div><p className={`text-xs font-semibold ${meta}`}>Role:</p><p className="mt-1 font-semibold">{modal.row.role}</p></div>
              <div><p className={`text-xs font-semibold ${meta}`}>Login:</p><p className="mt-1 font-semibold">{modal.row.login}</p></div>
            </div>
          </div>
        )}

        {modal.type === "edit" && modal.row && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight">Foydalanuvchini tahrirlash</h3>
              <button type="button" onClick={closeModal} aria-label="Yopish" className={`-mt-2 rounded-lg p-2 transition-colors ${dark ? "hover:bg-slate-700/70" : "hover:bg-slate-100"}`}>
                <CircleX className={`h-7 w-7 ${dark ? "text-white" : "text-slate-900"}`} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2"><label className="text-base font-semibold">F.I.O</label><input value={editDraft.fio} onChange={(e) => setEditDraft((p) => ({ ...p, fio: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} /></div>
              <div className="space-y-2"><label className="text-base font-semibold">Izoh</label><input value={editDraft.izoh} onChange={(e) => setEditDraft((p) => ({ ...p, izoh: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} placeholder="Masalan: Kafedra mudiri" /></div>
              <div className="space-y-2"><label className="text-base font-semibold">Role</label><select value={editDraft.role} onChange={(e) => setEditDraft((p) => ({ ...p, role: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${selectInput}`}>{roleOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" onClick={onSaveEdit} className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-emerald-600">Saqlash</button>
              <button type="button" onClick={closeModal} className={`inline-flex min-w-[11rem] items-center justify-center rounded-full border px-6 py-3 text-base font-bold transition-colors ${dark ? "border-slate-600 text-slate-200 hover:bg-slate-700/70" : "border-slate-200 text-slate-800 hover:bg-slate-50"}`}>Bekor qilish</button>
            </div>
          </div>
        )}

        {modal.type === "delete" && modal.row && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight">Foydalanuvchini o'chirishni tasdiqlaysizmi?</h3>
              <button type="button" onClick={closeModal} aria-label="Yopish" className={`-mt-2 rounded-lg p-2 transition-colors ${dark ? "hover:bg-slate-700/70" : "hover:bg-slate-100"}`}>
                <CircleX className={`h-7 w-7 ${dark ? "text-white" : "text-slate-900"}`} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="button" onClick={onConfirmDelete} className="inline-flex min-w-[11rem] items-center justify-center rounded-2xl bg-red-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600">Ha</button>
              <button type="button" onClick={closeModal} className="inline-flex min-w-[11rem] items-center justify-center rounded-2xl bg-blue-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600">Yo'q</button>
            </div>
          </div>
        )}

        {modal.type === "permissions" && modal.row && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className={`h-9 w-9 shrink-0 ${dark ? "text-violet-400" : "text-violet-600"}`} strokeWidth={1.85} aria-hidden />
                <h3 className="text-2xl font-bold tracking-tight">Ruxsatlar</h3>
              </div>
              <button type="button" onClick={closeModal} aria-label="Yopish" className={`-mt-2 rounded-lg p-2 transition-colors ${dark ? "hover:bg-slate-700/70" : "hover:bg-slate-100"}`}>
                <CircleX className={`h-7 w-7 ${dark ? "text-white" : "text-slate-900"}`} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
            <div className={`space-y-2 rounded-xl border px-4 py-3 text-base ${dark ? "border-slate-600 bg-slate-900/40" : "border-slate-200 bg-slate-50"}`}>
              <p className={`text-xs font-semibold uppercase tracking-wide ${meta}`}>Foydalanuvchi</p>
              <p className="font-semibold">{modal.row.fio}</p>
              <p className={`text-sm ${subtitle}`}>{modal.row.login}</p>
            </div>
            <p className={`text-sm leading-relaxed ${subtitle}`}>Bu yerda tanlangan foydalanuvchi uchun modul va amallar bo'yicha ruxsatlar sozlanadi.</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" onClick={closeModal} className={`inline-flex min-w-[11rem] items-center justify-center rounded-full border px-6 py-3 text-base font-bold transition-colors ${dark ? "border-slate-600 text-slate-200 hover:bg-slate-700/70" : "border-slate-200 text-slate-800 hover:bg-slate-50"}`}>Yopish</button>
            </div>
          </div>
        )}

        {modal.type === "credentials" && modal.row && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight">Parolini o'zgartirish</h3>
              <button type="button" onClick={closeModal} aria-label="Yopish" className={`-mt-2 rounded-lg p-2 transition-colors ${dark ? "hover:bg-slate-700/70" : "hover:bg-slate-100"}`}>
                <CircleX className={`h-7 w-7 ${dark ? "text-white" : "text-slate-900"}`} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-base font-semibold">Login</label>
                <input value={modal.row.login} readOnly className={`w-full rounded-lg border px-4 py-3 text-base ${input}`} />
              </div>
              <div className="space-y-2"><label className="text-base font-semibold">Parol</label><input type="password" value={credentialsDraft.password} onChange={(e) => setCredentialsDraft((p) => ({ ...p, password: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} placeholder="Yangi parol kiriting" /></div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" onClick={onSaveCredentials} className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-emerald-600">Saqlash</button>
              <button type="button" onClick={closeModal} className={`inline-flex min-w-[11rem] items-center justify-center rounded-full border px-6 py-3 text-base font-bold transition-colors ${dark ? "border-slate-600 text-slate-200 hover:bg-slate-700/70" : "border-slate-200 text-slate-800 hover:bg-slate-50"}`}>Bekor qilish</button>
            </div>
          </div>
        )}

        {modal.type === "create" && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight">Foydalanuvchi qo'shish</h3>
              <button type="button" onClick={closeModal} aria-label="Yopish" className={`-mt-2 rounded-lg p-2 transition-colors ${dark ? "hover:bg-slate-700/70" : "hover:bg-slate-100"}`}>
                <CircleX className={`h-7 w-7 ${dark ? "text-white" : "text-slate-900"}`} strokeWidth={2.25} aria-hidden />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2"><label className="text-base font-semibold">F.I.O</label><input value={createDraft.fio} onChange={(e) => setCreateDraft((p) => ({ ...p, fio: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} placeholder="Masalan: F.I.O" /></div>
              <div className="space-y-2"><label className="text-base font-semibold">Izoh</label><input value={createDraft.izoh} onChange={(e) => setCreateDraft((p) => ({ ...p, izoh: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} placeholder="Masalan: Kafedra mudiri" /></div>
              <div className="space-y-2"><label className="text-base font-semibold">Role</label><select value={createDraft.role} onChange={(e) => setCreateDraft((p) => ({ ...p, role: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${selectInput}`}>{ROLES.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
              <div className="space-y-2"><label className="text-base font-semibold">Login</label><input value={createDraft.login} onChange={(e) => setCreateDraft((p) => ({ ...p, login: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} placeholder="user.login" /></div>
              <div className="space-y-2"><label className="text-base font-semibold">Parol</label><input type="password" value={createDraft.password} onChange={(e) => setCreateDraft((p) => ({ ...p, password: e.target.value }))} className={`w-full rounded-lg border px-4 py-3 text-base outline-none ring-teal-500/0 transition-shadow focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${input}`} placeholder="Parol kiriting" /></div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button type="button" onClick={onSaveCreate} className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-emerald-600">Qo'shish</button>
              <button type="button" onClick={closeModal} className={`inline-flex min-w-[11rem] items-center justify-center rounded-full border px-6 py-3 text-base font-bold transition-colors ${dark ? "border-slate-600 text-slate-200 hover:bg-slate-700/70" : "border-slate-200 text-slate-800 hover:bg-slate-50"}`}>Bekor qilish</button>
            </div>
          </div>
        )}
      </Modal>

      {notice.open && (
        <div className="pointer-events-none fixed left-1/2 top-4 z-[60] w-[min(92vw,34rem)] -translate-x-1/2">
          <div
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-xl ring-1 ${
              notice.variant === "danger"
                ? dark
                  ? "bg-red-600 text-white ring-white/10"
                  : "bg-red-500 text-white ring-red-600/30"
                : dark
                  ? "bg-emerald-600 text-white ring-white/10"
                  : "bg-emerald-500 text-white ring-emerald-600/30"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <CircleCheck className="h-6 w-6 shrink-0 text-white" strokeWidth={2.25} aria-hidden />
              <p className="truncate text-sm font-semibold">{notice.message}</p>
            </div>
            <button type="button" onClick={closeNotice} aria-label="Yopish" className="rounded-xl p-1.5 transition-colors hover:bg-white/10">
              <CircleX className="h-6 w-6 text-white" strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
