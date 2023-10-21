import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  children,
  isVisible,
  closeModal,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  closeModal: () => void;
}) => {
  React.useEffect(() => {
    window.document.body.style.overflow = isVisible ? "hidden" : "visible";
  }, [isVisible]);

  return isVisible ? (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => console.log("TEST")} />
      <div className="modal-container">
        <div onClick={closeModal} className="modal-close-btn">
          <AiOutlineClose />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
