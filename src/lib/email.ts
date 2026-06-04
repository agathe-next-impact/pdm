import nodemailer from 'nodemailer'

type SendMagicLinkArgs = {
  email: string
  url: string
}

export async function sendMagicLink({ email, url }: SendMagicLinkArgs) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || 'Projet de Merde <noreply@projetdemerde.com>'

  if (!host) {
    console.info(`Magic link for ${email}: ${url}`)
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  })

  await transporter.sendMail({
    to: email,
    from,
    subject: 'Ton lien magique Projet de Merde',
    text: `Clique ici pour te connecter a PDM: ${url}\n\nCe lien expire dans 20 minutes.`,
    html: `<p>Clique ici pour te connecter a PDM:</p><p><a href="${url}">${url}</a></p><p>Ce lien expire dans 20 minutes.</p>`,
  })
}
