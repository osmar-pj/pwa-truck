import ViewDriver from "@/src/hooks/viewDriver";
import { useEffect, useState } from "react";

export default function CrudDriver() {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/driver`, {
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
        <ViewDriver data={data} fetchData={fetchData}/>
      </div>
    </section>
  );
}
