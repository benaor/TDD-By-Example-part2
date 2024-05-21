import { TestResult } from "./TestResult";
import { TestSuite } from "./TestSuite";

export abstract class TestCase {
    name: string;
    suite: any[];

    constructor(name: string) {
        this.name = name;
    }

    setUp() {}

    run(result) {
        try {
            this.setUp();
        } catch (e) {
            result.testFailed();
        }

        try {
            this[this.name]();
        } catch (e) {
            result.testFailed();
        }

        try {
            this.teardown();
        } catch (e) {
            result.testFailed();
        }
    }

    teardown() {}

    getTestNames() {
        const testNames = Object.getOwnPropertyNames(this).filter((name) => name.startsWith("test"));
        return testNames;
    }

    asSuite() {
        const suite = new TestSuite();
        const testNames = this.getTestNames();
        console.log(testNames);
        for (let testName of testNames) {
            suite.add(this.constructor(testName));
        }
        this.suite = suite.tests;
        return suite;
    }
}
