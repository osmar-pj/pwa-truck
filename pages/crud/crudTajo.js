import ViewDriver from "@/src/hooks/viewDriver";
import { useEffect, useState } from "react";
import ViewTajo from "../../src/hooks/viewTajo";

export default function CrudTajo() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/tajo`, {
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
        <ViewTajo data={data} fetchData={fetchData} />
      </div>
    </section>
  );
}