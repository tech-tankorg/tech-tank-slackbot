import {
  determine_next_day_function,
  determine_next_execute_date_freq,
  getOffsetDay,
} from "../../utils/helpers/custom-date-fns.ts";

let today: Date;

describe("test date functions", () => {
  beforeAll(() => {
    today = new Date("08/05/2023");

    return today;
  });

  it("should return the following monday when given a date", () => {
    const next_week_func = determine_next_day_function("monday");

    const is_valid_day = next_week_func(today);

    expect(is_valid_day).toBeAfterOrEqualTo(
      new Date("2023-08-07T00:00:00.000Z")
    );
  });

  it("should return the result of the difference of two dates", () => {
    const day_1 = new Date(2023, 8, 3);
    const day_2 = new Date(2023, 8, 4);

    const offset_number = getOffsetDay(day_1, day_2);

    expect(offset_number).toBe(1);
  });

  it("should return a date three week from now when given a frequency of 3", () => {
    const next_date = determine_next_execute_date_freq(today, "wednesday", 3);

    expect(next_date).toBeAfterOrEqualTo(new Date("2023-08-23T00:00:00.000Z"));
  });
});
