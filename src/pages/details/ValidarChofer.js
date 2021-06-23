export const validarChofer = (choferr, combis) => {
    const combisSinBL = combis.find(({bajaL: false}));
    const combiBuscada = combisSinBL.filter(
      ({ chofer }) => chofer.id === choferr.id
    );
    if (combiBuscada.length !== 0) {
      return {isValid:false,msg:"No se puede eliminar, tiene al menos una combi asignada"};
    }
    return {isValid:true,msg:""};
  };