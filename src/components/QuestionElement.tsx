import { QuestionElementCheckbox } from './QuestionElementsTemplate/QuestionElementCheckbox';
import { QuestionElementRadio } from './QuestionElementsTemplate/QuestionElementRadio';
import { QuestionElementText } from './QuestionElementsTemplate/QuestionElementText';


export type QuestionType = 'text' | 'single' | 'multiple';

export interface QuestionBase {
  id: number;
  text: string;
  type: QuestionType;
}

export interface TextQuestion extends QuestionBase {
  type: 'text';
}

export interface SingleQuestion extends QuestionBase {
  type: 'single';
  options: string[];
}

export interface MultipleQuestion extends QuestionBase {
  type: 'multiple';
  options: string[];
}

export type Question = TextQuestion | SingleQuestion | MultipleQuestion;

// Interface
export type AnswerValue = string | string[];

export type AnswersMap = Record<number, AnswerValue>;

interface QuestionElementProps {
  q: Question;
  value: AnswerValue;
  onChange: (id: number, value: AnswerValue) => void;
}

export function QuestionElement(props: QuestionElementProps) {
  const { onChange, value, q } = props;
  if (q.type === 'text') {
    return (
      <QuestionElementText
        text={q.text}
        id={q.id}
        onChange={onChange}
        value={value as string}
        type={q.type}
      />
    );
  }

  if (q.type === 'single')
    return (
      <QuestionElementRadio
        options={q.options}
        text={q.text}
        id={q.id}
        onChange={onChange}
        value={value as string}
        type={q.type}
      />
    );

  if (q.type === 'multiple')
    return (
      <QuestionElementCheckbox
        options={q.options}
        text={q.text}
        id={q.id}
        value={value as string[]}
        onChange={onChange}
        type={q.type}
      />
    );

}