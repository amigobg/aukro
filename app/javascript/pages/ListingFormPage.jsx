import React from "react"
import { Sparkles, UploadCloud, ClipboardList, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"

function FieldControl({ field }) {
  const commonProps = {
    name: field.name,
    id: field.id,
    defaultValue: field.value || "",
    required: field.required,
    placeholder: field.placeholder,
    className:
      "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20",
  }

  switch (field.type) {
    case "textarea":
      return <textarea {...commonProps} rows={6} />
    case "select":
      return (
        <select {...commonProps} defaultValue={field.value || ""}>
          <option value="">{field.placeholder || "Select an option"}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    case "file":
      return (
        <input
          type="file"
          name={field.name}
          id={field.id}
          multiple={field.multiple}
          required={field.required}
          className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-4 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:border-slate-400"
        />
      )
    default:
      return <input type={field.type || "text"} {...commonProps} step={field.step} />
  }
}

function Field({ field }) {
  return (
    <div className={cn("space-y-1 text-sm font-medium text-slate-700", field.full_width && "md:col-span-2")}>
      <label htmlFor={field.id}>{field.label}</label>
      <FieldControl field={field} />
      {field.hint && <p className="text-xs font-normal text-slate-500">{field.hint}</p>}
    </div>
  )
}

export default function ListingFormPage({ heading, subheading, form, errors = [], cancel_path }) {
  const fieldGroups = form.field_groups || {}
  const formatGroupLabel = (key) => key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 py-10 lg:grid-cols-[1.2fr_1fr]">
      <Card className="border-slate-200 bg-white/80 shadow-lg backdrop-blur">
        <CardHeader>
          <CardTitle className="text-3xl">{heading}</CardTitle>
          <CardDescription>{subheading}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {errors.length > 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700">
              <p className="font-semibold">Please review the following</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errors.map((error, index) => (
                  <li key={`${error}-${index}`}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form
            action={form.action}
            method="post"
            className="space-y-8"
            encType={form.multipart ? "multipart/form-data" : undefined}
          >
            <input type="hidden" name="authenticity_token" value={form.authenticity_token} />
            {form.method && form.method.toLowerCase() !== "post" && (
              <input type="hidden" name="_method" value={form.method} />
            )}

            {Object.entries(fieldGroups).map(([groupKey, groupFields]) => (
              <section key={groupKey} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {formatGroupLabel(groupKey)}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {groupFields.map((field) => (
                    <Field key={field.id} field={field} />
                  ))}
                </div>
              </section>
            ))}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="flex-1" size="lg">
                {form.submit_label}
              </Button>
              <Button asChild variant="ghost" className="flex-1" size="lg">
                <a href={cancel_path || "/listings"}>Cancel</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 text-white">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-3 text-blue-100">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">Listing tips</p>
            </div>
            <ul className="space-y-4 text-sm leading-relaxed text-blue-100/90">
              <li>Use descriptive titles with brand, model, and condition details.</li>
              <li>Add 3-5 high-resolution photos for better buyer confidence.</li>
              <li>Set an auction end date to create urgency.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-blue-50/80">
          <CardContent className="space-y-3 p-6 text-blue-900">
            <div className="flex items-center gap-3">
              <UploadCloud className="h-5 w-5" />
              <h3 className="text-base font-semibold">Media guidelines</h3>
            </div>
            <p className="text-sm text-blue-800">
              Upload JPG or PNG files up to 10MB each. Cover shots should be square for best results in the grid view.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/80">
          <CardContent className="space-y-3 p-6 text-slate-700">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="text-base font-semibold">Seller protection</h3>
            </div>
            <p className="text-sm">
              Your listing is protected by Aukro&apos;s dispute resolution service once the buyer completes checkout.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
