export const useState = (val: any) => [val, (newVal: any) => {}];
export const useEffect = (fn: any, deps: any) => fn();
