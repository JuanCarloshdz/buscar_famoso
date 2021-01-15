import { BUSCA_ACTOR, BUSCA_PELICULAS, IS_LISTADO, OBTENER_GENEROS, REINICIA_BUSCADOR } from "../constants/actionTypes";

const initialState = { listado: true }
const busquedas = (estadoBuscador = initialState, action) => {

    switch (action.type) {
        case BUSCA_ACTOR:
            return {...action.payload, listado :estadoBuscador.listado};
        case BUSCA_PELICULAS:
            console.log({ ...estadoBuscador, peliculas: action.payload })
            return { ...estadoBuscador, peliculas: action.payload }
        case OBTENER_GENEROS:
            return { ...estadoBuscador, generos: action.payload.genres }
        case REINICIA_BUSCADOR:
            return { ...estadoBuscador, actorName: '', error: '', userName: '' }
        case IS_LISTADO:
            return {...estadoBuscador, listado:action.payload}

        default:
            return estadoBuscador;
    }
}

export default busquedas;