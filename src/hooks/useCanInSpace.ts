import { useState, useEffect } from 'react';
import { useSpaces } from './SpacesProvider';

export function useCanInSpace(ctx: any, spaceId: string, permission: string) {
  const { iam } = useSpaces();
  const [allowed, setAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!iam) {
      setLoading(false);
      return;
    }

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
