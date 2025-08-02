import { useEffect, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDebounce(effect: any, dependencies: any, delay: number) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}