import React from "react"
import { CheckCircle2, AlertTriangle } from "lucide-react"
import { cn } from "../lib/utils"

const variants = {
  notice: {
    icon: CheckCircle2,
    classes: "bg-emerald-600/90 text-white shadow-lg shadow-emerald-200/60",
  },
  alert: {
    icon: AlertTriangle,
    classes: "bg-red-600/90 text-white shadow-lg shadow-red-200/60",
  },
}

export default function FlashMessages({ notice, alert }) {
  const messages = [
    notice ? { type: "notice", text: notice } : null,
    alert ? { type: "alert", text: alert } : null,
  ].filter(Boolean)

  if (!messages.length) return null

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      {messages.map((message, index) => {
        const Icon = variants[message.type].icon
        return (
          <div
            key={`${message.type}-${index}`}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium backdrop-blur",
              variants[message.type].classes,
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span>{message.text}</span>
          </div>
        )
      })}
    </div>
  )
}
