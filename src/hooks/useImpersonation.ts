import { useState, useCallback } from 'react';
import { ActorContext, Space } from '../types';
import { useSpaces } from './SpacesProvider';

export function useImpersonation() {
  const { iam } = useSpaces();
  const [activeActor, setActiveActor] = useState<ActorContext | null>(null);

  const switchToSpace = useCallback((space: Space) => {
    const actor: ActorContext = {
      id: space.id,
      type: 'space',
      name: space.name,
      avatar: (space.metadata?.avatar as string) || undefined
    };
    setActiveActor(actor);
    // In real apps, you might update the IAM context or session here
  }, []);

  const switchToPersonal = useCallback(() => {
    setActiveActor(null);
  }, []);

  return { 
    activeActor, 
    isImpersonating: activeActor?.type === 'space',
    switchToSpace, 
    switchToPersonal 
  };
}
