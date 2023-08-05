import { getRandomNumber } from "../../utils/helpers/generate-random-number.ts";

describe("getRandomNumber function", () => {
  test("should generate random numbers within the specified exclusive range", () => {
    const min = 1;
    const max = 10;
    const numberOfTests = 1000;

    for (let i = 0; i < numberOfTests; i++) {
      const randomNumber = getRandomNumber(min, max);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThan(max);
    }
  });

  test("should generate random numbers within the specified inclusive range", () => {
    const min = 1;
    const max = 10;
    const numberOfTests = 1000;

    for (let i = 0; i < numberOfTests; i++) {
      const randomNumber = getRandomNumber(min, max, true);

      expect(randomNumber).toBeGreaterThanOrEqual(min);
      expect(randomNumber).toBeLessThanOrEqual(max);
    }
  });
});
