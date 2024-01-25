import { useEffect, useState } from "react";
import CrudOper from "./crud-oper";
import Select from "react-select";

export default function CreateTruck({
  isCreateUser,
  setCreate,
  userToEdit,
  fetchData,
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
        truckId: 0,
        tag: "",
        contract: 2,
        tara: 0,
        valid: 0,
        createdAt: "",
      }
    : {
        truckId: userToEdit.truckId,
        tag: userToEdit.tag,
        contract: userToEdit.contract,
        tara: userToEdit.tara,
        valid: userToEdit.valid,
        createdAt: userToEdit.createdAt,
      };

  const [formData, setFormData] = useState(initialValues);
  const subtitl = "camión";
  const url = "truck";
  useEffect(() => {
    if (!isCreateUser && userToEdit) {
      setFormData({
        truckId: userToEdit.truckId,
        tag: userToEdit.tag,
        contract: userToEdit.contract,
        tara: userToEdit.tara,
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
      urlEdit={userToEdit.truckId}
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
              value={formData.tag}
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  tag: value,
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
              onChange={(e) =>
                handleChange("contract", parseInt(e.target.value, 10))
              }
              className="input__field"
              required
            >
              {listContract.map((contract) => (
                <option key={contract.contractId} value={contract.contractId}>
                  {contract.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mC-imputs-item">
          <label>Tara</label>
          <div className="imputs-i-input">
            <img src="imgs/i-f-user.svg" alt="" />
            <input
              type="number"
              name="value"
              placeholder="00000"
              min="0"
              className="no-spinners input-crud"
              value={formData.tara}
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

                setFormData({
                  ...formData,
                  tara: inputValue,
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
