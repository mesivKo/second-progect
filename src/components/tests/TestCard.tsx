import styled from "@emotion/styled";
import type { Attempt, TestResult } from "../../types/testing";


const Card = styled.article`
    padding: 34px 16px 15px 22px;
    border: 1px solid #dde2e4;
    border-radius: 12px;
    background-color: #fff;
    position: relative;
    display: grid;
`;

const Title = styled.h3`
    color: #09090b;
    font-size: 22px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 8px;
`;

const Description = styled.p`
  color: #09090b;
  font-size: 12px;
  font-weight: 300;
  line-height: 2;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
`;

const Tag = styled.div`
  font-size: 12px;
  line-height: 1;
  color: #0e73f6;
  border: 1px solid #0e73f680;
  border-radius: 10px;
  padding: 7px 12px;
`;

const ScoreContent = styled.div`
  background-color: #e8f5ff;
  padding: 29px 10px 46px;
  position: absolute;
  top: 0;
  right: 35px;
  display: flex;
  justify-content: center;
  min-width: 50px;
  height: 101px;
  border-radius: 0 0 2px 2px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
`;

const Score = styled.span`
  font-size: 26.4px;
  line-height: 1;
  color: #0e73f6;
  font-weight: 600;
  line-height: 1;
`;

const MaxScore = styled.span`
    font-size: 26.4px;
    line-height: 1;
    color: #0e73f64d;
    font-weight: 600;
    line-height: 1;
`;

type TestCardProps = {
  test: TestResult;
  lastAttempt?: Attempt;
};

export function TestCard(props: TestCardProps) {
  const { test, lastAttempt } = props;
  // const description = lastAttempt ? lastAttempt.score : 'No attempt'
  const scoreText =
  lastAttempt?.status === 'graded' ? lastAttempt?.score / 10 : null;
  console.log(scoreText);

  return (
    <Card>
        <Title>{test.title}</Title>
        <Description>{test.description}</Description>

        <Tags>
        {test.tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
        ))}
        </Tags>

        {!!scoreText && (
            <ScoreContent>
                <Score>{scoreText}</Score>
                <MaxScore>/10</MaxScore>
            </ScoreContent>
        )}
    </Card>
  );
}