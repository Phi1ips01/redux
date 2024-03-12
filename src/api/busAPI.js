
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'bus/showAll'
});
export const postInstance = new APIInstance({
    baseURL: 'bus/add'
});
export const deleteInstance =new APIInstance({
    baseURL:'bus/delete'
})
export const updateInstance = new APIInstance({
    baseURL:'bus/update'
})
export const showOneInstance = new APIInstance({
    baseURL: 'bus/showOne'
})


const api = instance.api;
const postApi = postInstance.api
const deleteApi = deleteInstance.api
const updateAPI = updateInstance.api
const showOneApi = showOneInstance.api

export const showAllBus = (pageIndex,pageSize,search,keyword) => {
    console.log("showallbus",pageIndex,pageSize,search,keyword);
    return api.get(`?page=${pageIndex}&size=${pageSize}&search=${search?search:'name'}&keyword=${keyword?keyword:''}`)
};
export const showAllCSVBus = ()=>{
    return api.get()
}
export const addBus = (payload) => {
    return postApi.post(api.baseURL,payload)
}
export const deleteBus = (payload) => {
    console.log("payload",payload)
    return deleteApi.delete(deleteApi.baseURL, { data: payload })
}
export const updateBus = (payload)=>{
    return updateAPI.put(api.baseURL, payload )
}
export const showOneBus = (payload)=>{
    console.log("api",payload)
    return showOneApi.get(showOneApi.baseURL,{  params: payload  })
}