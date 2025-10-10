import { describe, it, expect } from "vitest";
import { cx } from "./index";

describe("cx", () => {
  it("joins truthy strings", () => {
    expect(cx("a", false && "b", "c")).toBe("a c");
  });
});