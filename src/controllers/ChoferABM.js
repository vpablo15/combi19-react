import axios from "axios";

const agregarChofer = async (chofer) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/choferes/`,
    chofer
  );
  return data;
};

const modificarChofer = async (id, chofer) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/choferes/${id}`,
    chofer
  ); 
  return data;
};

const borrarChofer = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/choferes/${id}`
  );
  return data;
};

const listarChoferes = async () => {
  const { data } = await axios.get("http://localhost:4000/api/choferes/");
  return data;
};

export { agregarChofer, modificarChofer, borrarChofer, listarChoferes };
