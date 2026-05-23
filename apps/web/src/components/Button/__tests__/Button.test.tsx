import { describe, expect, it } from "vitest";

import { Button } from "../Button";

describe("Button", () => {
  it("is exported as a React component", () => {
    expect(Button).toBeTypeOf("function");
  });
});
