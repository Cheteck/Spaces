import { useState, useEffect } from 'react';
import { Space } from '../types';
import { useSpaces } from './SpacesProvider';

export function useSpace(spaceId: string) {
  const { spaceManager } = useSpaces();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    spaceManager.getSpace(spaceId)
      .then(data => {
        if (isMounted) {
          setSpace(data || null);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [spaceId, spaceManager]);

  return { space, loading, error };
}
