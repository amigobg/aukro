import React from "react"
import { Sparkles, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

function Field({ field }) {
  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          name={field.name}
          id={field.id}
          defaultChecked={field.checked}
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
        />
        <span>{field.label}</span>
      </label>
    )
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={field.id} className="text-sm font-medium text-slate-700">
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        id={field.id}
        defaultValue={field.value || ""}
        placeholder={field.placeholder}
        autoComplete={field.autocomplete}
        required={field.required}
        className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
      />
      {field.hint && <p className="text-xs text-slate-500">{field.hint}</p>}
    </div>
  )
}

export default function AuthPage({ heading, subheading, form, links = [], errors = [], meta = {} }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl items-center gap-8 py-12 lg:grid-cols-2">
      <div className="space-y-6 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-blue-600 p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 text-blue-100">
          <Sparkles className="h-5 w-5" />
          <p className="text-sm font-semibold uppercase tracking-widest">Aukro access</p>
        </div>
        <h2 className="text-4xl font-bold leading-tight">{heading}</h2>
        <p className="text-lg text-blue-100/90">{subheading}</p>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-sm leading-relaxed text-blue-50">
          <div className="flex items-center gap-2 text-blue-100">
            <ShieldCheck className="h-4 w-4" />
            Secure by design
          </div>
          <p className="mt-2">
            Your marketplace credentials are protected with modern authentication standards and encrypted session tokens.
          </p>
        </div>
        {meta.highlight && (
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-blue-100">
            {meta.highlight}
          </div>
        )}
      </div>

      <Card className="border-slate-100 bg-white/80 shadow-xl backdrop-blur">
        <CardHeader>
          <CardTitle>{heading}</CardTitle>
          <CardDescription>{subheading}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {errors && errors.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50/70 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">Please fix the following:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errors.map((error, index) => (
                  <li key={`${error}-${index}`}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form action={form.action} method="post" className="space-y-4">
            <input type="hidden" name="authenticity_token" value={form.authenticity_token} />
            {form.method && form.method.toLowerCase() !== "post" && (
              <input type="hidden" name="_method" value={form.method} />
            )}
            <div className="space-y-4">
              {form.fields?.map((field) => (
                <Field key={field.id || field.name} field={field} />
              ))}
            </div>
            <Button type="submit" className="w-full" size="lg">
              {form.submit_label}
            </Button>
          </form>
          {links.length > 0 && (
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="font-medium text-blue-600 hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
