import { domAnimation, LazyMotion, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ITurn from "../icons/i-turn";

const TurnPopup = ({ setPopup }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    if (pathname === "/cycle") {
      await router.push("/");
      setPopup(false);
    }
  };

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
          className="modalContent"
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
            <ITurn />
            <h2>Cambiar Turno</h2>
          </div>
          <div className="modalBody">
            <p>
              Este cambio solo está permitido antes de iniciar un nuevo viaje,
              es decir, empezando por el Paso 1. <br />
              <strong> ¿Seguro de realizar esta acción?</strong>
            </p>
          </div>
          <div className="modalFooter">
            <button
              type="button"
              onClick={() => {
                setPopup(false);
              }}
              className="btn-cancel"
            >
              Cancelar
            </button>
            <button type="button" onClick={handleClick}>
              Aceptar
            </button>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

export default TurnPopup;
