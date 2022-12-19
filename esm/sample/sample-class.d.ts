import { SampleInterface } from './interface';
declare class SampleClass implements SampleInterface {
    message: string;
    constructor(message: string);
    greet(): string;
}
declare const _default: {
    SampleClass: typeof SampleClass;
};
export default _default;
