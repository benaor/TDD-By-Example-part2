import { TestCaseWithBrokenSetup } from "./BrokenSetup";
import { TestCaseWithBrokenTearDown } from "./BrokenTeardown";
import { NoOpTestCase } from "./NoOpTestCase";
import { TestCase } from "./TestCase";
import { TestResult } from "./TestResult";
import { TestSuite } from "./TestSuite";

import { WasRun } from "./WasRun";
import { arraysEqual } from "./utils/arraysEqual";

class TestCaseTest extends TestCase {
    private result: TestResult;

    setUp() {
        this.result = new TestResult();
    }

    testTemplateMethod() {
        const test = new WasRun("testMethod");
        test.run(this.result);
        console.assert("1 run, 0 failed" == this.result.summary());
    }

    testFailedResult() {
        const test = new WasRun("testBrokenMethod");
        test.run(this.result);
        console.assert("1 run, 1 failed" == this.result.summary());
    }

    testFailedResultFormatting() {
        const result = new TestResult();
        result.testStarted();
        result.testFailed();
        console.assert("1 run, 1 failed" == this.result.summary());
    }

    testFailedSetUp() {
        const test = new TestCaseWithBrokenSetup("testMethod");
        test.run(this.result);
        console.assert("1 run, 1 failed" == this.result.summary());
    }

    testSuite() {
        const suite = new TestSuite();
        suite.add(new WasRun("testMethod"));
        suite.add(new WasRun("testBrokenMethod"));
        suite.run(this.result);
        console.assert("2 run, 1 failed" == this.result.summary());
    }

    testFailedTearDown() {
        const test = new TestCaseWithBrokenTearDown("testMethod");
        test.run(this.result);
        console.assert("1 run, 1 failed" == this.result.summary());
    }

    testTearDownCalledEvenIfTestFails() {
        const test = new WasRun("testBrokenMethod");
        test.run(this.result);
        console.assert("1 run, 1 failed" == this.result.summary());
    }

    testCollectAllTestNames() {
        const test = new NoOpTestCase("testMethod");

        const isEqual = arraysEqual(test.getTestNames(), ["testMethod", "testMethod2"]);
        console.assert(isEqual);
    }

    testReturnsTestSuite() {
        const suite = new NoOpTestCase("testMethod").asSuite();
        console.assert(suite instanceof TestSuite);
    }
}

const suite = new TestCaseTest("testReturnsTestSuite").asSuite();
const result = new TestResult();
suite.run(result);
console.log(result.summary());
