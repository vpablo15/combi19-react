import axios from "axios";


const modificarTarjeta = async (id, tarjeta) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/tarjetas/${id}`,
    tarjeta
  );
  return data;
};

const borrarTarjeta = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/tarjetas/${id}`
  );
  return data;
};

export { borrarTarjeta, modificarTarjeta };