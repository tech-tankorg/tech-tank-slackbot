import { is_admin } from "../../utils/helpers/feat-flag.ts";
import { admins } from "../../utils/config/channel-config.ts";

describe("feature flags", () => {
  it("should return true is an admin user is passed into the function", () => {
    const result = is_admin(admins.chris);

    expect(result).toBeTrue();
  });

  it("should return false is an admin user is not passed into the function", () => {
    const result = is_admin("UR823CCSE2");
    expect(result).toBeFalse();
  });
});
