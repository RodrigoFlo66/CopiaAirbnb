import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";

export const createUser = async (body) =>{
    const response = await axios.post(`${api}/usr`, JSON.stringify(body), { headers });
    return response.data;
}

export const getUser = async (id) => {
    const response = await axios.get(`${api}/usr/${id}`);
    return response.data;
}