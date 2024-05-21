import { TestCase } from "./TestCase";

export class TestCaseWithBrokenTearDown extends TestCase {
    constructor(name: string) {
        super(name);
    }

    testMethod() {}

    tearDown() {
        throw new Error();
    }
}
