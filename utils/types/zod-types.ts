import { z } from "zod";

export const joke_category = z.union([
  z.literal("Programming"),
  z.literal("Pun"),
  z.literal("Spooky"),
]);
