const listTurn = [
  { value: "DIA", label: "Día" },
  { value: "NOCHE", label: "Noche" },
];

const listMaintenance = [
  { id: 401, name: "Falla mecánica", time: 0 },
  { id: 405, name: "Lubricación y engrase de equipos", time: 0 },
  { id: 406, name: "Problemas de llantas", time: 0 },
  { id: 407, name: "Rotura de manguera", time: 0 },
  { id: 408, name: "Rotura de muelles", time: 0 },
  { id: 409, name: "Mantto. preventivo", time: 0 },
  { id: 410, name: "Mantto. programado", time: 0 },
  { id: 550, name: "Otros", time: 0 },
];

const listStop = [
  { id: 201, name: "Charla de seguridad", time: 0 },
  { id: 202, name: "Refrigerio", time: 0 },
  { id: 203, name: "Revisión de equipo/check", time: 0 },
  { id: 204, name: "Condiciones climáticas", time: 0 },
  { id: 250, name: "Otros", time: 0 },
];

const listDelay = [
  { id: 301, name: "Esperando orden", time: 0 },
  { id: 302, name: "Abast. de combustible", time: 0 },
  { id: 309, name: "Traslados de equipo", time: 0 },
  { id: 310, name: "Esperas en el carguio", time: 0 },
  { id: 311, name: "Esperas en la descarga", time: 0 },
  { id: 312, name: "Mantto. de vías", time: 0 },
  { id: 313, name: "Roca entre las llantas", time: 0 },
  { id: 314, name: "Nivelación de piso", time: 0 },
  { id: 350, name: "Otros", time: 0 },
];

const listStandby = [
  { id: 501, name: "Falta de frente" },
  { id: 502, name: "Falta de combustible" },
  { id: 550, name: "Otros" },
];

const listNivel = [
  { value: "NIVEL 1", label: "Nivel 1" },
  { value: "NIVEL 2", label: "Nivel 2" },
  { value: "NIVEL 3", label: "Nivel 3" },
];

const listTipo = [
  { value: "TAJO", label: "Tajo" },
  { value: "AVANCE", label: "Avance" },
];

const listTajo = [
  { value: "TJ400_1P_1", label: "TJ400_1P_1" },
  { value: "TJ400_2P_1", label: "TJ400_2P_1" },
  { value: "TJ400_6S_1", label: "TJ400_6S_1" },
  { value: "TJ500_1S_1", label: "TJ500_1S_1" },
  { value: "TJ500_2S_1", label: "TJ500_2S_1" },
  { value: "TJ500_3P_1", label: "TJ500_3P_1" },
  { value: "TJ500_3S_1", label: "TJ500_3S_1" },
  { value: "TJ500_4S_1", label: "TJ500_4S_1" },
  { value: "TJ500_5S_1", label: "TJ500_5S_1" },
  { value: "TJ500_6P_1", label: "TJ500_6P_1" },
  { value: "TJ500_7P_1", label: "TJ500_7P_1" },
  { value: "TJ500_7S_1", label: "TJ500_7S_1" },
  { value: "TJ500_8S_1", label: "TJ500_8S_1" },
  { value: "TJ500_11P_1", label: "TJ500_11P_1" }
];

const listRuta = [
  { value: "YUM CARGUIO INTERIOR MINA - YUM CANCHA SUPERFICIE", label: "YUM Carguío Interior Mina - YUM Cancha Superficie" },
  { value: "YUM CARGUIO INTERIOR MINA - UCH CANCHA COLQUICOCHA", label: "YUM Carguío Interior Mina - UCH Cancha Colquicocha" },
  { value: "YUM CANCHA SUPERFICIE - UCH CANCHA COLQUICOCHA", label: "YUM Cancha Superficie - UCH Cancha Colquicocha"},
  { value: "UCH CANCHA COLQUICOCHA - UCH ECHADERO PLANTA", label: "UCH Cancha Colquicocha - UCH Echadero Planta"},
];

const listEquCargio = [
  { value: "SCOOP 1", label: "SCOOP 1" },
  { value: "SCOOP 2", label: "SCOOP 2" },
  { value: "SCOOP 3", label: "SCOOP 3" },
];

const listDominio = [
  { value: "MINERAL", label: "Mineral" },
  { value: "DESMONTE", label: "Desmonte" },
];

module.exports = {
  listTurn,
  listMaintenance,
  listStop,
  listDelay,
  listStandby,
  listNivel,
  listTipo,
  listTajo,
  listEquCargio,
  listDominio,
  listRuta,
};
