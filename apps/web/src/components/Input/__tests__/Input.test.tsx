import { describe, expect, it } from "vitest";

import { Input } from "../Input";

describe("Input", () => {
  it("is exported as a React component", () => {
    expect(Input).toBeTypeOf("function");
  });
});
