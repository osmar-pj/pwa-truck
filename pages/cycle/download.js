import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import db from "@/src/lib/dexieDB";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { stagger, fadeInUp } from "@/src/components/animations";
import NavLinks from "@/src/components/nav-links";
import ITruck from "@/src/icons/i-truck";
import AnimatedText from "@/src/components/AnimatedText";

export default function Download() {
  const router = useRouter();
  const [isDownloadStarted, setIsDownloadStarted] = useState(false);
  const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(true);
  const [fechaStart, setFechaStart] = useState("");
  const [popupSucc, setPopupSucc] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const [travel, setTravel] = useState("");

  useEffect(() => {
    db.truckTravel.toArray().then((result) => {
      if (result === 0 || result === "" || result === null) {
        router.push("/");
        return;
      }
      const ultimoElemento = result[result.length - 1];
      setTravel(ultimoElemento);
    });
  }, []);
  const handleShiftChange = (event) => {
    const value = event.target.id;

    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleStartDownload = () => {
    setFechaStart(Date.now());
    setIsDownloadStarted(true);
    setIsFinishButtonDisabled(false);
  };

  const handleFinishDownload = async () => {
    setIsFinishButtonDisabled(true);
    try {
      setButtonClicked(true);
      const tabla = db.table("truckTravel");
      await tabla.update(travel.travelTruck_Id, {
        downloadStart: fechaStart,
        downloadEnd: Date.now(),
        status: "completo",
      });
      console.log("P4-Agregado - Guardado localmente");
    } catch (error) {
      console.error("Error al registro:", error);
    }
    monitorConnectivity();
    setPopupSucc(true);
    setTimeout(() => {
      setPopupSucc(false);
      router.push("/cycle");
    }, 3000);
  };

  const monitorConnectivity = () => {
    if (typeof window !== "undefined") {
      if (navigator.onLine) {
        handleCreate();
      }
    }
  };

  const handleCreate = async () => {
    try {
      const [dataOperation, dataTravel] = await Promise.all([
        db.truckOperation.where("status").equals("completo").toArray(),
        db.truckTravel.where("status").equals("completo").toArray(),
      ]);

      let dataGroup;

      await db.transaction(
        "rw",
        db.truckOperation,
        db.truckTravel,
        async () => {
          const operations = await db.truckOperation.toArray();
          dataGroup = await Promise.all(
            operations.map(async (truckOperation) => {
              const travels = await db.truckTravel
                .where({
                  operationTruck_Id: truckOperation.operationTruck_Id,
                  status: "completo",
                })
                .toArray();
              return { ...truckOperation, travels };
            })
          );
        }
      );

      const requestData = { dataOperation, dataTravel, dataGroup };

      const response = await fetch(`${process.env.API_URL}/truckdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === true) {
          console.log("Datos enviados al servidor con éxito");
          const sentOperationIds = requestData.dataOperation.map(
            (i) => i.operationTruck_Id
          );
          const sentTravelIds = requestData.dataTravel.map(
            (i) => i.travelTruck_Id
          );
          await Promise.all(
            sentOperationIds.map((id) => updateOperationId(id, "enviado"))
          );
          await Promise.all(
            sentTravelIds.map((id) => updateTravelId(id, "enviado"))
          );
        } else {
          console.log("Error");
        }
      } else {
        console.error(
          "Error al enviar datos al servidor:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const updateOperationId = async (id, nuevoEstado) => {
    try {
      const tabla = db.table("truckOperation");
      await tabla.update(id, {
        status: nuevoEstado,
      });
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const updateTravelId = async (id, nuevoEstado) => {
    try {
      const tabla = db.table("truckTravel");
      await tabla.update(id, {
        status: nuevoEstado,
      });
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <NavLinks>
      <>
        <div className="Home-title">
          <span className="H-t-subtitle">Paso 4 de 4</span>
          <AnimatedText text="Proceso de descarga" />
        </div>
        <div className="Home-body adjustable" style={{ userSelect: buttonClicked ? 'none' : 'auto', pointerEvents: buttonClicked ? 'none' : 'auto' }}>
          <div className="H-b-imputs">
            <div className="H-icon-truck">
              <ITruck />
              <div className="snow">
                <span style={{ "--i": 11 }}></span>
                <span style={{ "--i": 12 }}></span>
                <span style={{ "--i": 15 }}></span>
                <span style={{ "--i": 17 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 14 }}></span>
                <span style={{ "--i": 19 }}></span>
                <span style={{ "--i": 20 }}></span>
                <span style={{ "--i": 10 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 14 }}></span>
                <span style={{ "--i": 19 }}></span>
                <span style={{ "--i": 20 }}></span>
                <span style={{ "--i": 10 }}></span>
                <span style={{ "--i": 18 }}></span>
                <span style={{ "--i": 13 }}></span>
                <span style={{ "--i": 14 }}></span>
                <span style={{ "--i": 19 }}></span>
                <span style={{ "--i": 20 }}></span>
                <span style={{ "--i": 10 }}></span>
              </div>
            </div>
          </div>
          {buttonClicked ? (
            <div className="loader"></div>
          ) : (
            <>
              <div className="H-b-button"  disabled={buttonClicked}>
                <m.button
                  onChange={handleShiftChange}
                  onClick={handleStartDownload}
                  disabled={isDownloadStarted}
                  className={isDownloadStarted ? "disabled-button" : ""}
                >
                  Iniciar descarga
                </m.button>
                <m.button
                  onClick={handleFinishDownload}                  
                  disabled={isFinishButtonDisabled}
                  className={isFinishButtonDisabled ? "disabled-button" : ""}
                >
                  Descarga terminada
                </m.button>
              </div>
            </>
          )}
        </div>
      </>
      <AnimatePresence>
        {popupSucc && (
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
                className="modalContent-Succes"
                initial={{
                  scale: 1,
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: [0.7, 1.1, 0.89, 1],
                  transition: {
                    ease: "easeOut",
                    duration: 0.7,
                    delay: 0.1,
                  },
                }}
                exit={{
                  scale: [1, 0.89, 1.1, 0.7],
                  transition: {
                    ease: "easeOut",
                    duration: 0.45,
                  },
                }}
              >
                <div className="modalHeader">
                  <div className="success-checkmark">
                    <div className="check-cont">
                      <div className="check-circle"></div>
                      <label className="check-icon"></label>
                    </div>
                  </div>
                  <h2 className="success">
                    Proceso <br /> Terminado!
                  </h2>
                </div>
                <div className="modalBody">
                  <p> El viaje realizado ha sido completado con éxito.</p>
                </div>
                <div className="modalFooter">
                  <span>Ver lista de viajes</span>
                </div>
              </m.div>
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </NavLinks>
  );
}
