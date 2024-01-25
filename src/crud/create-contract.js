import { useEffect, useState } from "react";
import CrudOper from "./crud-oper";
import Select from "react-select";

export default function CreateContract({ isCreateUser, setCreate, userToEdit,fetchData, url}) {
 
  const initialValues = isCreateUser
    ? {
        tajoId: 0,
        name: "",
        createdAt: "",
      }
    : {
        tajoId: userToEdit.tajoId,
        name: userToEdit.name,
        createdAt: userToEdit.createdAt,
      };
  const [formData, setFormData] = useState(initialValues);
  const subtitl = "contrata";
 
  useEffect(() => {
    if (!isCreateUser && userToEdit) {
      setFormData({
        tajoId: userToEdit.tajoId,
        name: userToEdit.name,
        createdAt: userToEdit.createdAt,
      });
    }
  }, [isCreateUser, userToEdit]);

  return (
    <CrudOper
      isCreateUser={isCreateUser}
      setCreate={setCreate}
      urlEdit={userToEdit.contractId}
      formData={formData}
      subtitl={subtitl}
      fetchData={fetchData}
      url={url}
    >
      <div className="mC-b-imputs">
        <div className="mC-imputs-item">
          <label>Nombre</label>
          <div className="imputs-i-input">
            <img src="imgs/i-f-user.svg" alt="" />
            <input
              type="text"
              name="operationTruck_Id"
              inputMode="text"
              placeholder="Ej. TJ-999_9_1"
              className="input-crud"
              value={formData.name}
              onChange={(e) => {
                const value =
                  e.target.value;
                setFormData({
                  ...formData,
                  name: value,
                });
              }}
              required
            />
          </div>
        </div>
      </div>
    </CrudOper>
  );
}
