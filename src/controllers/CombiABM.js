import axios from "axios";

const agregarCombi = async (combi) => {
  const { data } = await axios.post(`http://localhost:4000/api/combis/`, combi);
  return data;
};

const modificarCombi = async (id, combi) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/combis/${id}`,
    combi
  );
  return data;
};

const borrarCombi = async (id) => {
  const { data } = await axios.delete(`http://localhost:4000/api/combis/${id}`);
  return data;
};

const listarCombis = async () => {
  const { data } = await axios.get("http://localhost:4000/api/combis/");
  return data;
};

export { agregarCombi, modificarCombi, borrarCombi, listarCombis };
