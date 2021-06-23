import axios from "axios";

const agregarPasajero = async (pasajero) => {
  const { data } = await axios.post(`http://localhost:4000/api/pasajeros/`, pasajero);
  return data;
};

const modificarPasajero = async (id, pasajero) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/pasajeros/${id}`,
    pasajero
  );
  return data;
};

const borrarPasajero = async (id) => {
  const { data } = await axios.delete(`http://localhost:4000/api/pasajeros/${id}`);
  return data;
};

const listarPasajeros = async () => {
  const { data } = await axios.get("http://localhost:4000/api/pasajeros/");
  return data;
};

export { agregarPasajero , modificarPasajero , borrarPasajero , listarPasajeros };