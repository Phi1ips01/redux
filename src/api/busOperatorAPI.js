
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'busOperator/showAll'
});
export const postInstance = new APIInstance({
    baseURL: 'busOperator/add'
});
export const deleteInstance =new APIInstance({
    baseURL:'busOperator/delete'
})
export const updateInstance =new APIInstance({
    baseURL:'busOperator/update'
})
export const showOneInstance = new APIInstance({
    baseURL: 'busOperator/showOne'
})
const api = instance.api;
const postApi = postInstance.api
const deleteApi = deleteInstance.api
const updateApi = updateInstance.api
const showOneApi = showOneInstance.api

export const showAllBusOperator = (pageIndex,pageSize,search,keyword) => {
    console.log("busoperatorAPI model")
    return api.get(`?page=${pageIndex}&size=${pageSize}&search=${search?search:'name'}&keyword=${keyword?keyword:''}`)
};
export const showAllCSVBusOperator = ()=>{
    return api.get()
}
export const addBusOperator = (payload) =>{
    return postApi.post(postApi.baseURL,payload)
}

export const deleteBusOperator = (payload) => {
    console.log("payload",payload)
    return deleteApi.delete(deleteApi.baseURL, { data: payload })
}
export const updateBusOperator = (payload)=>{
    return updateApi.put(updateApi.baseURL,payload)
}
export const showOneBusOperator = (payload)=>{
    console.log("api",payload)
    return showOneApi.get(showOneApi.baseURL,{  params: payload  })
}