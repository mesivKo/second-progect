import styled from "@emotion/styled";
import type { Attempt, TestResult } from "../../types/testing";
import { CalendarIcon, DoneIcon, RestartIcon, TimeIcon } from "../../icons/icons";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";


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
  gap: 5px;
  margin-bottom: 10px;
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

const Row = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Time = styled.div`
  font-size: 12px;
  line-height: 1;
  color: #0e73f6;
  border: 1px solid #f4f9ff;
  border-radius: 10px;
  padding: 7px 12px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Calendar = styled.div`
  font-size: 12px;
  line-height: 1;
  color: #f4f9ff;
  border: 1px solid #ffa528;
  background-color: #ffa528;
  border-radius: 10px;
  padding: 7px 12px;
  display: flex;
  gap: 5px;
  align-items: center;
`;


const ContentBtn = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const BaseButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
line-height: 1.71;
font-weight: 600;
padding: 7px 20px;
min-width: 122px;
border-radius: 10px;
cursor: pointer;
transition: all 0.2s ease;

&:disabled {
opacity: 0.5;
cursor: not-allowed;
}
`;

const PrimaryButton = styled(BaseButton)`
color: #fff;
background-color: #0e73f6;
border: 1px solid #0e73f6;

&:hover {
background-color: #0c63d4;
border-color: #0c63d4;
}
`;

const SuccessButton = styled(BaseButton)`
color: #fff;
background-color: #00c63f;
border: 1px solid #00c63f;

&:hover {
background-color: #00b037;
border-color: #00b037;
}
`;

const OutlineButton = styled(BaseButton)`
color: #09090b;
background-color: transparent;
border: 1px solid #dde2e4;

&:hover {
background-color: #f8f9fa;
border-color: #0e73f6;
}
`;

export function formatIsoToDDMMYYYY(iso?: string | null): string | null{
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();

  return `${dd}.${mm}.${yyyy}`;
}

function formatSecondsToMinutes(seconds?: number | null): string | null {
  if (!seconds) return null;

  const minutes = Math.round(seconds / 60);

  // Определяем правильное склонение
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  let minuteWord = 'минут'; // по умолчанию

  if (lastDigit === 1 && lastTwoDigits !== 11) {
  minuteWord = 'минута';
  } else if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
  minuteWord = 'минуты';
  }

  return `${minutes} ${minuteWord}`;
}

type TestCardProps = {
  test: TestResult;
  lastAttempt?: Attempt;
};

export function TestCard(props: TestCardProps) {
  const { test, lastAttempt } = props;
  // const description = lastAttempt ? lastAttempt.score : 'No attempt'
  const scoreText =
  lastAttempt?.status === 'graded' ? lastAttempt?.score / 10 : null;
  const deadline = formatIsoToDDMMYYYY(test.deadlineISO);
  const duration = formatSecondsToMinutes(test.durationSec);
  const {state} = useLocation();
  const navigate = useNavigate();
  const attStatus = lastAttempt?.status === 'graded';

    console.log('TestCard props:', { 
    test, 
    testId: test.id, 
    testIdType: typeof test.id,
    testIdRaw: JSON.stringify(test.id)
  });
  
  const btnText = useMemo(() => {
      if (test.allowRetry && attStatus)
          return { name: 'retry', label: 'Пройти заново' };
      if (!test.allowRetry && attStatus)
          return { name: 'done', label: 'Выполнено' };
      return { name: 'start', label: 'Пройти' };
  }, [attStatus, test.allowRetry]);

  function handleClick() {
    if (btnText.name === 'done') return;
    navigate(`/student/test/${test.id}`, {
      state: {durationSec: test.durationSec},
    });

  }
  return (
    <Card>
        <Title>{test.title}</Title>
        <Description>{test.shortDescription}</Description>

        <Tags>
        {test.tags.map((t, i) => (
            <Tag key={i}>{t}</Tag>
        ))}
        </Tags>
        <Row>
            {deadline && (
              <Calendar>
                <CalendarIcon/> {deadline}
              </Calendar>
            )}
            {duration && (
                <Time>
                    <TimeIcon /> {duration}
                </Time>
            )}
        </Row>
        <ContentBtn>
          {btnText.name === 'retry' && (
              <OutlineButton onClick={() => handleClick()}>
                  {btnText.label} <RestartIcon />
              </OutlineButton>
          )}

          {btnText.name === 'done' && (
              <SuccessButton disabled>
                  {btnText.label} <DoneIcon />
              </SuccessButton>
          )}

          {btnText.name === 'start' && (
              <PrimaryButton onClick={() => handleClick()}>
                  {btnText.label} 
              </PrimaryButton>
          )}
      </ContentBtn>
        {!!scoreText && (
            <ScoreContent>
                <Score>{scoreText}</Score>
                <MaxScore>/10</MaxScore>
            </ScoreContent>
        )}
    </Card>
  );
}