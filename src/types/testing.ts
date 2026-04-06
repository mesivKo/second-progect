export type Attempt = {
  id: number;
  testId: number;
  userId: number;
  timeSpent: number;
  score: number;
  startedAt: string;
  finishedAt: string;
  status: "in_progress" | "completed" | "graded";
};

export type TestMeta = {
  project: string;
  course: string;
  track: number;
  purpose: string;
};

export type TestResult = {
  isPublished: unknown;
  id: number;
  title: string;
  shortDescription: string;
  passScore: number;
  attemptsAllowed: number;
  lastAttempt: number | null;
  durationSec: number;
  allowRetry: boolean;
  deadlineISO: string;
  tags: string[];
  meta: TestMeta;
  attempt: Attempt;
};


export type QuestionType = 'single' | 'multiple' | 'text';

export type QuestionBase = {
correct?: string | string[];
id: number;
score: number;
shuffle?: boolean;
testId: number;
text: string;
};

export type TextQuestion = QuestionBase & {
  type: 'text';
};

export type SingleQuestion = QuestionBase & {
  type: 'single';
  options: string[];
};

export type MultipleQuestion = QuestionBase & {
  type: 'multiple';
  options: string[];
};

export type Question = TextQuestion | SingleQuestion | MultipleQuestion;

export type QuestionResult = {
  questionId: number;
  score: number;
  correctAnswer?: string | string[];
  userAnswer?: string | string[];
  isCorrect: boolean;
  maxScore: number;
};

export type AnswersState = Record<number, string | string[]>;

export type UiStateLoading = {
  isLoading: boolean;
  error: string;
  finished: boolean;
  remainingTime: number;
};