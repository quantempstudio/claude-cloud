# Quantemp Website: Build Rules & Launch Checklist

> **For Claude sessions working on the Quantemp website.** Read this file fully before writing code.
> These rules are not optional. When a task conflicts with a rule, stop and ask the owner.
> To make it load automatically, copy it into the website repo as `CLAUDE.md`.

---

## 1. Project context

- **Business:** Quantemp, a digital product platform (36 products today) for small businesses, content creators and side-hustlers.
- **Brand:** Arabic-first (Egyptian colloquial), RTL, squircle shapes, lots of white space, flat (no shadows or gradients). Font: Noto Sans Arabic only. Primary colour royal purple `#7c45bd`; use off-white `#f1f1f1` and eerie-black `#1a1a1a` instead of pure white and black. Ask the owner for the latest design/motion system before designing.
- **Hosting:** Hostinger (domain + hosting already owned).
- **Stack (decided, do not change without asking):**
  - **WordPress + WooCommerce**, with a **custom lightweight theme** in the Quantemp brand. **No page builders** (no Elementor, Divi or similar).
  - **Payments: Paymob** via its official WooCommerce plugin.
  - Cart, checkout, My Account, thank-you page and emails are **fully custom designed** via WooCommerce template overrides.
  - Forms, CRM and automation use **free plans for now** (FluentCRM free, Brevo SMTP free). Small custom plugins fill the gaps.
- **Existing site:** an old WordPress + WooCommerce site is live. **Never work on the live site directly.** Use Hostinger staging.

---

## 2. Golden rules

1. **Staging first, always.** All changes go to staging (hPanel → WordPress → Staging), get tested, then get pushed live.
2. **Back up before any change** to the live site (files + database), and download a copy.
3. **Lazy and minimal:** use what exists (WordPress core → an existing well-maintained plugin → a small custom plugin). Build a custom plugin only when no proven tool does the job or it's behind a paywall.
4. **One plugin = one job.** Keep custom plugins small (aim for under ~300 lines) so they can be reviewed.
5. **Never build yourself:** payment processing, card storage, password and login systems, or bulk email sending. Use Paymob, WordPress core and an SMTP service.
6. **Never commit secrets.** API keys go in `wp-config.php` constants or the host's environment variables, never in code, JavaScript or Git.
7. **Explain risk in plain language.** The owner is not a developer. Say what a change does and what could break.

---

## 3. Security rules for every custom plugin or theme file (mandatory)

| # | Rule | How (WordPress) |
|---|---|---|
| 1 | **Block direct access** | First line of every PHP file: `defined('ABSPATH') \|\| exit;` |
| 2 | **Sanitize all input** | `sanitize_text_field()`, `sanitize_email()`, `absint()`, `sanitize_textarea_field()`, `wp_unslash()` first |
| 3 | **Validate input** | Check format and length (email valid, phone matches the expected pattern, required fields present). Reject bad input; don't silently "fix" it |
| 4 | **Escape all output** | `esc_html()`, `esc_attr()`, `esc_url()`, `wp_kses_post()`, at the moment of output |
| 5 | **Nonces on every form and action** | `wp_nonce_field()` / `wp_verify_nonce()`; REST: `X-WP-Nonce` |
| 6 | **Capability checks** | `current_user_can('manage_options')` (or the narrowest capability) on every admin or privileged action |
| 7 | **Safe SQL** | Use WordPress APIs first; raw SQL only through `$wpdb->prepare()` |
| 8 | **REST endpoints** | Always set `permission_callback` (never `__return_true` on anything that writes data, unless it's a public form protected by a nonce + captcha + rate limit) |
| 9 | **Anti-spam on public forms** | Cloudflare Turnstile (free) + honeypot field + rate limit (transient per IP) |
| 10 | **No secrets in the browser** | Nothing in JS or HTML that starts with `sk_`, `secret`, `service_role`, or any Paymob secret/HMAC key |
| 11 | **Verify webhooks** | Paymob callbacks must verify the HMAC signature before trusting any data |
| 12 | **File uploads** | Avoid them. If needed: `wp_handle_upload()`, an allow-list of types, a size limit, never executable |
| 13 | **Prefix everything** | Functions, options, hooks, CSS classes: `qt_` / `quantemp_` to avoid clashes |
| 14 | **Personal data** | Collect only what's needed (name, email, phone). Never log personal data or payment data |
| 15 | **Clean uninstall** | Provide `uninstall.php` that removes the plugin's options and tables |

---

## 4. WooCommerce customization rules

- Overrides live in `your-theme/woocommerce/...` (cart, checkout, myaccount, emails, thankyou).
- **Never remove `do_action()` / `apply_filters()` hooks** from templates. Paymob, FluentCRM and the tracking pixels depend on them. Move and restyle freely, but keep the hooks.
- **Override only what CSS can't do.** Every override needs maintenance after WooCommerce updates.
- After every WooCommerce update, check **WooCommerce → Status → Templates** for outdated overrides.
- **Digital products checkout:** remove shipping and address fields; keep name, email, phone and whatever Paymob requires.
- **Test a real Paymob payment** (small amount, then refund) after **every** checkout change.
- The Paymob card-entry screen belongs to Paymob. Brand it only through the Paymob dashboard.
- My Account → rename and design "Downloads" as **"مكتبتي" (My Library)**.

---

## 5. Speed rules (performance budget)

- **PageSpeed Insights (mobile) ≥ 90** on home, a product page, cart and checkout. LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Images: WebP/AVIF, sized to the display size, `loading="lazy"` below the first screen, explicit `width`/`height`.
- Fonts: self-host Noto Sans Arabic, load **2–3 weights max**, `font-display: swap`, preload the main weight.
- No jQuery or big libraries for small things. Native CSS and JS first.
- Load WooCommerce scripts and styles **only on shop pages**.
- Caching: LiteSpeed Cache (Hostinger); exclude cart, checkout and My Account from the page cache.
- All tracking scripts load through **Google Tag Manager**, and only the ones actually used.
- Plugin budget: **≤ 10 active plugins**. Every plugin needs a reason.

---

## 6. Functionality & conversion rules

- RTL first: `dir="rtl"` and `lang="ar"`; test Latin words and numbers inside Arabic text.
- Test on a **real phone** (Android + iPhone) and in at least 2 browsers.
- Every form gets a test with empty, invalid and valid input, plus clear Arabic error messages.
- Custom 404 page; a title, meta description and OG image on every page.
- Keep checkout to one page with an order summary, trust signals ("دفع آمن", instant download) and minimal fields.
- Thank-you page: instant download button + a relevant upsell.
- Accessibility: text contrast ≥ 4.5:1, visible focus states, alt text on images, labels on every input, keyboard-usable.

---

## 7. Tracking, analytics & CRM setup

| Need | Tool |
|---|---|
| Analytics | Google Analytics 4 (via GTM), WooCommerce e-commerce events (view_item, add_to_cart, begin_checkout, purchase) |
| SEO | Google Search Console + Rank Math or Yoast (pick one) |
| Visitor behaviour (heatmaps, recordings) | Microsoft Clarity (free) |
| Traffic sources | UTM links on **every** social post, bio link and ad |
| Social / ads | Meta Pixel + Conversions API, TikTok Pixel, Snap Pixel, Pinterest Tag (official WooCommerce integrations) |
| CRM + email | FluentCRM (free) + Brevo SMTP (free) |
| Email deliverability | SPF, DKIM and DMARC records on the domain. **Don't touch existing MX records** |
| Glue between tools | Small custom plugin (rules in §3), or Zapier/Make free plans |

- **Privacy:** cookie consent banner connected to GA4 Consent Mode; a privacy policy page. Egypt's Personal Data Protection Law (Law 151/2020) applies, and GDPR applies to EU visitors.

---

## 8. Claude tools to use

Install these in Claude Code sessions working on this project:

| Tool | Use it for | Source |
|---|---|---|
| **Security Guidance** (Anthropic plugin) | Always on: warns while code is written | Anthropic plugin directory |
| **WordPress DevKit** *or* **WordPress Dev Skills** (pick one) | Secure plugin/theme scaffolds, WooCommerce extensions, coding standards | Anthropic plugin directory (community) |
| **`/security-review`** (built in) | After every feature: review the changes | Built into Claude Code |
| **claude-security** (Anthropic plugin) | Deep scan of the whole project before launch | Anthropic plugin directory |
| **`/code-review`** (built in) | Correctness bugs in changes | Built into Claude Code |

Optional community skills (check stars, last update and licence before installing):
- `agamm/claude-code-owasp`: OWASP Top 10 reference
- `project-codeguard/rules`: secure-coding rules that switch on automatically
- `secondsky/claude-skills` → `wordpress-plugin-core`: WordPress security (nonces, `$wpdb->prepare`, XSS)

Non-Claude tools:
- **Plugin Check** (official WordPress.org plugin): run it on every custom plugin.
- **PHPCS + WordPress Coding Standards** (`WordPress-Extra` + `WordPress.Security` sniffs).
- **WPScan** / **Patchstack** (free): known-vulnerability alerts for installed plugins.
- **securityheaders.com**, **PageSpeed Insights**, **Google Rich Results Test**.

---

## 9. Definition of done (for every feature or plugin)

A feature is **not done** until all of these are true:

- [ ] Follows every rule in §3 (security) that applies
- [ ] `/security-review` run, and all findings fixed or explained to the owner
- [ ] Plugin Check / PHPCS (WordPress.Security) passes with no errors
- [ ] Tested on staging: valid, invalid and empty input; logged out and logged in
- [ ] Works on mobile in RTL
- [ ] No PageSpeed regression (still ≥ 90 mobile)
- [ ] If it touches checkout: a real Paymob test payment succeeded
- [ ] Owner gets a plain-language summary: what changed, how to test it, what could break

---

## 10. Pre-launch checklist (run before going live, before big changes, and monthly)

**Security**
- [ ] WordPress, WooCommerce, the theme and all plugins up to date; unused plugins and themes **deleted**
- [ ] Admin: strong passwords, 2FA, no `admin` username, a limited number of admin accounts
- [ ] Hostinger malware scanner + automatic daily backups enabled; one backup downloaded offline
- [ ] Cloudflare free plan in front of the site (firewall, bot protection); MX records copied correctly
- [ ] Security headers checked (securityheaders.com); HTTPS forced
- [ ] `DISALLOW_FILE_EDIT` set to `true` in `wp-config.php`; `WP_DEBUG` set to `false` on live
- [ ] No secrets in the page source (F12 → search `sk_`, `secret`, `key`, `hmac`)
- [ ] claude-security deep scan done; critical and high findings fixed
- [ ] XML-RPC disabled unless needed; login attempts limited

**Payments**
- [ ] Paymob live keys set (not test keys); webhook HMAC verified
- [ ] Real test order → download works → email received → order shows in WooCommerce and FluentCRM
- [ ] Refund flow tested

**SEO & migration**
- [ ] Old URL list saved (from the old sitemap)
- [ ] 301 redirects for every changed URL
- [ ] New sitemap submitted to Search Console; 404 report watched for 2–3 weeks after launch

**Speed & quality**
- [ ] PageSpeed ≥ 90 mobile on key pages
- [ ] Tested on a real phone, in RTL, in 2+ browsers
- [ ] GA4 purchase event fires once per order (no duplicates); pixels verified with their test tools
- [ ] Cookie banner + privacy policy live

---

## 11. When in doubt

Stop and ask the owner. Never guess on anything involving **payments, customer data, the live site, DNS/email records, or deleting things.**
