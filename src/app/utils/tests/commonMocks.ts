export const mockGetter = <T extends {}, K extends keyof T>(object: T, property: K, value: T[K]) => {
    Object.defineProperty(object, property, { get: () => value });
};