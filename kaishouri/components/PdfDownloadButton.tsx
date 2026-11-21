import clsx from "clsx"

type Props = {
  title: string
  titleEscaped: string
  variant?: "full" | "icon"
  className?: string
}

function PdfDownloadButton({ title, titleEscaped, variant = "full", className }: Props) {
  const label = 'pobierz pdf'

  return (
    <a
      href={`/pdf/${titleEscaped}.pdf`}
      download={`Kai Shouri - ${title}.pdf`}
      aria-label={variant === "icon" ? label : undefined}
      title={variant === "icon" ? label : undefined}
      className={clsx(
        "flex items-center justify-center gap-2 shrink-0 rounded-xl font-inter text-[15px] font-semibold transition-colors",
        "bg-fourth-plum/40 text-plume-wine hover:bg-fourth-plum/70 dark:bg-fourth-plum/20 dark:text-nice-light-purple dark:hover:bg-fourth-plum/35",
        className ?? (variant === "icon" ? "w-12 h-12" : "w-full h-12"),
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
      {variant === "full" && label}
    </a>
  )
}

export default PdfDownloadButton
