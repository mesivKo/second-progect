import styled from '@emotion/styled';

const TestItem = styled.li`
    display: flex;
    flex-direction: column;
    padding: 24px;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
    margin-bottom: 24px;
    list-style: none; /* remove bullet point if it exists */
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

const Badge = styled.div`
    background: #f8f9fa;
    padding: 6px 16px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #111;
`;

const TypeBadgeWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

const TypeBadge = styled.div`
    background: #ffffff;
    border: 1px solid #e5e7eb;
    padding: 6px 16px;
    border-radius: 8px;
    font-size: 14px;
    color: #374151;
`;

const QuestionText = styled.div`
    font-weight: 600;
    font-size: 18px;
    color: #111827;
    margin: 0;
    white-space: pre-wrap;
`;

const InputWrapper = styled.div`
    margin-top: 24px;
    width: 100%;
`;

const StyledInput = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    min-height: 120px;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 15px;
    color: #374151;
    resize: vertical;
    transition: border-color 0.2s;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: #3b82f6;
    }

    &::placeholder {
        color: #9ca3af;
    }
`;

interface QuestionElementTextProps {
    id: number;
    text: string;
    value: string;
    onChange: (id: number, value: string) => void;
}

export function QuestionElementText(props: QuestionElementTextProps) {
    const { id, text, value, onChange } = props;
    return (
        <TestItem>
            <Header>
                <Badge>№{id}</Badge>
                <TypeBadgeWrapper>
                    <TypeBadge>Свой ответ</TypeBadge>
                    <TypeBadge>1 балл</TypeBadge>
                </TypeBadgeWrapper>
            </Header>
            <QuestionText>{text}</QuestionText>
            <InputWrapper>
                <label key={id} style={{ width: '100%', display: 'block' }}>
                    <StyledInput
                        name={`q-${id}`}
                        value={value}
                        aria-label={`Вопрос:${id}`}
                        placeholder="Введите свой ответ"
                        onChange={e => onChange(id, e.target.value)}
                    />
                </label>
            </InputWrapper>
        </TestItem>
    );
}
