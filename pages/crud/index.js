import View from "@/src/hooks/view";
import { useEffect, useState } from "react";

export default function Crud() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/testTruck`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": true,
          },
        });

        if (response.ok) {
          const result = await response.json();          
          console.log(result);
          setData(result);
        } else {
          setError("Error al obtener datos");
        }
      } catch (error) {
        console.error("Database Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-Crud">
      <div className="Cont">
        <View data={data} />
      </div>
    </section>
  );
}
