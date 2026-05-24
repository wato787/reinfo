import { describe, expect, it } from "vitest";

import { Field } from "../Field";

describe("Field", () => {
  it("is exported as a React component", () => {
    expect(Field).toBeTypeOf("function");
  });
});
