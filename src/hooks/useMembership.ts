import { useState, useEffect } from 'react';
import { Membership } from '../types';
import { useSpaces } from './SpacesProvider';

export function useMembership(spaceId: string, userId: string) {
  const { membershipManager } = useSpaces();
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    membershipManager.getMembership(spaceId, userId)
      .then(data => {
        if (isMounted) {
          setMembership(data || null);
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
  }, [spaceId, userId, membershipManager]);

  return { membership, loading, error };
}
