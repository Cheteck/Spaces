import { IAMContext } from '@ijideals/iam-core';

/**
 * Next.js Proxy Utility
 * Used to securely proxy space-related requests and enrich context in Next.js 16+ environments.
 */
export const createSpaceProxy = (iam: any, spaceId: string) => {
  return new Proxy(iam, {
    get(target, prop, receiver) {
      const originalValue = Reflect.get(target, prop, receiver);

      if (typeof originalValue === 'function') {
        return async (...args: any[]) => {
          // If the first argument is a context, we enrich it with the spaceId
          if (args[0] && typeof args[0] === 'object') {
            args[0] = {
              ...args[0],
              space: {
                ...args[0].space,
                spaceId
              }
            };
          }
          return originalValue.apply(target, args);
        };
      }

      return originalValue;
    }
  });
};
