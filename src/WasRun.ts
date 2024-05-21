import { TestCase } from "./TestCase";

export class WasRun extends TestCase {
    wasRun: unknown;
    log: string;

    constructor(name: string) {
        super(name);
        this.wasRun = null;
    }

    setUp() {
        this.wasRun = null;
        this.log = "setUp ";
    }

    testMethod() {
        this.wasRun = 1;
        this.log = this.log + "testMethod ";
    }

    teardown() {
        this.log = this.log + "tearDown ";
    }

    testBrokenMethod() {
        this.log = this.log + "testBrokenMethod ";
        throw new Error();
    }
}
