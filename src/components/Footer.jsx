const iconSvgClass = "h-6 w-6 shrink-0"
const iconStroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }

const FOOTER_SOCIAL = [
  {
    name: "Telegram",
    href: "https://t.me/",
    hoverClass: "hover:border-[#229ED9] hover:text-[#229ED9]",
    icon: (
      <svg className={iconSvgClass} viewBox="0 0 24 24" aria-hidden {...iconStroke}>
        <g transform="translate(12 12.15) scale(0.865) translate(-12 -11.98)">
          <path d="M22 2 11 13" />
          <path d="M22 2 15 22 11 13 2 9 22 2z" />
        </g>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    hoverClass: "hover:border-[#E1306C] hover:text-[#E1306C]",
    icon: (
      <svg className={iconSvgClass} viewBox="0 0 24 24" aria-hidden {...iconStroke}>
        <rect width="18" height="18" x="3" y="3" rx="4" ry="4" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    hoverClass: "hover:border-[#FF0000] hover:text-[#FF0000]",
    icon: (
      <svg className={iconSvgClass} viewBox="0 0 24 24" aria-hidden {...iconStroke}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    hoverClass: "hover:border-[#1877F2] hover:text-[#1877F2]",
    icon: (
      <svg className={iconSvgClass} viewBox="0 0 24 24" aria-hidden {...iconStroke}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
      </svg>
    ),
  },
]

export default function Footer({ creditLine = "UrSPI | RTTM Jamosi | 2026" }) {
  return (
    <footer className="relative z-10 mt-auto w-full rounded-t-3xl border-t border-white/25 bg-white/10 py-10 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          {FOOTER_SOCIAL.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-white text-white drop-shadow-sm duration-200 transition-colors hover:bg-white/10 ${item.hoverClass}`}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p className="text-[0.8125rem] font-normal leading-normal tracking-[0.14em] text-white drop-shadow-sm">
          {creditLine}
        </p>
      </div>
    </footer>
  )
}
