# Live fix checklist (you run commit + deploy)

Local build stamp: **20260922j**. Do not use `?v=` query cache-busting on this host.

## Locked failure set (prior probe; do not treat as current without recheck)

| Check | Observed |
| --- | --- |
| curl DEFAULT UA on `/`, `*.html`, new assets, folders | **500** (Apache error HTML; ErrorDocument also failed; webmaster@…edwardandjones-ng.com) |
| PowerShell Invoke-WebRequest `/` | **200**, len **53442** (stale body; not local `site-header-root` / `20260922j`) |
| `/favicon.jpg` | **200**, size matched local |
| Server header | `nginx` (front); error body is Apache-style |
| cPanel UI ports | `:2083` / `:2087` reachable |
| SSH private keys on this PC | none (only `known_hosts`) |

## What you commit (when ready)

Include at least:

- `.htaccess` (only `DirectoryIndex index.html`)
- `.cpanel.yml` (heal tasks above)
- `deploy-test.txt`
- `common-styles-20260922j.css`, `js/site-chrome-20260922j.js`
- all updated `*.html` and folder `*/index.html`
- `common-scripts.js`

## Deploy (cPanel Git)

1. Push/commit your changes to `main` on GitHub.
2. cPanel → Git Version Control → this repo → **Update from Remote**.
3. Confirm **no uncommitted changes**, then **Deploy HEAD**.
4. File Manager: open `/home/signlwzv/thewillowshotels.com/.htaccess` and confirm it is only `DirectoryIndex index.html` (dotfiles are easy to miss on upload).
5. If the domain DocumentRoot is actually `public_html` (not the repo path), copy/sync the same tree there, or confirm the `.cpanel.yml` public_html sync ran.

## Pass criteria after deploy

1. `https://thewillowshotels.com/deploy-test.txt` → **200**, body contains `20260922j`.
2. `https://thewillowshotels.com/js/site-chrome-20260922j.js` → **200**.
3. `https://thewillowshotels.com/common-styles-20260922j.css` → **200**.
4. `https://thewillowshotels.com/` → **200** in Chrome **and** Edge; View Source contains `site-header-root` and `20260922j`.
5. `about.html` / `contact.html` same as (4).

## If DEFAULT/old clients get 200 but Chrome/Edge still 500

Do these one at a time (identify which clears the 500):

1. Confirm live `.htaccess` is only `DirectoryIndex index.html` (no RewriteRule / ErrorDocument / Options / Headers).
2. Clear LiteSpeed / nginx / host cache in cPanel.
3. ModSecurity / Imunify360: check hits for those requests; whitelist or disable the blocking rule.
4. Only after apex + `.html` work: Domains → force HTTPS + www→apex (or apex→www) redirects.
5. Folder URLs (`/about/`, etc.) already exist as physical folders; switch nav to clean paths only after they return **200** for browser UAs.

## Rollback

Redeploy the previous known-good Git commit, or restore File Manager backup of `.htaccess` / site files from before this deploy.
