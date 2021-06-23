export const validarCombi = (combii, rutas) => {
    const rutaBuscada = rutas.filter(
      ({ combi }) => combi.id === combii.id
    );
    if (rutaBuscada.length !== 0) {
      return false;
    }
    return true;
  };