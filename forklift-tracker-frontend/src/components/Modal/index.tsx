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

  const modalRef = React.useRef<any>();

  return isVisible ? (
    <div className="modal" style={{ top: window.scrollY }} ref={modalRef}>
      <div className="modal-backdrop" onClick={() => closeModal()} />
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
