import React from 'react'
import { Modal } from '../Modal';
import styled from '@emotion/styled';


interface ConfirmModalProps {
  open: boolean;
  onClose: (v: boolean) => void;
  onSubmit: () => void;
  title: string;
  cancelLable?: string; 
  confirmLable: string; 
}

const Actions = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
`;

const Button = styled.button<{ variant?: string }>`
padding: 10px 16px;
width: 100%;
border-radius: ${(p) => p.theme.radius.md};
border: 1px solid #dde2e4;
background: transparent;
color: ${(p) => p.theme.colors.text};
cursor: pointer;
transition: all 0.2s ease;

&:hover:not(:disabled) {
background: ${(p) => (p.variant === "danger" ? "#f6f3f3" : "#f3f4f6")};
color: ${(p) => (p.variant === "danger" ? "red" : "#4094f7")};
border: 1px solid ${(p) => (p.variant === "danger" ? "red" : "#4094f7")};
}

&:disabled {
cursor: not-allowed;
opacity: 0.5;
background: ${(p) => (p.variant === "danger" ? "#f6f3f3" : "#f3f4f6")};
color: #9ca3af;
border: 1px solid #e5e7eb;
}
`;

export function ConfirmModal(props: ConfirmModalProps) {
    const { open, onClose, onSubmit, title, cancelLable="Отменить", confirmLable="Подтвердить" } = props;
    
  return (
    <Modal
          title={title}
          open={open}
          onClose={() => onClose(false)}
          footer = {
            <Actions>
                    <Button onClick={() => onClose(false)} variant="danger">{cancelLable}</Button>
                     <Button onClick={() => onSubmit()} variant="primary">{confirmLable}</Button>
            </Actions>
          }
        />
  )
}
