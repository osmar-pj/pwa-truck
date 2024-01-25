import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { stagger, fadeInUp } from "@/src/components/animations";
import db from "@/src/lib/dexieDB";
import { useRouter } from "next/navigation";
import Popup from "@/src/components/c-popup";
import { listDominio, listTajo, listTipo } from "@/src/lib/data";
import NavLinks from "@/src/components/nav-links";
import Next from "@/src/icons/next";
import AnimatedText from "@/src/components/AnimatedText";

export default function Load() {
  const router = useRouter();
  const [travel, setTravel] = useState("");
  const [operation, setOperation] = useState("");
  const [showTajoSelect, setShowTajoSelect] = useState(false);
  const [tablet, setTablet] = useState(0);
  const [popup, setPopup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.truckTravel.toArray().then((result) => {
      if (result === 0 || result === "" || result === null) {
        router.push("/");
        return;
      }
      const ultimoElemento = result[result.length - 1];
      setTravel(ultimoElemento);
    });
    db.truckOperation.toArray().then((result) => {
      if (result === 0 || result === "" || result === null) {
        router.push("/");
        return;
      }
      const ultimoElemento = result[result.length - 1];
      setOperation(ultimoElemento);
    });
  }, []);

  const [form, setForm] = useState({
    type: "",
    tajo: "",
    dominio: "",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Agregar lógica para mostrar/ocultar el select de tajo
    if (name === "type") {
      setShowTajoSelect(value === "TAJO");
      if (value === "TAJO") {
        // Si el tipo es TAJO, establece el valor de tajo en 'FRENTE'
        setForm((prev) => ({
          ...prev,
          tajo: "",
        }));
      } else {
        // Si el tipo no es TAJO, puedes dejar tajo en blanco o establecer otro valor según tus necesidades
        setForm((prev) => ({
          ...prev,
          tajo: "AVANCE",
        }));
      }
    }
  };

  const handleAcceptClick = async () => {
    if (
      operation.ruta === "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE" ||
      operation.ruta === "YUM CARGUIO INTERIOR MINA - UCH CANCHA COLQUICOCHA" ||
      operation.ruta === "YUM CANCHA SUPERFICIE - UCH CANCHA COLQUICOCHA"
    ) {
      if (!form.type || !form.tajo || !form.dominio) {
        setPopup(true);
      } else {
        try {
          setButtonClicked(true);
          const tabla = db.table("truckTravel");
          await tabla.update(travel.travelTruck_Id, {
            type: form.type,
            tajo: form.tajo,
            dominio: form.dominio,
            loadEnd: Date.now(),
            tablet: tablet,
          });
          console.log("P2-Agregado");
        } catch (error) {
          console.error("Error al agregar:", error);
        }
        router.push("/cycle/tour");
      }
    } else if (
      operation.ruta === "UCH CANCHA COLQUICOCHA - UCH ECHADERO PLANTA"
    ) {
      if (!form.dominio || tablet === 0 || tablet === "" || tablet === null) {
        setPopup(true);
      } else {
        try {
          setButtonClicked(true);
          const tabla = db.table("truckTravel");
          await tabla.update(travel.travelTruck_Id, {
            type: form.type,
            tajo: form.tajo,
            dominio: form.dominio,
            loadEnd: Date.now(),
            tablet: tablet,
          });
          console.log("Agregado");
        } catch (error) {
          console.error("Error al agregar:", error);
        }
        router.push("/cycle/tour");
      }
    }
  };

  return (
    <NavLinks>
      <>
        <div className="Home-title fixed1">
          <span className="H-t-subtitle">Paso 2 de 4</span>
          <AnimatedText text="Detalle del viaje" />
        </div>
        <div className="Home-body adjustable" style={{ userSelect: buttonClicked ? 'none' : 'auto', pointerEvents: buttonClicked ? 'none' : 'auto' }}>
          <m.div
          layout
            className="H-b-imputs"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <m.div
                layout
              className={`H-b-imputs-item ${
                operation.ruta ===
                "UCH CANCHA COLQUICOCHA - UCH ECHADERO PLANTA"
                  ? "mostrar-clase"
                  : "ocultar-clase"
              }`}
              variants={fadeInUp}
            >
              <label>Nro de Rumas</label>
              <div className="imputs-i-input ">
                <input
                  type="number"
                  name="bruto"
                  placeholder="000"
                  min="0"
                  value={tablet !== 0 ? tablet : ""}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    if (inputValue.length > 3) {
                      inputValue = inputValue.slice(0, 3);
                    }
                    const decimalIndex = inputValue.indexOf(".");
                    if (
                      decimalIndex !== -1 &&
                      inputValue.length - decimalIndex > 3
                    ) {
                      inputValue = inputValue.slice(0, decimalIndex + 3);
                    }

                    const parsedValue = parseFloat(inputValue);
                    setTablet(isNaN(parsedValue) ? "" : parsedValue);
                  }}
                  required
                  className="no-spinners input-tonelaje"
                  disabled={
                    operation.ruta ===
                    "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE"
                  }
                />
                <span>#</span>
              </div>
            </m.div>
            <m.div
                layout
              className={`H-b-imputs-item ${
                operation.ruta ===
                "UCH CANCHA COLQUICOCHA - UCH ECHADERO PLANTA"
                  ? "ocultar-clase"
                  : "mostrar-clase"
              }`}
              variants={fadeInUp}
            >
              <div className="imputs-i-input input">
                <select
                  name="type"
                  id="react-select-instance"
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="input__field"
                  required
                >
                  <option value="" disabled hidden></option>
                  {listTipo.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <label className="input__label">Seleccione Tipo</label>
              </div>
            </m.div>
            <m.div
              className="H-b-imputs-item"
              layout
              style={{ display: showTajoSelect ? "block" : "none" }}
             
            >
              <div className="imputs-i-input input">
                <select
                  name="tajo"
                  id="react-select-instance"
                  value={form.tajo}
                  onChange={(e) => handleChange("tajo", e.target.value)}
                  className="input__field"
                  required
                >
                  <option value="" disabled hidden></option>
                  {listTajo.map((tajo) => (
                    <option key={tajo.value} value={tajo.value}>
                      {tajo.label}
                    </option>
                  ))}
                </select>
                <label className="input__label">Seleccione Tajo</label>
              </div>
            </m.div>
            <m.div className="H-b-imputs-item" layout variants={fadeInUp} >
              <div className="imputs-i-input input">
                <select
                  name="dominio"
                  id="react-select-instance"
                  value={form.dominio}
                  onChange={(e) => handleChange("dominio", e.target.value)}
                  className="input__field"
                  required
                >
                  <option value="" disabled hidden></option>
                  {listDominio.map((dominio) => (
                    <option key={dominio.value} value={dominio.value}>
                      {dominio.label}
                    </option>
                  ))}
                </select>
                <label className="input__label">Seleccione Dominio</label>
              </div>
            </m.div>
          </m.div>
        </div>
        <div className="Home-button fixed2">
          {buttonClicked ? (
            <div className="loader"></div>
          ) : (
            <button
              type="submit"
              onClick={handleAcceptClick}
              disabled={buttonClicked}
            >
              Aceptar <Next />
            </button>
          )}
        </div>
      </>
      <AnimatePresence>
        {popup && <Popup setPopup={setPopup} />}
      </AnimatePresence>
    </NavLinks>
  );
}
