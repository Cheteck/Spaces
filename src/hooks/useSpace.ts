import { useState, useEffect } from 'react';
import { Space } from '../types';
import { SpaceManager } from '../core/SpaceManager';

export function useSpace(spaceId: string, spaceManager: SpaceManager) {
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
