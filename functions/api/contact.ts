interface PagesFunction<E = unknown> {
  (ctx: { request: Request; env: E }): Promise<Response> | Response
}

interface Env {
  CONTACT_RECIPIENT?: string
  TURNSTILE_SECRET_KEY?: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as { name?: string; phone?: string; message?: string }
    if (!body.name || !body.message) {
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }
    const recipient = env.CONTACT_RECIPIENT ?? 'info@pavelis.gr'
    return Response.json({ ok: true, note: `Not wired yet — connect Turnstile + email sending to ${recipient}` })
  } catch {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }
}
