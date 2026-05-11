import { useEffect, useState } from "react"

export const METHODOLOGY_HEADING =
  "Urganch davlat pedagogika institutida pedagog xodimlar faoliyatini o'rganish\nmezonlari bo'yicha hisoblash tizimi"

export default function MethodologyTypewriter({
  text = METHODOLOGY_HEADING,
  typingMs = 38,
  holdMs = 2800,
  className = "",
}) {
  const [shown, setShown] = useState("")

  useEffect(() => {
    let cancelled = false
    const timeouts = []

    const schedule = (ms, fn) => {
      const id = setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timeouts.push(id)
    }

    const run = () => {
      if (cancelled) return
      let i = 0
      setShown("")

      const step = () => {
        if (cancelled) return
        if (i < text.length) {
          i += 1
          setShown(text.slice(0, i))
          schedule(typingMs, step)
        } else {
          schedule(holdMs, run)
        }
      }

      schedule(typingMs, step)
    }

    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [text, typingMs, holdMs])

  return (
    <h1
      aria-label={text.replace(/\n/g, " ")}
      className={`max-w-4xl whitespace-pre-line text-2xl font-bold leading-snug tracking-tight text-white drop-shadow-md md:text-3xl md:leading-snug lg:text-[1.75rem] lg:leading-snug xl:text-[2rem] ${className}`}
    >
      <span aria-hidden>{shown}</span>
      <span
        aria-hidden
        className="typewriter-caret ml-1 inline-block h-[0.85em] w-[3px] translate-y-[1px] rounded-sm bg-current align-middle md:w-[3.5px]"
      />
    </h1>
  )
}
