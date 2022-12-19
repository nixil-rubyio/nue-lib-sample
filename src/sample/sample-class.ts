import { SampleInterface } from "./interface";

export class SampleClass implements SampleInterface {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  greet() {
    return "Hello, " + this.message;
  }
}
