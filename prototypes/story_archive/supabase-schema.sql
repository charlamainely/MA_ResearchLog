create table if not exists public.stories (
  id text primary key,
  story_text text not null check (char_length(trim(story_text)) > 0),
  prompt_text text,
  show_prompt boolean not null default false,
  narrative_focuses text[] not null check (cardinality(narrative_focuses) between 1 and 3),
  tone text not null check (tone in ('positive', 'neutral', 'negative')),
  family_closeness text not null check (family_closeness in ('distant', 'not-close', 'complicated', 'somewhat-close', 'close', 'very-close')),
  display_name text not null default 'Anonymous',
  language text not null check (language in ('Vietnamese', 'English', 'Bilingual', 'Other')),
  status text not null default 'pending' check (status in ('approved', 'pending', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.stories add column if not exists prompt_text text;
alter table public.stories add column if not exists show_prompt boolean not null default false;

grant usage on schema public to anon;
grant select, insert on public.stories to anon;
grant usage on schema public to authenticated;
grant select, update on public.stories to authenticated;

alter table public.stories enable row level security;

drop policy if exists "Public can read approved stories" on public.stories;
create policy "Public can read approved stories"
on public.stories
for select
to anon
using (status = 'approved');

drop policy if exists "Public can submit pending stories" on public.stories;
create policy "Public can submit pending stories"
on public.stories
for insert
to anon
with check (status = 'pending');

drop policy if exists "Authenticated users can read all stories" on public.stories;
create policy "Authenticated users can read all stories"
on public.stories
for select
to authenticated
using (true);

drop policy if exists "Authenticated users can update story status" on public.stories;
create policy "Authenticated users can update story status"
on public.stories
for update
to authenticated
using (true)
with check (status in ('approved', 'pending', 'rejected'));
