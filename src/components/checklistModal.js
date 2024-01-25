import { domAnimation, LazyMotion, m } from "framer-motion";
import { useEffect, useRef } from "react";

const ChecklistModal = ({ content, onClose, data, onDataChange }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        e.target.classList.contains("modalCreate-backg")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="modalCreate-backg"
        ref={modalRef}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            ease: "easeOut",
            duration: 0.25,
            delay: 0.25,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            ease: "easeOut",
            duration: 0.25,
          },
        }}
      >
        <div className="H-b-checklist-two">
         
            {content === "stop" && (
              <>
                <div className="checklist-t-item-title">
                  <h2>Paradas No Operativas</h2>
                  <h4>Servicios que realizan en el proceso</h4>
                </div>
                <div className="H-b-c-t-i-container">
                  {data.map((i, index) => (
                    <div key={index} className="c-input-checklist">
                      <div className="c-i-c-id">
                        <sup>{i.id}</sup>
                      </div>
                      <label className="label-name">{i.name}</label>
                      <div className="c-i-c-content">
                      <input
                          type="number"
                          value={i.time !== 0 ? i.time : ""}
                          placeholder="00"
                          min="0"
                          onInput={(e) => {
                            let value = e.target.value.trim();
                            if (value.length > 3) {
                              value = value.slice(0, 3);
                            }
                            const updatedData = [...data];
                            updatedData[index] = {
                              ...data[index],
                              time: value === "" ? 0 : parseInt(value, 10),
                            };
                            onDataChange(updatedData);
                          }}
                          required
                          className="no-spinners"
                        />
                        <span>min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {content === "operative" && (
              <>
                <div className="checklist-t-item-title">
                  <h2>Demoras Operativas</h2>
                  <h4>Servicios que realizan en el proceso</h4>
                </div>
                <div className="H-b-c-t-i-container">
                  {data.map((i, index) => (
                    <div key={index} className="c-input-checklist">
                      <div className="c-i-c-id">
                        <sup>{i.id}</sup>
                      </div>
                      <label className="label-name">{i.name}</label>
                      <div className="c-i-c-content">
                      <input
                          type="number"
                          value={i.time !== 0 ? i.time : ""}
                          placeholder="00"
                          min="0"
                          onInput={(e) => {
                            let value = e.target.value.trim();
                            if (value.length > 3) {
                              value = value.slice(0, 3);
                            }
                            const updatedData = [...data];
                            updatedData[index] = {
                              ...data[index],
                              time: value === "" ? 0 : parseInt(value, 10),
                            };
                            onDataChange(updatedData);
                          }}
                          required
                          className="no-spinners"
                        />
                        <span>min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {content === "maintenance" && (
              <>
                <div className="checklist-t-item-title">
                  <h2>Mantenimiento</h2>
                  <h4>Servicios que realizan en el proceso</h4>
                </div>
                <div className="H-b-c-t-i-container">
                  {data.map((i, index) => (
                    <div key={index} className="c-input-checklist">
                      <div className="c-i-c-id">
                        <sup>{i.id}</sup>
                      </div>
                      <label className="label-name">{i.name}</label>
                      <div className="c-i-c-content">
                      <input
                          type="number"
                          value={i.time !== 0 ? i.time : ""}
                          placeholder="00"
                          min="0"
                          onInput={(e) => {
                            let value = e.target.value.trim();
                            if (value.length > 3) {
                              value = value.slice(0, 3);
                            }
                            const updatedData = [...data];
                            updatedData[index] = {
                              ...data[index],
                              time: value === "" ? 0 : parseInt(value, 10),
                            };
                            onDataChange(updatedData);
                          }}
                          required
                          className="no-spinners"
                        />
                        <span>min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {content === "standby" && (
              <>
                <div className="checklist-t-item-title">
                  <h2>Stand By</h2>
                  <h4>Servicios que realizan en el proceso</h4>
                </div>
                <div className="H-b-c-t-i-container">
                  {data.map((i, index) => (
                    <div key={index} className="c-input-checklist">
                      <div className="c-i-c-id">
                        <sup>{i.id}</sup>
                      </div>
                      <label className="label-name">{i.name}</label>
                      <div className="c-i-c-content">
                        <input
                          type="number"
                          value={i.time !== 0 ? i.time : ""}
                          placeholder="00"
                          min="0"
                          onInput={(e) => {
                            let value = e.target.value.trim();
                            if (value.length > 3) {
                              value = value.slice(0, 3);
                            }
                            const updatedData = [...data];
                            updatedData[index] = {
                              ...data[index],
                              time: value === "" ? 0 : parseInt(value, 10),
                            };
                            onDataChange(updatedData);
                          }}
                          required
                          className="no-spinners"
                        />
                        <span>min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="checklist-t-item-button">
              <button onClick={onClose}>Guardar y salir</button>
            </div>         
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default ChecklistModal;
