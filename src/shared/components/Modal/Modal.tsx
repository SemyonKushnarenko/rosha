import { FC } from "react";
import Button from "../Button/Button";
import './index.css'
import { IModalProps } from "./modal.interface";

const Modal: FC<IModalProps> = ({text, action, onClose}) => {
    return (
        <div className="rosha-modal-wrapper">
            <div className="rosha-modal">
                <h2 className="rosha-modal-text">{text}</h2>
                <div className="rosha-modal-footer">
                <Button onClick={action}>Сохранить</Button>
                <Button onClick={onClose}>Закрыть</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal;