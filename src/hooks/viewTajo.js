import { useState } from "react";
import Edit from "../icons/edit";
import Delete from "../icons/delete";
import DeleteForm from "../crud/delet-form";
import CreateTajo from "../crud/create-tajo";

export default function ViewTajo({ data, fetchData}) {
  const [create, setCreate] = useState(false);
  const [delet, setDelet] = useState(false);
  const [filtering, setFiltering] = useState("");
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [userToEdit, setUserToEdit] = useState("");
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const url = "tajo";
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

  // const filteredData = data.filter((item) =>
  //   item.operation.driver.toLowerCase().includes(filtering.toLowerCase())
  // );

  const handleEdit = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${process.env.API_URL}/tajo/${id}`,
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
        console.log(data);
        setUserToEdit(data);
        setCreate(true);
        setIsCreateUser(false);
        fetchData();

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
            <h2>Lista de Tajos </h2>
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
            {/* <Select
              instanceId="react-select-instance"
              name="period"
              classNamePrefix="custom-select"
              isSearchable={false}
              isClearable={false}
              placeholder="Seleccione..."
              value={{
                value: table.getState().pagination.pageSize,
                label: table.getState().pagination.pageSize.toString(),
              }}
              onChange={(selectedOption) => {
                table.setPageSize(Number(selectedOption.value));
              }}
              options={[
                { value: 8, label: "8" },
                { value: 10, label: "10" },
                { value: 15, label: "15" },
                { value: 20, label: "20" },
                { value: 25, label: "25" },
              ]}
            /> */}
          </div>
        </div>

        <div className="C-table-body">
          <table>
            <thead>
              <tr>
                <th>#</th>                
                <th>Name</th>
                <th>Valid</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    
                    <td>{item.tajoId}</td>
                    <td>{item.name}</td>
                    <td>{item.valid}</td>
                    <td>{formatFecha(item.createdAt)}</td>
                    <td>
                      <div className="btns">
                        <button onClick={() => handleEdit(item.tajoId)}>
                          <Edit />
                        </button>
                        <button onClick={() => handleDelete(item.tajoId)}>
                          <Delete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Sin datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {create && (
        <CreateTajo
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
