import { baseLocalUrl as api, headers } from "./api.config";
import axios from 'axios';


export const getAllResidences = async () => {
    const response = await axios.get(`${api}/resid`);
    return response.data;
}

export const getOneResidence = async (id) => {
    const response = await axios.get(`${api}/resid/${id}`);
    return response.data;
}

export const getPublishedResidencesByUser = async (id) => {
    const response = await axios.get(`${api}/resid/usuario/${id}`);
    return response.data;
}

// export const getRentedResidencesByUser = async (id) => {
//     const response = await axios.get(`${api}//${id}`);
//     return response.data;
// }

export const getServicesByResidence = async (id) => {
    const response = await axios.get(`${api}/serv/${id}`);
    return response.data;
}

export const getImagesByResidence = async (id) => {
    const response = await axios.get(`${api}/image/${id}`);
    return response.data.imagenes_residencia;
}

export const createResidence = async (body, id) => {
    const response = await axios.post(`${api}/resid/${id}`, JSON.stringify(body), { headers });
    return response;
}

export const createImgResidence = async (body, headers) => {
    const response = await axios.post(`${api}/api/upload`, body, headers);
    return response;
}

export const updateResidence = async (body, id) => {
    const response = await axios.put(`${api}/resid/${id}`, JSON.stringify(body), { headers });
    return response;
}

export const deleteResidence = async (id) => {
    const response = await axios.delete(`${api}/resid/${id}`);
    return response;
}







