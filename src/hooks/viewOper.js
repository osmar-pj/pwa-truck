import { useState } from "react";
import Edit from "../icons/edit";
import Delete from "../icons/delete";
import CreateOper from "../crud/create-driver";
import DeleteForm from "../crud/delet-form";

let ascIcon = "/imgs/i-up-arrow.svg";
let descIcon = "/imgs/i-down-arrow.svg";

export default function ViewTajo({ data }) {
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

  // const filteredData = data.filter((item) =>
  //   item.operation.driver.toLowerCase().includes(filtering.toLowerCase())
  // );

  // const quotesColumns = [
  //   {
  //     header: "Operación",
  //     accessorKey: "operationTruck_Id",
  //   },
  //   {
  //     header: "Conductor",
  //     accessorKey: "driver_Id",
  //   },
  //   {
  //     header: "Camion",
  //     accessorKey: "truck_Id",
  //   },
  //   {
  //     header: "Mina",
  //     accessorKey: "mining",
  //   },
  //   {
  //     header: "Turno",
  //     accessorKey: "turno",
  //   },
  //   {
  //     header: "Horometro",
  //     accessorKey: "qtyHorometer",
  //   },
  //   {
  //     header: "Fecha de creación",
  //     cell: ({ row }) => {
  //       return <>{formatFecha(row.original.createdAt)}</>;
  //     },
  //   },
  //   {
  //     header: "Acciones",
  //     cell: ({ row }) => (
  //       <div className="btns">
  //         <button onClick={() => handleEdit(row.original._id)}>
  //           <Edit />
  //         </button>
  //         <button onClick={() => handleDelete(row.original._id)}>
  //           <Delete />
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

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
            <h2>Lista de operaciones </h2>
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
                {/* <th>Operación</th> */}
                <th>Operador</th>
                <th>Camión</th>
                <th>Ruta</th>
                <th>Turno</th>
                <th>Horometro</th>
                <th>Color</th>
                <th># Viajes</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1} </td>
                    {/* <td>{item.operation.operationTruck_Id}</td> */}
                    <td>{item.tajoId}</td>
                    <td>{item.name}</td>
                    <td>{item.valid}</td>
                    <td>{item.turno}</td>                   
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

        {/* <div className="C-table-footer">
          <div className="c-t-footer-page">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <DropLeft />
            </button>
            <span className="">
              Página{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <DropRight />
            </button>
          </div>
        </div> */}
      </div>

      {create && (
        <CreateOper
          setCreate={setCreate}
          userToEdit={userToEdit}
          isCreateUser={isCreateUser}
          fetchData={fetchData}
        />
      )}

      {delet && (
        <DeleteForm
          setDelet={setDelet}
          userToDeleteId={userToDeleteId}
          fetchData={fetchData}
        />
      )}
    </>
  );
}
