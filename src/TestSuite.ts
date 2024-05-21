export class TestSuite {
    tests: any[];

    constructor() {
        this.tests = [];
    }

    add(test) {
        this.tests.push(test);
    }

    run(result) {
        for (let test of this.tests) {
            test.run(result);
        }
    }
}
