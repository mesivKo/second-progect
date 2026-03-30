import { QuestionElement, type Question } from '../QuestionElement';
import type { AnswersState } from '../../types/testing';


type QuestionBlockProps = {
  questions: Question[];
  testId: number;
  answers: AnswersState;
  onChange: (id: number, value: string | string[] | null) => void;
};

export default function QuestionBlock(props: QuestionBlockProps) {
  const { questions, answers, onChange } = props;

  return (
    <div>
      <ul>
        {questions.map(q => {
          // console.log('q', q);
          return (
            <QuestionElement
              key={q.id}
              q={q}
              value={
                answers[q.id] ?? (q.type === 'multiple' ? [] : '')
              }
              onChange={(onChange)}
            />
          );
        })}
      </ul>
    </div>
  );
}