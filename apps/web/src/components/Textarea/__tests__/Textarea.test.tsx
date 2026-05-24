import { describe, expect, it } from "vitest";

import { Textarea } from "../Textarea";

describe("Textarea", () => {
  it("is exported as a React component", () => {
    expect(Textarea).toBeTypeOf("function");
  });
});
