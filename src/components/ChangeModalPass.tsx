import { Modal } from "./Modal";


interface ChangeModalPassProps {
    open: boolean;
    onClose: (v: boolean) => void;
}

export default function ChangeModalPass(props: ChangeModalPassProps) {

    const {open, onClose} = props;
    // ЛОГИКА ХРАНЕНИЯ ИНПУТОВ
    return (
        <Modal
            title="Оценить пароль"
            open={open}
            onClose={v => onClose(v)}
        >
            <label>
                Новый пароль
                <input type="text" />
            </label>
            <label>
                Повторите пароль
                <input type="text" />
            </label>
        </Modal>
    );
}