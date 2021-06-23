import axios from "axios";

const agregarViajePasajero = async (viajePasajero) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/viajesPasajeros/`,
    viajePasajero
  );
  return data;
};

const listarViajePasajero = async () => {
  const { data } = await axios.get("http://localhost:4000/api/viajesPasajeros/");
  return data;
};

const buscarViajePasajeroPorId = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/viajesPasajeros/${id}`);
    return data;
  };

export { buscarViajePasajeroPorId, agregarViajePasajero, listarViajePasajero };
