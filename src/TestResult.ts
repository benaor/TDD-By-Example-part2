export class TestResult {
    runCount: number;
    errorCount: number;

    constructor() {
        this.runCount = 0;
        this.errorCount = 0;
    }

    testStarted() {
        this.runCount = this.runCount + 1;
    }

    testFailed() {
        this.errorCount = this.errorCount + 1;
    }

    summary() {
        return `${this.runCount} run, ${this.errorCount} failed`;
    }
}
