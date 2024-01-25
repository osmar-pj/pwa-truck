import ViewDriver from "@/src/hooks/viewDriver";
import { useEffect, useState } from "react";
import ViewTajo from "../../src/hooks/viewTajo";
import ViewContract from "@/src/hooks/viewContract";

export default function CrudContract() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
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
        setData(result);
      } else {
        setError("Error al obtener datos");
      }
    } catch (error) {
      console.error("Database Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="w-Crud">
      <div className="Cont">
        <ViewContract data={data} fetchData={fetchData} />
      </div>
    </section>
  );
}