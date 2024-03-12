
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
    baseURL: 'user/showAll'
});
export const postInstance = new APIInstance({
    baseURL: 'user/add'
});
export const deleteInstance = new APIInstance({
    baseURL: 'user/delete'
})
export const updateInstance = new APIInstance({
    baseURL: 'user/update'
})
export const showOneInstance = new APIInstance({
    baseURL: 'user/showOneByPk'
})

const api = instance.api;
const postApi = postInstance.api
const deleteApi = deleteInstance.api
const updateApi = updateInstance.api
const showOneApi = showOneInstance.api


export const showAllUser = (pageIndex,pageSize,search,keyword) => {
    return api.get(`?page=${pageIndex}&size=${pageSize}&search=${search?search:'username'}&keyword=${keyword?keyword:''}`)
        
    };
    export const showAllCSVUser = ()=>{
        return api.get()
    }
export const addUser = (payload) =>{
    console.log("payload",payload)

    return postApi.post(postApi.baseURL,payload)
}
export const deleteUser = (payload) => {
    console.log("payload",payload)
    return deleteApi.delete(deleteApi.baseURL, { data: payload })
}
export const updateUser = (payload)=>{
    return updateApi.put(updateApi.baseURL,payload)
}
export const showOneUser = (payload)=>{
    console.log("api",payload)
    return showOneApi.get(showOneApi.baseURL,{  params: payload  })
}
