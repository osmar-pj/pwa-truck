import { unstable_noStore as noStore } from "next/cache";

export async function fetchOperation() {
  noStore();
  let result = null; // Valor por defecto

  try {
    const response = await fetch(`${process.env.API_URL}/operation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": true,
      },
    });

    if (response.ok) {
      result = await response.json();
    } else {
      setError("Error al obtener datos");
    }

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    setError("Error en la solicitud");
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchTravel() {
  noStore();
  let result = null; // Valor por defecto

  try {
    const response = await fetch(`${process.env.API_URL}/drivers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": true,
      },
    });

    if (response.ok) {
      result = await response.json();
    } else {
      setError("Error al obtener datos");
    }

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    setError("Error en la solicitud");
    throw new Error("Failed to fetch revenue data.");
  }
}
