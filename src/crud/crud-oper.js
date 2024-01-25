import { useState } from "react";

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

import ModalC from "./modal-crud";
function CrudOper(props) {
  
  const {
    isCreateUser,
    setCreate,
    formData,
    urlEdit,
    subtitl,
    handleUpdateUser: onUpdateUser,
    handleCreateUser: onCreateUser,
    fetchData,
    url
  } = props;


  const [msg, setMsg] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isCreateUser) {
      handleCreateUser();
    } else {
      handleUpdateUser();
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
       
        if (data.status === true) {
          setMsg(data.message);
          setSuccessModalVisible(true);
          fetchData();
        } else {
          setMsg(data.message); 
          console.log(data.message);         
        }
      } else {
        console.error("Error al crear:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/${url}/${urlEdit}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": true,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === true) {
          setMsg(data.message);
          setSuccessModalVisible(true);
          fetchData();
        } else {
          setMsg(data.message); 
          console.log(data.message);         
        }
      } else {
        console.error("Error al actualizar", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
    <m.div className="modalCreate-backg" initial={{
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
    }}>
      <AnimatePresence>
      {successModalVisible ? (
        <ModalC setCreate={setCreate} msg={msg} />
      ) : (
        <m.form onSubmit={handleSubmit} className="mCreate-content mCreate-2" initial={{
          scale: 1,
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          scale: [0.7, 1.1, 1],
          transition: {
            ease: "easeOut",
            duration: .5,
            delay: 0.1,
          },
        }}
        exit={{
          scale: [1, 1.2, 0.7],
          transition: {
            ease: "easeOut",
            duration: 0.5,
          },
        }}>
          <div className="mC-c-header">
            <div className="mC-h-title">
              <div className="mC-c-title-icon">
              {/* {isCreateUser ? <img src="imgs/i-more-user.svg" alt="" /> : <img src="imgs/i-delet-user.svg" alt="" />} */}
              </div>
              <div className="mC-c-title-text">
                <h2>
                  {isCreateUser ? "Crear" : "Actualizar"} {subtitl}
                </h2>
                <h4>
                  {isCreateUser
                    ? "Agrega una nueva "
                    : "Modifica la información de un"}{" "}
                  {subtitl}
                </h4>
              </div>
            </div>
            <span
              className="mC-h-close"
              type="button"
              onClick={() => setCreate(false)}
            >
              {/* <img src="imgs/i-close.svg" alt="" /> */}
            </span>
          </div>
          <div className="mC-c-body">{props.children}</div>
          <div className="mC-c-footer">
            <button
              className="btn-cancel"
              type="button"
              onClick={() => setCreate(false)}
            >
              Cancelar
            </button>
            <button className="btn-success" type="submit">
              Guardar
            </button>
          </div>
        </m.form>
      )}
      </AnimatePresence>
    </m.div>
    </LazyMotion>
  );
}

export default CrudOper;
