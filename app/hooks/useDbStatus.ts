// hooks/useDbStatus.ts
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const CHECK_INTERVAL = 30000;
const SLOW_THRESHOLD = 2000;

export type DbStatus = 'checking' | 'connected' | 'slow' | 'disconnected';

export function useDbStatus() {
  const [status, setStatus] = useState<DbStatus>('checking');
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    const check = async () => {
      const start = Date.now();
      const { error } = await supabase.auth.getSession();
      const elapsed = Date.now() - start;

      if (error) {
        setStatus('disconnected');
      } else if (elapsed > SLOW_THRESHOLD) {
        setStatus('slow');
      } else {
        setStatus('connected');
      }
    };

    check();
    intervalRef.current = setInterval(check, CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return status;
}
