import React from 'react';
import { global } from 'styled-jsx/css';

interface ModalProps {
  imgSrc: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imgSrc, onClose }) => {
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imgSrc} alt="Modal" className="modal-image" />
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Modal;
