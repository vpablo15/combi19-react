import axios from "axios";

const agregarRuta = async (ruta) => {
  const { data } = await axios.post(`http://localhost:4000/api/rutas/`, ruta);
  return data;
};

const modificarRuta = async (id, ruta) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/rutas/${id}`,
    ruta
  );
  return data;
};

const borrarRuta = async (id) => {
  const { data } = await axios.delete(`http://localhost:4000/api/rutas/${id}`);
  return data;
};

const listarRutas = async () => {
  const { data } = await axios.get(`http://localhost:4000/api/rutas/`);
  return data;
};

export { agregarRuta, modificarRuta, borrarRuta, listarRutas };
