# PAVELIS ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. — pavelis.gr

SPA showcase για την εταιρεία συγκολλήσεων (Λουτράκι). Vite + React + Tailwind, έτοιμο για Cloudflare Pages.

## Dev

```bash
npm install
npm run dev
npm run build   # -> dist/
```

## Cloudflare Pages

- Build command: `npm run build`
- Output: `dist`
- Root: repo root
- `functions/api/contact.ts` = stub για μελλοντικό Turnstile hardening (τώρα η φόρμα πάει κατευθείαν στο FormSubmit).

## Domain pavelis.gr (αγορασμένο από Papaki)

1. Cloudflare Dashboard → Add domain `pavelis.gr` (Free plan).
2. Papaki panel → βάλε τα 2 nameservers της Cloudflare (αντί για τα default). Περίμενε 1–24h.
3. Cloudflare Pages → Custom domains → `pavelis.gr` + `www.pavelis.gr`.

## Email: info@pavelis.gr → forwards to Gmail (one inbox only)

Goal: visitors see `info@pavelis.gr`, your father only ever opens `pavelis.stelios@gmail.com`.

1. Papaki panel → `pavelis.gr` → Email (Mail Manager) → Add → name `info` → Create (free 1GB mailbox).
2. In the mailbox settings enable forwarding to `pavelis.stelios@gmail.com` and tick "do not keep copies in mailbox" — nothing piles up in webmail, he never has to open it.
3. DNS caveat: free Papaki mail auto-configures only on Papaki nameservers. After moving NS to Cloudflare, copy the MX/SPF records from Mail Manager into Cloudflare DNS, or the mailbox is deleted after 7 days.
4. Optional: in Gmail → Settings → Accounts → "Send mail as" → add `info@pavelis.gr` (SMTP details from Papaki) so his replies also come from the domain address.

Code already matches this: the site displays `info@pavelis.gr`, the form delivers to the Gmail. Once the forward is tested, swap the one constant `FORM_RECIPIENT` to `info@pavelis.gr` so everything flows through the domain address into the same inbox.

## Φόρμα — κοστίζει κάτι;

Όχι. Η Cloudflare δεν έχει δωρεάν "Forms" σαν το Netlify. Γι' αυτό:
- Τώρα: FormSubmit AJAX → δωρεάν, χωρίς backend, χωρίς κλειδί.
- Αργότερα (προαιρετικό): Turnstile + Pages Function + Email Routing → επίσης δωρεάν προς 1 verified διεύθυνση.

## Στοιχεία (από ΓΕΜΗ 188244137000)

PAVELIS ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε. · ΑΦΜ 803051695 · Δερβενακίων 5, Λουτράκι 20300 · Τηλ +30 694 784 8132
