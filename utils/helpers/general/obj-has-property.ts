// biome-ignore lint: msg type not properly defined by author thus the any type is used here
export const key_is_present = <T extends Object | undefined>(
  obj: T,
  key: string
) => {
  if (typeof obj === "undefined") throw new Error("object is undefined");
  return Object.hasOwn(obj, key);
};
