import { makeAutoObservable, runInAction } from "mobx";

import type {
    Attempt,
    Question,
    QuestionResult,
    TestResult,
    UiStateLoading,
} from "../../types/testing";
import { checkQuestion } from "../../utils/checkQuestion";

export class TestRunStore {
    testId: number;
    tests: TestResult[] = [];
    attempts: Attempt[] = [];
    test: TestResult;
    questions: Question[];
    answers: QuestionResult[];
    uiStateLoading: UiStateLoading;
    testResults: QuestionResult[];
    correctCount: number;
    constructor(
        testId: number,
        questions: Question[],
        answers: QuestionResult[],
        test: TestResult
    ) {
        this.testId = testId;
        this.test = test;
        this.questions = questions;
        this.answers = answers;
        this.uiStateLoading = {
            isLoading: false,
            error: "",
            finished: false,
            remainingTime: 0,
        };
        this.correctCount = 0;
        this.testResults = this.questions
            .filter((q: Question) => q.testId === this.testId)
            .map((q: Question) => {
                const checkRes = checkQuestion(q, this.answers[q.id].userAnswer);

                if (checkRes.status === "correct") {
                    this.correctCount += checkRes.score;
                }

                return {
                    questionId: q.id,
                    score: checkRes.score,
                    correctAnswer: q.correct,
                    userAnswer: this.answers[q.id].userAnswer,
                    isCorrect: checkRes.status === "correct",
                    maxScore: checkRes.maxScore,
                };
            });

        makeAutoObservable(this, {}, { autoBind: true });
    }

    set timeLeftSec(timeLeftSec: number) {
        this.uiStateLoading.remainingTime = timeLeftSec;
    }

    set showResult(showResult: boolean) {
        this.uiStateLoading.finished = showResult;
    }

    setAnswer(questionId: number, value: string | string[]) {
        this.answers[questionId].userAnswer = value;
    }

    reset() {
        this.answers = [];
        this.uiStateLoading = {
            isLoading: false,
            error: "",
            finished: false,
            remainingTime: 0,
        };
        this.correctCount = 0;
        this.testResults = [];
    }


    async start(testId: number) {
        this.reset();
        this.testId = testId;
        this.load();
        const testFound = this.tests.find((t) => t.id === testId);
        runInAction(() => {
            this.questions = this.filtredQuestions;
            this.test = testFound!;
            this.timeLeftSec = testFound!.durationSec;
        })
    }

    async load() {
        this.uiStateLoading.isLoading = true;
        this.uiStateLoading.error = "";

        try {
            const [testsRes, attemptsRes] = await Promise.all([
                fetch('/data/tests.json'),
                fetch('/data/attempts.json')
            ])

            if (!testsRes.ok || !attemptsRes.ok) {
                throw new Error('fetch error');
            }

            const [testsData, attemptsData] = await Promise.all([
                testsRes.json(),
                attemptsRes.json(),
            ])

            if (!Array.isArray(testsData) || !Array.isArray(attemptsData)) {
                throw new Error('data incorrect');
            }

            runInAction(() => {
                this.tests = testsData;
                this.attempts = attemptsData;
                this.uiStateLoading.isLoading = false
            })

        } catch (error: any) {
            runInAction(() => {
                this.uiStateLoading.error = error.message;
                this.uiStateLoading.isLoading = false
            })
        } finally {
            this.uiStateLoading.isLoading = false;
        }
    }

    get durationSec() {
        return this.test?.durationSec ?? 2000;
    }

    get isLoading() {
        return this.uiStateLoading.isLoading;
    }

    get error() {
        return this.uiStateLoading.error;
    }

    get finished() {
        return this.uiStateLoading.finished;
    }

    get filtredQuestions() {
        return this.questions.filter((q) => q.testId === this.testId);
    }

    get answeredCount() {
        return this.answers.length;
    }

    get totalCount() {
        return this.filtredQuestions.length;
    }

    get allAnswered() {
        return this.answeredCount === this.totalCount;
    }

    get result() {
        return this.testResults;
    }

    get totalScore() {
        return this.filtredQuestions.reduce((acc, cur) => acc + cur.score, 0);
    }

    get maxScore() {
        return this.filtredQuestions.reduce((acc, cur) => acc + cur.score, 0);
    }

    get spentsec() {
        return this.test.durationSec - this.uiStateLoading.remainingTime
    }
}