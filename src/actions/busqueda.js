import { BUSCA_ACTOR, BUSCA_PELICULAS, OBTENER_GENEROS, REINICIA_BUSCADOR } from "../constants/actionTypes";
import { NOMADA_API_KEY, THE_MOVIE_API_KEY } from "../constants/api_key";

export const getActor = (file) => async (dispatch) => {


    let data = {};

    var myHeaders = new Headers();
    myHeaders.append("Nomada", NOMADA_API_KEY);

    var formdata = new FormData();
    formdata.append("file", file, file.name);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    await fetch("https://whois.nomada.cloud/upload", requestOptions)
        .then(response => response.text())
        .then(result => { data = JSON.parse(result); })
        .catch(error => { data = JSON.parse(error); });


    dispatch({ type: BUSCA_ACTOR, payload: data });

}

export const getPeliculas = (query) => async (dispatch) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let data;
    await fetch(`https://api.themoviedb.org/3/search/person?api_key=${THE_MOVIE_API_KEY}&language=es&query=${query}&include_adult=false`, requestOptions)
        .then(response => response.text())
        .then(result => {
            data = JSON.parse(result);
            
        })
        .catch(error => {
            data = JSON.parse(error);
        });

    
    dispatch({ type: BUSCA_PELICULAS, payload: data });

}

export const getGeneros = () => async (dispatch) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let data;
    await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${THE_MOVIE_API_KEY}&language=es`, requestOptions)
        .then(response => response.text())
        .then(result => {
            data = JSON.parse(result);
            
        })
        .catch(error => {
            data = JSON.parse(error);
        });

    
    dispatch({ type: OBTENER_GENEROS, payload: data });

}
export const reinicarBusqueda = () => async (dispatch) =>{
    dispatch({type: REINICIA_BUSCADOR})
}