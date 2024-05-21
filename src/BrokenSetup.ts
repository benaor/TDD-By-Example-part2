import { TestCase } from "./TestCase";

export class TestCaseWithBrokenSetup extends TestCase {
    constructor(name: string) {
        super(name);
    }

    setUp() {
        throw new Error();
    }

    testMethod() {}
}
