import { useEffect, useState } from "react";
import db from "@/src/lib/dexieDB";
import { useRouter } from "next/navigation";
import ChecklistModal from "@/src/components/checklistModal";
import { AnimatePresence, m } from "framer-motion";
import { stagger, fadeInUp, divVariants } from "@/src/components/animations";
import {
  listStop,
  listDelay,
  listMaintenance,
  listStandby,
} from "@/src/lib/data";
import NavLinks from "@/src/components/nav-links";
import Next from "@/src/icons/next";
import Popup from "@/src/components/c-popup";
import IOne from "@/src/icons/i-one";
import BtnMore from "@/src/icons/btnmore";
import ILess from "@/src/icons/less";
import ITwo from "@/src/icons/i-two";
import IThree from "@/src/icons/i-three";
import IFour from "@/src/icons/i-fort";
import TaraPopup from "@/src/components/c-tara";
import Edit from "@/src/icons/edit";
import AnimatedText from "@/src/components/AnimatedText";

export default function Tour() {
  const router = useRouter();
  const [popup, setPopup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [mTara, setMTara] = useState(false);
  const [travel, setTravel] = useState("");
  const [operation, setOperation] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [neto, setNeto] = useState(0);
  const [bruto, setBruto] = useState(0);
  const [tara, setTara] = useState(0);
  const [checklistData, setChecklistData] = useState({
    stop: listStop.map((item) => ({ ...item, time: 0 })),
    operative: listDelay.map((item) => ({ ...item, time: 0 })),
    maintenance: listMaintenance.map((item) => ({ ...item, time: 0 })),
    standby: listStandby.map((item) => ({ ...item, time: 0 })),
  });

  useEffect(() => {
    db.truckTravel.toArray().then((result) => {
      const ultimoElemento = result[result.length - 1];
      setTravel(ultimoElemento);
    });
    db.truckOperation.toArray().then((result) => {
      const ultimoElemento = result[result.length - 1];
      setOperation(ultimoElemento);
    });
  }, []);

  const actualizarTara = () => {
    db.tblTrucks.toArray().then((trucks) => {
      const truck = trucks.find(
        (truck) => truck.truckId === operation.truck_Id
      );
      if (truck) {
        setTara(truck.tara);
      }
    });

    if (
      operation.ruta === "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
    ) {
      setNeto(30);
      setBruto(0);
    } else {
      const calcularBruto = () => {
        const netoValue = parseFloat(bruto) || 0;
        const neto = netoValue - parseFloat(tara);
        return isNaN(neto) ? "" : neto.toFixed(2);
      };

      setNeto(parseFloat(calcularBruto()));
    }
  };

  useEffect(() => {
    actualizarTara();
  }, [operation.ruta, bruto, tara]);

  const handleAcceptClick = async () => {
    if (neto === null || neto === "" || neto <= 0) {
      setPopup(true);
    } else {
      try {
        setButtonClicked(true);
        const tabla = db.table("truckTravel");
        await tabla.update(travel.travelTruck_Id, {
          stop: checklistData.stop,
          delay: checklistData.operative,
          maintenance: checklistData.maintenance,
          stand: checklistData.standby,
          tara: tara,
          weight_gross: bruto,
          weight_net: neto,
          tour: Date.now(),
        });
        console.log("P3-Agregado");
      } catch (error) {
        console.error("Error al actualizar el registro:", error);
      }
      router.push("/cycle/download");
    }
  };

  return (
    <NavLinks>
      <div className="Home-title fixed1">
        <span className="H-t-subtitle">Paso 3 de 4</span>
        <AnimatedText text="Detalles del Viaje 2" />
      </div>
      <div
        className="Home-body adjustable"
        style={{
          userSelect: buttonClicked ? "none" : "auto",
          pointerEvents: buttonClicked ? "none" : "auto",
        }}
      >
        <m.div
          className="Tour-item"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <m.div className="item-pesB" variants={fadeInUp}>
            <div className="imputs-i-input-2">
              <button
                onClick={() => {
                  const decrementedValue = neto - 1;
                  setNeto(decrementedValue < 0 ? 0 : decrementedValue);
                }}
                disabled={
                  operation.ruta !==
                  "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                }
                className={`btn-more ${
                  operation.ruta ===
                  "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                    ? "mostrar-clase"
                    : "ocultar-clase"
                }`}
              >
                <ILess/>
              </button>
              <input
                type="number"
                name="bruto"
                placeholder="00000"
                min="0"
                value={neto}
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

                  // Verificar si inputValue es un número antes de convertir a entero
                  const parsedValue = parseFloat(inputValue);
                  setNeto(isNaN(parsedValue) ? "" : parsedValue);
                }}
                required
                className="no-spinners input-tonelaje"
                disabled={
                  operation.ruta !==
                  "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                }
              />

              <button
                onClick={() => {
                  const incrementedValue = neto + 1;
                  setNeto(incrementedValue > 99999 ? 99999 : incrementedValue);
                }}
                disabled={
                  operation.ruta !==
                  "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                }
                className={`btn-more ${
                  operation.ruta ===
                  "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                    ? "mostrar-clase"
                    : "ocultar-clase"
                }`}
              >
                <BtnMore/>
              </button>
              <span>
                {operation.ruta ===
                "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                  ? ""
                  : "KG"}
              </span>
            </div>

            <label className="text-label">
              {operation.ruta ==
              "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                ? "TMH"
                : "Peso Neto"}
            </label>
          </m.div>
          <m.div
            className={`H-b-tonelaje ${
              operation.ruta ===
              "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                ? "ocultar-clase"
                : "mostrar-clase"
            }`}
          >
            <m.div className="item-tonelaje-2" variants={fadeInUp}>
              <input
                type="number"
                name="bruto"
                placeholder="00000"
                min="0"
                value={bruto !== 0 ? bruto : ""}
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

                  // Verificar si inputValue es un número antes de convertir a entero
                  const parsedValue = parseFloat(inputValue);
                  setBruto(isNaN(parsedValue) ? "" : parsedValue);
                }}
                required
                className="no-spinners input-tonelaje"
                disabled={
                  operation.ruta ===
                  "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                }
              />

              <label>Peso Bruto</label>
            </m.div>
            <m.div className="item-tonelaje-2" variants={fadeInUp}>
              <div className="item-tara-content">
                <h1 className="text-tonelaje">{tara}</h1>
                <label>Tara</label>
              </div>
              <button className="btn-edit" onClick={() => setMTara(true)}>
                {" "}
                <Edit />{" "}
              </button>
            </m.div>
          </m.div>
        </m.div>
        <div className="Tour-item">
          <h2>Registrar Paradas</h2>
          <m.div
            className="H-b-btns"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <m.button
              className="btn-item"
              onClick={() => setModalContent("stop")}
              variants={divVariants}
            >
              <div className="btn-i-icon">
                <IOne />
                <div className="btn-i-info">
                  <span>No Operativas</span>
                </div>
              </div>
            </m.button>
            <m.button
              className="btn-item"
              onClick={() => setModalContent("operative")}
              variants={divVariants}
            >
              <div className="btn-i-icon">
                <ITwo />
                <div className="btn-i-info">
                  <span>Operativas</span>
                </div>
              </div>
            </m.button>
            <m.button
              className="btn-item"
              onClick={() => setModalContent("maintenance")}
              variants={divVariants}
            >
              <div className="btn-i-icon">
                <IThree />
                <div className="btn-i-info">
                  <span>Mantenimiento</span>
                </div>
              </div>
            </m.button>
            <m.button
              className="btn-item"
              onClick={() => setModalContent("standby")}
              variants={divVariants}
            >
              <div className="btn-i-icon">
                <IFour />
                <div className="btn-i-info">
                  <span>Stand By</span>
                </div>
              </div>
            </m.button>
          </m.div>
        </div>
      </div>
      <div className="Home-button fixed2">
        {buttonClicked ? (
          <div className="loader"></div>
        ) : (
          <button onClick={handleAcceptClick} disabled={buttonClicked}>
            Registrar Tonelaje <Next />
          </button>
        )}
      </div>
      <AnimatePresence>
        {modalContent && (
          <ChecklistModal
            content={modalContent}
            onClose={() => setModalContent(null)}
            data={checklistData[modalContent]}
            onDataChange={(updatedData) => {
              setChecklistData((prevData) => ({
                ...prevData,
                [modalContent]: updatedData,
              }));
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {popup && <Popup setPopup={setPopup} />}
      </AnimatePresence>
      <AnimatePresence>
        {mTara && (
          <TaraPopup
            setMTara={setMTara}
            operation={operation}
            tara={tara}
            actualizarTara={actualizarTara}
          />
        )}
      </AnimatePresence>
    </NavLinks>
  );
}
