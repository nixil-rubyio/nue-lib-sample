import { SampleClass } from "@nue/ui-lib-sample";

describe("Test Sample class", () => {
  it("greet should work", () => {
    let sampleClass = new SampleClass("Alex");
    let greet = sampleClass.greet();
    expect(greet).toEqual("Hello, Alex");
  });
});
