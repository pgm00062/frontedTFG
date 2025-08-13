import { useState } from 'react';

export function useGridExpansion() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const toggle = (i: number) => setExpanded(prev => (prev === i ? null : i));
  return { expanded, toggle };
}