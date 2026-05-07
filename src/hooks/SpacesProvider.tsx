import React, { createContext, useContext, useMemo } from 'react';
import { SpaceManager } from '../core/SpaceManager';
import { MembershipManager } from '../core/MembershipManager';
import { GovernanceManager } from '../core/GovernanceManager';
import { ImpactManager } from '../core/ImpactManager';
import { ISpaceAdapter, IMembershipAdapter } from '../adapters';
import { MemorySpaceAdapter, MemoryMembershipAdapter } from '../adapters/MemoryAdapter';

interface SpacesContextValue {
  spaceManager: SpaceManager;
  membershipManager: MembershipManager;
  governanceManager: GovernanceManager;
  impactManager: ImpactManager;
  iam?: any;
}

const SpacesContext = createContext<SpacesContextValue | undefined>(undefined);

export interface SpacesProviderProps {
  children: React.ReactNode;
  spaceAdapter?: ISpaceAdapter;
  membershipAdapter?: IMembershipAdapter;
  iam?: any;
}

export const SpacesProvider: React.FC<SpacesProviderProps> = ({ 
  children, 
  spaceAdapter, 
  membershipAdapter,
  iam 
}) => {
  const value = useMemo(() => {
    const sAdapter = spaceAdapter || new MemorySpaceAdapter();
    const mAdapter = membershipAdapter || new MemoryMembershipAdapter();

    return {
      spaceManager: new SpaceManager(sAdapter),
      membershipManager: new MembershipManager(mAdapter),
      governanceManager: new GovernanceManager(),
      impactManager: new ImpactManager(),
      iam
    };
  }, [spaceAdapter, membershipAdapter, iam]);

  return (
    <SpacesContext.Provider value={value}>
      {children}
    </SpacesContext.Provider>
  );
};

export const useSpaces = () => {
  const context = useContext(SpacesContext);
  if (!context) {
    throw new Error('useSpaces must be used within a SpacesProvider');
  }
  return context;
};
