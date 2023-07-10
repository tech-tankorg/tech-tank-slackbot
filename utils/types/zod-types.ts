import { z } from "zod";

export const joke_category = z.union([
  z.literal("Programming"),
  z.literal("Pun"),
  z.literal("Spooky"),
  z.literal("programming"),
  z.literal("pun"),
  z.literal("spooky"),
]);
