
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'operatorUpdate/showAll'
});
export const postInstance = new APIInstance({
    baseURL: 'operatorUpdate/add'
});

const api = instance.api;
const postApi = postInstance.api

export const showAllOperatorUpdate = (payload) => {
    return api.get(api.baseURL).then((response) => {
        console.log("Response:", response.data);
        return response.data; // Assuming data is within response.data
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Re-throw to handle in calling code
      });
};
export const addOperatorUpdate = (payload) =>{
    return postApi.post(postApi.baseURL,payload)
}

