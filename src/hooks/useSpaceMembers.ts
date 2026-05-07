import { useState, useEffect } from 'react';
import { Membership } from '../types';
import { MembershipManager } from '../core/MembershipManager';

export function useSpaceMembers(spaceId: string, membershipManager: MembershipManager) {
  const [members, setMembers] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    membershipManager.getMembers(spaceId)
      .then(data => {
        if (isMounted) {
          setMembers(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [spaceId, membershipManager]);

  return { members, loading };
}
