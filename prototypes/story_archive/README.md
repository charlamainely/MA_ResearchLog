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
- submitted stories are saved to `localStorage` with `status: "pending"`
- locally approved stories from the admin panel are merged into the public gallery and postcard matching results
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

## Future backend notes

The UI code in [app.js](/Users/lydukhanhhan/Documents/MA_ResearchLog/prototypes/story_archive/app.js) keeps storage and story retrieval separate from rendering so it can be replaced later.

The easiest Supabase migration path is:

1. Replace `getLocalStories`, `safeReadStorage`, and `safeWriteStorage` with API calls.
2. Fetch approved stories from a `stories` table instead of `data/stories.js`.
3. Send new submissions to a `pending` moderation queue.
4. Keep the same story object shape so the UI code does not need to change much.

## Current limitations

- there is no real backend, auth, or server-side moderation
- submissions are browser-local and do not sync across devices
- the admin panel is only a prototype tool for local testing
- sample stories are hand-authored seed data
