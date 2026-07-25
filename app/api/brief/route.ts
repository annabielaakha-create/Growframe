import { NextResponse } from 'next/server'
import { site } from '@/lib/site'

// Edge runtime — required by Cloudflare Pages (@cloudflare/next-on-pages).
// The handler only uses fetch + Web APIs, so it runs unchanged on Vercel too.
export const runtime = 'edge'

type Brief = {
  name?: string
  company?: string
  email?: string
  phone?: string
  services?: string[]
  pkg?: string
  timeline?: string
  message?: string
  channel?: string
  /** honeypot — real people never fill this */
  website?: string
}

const esc = (v = '') =>
  String(v).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  )

/** "Growth — New Project Inquiry — John Doe", or no package prefix when unsure. */
function buildSubject(pkg: string | undefined, name: string) {
  const base = `New Project Inquiry — ${name}`
  if (!pkg || pkg === 'Not Sure Yet') return base
  return `${pkg} — ${base}`
}

function buildHtml(b: Brief) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:14px 0;border-bottom:1px solid #eceaf3;color:#6b6480;font-size:13px;width:190px;vertical-align:top;">${esc(label)}</td>
           <td style="padding:14px 0;border-bottom:1px solid #eceaf3;color:#14101f;font-size:15px;vertical-align:top;">${esc(value)}</td>
         </tr>`
      : ''

  const services = b.services?.length ? b.services.join(' · ') : '—'

  return `<!doctype html>
<html><body style="margin:0;padding:32px 16px;background:#f5f3fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px -20px rgba(76,29,149,.25);">
    <tr>
      <td style="background:linear-gradient(120deg,#4C1D95,#7C3AED);padding:32px 36px;">
        <p style="margin:0;color:#DDD0FF;font-size:11px;letter-spacing:.22em;text-transform:uppercase;">GrowFrame · Project Brief</p>
        <h1 style="margin:12px 0 0;color:#ffffff;font-size:26px;letter-spacing:-.02em;">${esc(b.name || 'New enquiry')}</h1>
        ${b.company ? `<p style="margin:6px 0 0;color:rgba(255,255,255,.75);font-size:15px;">${esc(b.company)}</p>` : ''}
      </td>
    </tr>
    <tr>
      <td style="padding:8px 36px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row('Full name', b.name)}
          ${row('Company', b.company)}
          ${row('Work email', b.email)}
          ${row('Phone', b.phone)}
          ${row('Services', services)}
          ${row('Package', b.pkg)}
          ${row('Timeline', b.timeline)}
          ${row('Prefers', b.channel)}
        </table>

        <p style="margin:32px 0 8px;color:#6b6480;font-size:13px;">The project</p>
        <div style="background:#f7f5fc;border:1px solid #eceaf3;border-radius:14px;padding:20px;color:#14101f;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(b.message || '—')}</div>

        <p style="margin:28px 0 0;color:#9a93ad;font-size:12.5px;">
          Reply directly to this email to reach ${esc(b.name || 'them')}${b.email ? ` at ${esc(b.email)}` : ''}.
        </p>
      </td>
    </tr>
  </table>
</body></html>`
}

function buildText(b: Brief) {
  return [
    `NEW PROJECT BRIEF — ${b.name || ''}`,
    '',
    `Full name:   ${b.name || '—'}`,
    `Company:     ${b.company || '—'}`,
    `Work email:  ${b.email || '—'}`,
    `Phone:       ${b.phone || '—'}`,
    `Services:    ${b.services?.length ? b.services.join(', ') : '—'}`,
    `Package:     ${b.pkg || '—'}`,
    `Timeline:    ${b.timeline || '—'}`,
    `Prefers:     ${b.channel || '—'}`,
    '',
    'THE PROJECT',
    b.message || '—',
  ].join('\n')
}

export async function POST(request: Request) {
  let body: Brief
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Silently accept bot submissions so they don't retry.
  if (body.website) return NextResponse.json({ ok: true })

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: 'Name, work email and project details are required.' },
      { status: 422 },
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'That email looks incomplete.' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Not configured yet — the client falls back to opening a mail draft.
    return NextResponse.json(
      { ok: false, error: 'Email service not configured.', fallback: true },
      { status: 503 },
    )
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.BRIEF_FROM_EMAIL || 'GrowFrame Briefs <onboarding@resend.dev>',
      to: [process.env.BRIEF_TO_EMAIL || site.email],
      reply_to: email,
      subject: buildSubject(body.pkg, name),
      html: buildHtml({ ...body, name, email, message }),
      text: buildText({ ...body, name, email, message }),
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('Resend error:', res.status, detail)
    return NextResponse.json(
      { ok: false, error: 'We could not send that just now.', fallback: true },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
