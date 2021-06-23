import axios from "axios";

const agregarComentario = async (comentario) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/comentarios/`,
    comentario
  );
  return data;
};

const modificarComentario = async (id, comentario) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/comentarios/${id}`,
    comentario
  );
  return data;
};

const borrarComentario = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:4000/api/comentarios/${id}`
  );
  return data;
};

const listarComentarios = async () => {
  const { data } = await axios.get("http://localhost:4000/api/comentarios/");
  return data;
};

const listarComentariosPorId = async (id) => {
  const { data } = await axios.get("http://localhost:4000/api/comentarios/"+id);
  return data;
};

export { listarComentariosPorId,agregarComentario, borrarComentario, modificarComentario, listarComentarios };