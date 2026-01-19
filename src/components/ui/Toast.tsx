import styled from '@emotion/styled';
import { CloseIcon, DoneIcon } from '../../icons/icons';
import { useEffect } from 'react';


const Notice = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    z-index: 10;
    padding: 15px 10px;
    background-color: #d7edff;
    border-radius: 15px;
    gap: 10px;
    align-items: center;
    color: #0E73F6;
    min-width: 320px;
    justify-content: space-between;
`;
const Content = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Close = styled.div`
    position: absolute;
    top: 8.67px;
    right: 8.67px; 
    cursor: pointer;
`;

type ToastProps = {
    open: boolean;
    message: string;
    onClose: () => void;
    duration?: number;
    type: 'success' | 'error' | 'info';
};

export function Toast(props: ToastProps) {
    const { open, message, type, duration = 3000, onClose } = props;

    useEffect(() => {
        if (!open) return;
        const t = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(t);
    }, [open, onClose, duration]);

    if (!open) return null;

    return (
        <Notice>
            <Content>
                <DoneIcon />
                <p>{message}</p>
            </Content>
            <Close aria-label="Close" onClick={onClose}>
                <CloseIcon/>
            </Close>
        </Notice>
    );
}