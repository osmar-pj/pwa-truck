import { useEffect, useState } from "react";
import CrudOper from "./crud-oper";
import Select from "react-select";

export default function CreateTajo({ isCreateUser, setCreate, userToEdit,fetchData, url}) {
 
  const initialValues = isCreateUser
    ? {
        tajoId: 0,
        name: "",
        valid: 0,
        createdAt: "",
      }
    : {
        tajoId: userToEdit.tajoId,
        name: userToEdit.name,
        valid: userToEdit.valid,
        createdAt: userToEdit.createdAt,
      };
  const [formData, setFormData] = useState(initialValues);
  const subtitl = "tajo";
 
  useEffect(() => {
    if (!isCreateUser && userToEdit) {
      setFormData({
        tajoId: userToEdit.tajoId,
        name: userToEdit.name,
        valid: userToEdit.valid,
        createdAt: userToEdit.createdAt,
      });
    }
  }, [isCreateUser, userToEdit]);

  const listValid = [
    // { value: 0, label: "PRUEBA" },
    { value: 0, label: "DESABILITADO" },
    { value: 1, label: "HABILITADO" },
  ];

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };
  
  return (
    <CrudOper
      isCreateUser={isCreateUser}
      setCreate={setCreate}
      urlEdit={userToEdit.tajoId}
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
        <div className="mC-imputs-item">
          <label>Validez</label>
          <div className="imputs-i-input">
            <img src="imgs/i-f-user.svg" alt="" />
            <select
              name="valid"
              id="react-select-instance"
              value={formData.valid}
              onChange={(e) => handleChange("valid", e.target.value)}
              className="input__field"
              required
            >
              {listValid.map((valid) => (
                <option key={valid.value} value={valid.value}>
                  {valid.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </CrudOper>
  );
}
