import { useState } from "react";
import Edit from "../icons/edit";
import Delete from "../icons/delete";
import DeleteForm from "../crud/delet-form";
import CreateDriver from "../crud/create-driver";

let ascIcon = "/imgs/i-up-arrow.svg";
let descIcon = "/imgs/i-down-arrow.svg";

export default function ViewDriver({ data, fetchData }) {

  const url = "driver";
  const [create, setCreate] = useState(false);
  const [delet, setDelet] = useState(false);
  const [filtering, setFiltering] = useState("");
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [userToEdit, setUserToEdit] = useState("");
  const [userToDeleteId, setUserToDeleteId] = useState(null);

  function formatFecha(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    return `${day}/${monthIndex}/${year}, ${formattedHours}:${formattedMinutes}`;
  }

  const filteredData = data ? data.filter((item) => item.name.toLowerCase().includes(filtering.toLowerCase())) : [];


  const handleEdit = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${process.env.API_URL}/driver/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": true,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
       
        setUserToEdit(data);
        setCreate(true);
        setIsCreateUser(false);
      } else {
        console.error("Error al obtener datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleDelete = async (id, url) => {
    try {
      setDelet(true);
      setUserToDeleteId(id);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className="Container-title">
        <div className="D-title-name">
          {/* <button className="h-title-btn">
            <img src="imgs/i-drop.svg" alt="" />
          </button> */}
          <div>
            <h2>Lista de Camiones </h2>
          </div>
        </div>
        <div className="D-title-more">
          <button onClick={() => setCreate(true) & setIsCreateUser(true)}>
            + Crear nuevo
          </button>
        </div>
      </div>
      <div className="Container-table">
        <div className="C-table-header">
          <div className="c-t-h-search">
            <input
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              placeholder="Buscar por nombre..."
              className="input-crud"
            />
          </div>
          <div className="c-t-h-items">
            Items:
           
          </div>
        </div>

        <div className="C-table-body">
          <table>
            <thead>
              <tr>
                <th>#</th>
                {/* <th>Operación</th> */}
                <th>Nombre</th>
                <th>Contrata</th>                               
                <th>Validez</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    <td>{item.name}</td>
                    <td>{item.contract}</td>                                       
                    <td>{item.valid}</td>
                    <td>{formatFecha(item.createdAt)}</td>
                    <td>
                      <div className="btns">
                        <button onClick={() => handleEdit(item.driverId)}>
                          <Edit />
                        </button>
                        <button onClick={() => handleDelete(item.driverId)}>
                          <Delete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Sin datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>       
      </div>

      {create && (
        <CreateDriver
          setCreate={setCreate}
          userToEdit={userToEdit}
          isCreateUser={isCreateUser}
          fetchData={fetchData}
          url={url}
        />
      )}

      {delet && (
        <DeleteForm
          setDelet={setDelet}
          userToDeleteId={userToDeleteId}
          fetchData={fetchData}
          url={url}
        />
      )}
    </>
  );
}
