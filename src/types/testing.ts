export type statusAttempts = 'in_progress' | 'graded' | 'submited';

export type Attempt = {
    id: number;
    testId: number;
    userId: number;
    //startedAt: '2025-10-01T14:25:00Z';
    //finishedAt: '2025-10-01T14:35:00Z';
    timeSpent: number;
    score: number;
    status: statusAttempts;
};

export type TestMeta = {
    id: number;
    project: string;
    course: string;
    direction: number;
    goal: string;
};

export type TestResult = {
    tags: string[];
    id: number;
    title: string;
    description: string;
    duration: number;
    lastAttempt: number | null;
    attemptsRemaining: number;
    reborn: boolean;
    meta: TestMeta;
    attempt: Attempt;
}