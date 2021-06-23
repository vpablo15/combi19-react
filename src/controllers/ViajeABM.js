import axios from "axios";

const agregarViaje = async (viaje) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/viajes/`,
    viaje
  );
  return data;
};

const modificarViaje = async (id, viaje) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/viajes/${id}`,
    viaje
  );
  return data;
};

const borrarViaje = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/viajes/${id}`
  );
  return data;
};

const listarViajes = async () => {
  const { data } = await axios.get("http://localhost:4000/api/viajes/");
  return data;
};

export { agregarViaje, modificarViaje, borrarViaje, listarViajes };