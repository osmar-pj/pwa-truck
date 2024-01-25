'use client'
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

export default function ModalC({ setCreate, msg }) {
  return (
    
    <m.div className="modalContent"
    initial={{
      scale: 1,
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      scale: [0.7, 1.1, 1],
      transition: {
        ease: "easeOut",
        duration: .5,
        delay: 0.1,
      },
    }}
    exit={{
      scale: [1, 1.2, 0.7],
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    }}>
      <div className="modalHeader">
        <div className="success-checkmark">
          <div className="check-cont">
            <div className="check-circle"></div>
            <label className="check-icon"></label>
          </div>
        </div>
      </div>
      <div className="modalBody">
        <h3>Proces terminado</h3>
        <p>{msg}!</p>
      </div>
      <div className="modalBody">
        <button type="button" onClick={() => setCreate(false)}>
          Aceptar
        </button>
      </div>
    </m.div>
    
  );
}
