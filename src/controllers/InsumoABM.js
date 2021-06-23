import axios from "axios";

const agregarInsumo = async (insumo) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/insumos/`,
    insumo
  );
  return data;
};

const modificarInsumo = async (id, insumo) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/insumos/${id}`,
    insumo
  );
  return data;
};

const borrarInsumo = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/insumos/${id}`
  );
  return data;
};

const listarInsumos = async () => {
  const { data } = await axios.get("http://localhost:4000/api/insumos/");
  return data;
};

export { agregarInsumo, borrarInsumo, modificarInsumo, listarInsumos };
