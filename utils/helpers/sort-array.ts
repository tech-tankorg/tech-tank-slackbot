import type { ScheduledMessageResponse } from "../types/projectTypes.d.ts";

export const sortArray = (msgRes: ScheduledMessageResponse[]) => {
  msgRes.sort((a, b) => {
    const firstValue = a.post_at;
    const secondValue = b.post_at;

    if (!firstValue || !secondValue) return -1;

    if (firstValue > secondValue) return -1;
    return 1;
  });
};
