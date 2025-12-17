import React from "react"
import { Menu, X, Hammer } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "../lib/utils"

export default function NavigationBar({ appName, homePath = "/", links = [], auth }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const close = () => setOpen(false)
    document.addEventListener("turbo:before-render", close)
    return () => document.removeEventListener("turbo:before-render", close)
  }, [])

  const renderDesktopAuth = () => {
    if (!auth?.signedIn) {
      return (
        <div className="flex items-center gap-3">
          <a
            href={auth?.signInPath}
            className={cn("hidden md:inline-flex", buttonVariants({ variant: "ghost" }))}
          >
            Sign in
          </a>
          <a href={auth?.registerPath} className={buttonVariants()}>
            Create account
          </a>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col text-xs text-slate-500">
          <span className="font-medium text-slate-900">Welcome back</span>
          <span>{auth.email}</span>
        </div>
        <a href={auth.newListingPath} className={cn("hidden md:inline-flex", buttonVariants({ variant: "secondary" }))}>
          New listing
        </a>
        <form action={auth.signOut?.path} method="post" className="hidden md:block">
          <input type="hidden" name="_method" value={auth.signOut?.method || "delete"} />
          <input type="hidden" name="authenticity_token" value={auth.signOut?.authenticityToken} />
          <Button type="submit" variant="ghost">
            Sign out
          </Button>
        </form>
      </div>
    )
  }

  const renderMobileAuth = () => {
    if (!auth?.signedIn) {
      return (
        <div className="flex flex-col gap-3">
          <a href={auth?.signInPath} className={buttonVariants({ variant: "ghost" })}>
            Sign in
          </a>
          <a href={auth?.registerPath} className={buttonVariants()}>
            Create account
          </a>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm text-slate-600">
          Signed in as <span className="font-semibold text-slate-900">{auth.email}</span>
        </div>
        <a href={auth.newListingPath} className={buttonVariants({ variant: "secondary" })}>
          New listing
        </a>
        <form action={auth.signOut?.path} method="post">
          <input type="hidden" name="_method" value={auth.signOut?.method || "delete"} />
          <input type="hidden" name="authenticity_token" value={auth.signOut?.authenticityToken} />
          <Button type="submit" className="w-full">
            Sign out
          </Button>
        </form>
      </div>
    )
  }

  const navigationLinks = (
    <ul className="flex flex-col gap-2 text-sm font-medium md:flex-row md:items-center md:gap-6">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-slate-900",
              link.active ? "bg-slate-900 text-white" : "text-slate-600",
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <header className="border-b border-white/30 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <Hammer className="h-5 w-5 text-blue-600" />
          <a href={homePath} className="text-lg font-semibold tracking-tight text-slate-900">
            {appName}
          </a>
        </div>
        <nav className="hidden md:block">{navigationLinks}</nav>
        <div className="flex items-center gap-3">{renderDesktopAuth()}</div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          {navigationLinks}
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">{renderMobileAuth()}</div>
        </div>
      )}
    </header>
  )
}
