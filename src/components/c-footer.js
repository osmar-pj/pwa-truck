import { useEffect, useState } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useRouter } from "next/navigation";
import db from "@/src/lib/dexieDB";
import OffWifi from "../icons/off-wifi";

export default function Foot() {
  const [isOnline, setIsOnline] = useState(false);
  const [msg, setMSG] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ononline" in window &&
      "onoffline" in window
    ) {
      setIsOnline(window.navigator.onLine);
      if (!window.ononline) {
        window.addEventListener("online", () => {
          setIsOnline(true);
        });
      }
      if (!window.onoffline) {
        window.addEventListener("offline", () => {
          setIsOnline(false);
        });
      }
    }
  }, []);
  const router = useRouter();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined &&
      isOnline
    ) {
      // skip index route, because it's already cached under `start-url` caching object
      if (router.route !== "/") {
        const wb = window.workbox;
        wb.active.then((worker) => {
          wb.messageSW({ action: "CACHE_NEW_ROUTE" });
        });
      }
    }
  }, [isOnline, router.route]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => {
        setIsOnline(true);
        manejarDatosIncompletos();
        manejarDatosPendientes();
      };

      const handleOffline = () => {
        setIsOnline(false);       
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const manejarDatosIncompletos = async () => {
    let actualizaciones = 0;

    db.transaction("rw", db.truckTravel, async () => {
      const fechaActual = new Date();
      fechaActual.setHours(0, 0, 0, 0); 
      const timestampHoy = fechaActual.getTime();

      const travelsToUpdate = await db.truckTravel
        .where("createdAt")
        .below(timestampHoy) // Excluir registros del día actual
        .and((registro) => registro.status === "inicio")
        .toArray();

      await Promise.all(
        travelsToUpdate.map(async (registro) => {
          console.log(`Viaje actualizado: ${registro.travelTruck_Id}`);
          const actualizacion = await db.truckTravel.update(registro.travelTruck_Id, {
          status: "incompleto",
        });

          actualizaciones += actualizacion;
        })
      );
    });
    if (actualizaciones > 0) {
      console.log(`Se realizaron ${actualizaciones} .`);
    } else {
      console.log("No existen datos con status inicio.");
    }
  };
  
  const manejarDatosPendientes = async () => {
    try {
      const [dataOperation, dataTravel, dataTravelIncompleto] = await Promise.all([
        db.truckOperation.where("status").equals("completo").toArray(),
        db.truckTravel.where("status").equals("completo").toArray(),
        db.truckTravel.where("status").equals("incompleto").toArray(),
      ]);

      if (!dataOperation.length && !dataTravel.length &&
        !dataTravelIncompleto.length) {
        console.log("No hay datos con status completo.");
        return;
      }

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

      const requestData = { dataOperation, dataTravel, dataGroup,dataTravelIncompleto };

      enviarDatosAlServidor(requestData);
    } catch (error) {
      console.error("Error al manejar datos pendientes:", error);
    }
  };

  const enviarDatosAlServidor = async (requestData) => {
    try {
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
          await Promise.all(
            sentOperationIds.map((id) => updateOperationId(id, "enviado"))
            );
            const sentTravelIds = requestData.dataTravel.map(
              (i) => i.travelTruck_Id
            );
          await Promise.all(
            sentTravelIds.map((id) => updateTravelId(id, "enviado"))
          );

          const sentTravelIncompletoIds = requestData.dataTravelIncompleto.map((i) => i.travelTruck_Id);
          await Promise.all(
            sentTravelIncompletoIds.map((id) => updateTravelId(id, "incompleto_enviado"))
          );

          setMSG(true);
          const timeoutId = setTimeout(() => {
            setMSG(false);
          }, 10000);
          return () => clearTimeout(timeoutId);
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
      console.error("Error de red:", error);
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

  useEffect(() => {
    const hacerAlgoCadaSieteDias = () => {
      db.transaction("rw", db.truckOperation, db.truckTravel, async () => {
        const fechaActual = new Date();
        const fechaSieteDiasAtras = new Date(fechaActual);
        fechaSieteDiasAtras.setDate(fechaSieteDiasAtras.getDate() - 7);
        const timestampSieteDiasAtras = fechaSieteDiasAtras.getTime();

        const OperationDelet = await db.truckOperation
          .where("createdAt")
          .below(timestampSieteDiasAtras)
          .and((registro) => registro.status === "enviado")
          .toArray();

        const TravelDelet = await db.truckTravel
          .where("createdAt")
          .below(timestampSieteDiasAtras)
          .and((registro) => registro.status === "enviado")
          .toArray();

        await Promise.all(
          OperationDelet.map(async (registro) => {
            await db.truckOperation.delete(registro.operationTruck_Id);
          })
        );

        await Promise.all(
          TravelDelet.map(async (registro) => {
            await db.truckTravel.delete(registro.travelTruck_Id);
          })
        );
      });
      
    };

    hacerAlgoCadaSieteDias();

    const intervalId = setInterval(() => {
      hacerAlgoCadaSieteDias();
    }, 7 * 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="c-footer">
      <div className="content-msg">
        <div className={` check-f ${msg ? "success" : "pending"}`}></div>
        <span>
          Datos guardados, pendientes para ser enviados al{" "}
          <strong>servidor</strong>
        </span>
      </div>

      {!isOnline && (
        <div className="c-offline">
          <OffWifi />
          <span>Actualmente estás offline</span>
        </div>
      )}

      <AnimatePresence>
        {msg && (
          <LazyMotion features={domAnimation}>
            <m.div className="Alert">
              <div className="Alert-icon">
                <div className="check-cont-W">
                  <div className="check-circle-W"></div>
                  <label className="check-icon-W"></label>
                </div>
              </div>
              <div className="Alert-cont">
                <span>Datos enviados con éxito al servidor</span>
              </div>
            </m.div>
          </LazyMotion>
        )}
      </AnimatePresence>
    </div>
  );
}
