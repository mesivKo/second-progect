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

const OptionsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
    width: 100%;
`;

const OptionLabel = styled.label`
    display: flex;
    align-items: center;
    padding: 14px 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 15px;
    color: #374151;
    gap: 12px;
    user-select: none;

    &:hover {
        background: #f9fafb;
    }
`;

const HiddenInput = styled.input`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid ${p => p.checked ? '#3b82f6' : '#d1d5db'};
    background: ${p => p.checked ? '#3b82f6' : 'transparent'};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;

    &::after {
        content: '';
        display: ${p => p.checked ? 'block' : 'none'};
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-bottom: 2px;
    }
`;

interface QuestionElementCheckboxProps {
    id: number;
    text: string;
    options: string[];
    value: string[];
    onChange: (id: number, value: string[]) => void;
}

export function QuestionElementCheckbox(props: QuestionElementCheckboxProps) {
    const { id, text, options, value, onChange } = props;

    const toggle = (option: string) => {
        if (value.includes(option)) {
            onChange(
                id,
                value.filter(v => v !== option)
            );
        } else {
            onChange(id, [...value, option]);
        }
    };

    return (
        <TestItem>
            <Header>
                <Badge>№{id}</Badge>
                <TypeBadgeWrapper>
                    <TypeBadge>Несколько вариантов</TypeBadge>
                    <TypeBadge>1 балл</TypeBadge>
                </TypeBadgeWrapper>
            </Header>
            <QuestionText>{text}</QuestionText>
            <OptionsList>
                {options.map((o, i) => {
                    const isChecked = value.includes(o);
                    return (
                        <OptionLabel key={i}>
                            <HiddenInput
                                type="checkbox"
                                name={`q-${id}`}
                                checked={isChecked}
                                onChange={() => toggle(o)}
                            />
                            <StyledCheckbox checked={isChecked} />
                            {o}
                        </OptionLabel>
                    );
                })}
            </OptionsList>
        </TestItem>
    );
}
