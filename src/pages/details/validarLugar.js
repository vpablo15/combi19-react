export const validarLugar = (lugar, rutas) => {
  const rutaBuscada = rutas.filter(
    ({ origen, destino }) => origen.id === lugar.id || destino.id === lugar.id
  );
  if (rutaBuscada.length !== 0) {
    return false;
  }
  return true;
};
