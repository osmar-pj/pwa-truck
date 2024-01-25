import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import db from "@/src/lib/dexieDB";
import NavLinks from "@/src/components/nav-links";
import Next from "@/src/icons/next";
import IStart from "@/src/icons/i-start";
import Header from "@/src/components/c-header";
import AnimatedText from "@/src/components/AnimatedText";
import { m } from "framer-motion";
import { stagger, fadeInUp } from "@/src/components/animations";

export default function Start() {
  const router = useRouter();
  const [operation, setOperation] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    db.truckOperation.toArray().then((result) => {
      if (result === 0 || result === "" || result === null) {
        router.push("/");
        return;
      }
      const ultimoElemento = result[result.length - 1];
      setOperation(ultimoElemento);
    });
  }, []);

  const handleFinishDownload = async () => {
    try {
      setButtonClicked(true);
      await db.transaction("rw", db.truckTravel, async () => {
        // const createdAt = Math.floor(new Date() - 86400000);
        const createdAt = Math.floor(new Date() - 1 * 24 * 60 * 60 * 1000);

        await db.truckTravel.add({
          operationTruck_Id: operation.operationTruck_Id,
          driver_Id: operation.driver_Id,
          truck_Id: operation.truck_Id,
          ruta: operation.ruta,
          mining: "Yumpag",
          tourStart: Date.now(),
          createdAt: Date.now(),
          status: "inicio",
          code:operation.code,
          loadStart: Date.now(),
        });
      });
      console.log("P1-Agregado");
    } catch (error) {
      console.error("Error al agregar:", error);
    }
    router.push("/cycle/load");
  };

  return (
    <NavLinks>
      <div className="Home-title fixed1">
        <span className="H-t-subtitle">Paso 1 de 4</span>
        <AnimatedText text="Proceso de carga" />
        <Header />
      </div>
      <div className="Home-body adjustable" style={{ userSelect: buttonClicked ? 'none' : 'auto', pointerEvents: buttonClicked ? 'none' : 'auto' }}>
        <m.div
          className="H-icon"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <IStart />
          <m.p variants={fadeInUp}>
            Este primer paso sienta las bases para un proceso de{" "}
            <strong>carga efectivo, </strong>
            estableciendo las condiciones necesarias para el{" "}
            <strong>transporte eficiente del material </strong> desde las áreas
            de trabajo hasta los puntos de carga designados.
          </m.p>
        </m.div>
      </div>
      <div className="Home-button fixed2">
        {buttonClicked ? (
          <div className="loader"></div>
        ) : (
          <button onClick={handleFinishDownload} disabled={buttonClicked}>
            Iniciar carga <Next />{" "}
          </button>
        )}
      </div>
    </NavLinks>
  );
}
