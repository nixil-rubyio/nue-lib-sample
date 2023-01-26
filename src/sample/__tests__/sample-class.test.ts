import { SampleClass } from "@nue/ui-lib-sample";
import { NuePricingChangeOrderCalculator } from "@nue-apps/nue-pricing-clientjs";

describe("Test Sample class", () => {
  it("greet should work", () => {
    let sampleClass = new SampleClass("Alex");
    let greet = sampleClass.greet();
    expect(greet).toEqual("Hello, Alex");
  });

  it("it should preview change order", () => {
    const calculator = new NuePricingChangeOrderCalculator({
      allowChangeOrderBackDate: true,
    });
  });
});
