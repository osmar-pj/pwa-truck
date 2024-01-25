import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import db from "@/src/lib/dexieDB";
import { listRuta, listTurn } from "@/src/lib/data";
import { useRouter } from "next/navigation";
import Popup from "@/src/components/c-popup";
import Layout from "@/src/layout";
import Next from "@/src/icons/next";
import Select from "react-select";
import { useDriverContext } from "@/src/lib/DriverContext";
import AnimatedText from "@/src/components/AnimatedText";
import {
  containerVariants,
  stagger,
  fadeInUp,
} from "@/src/components/animations";

export default function Home() {
  const router = useRouter();
  const { drivers, trucks } = useDriverContext();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [popup, setPopup] = useState(false);
  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [tara, setTara] = useState("");

  const [horometer, setHorometer] = useState(0);
  const [form, setForm] = useState({
    ruta: "",
    turno: "",
  });

  const options = drivers
    .filter((j) => j.valid !== 0)
    .map((j) => ({
      value: j.driverId,
      label: j.name,
      contract: j.contract,
    }));


  const optionsT = trucks
    .filter((i) => i.valid !== 0)
    .map((i) => ({
      value: i.truckId,
      label: i.tag,
      contract: i.contract,
      tara: i.tara,
    }));

  const handleChangeDriver = (selectedOption) => {
    setDriver(selectedOption ? selectedOption.value : "");
  };

  const handleChangeTruck = (selectedOption) => {
   
    setTruck(selectedOption ? selectedOption.value : "");
    setTara(selectedOption ? selectedOption.tara : "");
  };

  const handleChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  const handleAcceptClick = async () => {
    if (      
      !form.ruta ||
      !form.turno ||     
      horometer === 0 ||
      horometer === "" ||
      horometer === null ||
      driver === 0 ||
      driver === "" ||
      driver === null ||
      truck === 0 ||
      truck === "" ||
      truck === null ||
      tara === 0 ||
      tara === "" ||
      tara === null
    ) {
      setPopup(true);
    } else {
      try {
        setButtonClicked(true);

        await db.transaction("rw", db.truckOperation, async () => {
          const createdAt = Math.floor(new Date() - 1 * 24 * 60 * 60 * 1000);
          await db.truckOperation.add({
            ruta: form.ruta,
            driver_Id: driver,
            turno: form.turno,
            truck_Id: truck,
            qtyHorometer: horometer,
            tara: tara,
            mining: "Yumpag",
            status: "completo",
            createdAt: Date.now(),
            code:Date.now(),
          });
        });

        console.log("Operacion agregado");
        router.push("/cycle");
      } catch (error) {
        console.error("Error al crear el registro:", error);
      }
    }
  };

  return (
    <Layout>
      <section className="w-Home">
        <AnimatePresence>
          <LazyMotion features={domAnimation}>
            <m.div
              className="container"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              transition={{ type: "tween", duration: 0.5 }}
            >
              <div className="Home-title fixed1">
                <span className="H-t-subtitle">Inicio</span>
                <AnimatedText text="Datos iniciales" />
              </div>
              <div
                className="Home-body adjustable"
                style={{
                  userSelect: buttonClicked ? "none" : "auto",
                  pointerEvents: buttonClicked ? "none" : "auto",
                }}
              >
                <m.div
                  className="H-b-imputs"
                  initial="initial"
                  animate="animate"
                  variants={stagger}
                >
                  <m.div className="H-b-imputs-item" variants={fadeInUp}>
                    <div className="imputs-i-input input">
                      <select
                        name="ruta"
                        id="react-select-instance"
                        value={form.ruta}
                        onChange={(e) => handleChange("ruta", e.target.value)}
                        className="input__field"
                        required
                      >
                        <option value="" disabled hidden></option>
                        {listRuta.map((ruta) => (
                          <option key={ruta.value} value={ruta.value}>
                            {ruta.label}
                          </option>
                        ))}
                      </select>
                      <label className="input__label">Seleccione Ruta .</label>
                    </div>
                  </m.div>
                  <m.div className="H-b-imputs-item" variants={fadeInUp}>
                    <div className="imputs-i-input">
                      <Select
                        instanceId="react-select-instance-driver"
                        name="driver"
                        classNamePrefix="custom-select"
                        isSearchable={true}
                        isClearable={true}
                        options={options}
                        onChange={handleChangeDriver}
                        placeholder="Ingrese o seleccione Operador"
                        value={options.find((opt) => opt.value === driver)}
                      />

                      {/* <label className="input__label">Nombre de Operador</label> */}
                    </div>
                  </m.div>
                  <m.div className="H-b-imputs-item" variants={fadeInUp}>
                    <div className="imputs-i-input ">
                      <Select
                        instanceId="react-select-instance-truck"
                        name="truck"
                        classNamePrefix="custom-select"
                        isSearchable={true}
                        isClearable={true}
                        options={optionsT}
                        onChange={handleChangeTruck}
                        placeholder="Ingrese o seleccione Camión"
                        value={optionsT.find((opt) => opt.value === truck)}
                      />
                      {/* <label className="input__label">Tipo de camión</label> */}
                    </div>
                  </m.div>
                  <m.div className="H-b-imputs-item" variants={fadeInUp}>
                    <div className="imputs-i-input input">
                      <img src="" alt="" />
                      <select
                        name="turno"
                        id="react-select-instance"
                        value={form.turno}
                        onChange={(e) => handleChange("turno", e.target.value)}
                        className="input__field"
                        required
                      >
                        <option value="" disabled hidden></option>
                        {listTurn.map((turno) => (
                          <option key={turno.value} value={turno.value}>
                            {turno.label}
                          </option>
                        ))}
                      </select>
                      <label className="input__label">Seleccione Turno</label>
                    </div>
                  </m.div>
                  <m.div className="H-b-imputs-item" variants={fadeInUp}>
                    <label>Horometro</label>
                    <div className="imputs-i-input ">
                      <input
                        type="number"
                        name="bruto"
                        placeholder="00000"
                        min="0"
                        value={horometer !== 0 ? horometer : ""}
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

                          const parsedValue = parseFloat(inputValue);
                          setHorometer(isNaN(parsedValue) ? "" : parsedValue);
                        }}
                        required
                        className="no-spinners input-tonelaje"
                      />
                      <span>horas</span>
                    </div>
                  </m.div>
                </m.div>
              </div>
              <m.div
                className="Home-button fixed2"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
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
              </m.div>
            </m.div>
          </LazyMotion>
        </AnimatePresence>
        <AnimatePresence>
          {popup && <Popup setPopup={setPopup} />}
        </AnimatePresence>
      </section>
    </Layout>
  );
}
