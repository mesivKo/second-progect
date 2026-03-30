import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import type { AnswersState, Question, QuestionResult, TestResult } from "../../types/testing";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkQuestion } from "../../utils/checkQuestion";
import QuestionBlock from "../../components/tests/QwestionBlock";
import { TimerBox } from "../../components/ui/TimerBox";
import { ConfirmModal } from "../../components/tests/ConfirmModal";


const Layout = styled.div``;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
`;

export function StudentRunTests() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testData, setTestData] = useState<TestResult | null>(null);
  const [duration, setDuration] = useState(testData?.durationSec);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const testId = Number(params.id);
  const { state } = useLocation();
  const navigate = useNavigate();

  const durationSec = testData?.durationSec ?? 600;
  const [timeLeftSec, setTimeLeftSec] = useState(state?.durationSec || 0);

  const onSubmit = () => {
    console.log('onSubmit');
    handleSubmit();
  };



  useEffect(() => {
    fetch("/data/tests.json")
      .then(res => res.json())
      .then((tests) => {
        const currentTest = tests.find((t: TestResult) => t.id === testId);
        setTestData(currentTest);
      })
      .catch(e => setError(e.message));
  }, [testId]);


  const handleSubmit = () => {
    const resultTime = durationSec - timeLeftSec;
    let correctCount = 0;

    const testResults: QuestionResult[] = filtredQuestions.map(q => {
      const answer = answers[q.id];
      const checkRes = checkQuestion(q, answer);

      if (checkRes.status === 'correct') {
        correctCount += checkRes.score;
      }

      return {
        questionId: q.id,
        score: checkRes.score,
        correctAnswer: q.correct,
        isCorrect: checkRes.status === 'correct',
        maxScore: checkRes.maxScore,
      };
    });

    setResults(testResults);
    setShowResults(true);


    const resultAnswer = testResults.reduce(
      (acc, cur) => acc + cur.score, 0);

          const resultMax = testResults.reduce(
      (acc, cur) => acc + cur.maxScore, 0);



    if (testData?.attemptsAllowed > 1 && testData?.allowRetry) {
      navigate(`/student/test/${testId}/result`, {
        replace: true,
        state: {
          user: resultAnswer,
          max: resultMax,
          time: durationSec,
          resultTime,
          attemptsAllowed: testData.attemptsAllowed - 1
        }
      })
      return;
    };

    setIsOpenModal(false);

  };

  useEffect(() => {
    if (!testData) return;
    setTimeLeftSec(testData?.durationSec);
  }, [testData]);

  useEffect(() => {
    const data = "/data/questions.json";

    fetch(data)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP: ${response.status}`);
        return response.json();
      })
      .then((data: Question[]) => {
        setQuestions(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [testId]);

  const filtredQuestions = useMemo(
    () => questions.filter(q => q.testId === testId),
    [testId, questions],
  );

  if (loading) {
    return (
      <Layout>
        <header>Test 100</header>
        <div>Загрузка...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <header>Test 100</header>
        <div style={{ color: "red" }}>{error}</div>
      </Layout>
    );
  }

  if (filtredQuestions.length === 0) {
    return (
      <Layout>
        <header>Test 100</header>
        <div style={{ color: "red" }}>Вопросы не найдены</div>
      </Layout>
    );
  }

  if (Number.isNaN(testId)) {
    return (
      <Layout>
        <header>Test 100</header>
        <div>Неверный ID теста</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header>Test 100</header>
      <Content>
        <QuestionBlock
          questions={filtredQuestions}
          loading={loading}
          error={error}
          testId={testId}
          answers={answers}
          onChange={(id, value) => setAnswers(prev => ({ ...prev, [id]: value }))}
          showResult={showResults}
          results={results}
        />
        <div>
          {durationSec != null && (
            <TimerBox
              durationSec={durationSec}
              finished={showResults}
              onTick={(timeLeft) => setTimeLeftSec(timeLeft)}
              onFinish={() => {
                alert("Тест завершён! Ваши ответы сохранены.");
                handleSubmit();
              }}
            />
          )}
        </div>
      </Content>
      {!showResults && (
        <button onClick={() => setIsOpenModal(true)}>Отправить</button>
      )}
      <ConfirmModal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onSubmit={() => onSubmit()}
        title={"Хотите закончить тестирование?"}
        confirmLable="Подтвердить"
        cancelLable="Отменить"
      />
    </Layout>
  );
}