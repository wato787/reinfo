import { describe, expect, it } from "vitest";

import { Field, FieldDescription, FieldError, FieldLabel } from "../Field";

describe("Field", () => {
  it("exports composable React components", () => {
    expect(Field).toBeTypeOf("function");
    expect(FieldLabel).toBeTypeOf("function");
    expect(FieldDescription).toBeTypeOf("function");
    expect(FieldError).toBeTypeOf("function");
  });
});
