import React from 'react';

type VerdictPillProps = {
  label: string;
  color: 'supported' | 'partial' | 'refused' | 'other';
};

export function VerdictPill({ label, color }: VerdictPillProps) {
  const colorMap = {
    supported: 'bg-supported text-zinc-950',
    partial: 'bg-partial text-zinc-950',
    refused: 'bg-refused text-white dark:text-zinc-950',
    other: 'bg-other text-white dark:text-zinc-950',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase font-mono ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
