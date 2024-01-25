import { domAnimation, LazyMotion, m } from "framer-motion";
import db from "@/src/lib/dexieDB";
import { useState } from "react";
import Edit from "../icons/edit";
import { useDriverContext } from "@/src/lib/DriverContext";

const TaraPopup = ({ setMTara, operation, tara, actualizarTara }) => {
  const [value, setValue] = useState(tara || "");
  const [changesMade, setChangesMade] = useState(false);

  const { fetchDataAndUpdate } = useDriverContext();

  const handleUpdate = async () => {
    try {
      const tabla = db.table("tblTrucks");
      const truckIdToUpdate = operation.truck_Id;
      const truckRecord = await tabla.get(truckIdToUpdate);
      console.log(truckIdToUpdate, operation.truck_Id)
      if (truckRecord && parseFloat(value) !== truckRecord.tara) {
        await tabla.update(truckIdToUpdate, {
          tara: parseFloat(value),
          updatedAt: Date.now(),
        });
        actualizarTara();
        setChangesMade(false);
        monitorConnectivity();
        setMTara(false);
      } else {
        setChangesMade(true);
      }
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
    }
  };

   const monitorConnectivity = () => {
    if (typeof window !== "undefined") {
      if (navigator.onLine) {
        fetchDataAndUpdate();
      }
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
          className="mCreate-content"
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
            scale: [1, 1.1, 0.7],
            transition: {
              ease: "easeOut",
              duration: 0.5,
            },
          }}
        >
          <div className="mC-header">
            <Edit />
            <div className="mC-h-title">
              <h2>Modificar tara</h2>
              <h4>Ingrese un nuevo valor</h4>
            </div>
            <span
              className="mC-h-close"
              type="button"
              onClick={() => setMTara(false)}
            >              
            </span>
          </div>
          <div className="mC-body">
            <input
              type="number"
              name="value"
              placeholder="00000"
              min="0"
              value={value}
              onChange={(e) => {
                let inputValue = e.target.value;

                if (inputValue.length > 5) {
                  inputValue = inputValue.slice(0, 5);
                }
                const decimalIndex = inputValue.indexOf(".");
                if (
                  decimalIndex !== -1 &&
                  inputValue.length - decimalIndex > 5
                ) {
                  inputValue = inputValue.slice(0, decimalIndex + 3);
                }

                // Actualizar el estado tara con el valor validado
                setValue(inputValue);
              }}
              required
              className="no-spinners input-tara"
            />
            {changesMade && (
              <span className="changes-message">*No se realizaron cambios</span>
            )}
          </div>
          <div className="mC-footer">
            <button
              className="btn-cancel"
              type="button"
              onClick={() => setMTara(false)}
            >
              Cancelar
            </button>
            <button
              className="btn-success"
              type="button"
              onClick={handleUpdate}
            >
              Aceptar
            </button>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

export default TaraPopup;
