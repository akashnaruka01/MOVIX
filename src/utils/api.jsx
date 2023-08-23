import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_API;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};


// function to fetch data from api.
export const fetchDataFromApi = async(url, params) =>{
    try {
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params,
        })
        
        return data;
    } catch (error) {
        console.log('Api is not fetched successfully')
        return error;
    }
}