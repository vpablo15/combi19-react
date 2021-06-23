import axios from "axios";

const agregarLugar = async (lugar) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/lugares/`,
    lugar
  );
  return data;
};

const modificarLugar = async (id, lugar) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/lugares/${id}`,
    lugar
  );
  return data;
};

const borrarLugar = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/lugares/${id}`
  );
  return data;
};

const listarLugares = async () => {
  const { data } = await axios.get("http://localhost:4000/api/lugares/");
  return data;
};

export { agregarLugar, borrarLugar, listarLugares, modificarLugar };
