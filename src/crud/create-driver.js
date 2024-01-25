import { useEffect, useState } from "react";
import CrudOper from "./crud-oper";
import Select from "react-select";

export default function CreateDriver({
  isCreateUser,
  setCreate,
  userToEdit,
  fetchData,
  url,
}) {
  const [listContract, setListContract] = useState([]);
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/contract`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": true,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setListContract(result);
        } else {
          setError("Error al obtener datos");
        }
      } catch (error) {
        console.error("Database Error:", error);
      }
    };
    fetchContract();
  }, []);

  const initialValues = isCreateUser
    ? {
        driverId: 0,
        name: "",
        contract: 2,
        valid: 0,
        createdAt: "",
      }
    : {
        driverId: userToEdit.driverId,
        name: userToEdit.name,
        contract: userToEdit.contract,
        valid: userToEdit.valid,
        createdAt: userToEdit.createdAt,
      };

  const [formData, setFormData] = useState(initialValues);
  const subtitl = "conductor";

  useEffect(() => {
    if (!isCreateUser && userToEdit) {
      setFormData({
        driverId: userToEdit.driverId,
        name: userToEdit.name,
        contract: userToEdit.contract,
        valid: userToEdit.valid,
        createdAt: userToEdit.createdAt,
      });
    }
  }, [isCreateUser, userToEdit]);
  console.log(formData);
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
      urlEdit={userToEdit.driverId}
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
                const value = e.target.value;
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
          <label>Contrata</label>
          <div className="imputs-i-input">
            <img src="imgs/i-f-user.svg" alt="" />
            <select
              name="contract"
              id="react-select-instance"
              value={formData.contract}
              onChange={(e) => handleChange("contract", parseInt(e.target.value, 10))}
              className="input__field"
              required
            >
              <option value="" disabled hidden></option>
              {listContract.map((contract) => (
                <option key={contract.contractId} value={contract.contractId}>
                  {contract.name}
                </option>
              ))}
            </select>
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
              <option value="" disabled hidden></option>
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
