import { BinaryData, ConstructorOptions, JSDOM } from "jsdom";

export = dom;

declare namespace dom {
    function sandbox(html: string | Buffer | BinaryData, options: ConstructorOptions, callback: { (jsdom?: JSDOM): void }): void;
}