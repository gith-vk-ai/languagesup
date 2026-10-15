import Link from "next/link";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="#0f1d3a" />
      <path d="M8 11.5a3.5 3.5 0 0 1 3.5-3.5h9a3.5 3.5 0 0 1 3.5 3.5v5a3.5 3.5 0 0 1-3.5 3.5H15l-4.5 4v-4A3.5 3.5 0 0 1 8 16.5z" fill="#0e7c7b" />
      <path d="M12.5 15.5 16 12l3.5 3.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 rounded-lg" aria-label="LanguagesUp home">
      <LogoMark className="h-8 w-8" />
      <span className="text-lg font-extrabold tracking-tight text-navy">
        Languages<span className="text-teal">Up</span>
      </span>
    </Link>
  );
}
