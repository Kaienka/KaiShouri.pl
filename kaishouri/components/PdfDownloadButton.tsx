'use client'
import axios from "axios"
import { useState } from 'react'
import clsx from "clsx"

type Props = {
  title: string
  titleEscaped: string
  variant?: "full" | "icon"
  className?: string
}

function PdfDownloadButton({ title, titleEscaped, variant = "full", className }: Props) {
  const [isDownloading, setIsDownloading] = useState(false)

  const onDownload = async () => {
    try {
      setIsDownloading(true)
      const res = await axios.post(
        `/api/pdf/${titleEscaped}`,
        { title: title },
        {
          responseType: 'arraybuffer',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Kai Shouri - ${title}.pdf`
      a.click()
      a.remove()
    } catch (err) {
      console.error(err)
    } finally {
      setIsDownloading(false)
    }
  }

  const label = isDownloading ? 'pobieranie...' : 'pobierz pdf'
  const icon = isDownloading ? (
    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
  )

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={isDownloading}
      aria-label={variant === "icon" ? label : undefined}
      title={variant === "icon" ? label : undefined}
      className={clsx(
        "flex items-center justify-center gap-2 h-12 rounded-xl font-inter text-[15px] font-semibold cursor-pointer transition-colors disabled:cursor-wait",
        "bg-fourth-plum/40 text-plume-wine hover:bg-fourth-plum/70 dark:bg-fourth-plum/20 dark:text-nice-light-purple dark:hover:bg-fourth-plum/35",
        variant === "icon" ? "w-12 shrink-0" : "w-full",
        className,
      )}
    >
      {icon}
      {variant === "full" && label}
    </button>
  )
}

export default PdfDownloadButton
