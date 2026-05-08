import { useMemo } from 'react';
import { ActorContext } from '../types';
import { useSpaces } from './SpacesProvider';

export function useSessionActor(userId: string): ActorContext {
  const { iam } = useSpaces();
  
  return useMemo(() => {
    // This hook would normally read from a global store or context 
    // that holds the currently selected actor.
    return {
      id: userId,
      type: 'user'
    };
  }, [userId]);
}
