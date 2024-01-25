// dexieDB.js
import Dexie from "dexie";

const db = new Dexie("BDTrucks");

// Define las tablas de tu base de datos aquí
db.version(1).stores({
  tblDrivers: "++driverId,name,valid",
  tblTrucks: "++truckId,tag,valid",
  truckOperation: "++operationTruck_Id,ruta,driver_Id,turno,tara,truck_Id,qtyHorometer,mining,status,createdAt",
  truckTravel: "++travelTruck_Id,operationTruck_Id,driver_Id,truck_Id,mining,ruta,tara,type,tajo,dominio,maintenance,delay,stop,stand,tour,weight_net,weight_gross,tablet,loadStart,loadEnd,downloadStart,downloadEnd,status,createdAt,[operationTruck_Id+status]",
});


export default db;
