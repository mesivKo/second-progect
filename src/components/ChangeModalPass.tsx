import { useState } from 'react';
import { Modal } from './Modal';
import styled from '@emotion/styled';

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TextError = styled.pre`
    font-size: 14px;
    color: red;
`

interface ChangeModalPassProps {
    open: boolean;
    onClose: (v: boolean) => void;
    onSuccess: () => void;
}

const USER_PASS = 'passworD123$';

export default function ChangeModalPass(props: ChangeModalPassProps) {
    const { open, onClose, onSuccess } = props;
    const [pw1, setPw1] = useState('');
    const [pw2, setPw2] = useState('');
    const [serverErr, setServerErr] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function validatePassword(pw: string): string[] {
        const errors: string[] = [];
        if (pw.length <= 8) errors.push('Минимум 8 символов');
        if (!/^.*[a-z].*$/.test(pw)) errors.push('Хотя бы одна строчная буква');
        if (!/[A-Z]/.test(pw)) errors.push('Хотя бы одна заглавная буква');
        if (!/[@$!%*?&~]/.test(pw)) errors.push('Хотя бы один спецсимвол');
        if (!/[0-9]/.test(pw)) errors.push('Хотя бы одна цифра');
        if (pw == USER_PASS)
            errors.push(
            'Пароль не должен содержать последовательность из старого пароля'
        );
        return errors;
    }

    const pwErr = validatePassword(pw1);
    // const  проверка на одинаковость паролей инпута
    const forValid = pw1 !== '' && pw2 !== '' && pwErr.length === 0;
    const matchErr = pw1 && pw2 && pw1 === pw2 ? '' : 'Пароли не совпадают';

    function sendPassword(newPw: string) {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (newPw.includes(USER_PASS)) reject(new Error('Whoops!'));
                else {
                    resolve();
                    console.log('Пароль изменен');
                }
            }, 500);
        });
    }

    async function onSubmit() {
        if (!forValid) {
            return;}

        try {
            await sendPassword(pw1);
            setSubmitting(true);
            onClose(false);
            onSuccess();
        } catch (error: any) {
            setServerErr(error?.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Modal
            title="Сменить пароль"
            open={open}
            onClose={v => onClose(v)}
            footer={
                <>
                    <button onClick={() => onClose(false)}>Отменить</button>
                    <button
                        disabled={!forValid || submitting}
                        onClick={() => onSubmit()}
                    >
                        Подтвердить
                    </button>
                </>
            }
        >
            <ChildContainer>
                <label>
                    Новый пароль
                    <input
                        type="password"
                        onChange={e => setPw1(e.target.value)}
                        value={pw1}
                    />
                </label>
                <label>
                    Повторите пароль
                    <input
                        type="password"
                        onChange={e => setPw2(e.target.value)}
                        value={pw2}
                    />
                </label>
            </ChildContainer>
            <TextError>{serverErr}</TextError>
            <TextError>{matchErr}</TextError>
            <TextError>{pwErr.join('\n')}</TextError>
            <button onClick={() => validatePassword('1234jebkn')}>333</button>
        </Modal>
    );
}
