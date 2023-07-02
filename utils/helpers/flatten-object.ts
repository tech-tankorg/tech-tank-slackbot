export const flatten_object = (obj: Record<string, string[]>) => {
  const values = Object.values(obj);

  const new_array: string[] = [];

  values.forEach((value) => {
    new_array.push(...value);
  });

  return new_array;
};
