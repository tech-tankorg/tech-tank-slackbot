import { z } from "zod";

export const joke_category = z.union([
  z.literal("programming"),
  z.literal("pun"),
  z.literal("spooky"),
]);

export const sanity_letter_section = z.object({
  letter_fyi: z.array(z.object({ title: z.string(), description: z.string() })),
  letter_info: z.array(
    z.object({ title: z.string(), description: z.string() })
  ),
  letter_title: z.string(),
  letter_description: z.string(),
  scheduled_post_date: z.string(),
});
