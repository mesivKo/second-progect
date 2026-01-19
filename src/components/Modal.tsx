import styled from "@emotion/styled";
import { useEffect } from "react";


const Overlay = styled.div`
    background: #F5F5F54d;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 400;
    padding: 24px;
    background-color: #fff;
    border-radius: 14px;
    gap: 14px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
`;


// Modal.tsx - убираем фиксированные кнопки
interface ModalProps {
    title: string;
    open: boolean;
    onClose: (v: boolean) => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function Modal(props: ModalProps) {
    const {open, onClose, title, children, footer}  = props;

    useEffect(() => {
        if (!open) return;
        const keyDwn = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose(false);
        };

        window.addEventListener('keydown', keyDwn);
        return () => window.removeEventListener('keydown', keyDwn);
    }, [open, onClose]);

    if (!open) return;

    return (
            <Overlay onClick={ () => onClose(false)}>
                <ModalContainer onClick={ e => e.stopPropagation()}>
                    <h2>{title}</h2>
                    <button onClick={ () => onClose(false)}>Х</button>
                    <div>
                        {children}
                    </div>
                    {footer && <ModalFooter>{footer}</ModalFooter>}
                </ModalContainer>
            </Overlay>
    )
}