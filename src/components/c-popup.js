import { domAnimation, LazyMotion, m } from "framer-motion";
import Alert from "../icons/alert";

const Popup = ({ setPopup }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="modalCreate-backg"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: 0.25,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            ease: "easeOut",
            duration: 0.25,
            delay: 0.35,
          },
        }}
      >
        <m.div
          className="modalContent modal-oops"
          initial={{
            scale: 1,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            scale: [0.7, 1.1, 1],
            transition: {
              ease: "easeOut",
              duration: 0.5,
              delay: 0.1,
            },
          }}
          exit={{
            scale: [1, 1.2, 0.7],
            transition: {
              ease: "easeOut",
              duration: 0.5,
            },
          }}
        >
          <div className="modalHeader">
            <Alert />
            <h2>OOOOPS!</h2>
          </div>
          <div className="modalBody">
            <p>
              {" "}
              <strong>¡Hubo un problema!</strong> <br />
              Por favor, asegúrate de completar todos los campos requeridos
              antes de continuar.
            </p>
          </div>
          <div className="modalFooter">
            <button
              type="button"
              onClick={() => {
                setPopup(false);
              }}
            >
              Aceptar
            </button>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

export default Popup;
