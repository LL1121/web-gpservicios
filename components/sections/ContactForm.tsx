'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  initialContactState,
  sendContactMessage,
  type ContactFormState,
} from '@/app/actions/contact'

const inputBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-sm leading-snug text-[#1A2228] placeholder:text-[#8A9BAB] outline-none transition-colors focus:border-[#FF0001] focus:ring-2 focus:ring-[#FF0001]/15 sm:text-[15px]'
const labelBase =
  'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-[#1A2228]'

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <p className="mt-1.5 text-[12px] font-medium" style={{ color: '#FF0001' }}>
      {msg}
    </p>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg px-7 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
      style={{ background: '#FF0001', boxShadow: '0 4px 18px rgba(255,0,1,0.35)' }}
    >
      {pending ? (
        <>
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path
              d="M22 12a10 10 0 0 0-10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          Enviando…
        </>
      ) : (
        <>
          Enviar mensaje
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    sendContactMessage,
    initialContactState,
  )

  const errors = state.fieldErrors ?? {}

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-4"
      aria-describedby="contact-form-status"
    >
      {/* Honeypot anti-bots (oculto a humanos, leído por bots) */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          No completar
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelBase}>
            Nombre completo<span style={{ color: '#FF0001' }}> *</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Juan Pérez"
            className={inputBase}
            style={{ borderColor: errors.name ? '#FF0001' : '#E2E5E9' }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          <span id="err-name">
            <FieldError msg={errors.name} />
          </span>
        </div>

        <div>
          <label htmlFor="contact-company" className={labelBase}>
            Empresa
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Operadora / contratista (opcional)"
            className={inputBase}
            style={{ borderColor: errors.company ? '#FF0001' : '#E2E5E9' }}
          />
          <FieldError msg={errors.company} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelBase}>
            Email<span style={{ color: '#FF0001' }}> *</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="nombre@empresa.com"
            className={inputBase}
            style={{ borderColor: errors.email ? '#FF0001' : '#E2E5E9' }}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          <span id="err-email">
            <FieldError msg={errors.email} />
          </span>
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelBase}>
            Teléfono
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+54 9 299 ..."
            className={inputBase}
            style={{ borderColor: errors.phone ? '#FF0001' : '#E2E5E9' }}
          />
          <FieldError msg={errors.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelBase}>
          Asunto<span style={{ color: '#FF0001' }}> *</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          maxLength={140}
          placeholder="Cotización montaje de líneas / Pedido de información"
          className={inputBase}
          style={{ borderColor: errors.subject ? '#FF0001' : '#E2E5E9' }}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'err-subject' : undefined}
        />
        <span id="err-subject">
          <FieldError msg={errors.subject} />
        </span>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelBase}>
          Mensaje<span style={{ color: '#FF0001' }}> *</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          placeholder="Contanos sobre el proyecto: yacimiento, alcance, plazos estimados, etc."
          className={`${inputBase} resize-y`}
          style={{ borderColor: errors.message ? '#FF0001' : '#E2E5E9' }}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'err-message' : undefined}
        />
        <span id="err-message">
          <FieldError msg={errors.message} />
        </span>
      </div>

      <div
        id="contact-form-status"
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem]"
      >
        {state.status !== 'idle' && state.message && (
          <div
            className="rounded-lg border px-4 py-3 text-sm"
            style={
              state.status === 'success'
                ? { background: 'rgba(19,106,38,0.08)', borderColor: '#136A26', color: '#136A26' }
                : { background: 'rgba(255,0,1,0.06)', borderColor: '#FF0001', color: '#CC0001' }
            }
          >
            {state.message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed" style={{ color: '#8A9BAB' }}>
          Los campos con <span style={{ color: '#FF0001' }}>*</span> son obligatorios. Te
          responderemos a la brevedad en horario laboral.
        </p>
        <SubmitButton />
      </div>
    </form>
  )
}
