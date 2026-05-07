import { useState, useEffect } from 'react';
import { Membership } from '../types';
import { MembershipManager } from '../core/MembershipManager';

export function useMembership(spaceId: string, userId: string, membershipManager: MembershipManager) {
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
