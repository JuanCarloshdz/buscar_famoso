import { BUSCA_ACTOR, BUSCA_PELICULAS, OBTENER_GENEROS, REINICIA_BUSCADOR } from "../constants/actionTypes";


const busquedas = (estadoBuscador = {}, action) => {

    switch (action.type) {
        case BUSCA_ACTOR: 
            return action.payload;
        case BUSCA_PELICULAS:
            console.log({...estadoBuscador , peliculas: action.payload })
            return {...estadoBuscador , peliculas: action.payload }
        case OBTENER_GENEROS:
            return {...estadoBuscador , generos: action.payload.genres }
        case REINICIA_BUSCADOR:
            return {}
        default:
            return estadoBuscador;
        }
    } 

export default busquedas;