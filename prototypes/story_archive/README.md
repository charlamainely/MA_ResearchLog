# Story Archive Prototype

This prototype lives in [index.html](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/index.html) and is designed to run as a static frontend on GitHub Pages. It uses plain HTML, CSS, and JavaScript so it fits the rest of this repository.

## Run locally

Because the prototype uses ES modules, serve the repo with a local static server instead of opening the file directly.

Example:

```bash
cd /Users/lydukhanhhan/Documents/MA_ResearchLog
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/prototypes/story_archive/`

Optional prototype admin panel:

- add `?admin=1` to the URL, or
- press `Ctrl+Shift+A` or `Cmd+Shift+A`

## Deploy as its own site

This repo now includes a dedicated GitHub Pages workflow:

- [.github/workflows/story-archive-pages.yml](/Users/lydukhanhhan/Documents/MA_ResearchLog/.github/workflows/story-archive-pages.yml)

It deploys only:

- [prototypes/story_archive/](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/)

That means this prototype can live on its own Pages URL, separate from the rest of the research log, without moving it into a new repository.

### First-time GitHub Pages setup

1. Push the workflow to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to `GitHub Actions`.
4. Run the `Deploy Stories Mailbox` workflow, or push a change to:
   - `.github/workflows/story-archive-pages.yml`
   - anything inside `prototypes/story_archive/`

### Custom domain later

When you are ready to attach a domain:

1. In GitHub repository settings, open `Pages`.
2. Enter your custom domain there.
3. Add the required DNS records at your domain provider.
4. If you want the domain to persist as part of the deployed artifact, add a `CNAME` file inside [prototypes/story_archive/](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/) with the domain as its only line.

Example:

```txt
stories.yourdomain.com
```

Because the deployment publishes the folder contents directly, the archive will behave like a standalone site at the domain root.

## Turn on real submissions with Supabase

This prototype now supports a real Supabase-backed mode while still keeping the static fallback.

Files involved:

- [supabase-config.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/supabase-config.js)
- [supabase-api.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/supabase-api.js)
- [supabase-schema.sql](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/supabase-schema.sql)

Setup steps:

1. Create a Supabase project.
2. In the Supabase SQL editor, run [supabase-schema.sql](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/supabase-schema.sql).
3. Open [supabase-config.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/supabase-config.js).
4. Fill in:
   - `url`: your project URL
   - `anonKey`: your publishable / anon key
5. Set `enabled: true`.
6. Keep `table: "stories"` unless you rename the table.
7. Leave `includeSeedStories: true` if you want the sample stories to remain visible until your Supabase table is populated. Set it to `false` once you no longer want the local seed stories mixed in.

Important:

- use the publishable / anon key only
- do not put the `service_role` key in frontend code
- moderation is manual for now: approve or reject pending rows in the Supabase dashboard

## Data model

Approved sample stories live in [data/stories.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/data/stories.js).

Every story follows this structure:

```js
{
  id: string,
  storyText: string,
  narrativeFocuses: string[],
  tone: string,
  familyCloseness: string,
  displayName: string,
  language: string,
  status: "approved" | "pending" | "rejected",
  createdAt: string
}
```

Runtime data behavior:

- approved sample stories are loaded from the static data file
- if Supabase is configured, approved remote stories are fetched from the `stories` table
- if Supabase is configured, submitted stories are inserted into Supabase with `status: "pending"`
- if Supabase is not configured, submitted stories are saved to `localStorage` with `status: "pending"`
- locally approved stories from the admin panel are merged into the public gallery and postcard matching results only in local prototype mode
- pending and rejected stories never appear in the public archive

## Matching logic

The postcard flow uses the selected:

- `familyCloseness`
- one `selectedNarrativeFocus`
- `tone`

Matching order:

1. Exact matches:
   Same tone, same family closeness, and story `narrativeFocuses` includes the selected narrative focus.
2. Soft matches:
   If exact matches are fewer than 3, add stories that match any 2 out of those 3 dimensions.
3. Focus fallback:
   If nothing matched yet, show stories that at least match the selected narrative focus.
4. Empty state:
   If there are still no results, show a friendly fallback with links to browse or submit.

## Backend notes

The UI code in [app.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/app.js) now supports two modes:

1. Static prototype mode
   - approved stories come from [data/stories.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/data/stories.js)
   - submissions stay in browser `localStorage`
2. Supabase mode
   - approved stories come from the Supabase `stories` table
   - submissions are inserted into Supabase as `pending`

The frontend still uses the same app-level story shape, and [supabase-api.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/supabase-api.js) maps between database snake_case and UI camelCase fields.

## Current limitations

- there is still no admin auth flow in the frontend
- moderation is manual in the Supabase dashboard
- there is no spam protection or rate limiting yet
- if Supabase is not configured, submissions remain browser-local and do not sync across devices
- the admin panel is only a prototype tool for local testing when Supabase mode is off
- sample stories are hand-authored seed data
