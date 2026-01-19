import type { Attempt, TestResult } from "../../types/testing";

type TestCardProps = {
    test: TestResult;
    lastAttemptScore?: Attempt;
};

export function TestCard(props: TestCardProps) {
  const { test, lastAttemptScore } = props;
  return (
    <div>
      <h2>{test.title}</h2>
      <p>{ 
            lastAttemptScore 
                ? lastAttemptScore.score
                : 'No attempt'
        }</p>
    </div>
  );
}
