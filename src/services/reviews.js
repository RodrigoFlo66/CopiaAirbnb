import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";

export const createReviewResidence = async (body, idResid, idUser, idReserve) => {
  const response =  await axios.post(`${api}/evalu/${idResid}/${idUser}/${idReserve}`, JSON.stringify(body), { headers });
  return response.data;
}

export const getAllReviewsByResidence = async (id) =>{
  const response = await axios.get(`${api}/evalu/${id}`);
  return response.data;
}

export const getAsGuestUserReviews = async (id) => {
  const response = await axios.get(`${api}/user/evalu/${id}`);
  return response.data;
}

export const createReviewUser = async (body, idUser) => {
  const response =  await axios.post(`${api}/user/evalu/${idUser}`, JSON.stringify(body), { headers });
  return response.data;
}