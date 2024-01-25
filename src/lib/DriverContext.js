import { createContext, useEffect, useContext, useState } from "react";
import db from "@/src/lib/dexieDB";

const DriverContext = createContext();

export const useDriverContext = () => useContext(DriverContext);

export const DriverProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [tajos, setTajos] = useState([]);

  const checkInternetConnection = () => {
    if (navigator.onLine) {
      setIsOnline(true);
      fetchDataAndUpdate();
    } else {
      setIsOnline(false);
    }
  };

  const handleOnlineEvent = () => {
    setIsOnline(true);
    fetchDataAndUpdate();
  };

  const handleOfflineEvent = () => {
    setIsOnline(false);
  };

  const fetchDataAndUpdate = async () => {
    await updateData();
    await fetchData();
  };

  useEffect(() => {
    window.addEventListener("online", handleOnlineEvent);
    window.addEventListener("offline", handleOfflineEvent);

    checkInternetConnection();

    const handleBeforeUnload = () => {
      fetchDataAndUpdate();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener("online", handleOnlineEvent);
      window.removeEventListener("offline", handleOfflineEvent);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    fetchDataAndUpdate();
  },[])

  const updateData = async () => {
    try {
      const tablaCompleta = await db.tblTrucks.toArray();
      // Mapear la tabla completa para obtener solo los campos deseados
      const camposEspecificos = tablaCompleta.map(
        ({ truckId, tara, updatedAt }) => ({
          truckId,
          tara,
          updatedAt,
        })
      );
     
      const response = await fetch(`${process.env.API_URL}/updatedTruck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify(camposEspecificos),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === true) {
          
        } else {
          console.log("Error");
        }
      } else {
        console.error(
          "Error al enviar datos al servidor:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await fetch(`${process.env.API_URL}/driverTruck`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": true,
        },
      });

      if (data.ok) {
        const nuevaListaDriver = await data.json();
        
        verificarDrivers(nuevaListaDriver.drivers);
        verificarTrucks(nuevaListaDriver.trucks);
        // verificarTajos(nuevaListaDriver.tajos);
      } else {
        setError("Error al obtener datos");
      }
    } catch (error) {
      console.error("Error al llamar a la API o actualizar IndexedDB", error);
    }
  };

  const verificarDrivers = async (listDriver) => {
    try {
      await db.transaction("rw", db.tblDrivers, async () => {
        const store = db.tblDrivers;
        const driverIndexedDB = await store.toArray();

        for (const item of listDriver) {
          const driverId = item.driverId;

          const existingDriver = driverIndexedDB.find(
            (existingTruck) => existingTruck.driverId === driverId
          );

          if (existingDriver) {
            // Si el camión ya existe, actualiza sus campos
            try {
              const updatedDriver = {
                ...existingDriver,
                ...item,
                driverId: existingDriver.driverId,
              };
              await store.put(updatedDriver);
              // console.log(`Se actualizó el camión ${driverId} en IndexedDB.`);
            } catch (error) {
              // Manejar errores de actualización si es necesario
            }
          } else {
            // Si el camión no existe, agrégalo
            try {
              await store.add(item);
              // console.log(`Se agregó el camión ${driverId} a IndexedDB.`);
            } catch (error) {
              if (error.name === "ConstraintError") {
                // Manejar errores de duplicados si es necesario
              } else {
                // Manejar otros errores al intentar agregar el camión
              }
            }
          }
        }
      });

      const updatedDriverList = await db.tblDrivers.toArray();
      setDrivers(updatedDriverList);

      // console.log("Verificación y agregado completado.");
    } catch (error) {
      console.error("Error durante la verificación y agregado:", error);
    }
  };

  const verificarTrucks = async (listTruck) => {
    try {
      await db.transaction("rw", db.tblTrucks, async () => {
        const store = db.tblTrucks;
        const trucksIndexedDB = await store.toArray(); // Obtener todos los camiones

        for (const item of listTruck) {
          const truckId = item.truckId;

          const existingTruck = trucksIndexedDB.find(
            (existingTruck) => existingTruck.truckId === truckId
          );

          if (existingTruck) {
            // Si el camión ya existe, actualiza sus campos si updatedAt es menor
            if (existingTruck.updatedAt < item.updatedAt) {
              try {
                const updatedTruck = {
                  ...existingTruck,
                  ...item,
                  truckId: existingTruck.truckId,
                };
                await store.put(updatedTruck);
                // console.log(`Se actualizó el camión ${truckId} en IndexedDB.`);
              } catch (error) {
                // Manejar errores de actualización si es necesario
              }
            }
          } else {
            // Si el camión no existe, agrégalo
            try {
              await store.add(item);
              // console.log(`Se agregó el camión ${truckId} a IndexedDB.`);
            } catch (error) {
              if (error.name === "ConstraintError") {
                // Manejar errores de duplicados si es necesario
              } else {
                // Manejar otros errores al intentar agregar el camión
              }
            }
          }
        }
      });

      const updatedTruckList = await db.tblTrucks.toArray();
      setTrucks(updatedTruckList);
      // console.log("Verificación y agregado completado.");
    } catch (error) {
      // console.log("Error durante la verificación y agregado");
    }
  };

  // const verificarTajos = async (listTajo) => {
  //   try {
  //     await db.transaction("rw", db.tblTajos, async () => {
  //       const store = db.tblTajos;
  //       const trucksIndexedDB = await store.toArray(); // Obtener todos los camiones

  //       for (const item of listTajo) {
  //         const tajoId = item.tajoId;

  //         const existingTruck = trucksIndexedDB.find(
  //           (existingTruck) => existingTruck.tajoId === tajoId
  //         );

  //         if (existingTruck) {
  //           // Si el camión ya existe, actualiza sus campos si updatedAt es menor
  //           if (existingTruck.updatedAt < item.updatedAt) {
  //             try {
  //               const updatedTruck = {
  //                 ...existingTruck,
  //                 ...item,
  //                 tajoId: existingTruck.tajoId,
  //               };
  //               await store.put(updatedTruck);
  //               // console.log(`Se actualizó el camión ${truckId} en IndexedDB.`);
  //             } catch (error) {
  //               // Manejar errores de actualización si es necesario
  //             }
  //           }
  //         } else {
  //           // Si el camión no existe, agrégalo
  //           try {
  //             await store.add(item);
  //             // console.log(`Se agregó el camión ${truckId} a IndexedDB.`);
  //           } catch (error) {
  //             if (error.name === "ConstraintError") {
  //               // Manejar errores de duplicados si es necesario
  //             } else {
  //               // Manejar otros errores al intentar agregar el camión
  //             }
  //           }
  //         }
  //       }
  //     });

  //     const updatedTajoList = await db.tblTajos.toArray();
  //     setTajos(updatedTajoList);
  //     // console.log("Verificación y agregado completado.");
  //   } catch (error) {
  //     // console.log("Error durante la verificación y agregado");
  //   }
  // };

  return (
    <DriverContext.Provider value={{ drivers, trucks, fetchDataAndUpdate }}>
      {children}
    </DriverContext.Provider>
  );
};
