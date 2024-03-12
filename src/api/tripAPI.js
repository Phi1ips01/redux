
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'trip/showAll'
});
export const postInstance = new APIInstance({
    baseURL: 'trip/add'
});
export const deleteInstance =new APIInstance({
    baseURL:'trip/delete'
})
export const updateInstance =new APIInstance({
    baseURL:'trip/update'
})
export const showOneInstance = new APIInstance({
    baseURL: 'trip/showOne'
})


const api = instance.api;
const postApi = postInstance.api
const deleteApi = deleteInstance.api
const updateApi = updateInstance.api
const showOneApi = showOneInstance.api

export const showAllTrip = (pageIndex,pageSize,search,keyword) => {
    console.log("get",pageIndex,pageSize)
    return api.get(`?page=${pageIndex}&size=${pageSize}&search=${search?search:'customer_name'}&keyword=${keyword?keyword:''}`)
};
export const showAllCSVTrip = ()=>{
    return api.get()
}
export const addTrip = (payload) =>{
    return postApi.post(postApi.baseURL,payload)
}
export const deleteTrip = (payload) => {
    console.log("payload",payload)
    return deleteApi.delete(deleteApi.baseURL, { data: payload })
}
export const updateTrip = (payload)=>{
    return updateApi.put(updateApi.baseURL,payload)
}
export const showOneTrip = (payload)=>{
    console.log("api",payload)
    return showOneApi.get(showOneApi.baseURL,{  params: payload  })
}
