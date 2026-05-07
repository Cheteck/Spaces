import { useState, useEffect } from 'react';
import { IAMContext } from '@ijideals/iam-core';

export function useCanInSpace(iam: any, ctx: IAMContext, spaceId: string, permission: string) {
  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const spaceCtx = { ...ctx, space: { ...ctx.space, spaceId } };
    
    iam.can(spaceCtx, permission)
      .then((res: boolean) => {
        if (isMounted) {
          setAllowed(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAllowed(false);
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [iam, ctx, spaceId, permission]);

  return { allowed, loading };
}
