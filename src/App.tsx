import { useState } from 'react'
import type { FormEvent } from 'react'
import { dict, type Lang } from './i18n'

const PHONE = '+306947848132'
const PHONE_DISPLAY = '+30 694 784 8132'
const DISPLAY_EMAIL = 'info@pavelis.gr'
const FORM_RECIPIENT = 'pavelis.stelios@gmail.com'

const IMAGES = [
  'https://images.unsplash.com/photo-1563229708-55d0a600b01d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1689961476750-43475ea1cc1b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1643989710662-ae6c150f11f0?q=80&w=1200&auto=format&fit=crop',
]

export default function App() {
  const [lang, setLang] = useState<Lang>('el')
  const t = dict[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const submittedHoneypot = data.get('_honey')
    if (submittedHoneypot) return
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_RECIPIENT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          message: data.get('message'),
          _subject: `pavelis.gr - νέο μήνυμα από ${data.get('name')}`,
        }),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-lg font-black text-amber-400">
              P
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold tracking-widest">PAVELIS</span>
              <span className="block text-[11px] font-medium text-slate-500">
                {lang === 'el' ? 'ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.' : 'SINGLE MEMBER P.C.'}
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#services" className="hover:text-slate-950">{t.nav.services}</a>
            <a href="#about" className="hover:text-slate-950">{t.nav.about}</a>
            <a href="#company" className="hover:text-slate-950">{t.nav.company}</a>
            <a href="#contact" className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">{t.nav.contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full border border-slate-300 text-xs font-bold">
              {(['el', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 uppercase ${lang === l ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <a href={`tel:${PHONE}`} className="rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400 md:hidden">
              ☎
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              {t.heroBadge}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
              {t.heroTitleA}
              <br />
              <span className="text-amber-400">{t.heroTitleB}</span>
            </h1>
            <p className="mt-4 max-w-lg text-slate-300">{t.heroSub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${PHONE}`} className="rounded-full bg-amber-500 px-6 py-3 font-bold text-slate-950 hover:bg-amber-400">
                ☎ {t.ctaCall}: {PHONE_DISPLAY}
              </a>
              <a href="#services" className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-white hover:border-slate-400">
                {t.ctaServices}
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-800 pt-6">
              {t.stats.map((s) => (
                <div key={s.l}>
                  <dt className="text-xl font-black text-amber-400">{s.v}</dt>
                  <dd className="mt-1 text-xs text-slate-400">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-3">
            <img src={IMAGES[0]} alt="Welder working on metal, sparks flying" loading="eager" className="h-64 w-full rounded-2xl object-cover md:h-80" />
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES[1]} alt="Cutting metal with sparks" loading="lazy" className="h-36 w-full rounded-2xl object-cover" />
              <img src={IMAGES[2]} alt="Welder welding a piece of metal" loading="lazy" className="h-36 w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-black">{t.servicesTitle}</h2>
        <p className="mt-2 text-slate-600">{t.servicesSub}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.services.map((s) => (
            <article key={s.t} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:last:col-span-2 sm:last:w-1/2 sm:last:justify-self-center">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-xl">{s.icon}</div>
              <h3 className="font-extrabold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-black">{t.aboutTitle}</h2>
          <div className="mt-4 grid gap-6 text-slate-700 md:grid-cols-2">
            <p className="leading-relaxed">{t.aboutBody1}</p>
            <p className="leading-relaxed">{t.aboutBody2}</p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t.aboutPoints.map((p) => (
              <li key={p} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">✓ {p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company details */}
      <section id="company" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-black">{t.companyTitle}</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {t.companyRows.map(([k, v], i) => (
            <div key={k} className={`grid gap-1 px-5 py-3 text-sm sm:grid-cols-3 ${i % 2 ? 'bg-slate-50' : 'bg-white'}`}>
              <span className="font-semibold text-slate-500">{k}</span>
              <span className="font-bold sm:col-span-2">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">{t.contactTitle}</h2>
            <p className="mt-2 text-slate-300">{t.contactSub}</p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={`tel:${PHONE}`} className="block rounded-xl bg-slate-900 p-4 ring-1 ring-slate-800 hover:ring-amber-500">
                <span className="text-xs text-slate-400">{t.direct} · τηλέφωνο</span>
                <span className="block text-lg font-black text-amber-400">{PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${DISPLAY_EMAIL}`} className="block rounded-xl bg-slate-900 p-4 ring-1 ring-slate-800 hover:ring-amber-500">
                <span className="text-xs text-slate-400">email</span>
                <span className="block font-bold">{DISPLAY_EMAIL}</span>
              </a>
              <p className="text-slate-400">📍 Δερβενακίων 5, Λουτράκι 20300<br />🕗 {t.hours}</p>
              <iframe
                title="map"
                loading="lazy"
                className="h-52 w-full rounded-xl border-0"
                src="https://maps.google.com/maps?q=37.960389,23.025028&z=17&output=embed"
              />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=37.960389,23.025028"
                target="_blank"
                rel="noreferrer"
                className="block text-center text-amber-400 hover:text-amber-300"
              >
                {lang === 'el' ? 'Οδηγίες →' : 'Directions →'}
              </a>
            </div>
          </div>
          <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 text-slate-900">
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
            <label className="block text-sm font-bold">
              {t.formName}
              <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500" />
            </label>
            <label className="mt-4 block text-sm font-bold">
              {t.formPhone}
              <input name="phone" required type="tel" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500" />
            </label>
            <label className="mt-4 block text-sm font-bold">
              {t.formMsg}
              <textarea name="message" required rows={5} placeholder={t.formMsgPh} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-amber-500" />
            </label>
            <button disabled={status === 'sending'} className="mt-5 w-full rounded-full bg-slate-900 py-3 font-bold text-white hover:bg-slate-700 disabled:opacity-60">
              {status === 'sending' ? t.formSending : t.formSend}
            </button>
            {status === 'ok' && <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm font-semibold text-green-700">{t.formOk}</p>}
            {status === 'err' && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{t.formErr}</p>}
            <p className="mt-3 text-xs text-slate-500">{t.formPrivacy}</p>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p><strong className="text-slate-800">PAVELIS ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε.</strong> · ΑΦΜ 803051695 · ΓΕΜΗ 188244137000 · Δερβενακίων 5, Λουτράκι 20300</p>
          <p className="md:text-right">{t.rights}<br />{t.footerNote}</p>
        </div>
      </footer>
    </div>
  )
}
