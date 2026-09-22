# Live fix checklist (you run cPanel deploy)

Local build stamp: **20260922l** (pushed to `main` as commit with clean folder URLs). Do not use `?v=` query cache-busting on this host.

## Locked failure set (still true until cPanel Deploy HEAD)

| Check | Observed after GitHub push |
| --- | --- |
| Live `/` and `*.html` | **200**, but **Backup-era** body (inlined `<nav>`, no `site-header-root`, no `20260922l`) |
| `/deploy-test.txt`, `*.css`, `/js/*.js`, folder URLs (`/contact/`) | **500** (Apache; ErrorDocument also fails) |
| GitHub `main` `deploy-test.txt` | Contains `20260922l` — code is on GitHub; **live DocumentRoot not updated** |

## What already landed on GitHub

- `.htaccess` (only `DirectoryIndex index.html`)
- `.cpanel.yml` heals **both** `/home/signlwzv/thewillowshotels.com` and `public_html`, stamps `20260922l`, rsyncs when appropriate, clears LiteSpeed cache
- `js/site-chrome-20260922l.js` — loyalty topbar + shared header/footer + **clean URLs** (`/about/`, `/contact/`, …)
- `common-styles-20260922l.css` + all page refs
- Root `*.html` kept as silent fallbacks; folders `*/index.html` for clean URLs

## You must do now (cPanel) — required for Phase 2/3

1. cPanel → **Git Version Control** → this repo → **Update from Remote**.
2. Confirm no uncommitted server changes, then **Deploy HEAD**.
3. File Manager: open DocumentRoot `.htaccess` (check both `thewillowshotels.com` and `public_html` if unsure) — must be only `DirectoryIndex index.html`.
4. Clear LiteSpeed / host cache if present.
5. If domain DocumentRoot is `public_html`, confirm `.cpanel.yml` sync ran or copy the tree there.

## Pass criteria after Deploy HEAD

1. `https://thewillowshotels.com/deploy-test.txt` → **200**, body contains `20260922l`.
2. `https://thewillowshotels.com/js/site-chrome-20260922l.js` → **200**.
3. `https://thewillowshotels.com/common-styles-20260922l.css` → **200**.
4. `/` View Source contains `site-header-root` and `20260922l`; loyalty topbar appears in browser.
5. `/contact/` and `/about/` → **200** (clean URLs).
6. Same results in Chrome **and** Edge (hard refresh / private window).

## If Deploy HEAD still 500s

1. Manually replace live `.htaccess` with one line: `DirectoryIndex index.html`.
2. Clear cache again.
3. ModSecurity / Imunify360: check hits for `.js`/`.css`/`.txt` requests.
4. Apache error_log for the exact directive failing.
