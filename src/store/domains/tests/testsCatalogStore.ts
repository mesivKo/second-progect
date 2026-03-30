import { makeAutoObservable, runInAction } from "mobx";
import type { Attempt, TestResult } from "../../../types/testing";

export class TestsCatalogStore {
    tests: TestResult[] = [];
    attempts: Attempt[] = [];

    isLoading = false;
    error: string = '';

    filters: FiltersState = { search: '', tags: [] };
    user: any = null;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setFilters(filters: FiltersState) {
        this.filters = filters;
    }

        get lastAttemptByTest() {
            const testAt = new Map();
            const result = this.attempts.filter(att => att.userId === 1);
    
            for (const value of result) {
                testAt.set(value.testId, value);
            }
    
            return testAt;
        }

        get visibleTests(): TestResult[] {
            return this.tests.filter(t => t.isPublished);
        }

    async load() {
        this.isLoading = true;
        try {
            const [testsRes, attemptsRes] = await Promise.all ([
                fetch('/data/tests.json'),
                fetch('/data/attempts.json')
            ])

            if (!testsRes.ok || !attemptsRes.ok) {
                throw new Error('fetch error');
            }

            const [testsData, attemptsData] = await Promise.all ([
                testsRes.json(),
                attemptsRes.json(),
            ])

            if (!Array.isArray(testsData) || !Array.isArray(attemptsData)) {
                throw new Error('data incorrect');
            }

            runInAction (() => {
                this.tests = testsData;
                this.attempts = attemptsData;
                this.isLoading = false
            })
            
        } catch (error: any) {
            runInAction (() => {
                this.error = error.message;
                this.isLoading = false
            })        } finally {
            this.isLoading = false;
        }
    }
}