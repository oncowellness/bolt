import { useState, useCallback } from 'react';

export function useLS(key, def) {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : def;
    } catch {
      return def;
    }
  });
  const set = useCallback((val) => {
    setState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [state, set];
}