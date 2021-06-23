export const validarRuta = (id, viajes) => {
    const viajeBuscado = viajes.filter(
      ({ ruta }) => ruta.id === id
    );
    if (viajeBuscado.length !== 0) {
      return {estado:String(viajeBuscado[0].estado)};
    }
    return {estado:"-1"}
  };