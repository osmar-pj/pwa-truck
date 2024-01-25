import { useState } from "react";

export default function DeleteForm({ setDelet, userToDeleteId, fetchData, url}) {
  const [msg, setMsg] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  console.log(userToDeleteId);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/${url}/${userToDeleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMsg(data.message);
        setSuccessModalVisible(true);
        fetchData();
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="modalCreate-backg">
      {successModalVisible ? (
        <div className="modalContent">
          <div className="modalHeader">
            <div className="success-checkmark">
              <div className="check-cont">
                <div className="check-circle"></div>
                <label className="check-icon"></label>
              </div>
            </div>
          </div>
          <div className="modalBody">
            <h3>Éxito</h3>
            <p>{msg}!</p>
          </div>
          <div className="modalBody">
            <button type="button" onClick={() => setDelet(false)}>
              Aceptar
            </button>
          </div>
        </div>
      ) : (
        <div className="mCreate-content mDelet">
          <div className="mC-c-header">
            <div className="mC-h-title">
              <div className="mC-c-title-icon">
                <img src="imgs/i-more-user.svg" alt="" />
              </div>
              <div className="mC-c-title-text">
                <h2>Eliminar</h2>
                <h4>Borrar un registro</h4>
              </div>
            </div>
            <span
              className="mC-h-close"
              type="button"
              onClick={() => setDelet(false)}
            >
              <img src="imgs/i-close.svg" alt="" />
            </span>
          </div>
          <div className="mC-c-body">
            <p>¿Seguro que quieres eliminar de la lista?</p>
          </div>
          <div className="mC-c-footer">
            <button
              className="btn-cancel"
              type="button"
              onClick={() => setDelet(false)}
            >
              No
            </button>
            <button
              className="btn-success"
              type="button"
              onClick={handleDelete}
            >
              Si
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
