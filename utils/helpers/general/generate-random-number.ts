export const getRandomNumber = (
  min: number,
  max: number,
  inclusive = false
) => {
  if (!inclusive) return Math.floor(Math.random() * (max - min) + min);

  return Math.floor(Math.random() * (max - min + 1) + min);
};
