import type {
  ScheduledMessageResponse,
  google_cal_event,
} from "../types/projectTypes.d.ts";

export const sortArray = (msgRes: ScheduledMessageResponse[]) => {
  msgRes.sort((a, b) => {
    const firstValue = a.post_at;
    const secondValue = b.post_at;

    if (firstValue === undefined || secondValue === undefined) return -1;

    if (firstValue > secondValue) return -1;
    return 1;
  });
};

export const generic_sort_array = <T extends google_cal_event>(arr: T) => {
  arr.sort((a, b) => {
    const firstValue = a.start.dateTime;
    const secondValue = b.start.dateTime;

    if (firstValue < secondValue) return -1;
    return 1;
  });
};
