-- Persisted reaction feed + Supabase Realtime (postgres changes).
-- 적용: Supabase CLI `db push` 또는 Dashboard → SQL에서 실행.

create table if not exists public.reaction_logs (
  id uuid primary key default gen_random_uuid(),
  scope text not null check (scope in ('strategy', 'report')),
  emoji text not null check (char_length(emoji) <= 24),
  label text not null check (char_length(label) <= 120),
  user_id uuid references auth.users (id) on delete set null,
  display_name text,
  created_at timestamptz not null default now(),
  constraint reaction_logs_display_name_len check (
    display_name is null or char_length(display_name) <= 64
  )
);

create index if not exists reaction_logs_scope_created_idx
  on public.reaction_logs (scope, created_at desc);

alter table public.reaction_logs enable row level security;

create policy "reaction_logs_select"
  on public.reaction_logs for select
  to anon, authenticated
  using (true);

create policy "reaction_logs_insert"
  on public.reaction_logs for insert
  to anon, authenticated
  with check (
    scope in ('strategy', 'report')
    and (
      (auth.uid() is not null and user_id = auth.uid())
      or (auth.uid() is null and user_id is null)
    )
  );

alter publication supabase_realtime add table public.reaction_logs;
