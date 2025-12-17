import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white shadow hover:bg-slate-900/90",
        secondary: "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
        outline: "border border-slate-200 bg-white hover:bg-slate-50",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})

Button.displayName = "Button"

export { buttonVariants }
