"use client";

import { createBrowserClientOptional } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

export type ReactionScope = "strategy" | "report";

export type ReactionLogEntry = {
  id: string;
  scope: ReactionScope;
  emoji: string;
  label: string;
  at: number;
  from?: string;
};

const MAX_ENTRIES = 36;

type ReactionRow = {
  id: string;
  scope: string;
  emoji: string;
  label: string;
  display_name: string | null;
  created_at: string;
};

function capEntries(next: ReactionLogEntry[]): ReactionLogEntry[] {
  if (next.length <= MAX_ENTRIES) return next;
  return next.slice(next.length - MAX_ENTRIES);
}

function rowToEntry(row: ReactionRow): ReactionLogEntry | null {
  if (row.scope !== "strategy" && row.scope !== "report") return null;
  return {
    id: row.id,
    scope: row.scope,
    emoji: row.emoji,
    label: row.label,
    at: new Date(row.created_at).getTime(),
    from: row.display_name ?? undefined,
  };
}

function recordToEntry(row: Record<string, unknown>): ReactionLogEntry | null {
  if (typeof row.id !== "string" || typeof row.scope !== "string") return null;
  if (typeof row.emoji !== "string" || typeof row.label !== "string") return null;
  if (typeof row.created_at !== "string") return null;
  const display_name =
    row.display_name === null || row.display_name === undefined
      ? null
      : String(row.display_name);
  return rowToEntry({
    id: row.id,
    scope: row.scope,
    emoji: row.emoji,
    label: row.label,
    display_name,
    created_at: row.created_at,
  });
}

export function useReactionLog(scope: ReactionScope) {
  const [entries, setEntries] = useState<ReactionLogEntry[]>([]);
  const [live, setLive] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const supabaseRef = useRef<SupabaseClient | null>(null);

  useEffect(() => {
    const supabase = createBrowserClientOptional();
    supabaseRef.current = supabase;

    if (!supabase) {
      setLive(false);
      setSubscribed(true);
      setLastError(null);
      return;
    }

    setLive(true);
    setLastError(null);
    const client: SupabaseClient = supabase;
    let cancelled = false;

    async function loadRecent() {
      const { data, error } = await client
        .from("reaction_logs")
        .select("id, scope, emoji, label, display_name, created_at")
        .eq("scope", scope)
        .order("created_at", { ascending: false })
        .limit(MAX_ENTRIES);

      if (cancelled) return;
      if (error) {
        setLastError(error.message);
        return;
      }
      const rows = (data ?? []) as ReactionRow[];
      const mapped = rows
        .map(rowToEntry)
        .filter((e): e is ReactionLogEntry => e !== null)
        .reverse();
      setEntries(mapped);
    }

    const channel = client
      .channel(`reaction_logs:${scope}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reaction_logs",
          filter: `scope=eq.${scope}`,
        },
        (payload) => {
          const entry = recordToEntry(
            payload.new as Record<string, unknown>,
          );
          if (!entry) return;
          setEntries((prev) => {
            if (prev.some((e) => e.id === entry.id)) return prev;
            return capEntries([...prev, entry]);
          });
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setSubscribed(true);
          void loadRecent();
        }
        if (status === "CLOSED" || status === "CHANNEL_ERROR")
          setSubscribed(false);
      });

    return () => {
      cancelled = true;
      setSubscribed(false);
      void client.removeChannel(channel);
      supabaseRef.current = null;
    };
  }, [scope]);

  const pushReaction = useCallback(
    async (emoji: string, label: string) => {
      setLastError(null);
      const supabase = supabaseRef.current;

      if (!supabase) {
        const entry: ReactionLogEntry = {
          id: crypto.randomUUID(),
          scope,
          emoji,
          label,
          at: Date.now(),
          from: undefined,
        };
        setEntries((prev) => capEntries([...prev, entry]));
        return;
      }

      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;
      let display_name: string | null = null;
      if (user?.email) display_name = user.email.split("@")[0] ?? user.email;
      else if (user?.id) display_name = `anon_${user.id.slice(0, 8)}`;

      const { data, error } = await supabase
        .from("reaction_logs")
        .insert({
          scope,
          emoji,
          label,
          user_id: user?.id ?? null,
          display_name,
        })
        .select("id, scope, emoji, label, display_name, created_at")
        .single();

      if (error) {
        setLastError(error.message);
        return;
      }

      const entry = rowToEntry(data as ReactionRow);
      if (entry) {
        setEntries((prev) => {
          if (prev.some((e) => e.id === entry.id)) return prev;
          return capEntries([...prev, entry]);
        });
      }
    },
    [scope],
  );

  const statusMessage = !live
    ? "로컬 미리보기 — Supabase를 연결하고 migration을 적용하면 반응이 DB에 저장되고 전 구독자에게 실시간 전달됩니다."
    : subscribed
      ? "DB 저장 · Realtime INSERT 구독 중"
      : "Realtime 채널 연결 중…";

  const actionsDisabled = live && !subscribed;

  return {
    entries,
    pushReaction,
    live,
    subscribed,
    statusMessage,
    actionsDisabled,
    lastError,
  };
}
