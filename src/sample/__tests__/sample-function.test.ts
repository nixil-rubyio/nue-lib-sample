import { SampleFunction } from "@nue/ui-lib-sample";

describe("Test Sample class", () => {
  it("greet should work", () => {
    expect(SampleFunction(1, 2)).toEqual(3);
  });
});
