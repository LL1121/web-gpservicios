'use server'

import nodemailer from 'nodemailer'
import { z } from 'zod'

const schema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre completo'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email('Email inválido'),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z
    .string()
    .trim()
    .min(3, 'El asunto es muy corto')
    .max(140, 'Máximo 140 caracteres'),
  message: z
    .string()
    .trim()
    .min(15, 'Contanos un poco más (mín. 15 caracteres)')
    .max(4000, 'Máximo 4000 caracteres'),
  // Honeypot anti-spam: debe venir vacío
  website: z.string().max(0).optional().or(z.literal('')),
})

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message: string
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>
}

export const initialContactState: ContactFormState = {
  status: 'idle',
  message: '',
}

function buildTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  if (!host || !user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name')?.toString() ?? '',
    company: formData.get('company')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    subject: formData.get('subject')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return {
      status: 'error',
      message: 'Revisá los datos del formulario.',
      fieldErrors,
    }
  }

  const data = parsed.data

  if (data.website) {
    return { status: 'success', message: 'Mensaje enviado.' }
  }

  const to = process.env.CONTACT_TO_EMAIL ?? 'comercial@gpservicios.com.ar'
  const from = process.env.CONTACT_FROM_EMAIL ?? to
  const transport = buildTransport()

  if (!transport) {
    console.warn(
      '[contact] SMTP no configurado. Mensaje recibido pero no se envió email.',
      { to, from, subject: data.subject, name: data.name, email: data.email },
    )
    return {
      status: 'error',
      message:
        'El servidor de correo aún no está configurado. Escribinos directamente a ' +
        to +
        ' mientras lo activamos.',
    }
  }

  const lines = [
    `Nombre: ${data.name}`,
    data.company ? `Empresa: ${data.company}` : null,
    `Email: ${data.email}`,
    data.phone ? `Teléfono: ${data.phone}` : null,
    `Asunto: ${data.subject}`,
    '',
    'Mensaje:',
    data.message,
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1A2228;line-height:1.55">
      <h2 style="margin:0 0 12px;color:#FF0001;font-family:Barlow,Inter,Arial,sans-serif">
        Nuevo contacto desde gpservicios.com.ar
      </h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
        <tr><td style="color:#8A9BAB"><b>Nombre</b></td><td>${escapeHtml(data.name)}</td></tr>
        ${data.company ? `<tr><td style="color:#8A9BAB"><b>Empresa</b></td><td>${escapeHtml(data.company)}</td></tr>` : ''}
        <tr><td style="color:#8A9BAB"><b>Email</b></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="color:#8A9BAB"><b>Teléfono</b></td><td>${escapeHtml(data.phone)}</td></tr>` : ''}
        <tr><td style="color:#8A9BAB"><b>Asunto</b></td><td>${escapeHtml(data.subject)}</td></tr>
      </table>
      <h3 style="margin:18px 0 6px;font-family:Barlow,Inter,Arial,sans-serif">Mensaje</h3>
      <p style="white-space:pre-wrap;background:#F4F5F7;padding:14px;border-radius:8px;margin:0">
        ${escapeHtml(data.message)}
      </p>
    </div>
  `

  try {
    await transport.sendMail({
      from,
      to,
      replyTo: `${data.name} <${data.email}>`,
      subject: `[Web] ${data.subject}`,
      text: lines,
      html,
    })
    return {
      status: 'success',
      message:
        '¡Listo! Tu mensaje fue enviado. Te responderemos en horario laboral a la brevedad.',
    }
  } catch (err) {
    console.error('[contact] Error enviando email:', err)
    return {
      status: 'error',
      message:
        'No pudimos enviar el mensaje en este momento. Probá más tarde o escribinos directamente a ' +
        to +
        '.',
    }
  }
}
