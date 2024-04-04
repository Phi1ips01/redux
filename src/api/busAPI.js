import { useAPI } from './apiInstance'; 

const BusAPI = () => {
    const { api } = useAPI();
    console.log("api");

    const showAllBus = async (page, size, search, keyword) => {
        console.log("pagesize",page,size,search,keyword)

       return await api.get(`bus/showall?page=${page}&size=${size}&search=${search ? search : 'name'}&keyword=${keyword ? keyword : ''}`);
    };

    const showAllCSVBus = async () => {
        console.log("busapi"); 
        const response = await api.get(`bus/showAll`);
        return response
    };
    const showOneBus = async (id) => {
        const response = await api.get(`bus/showOne?id=${id}`);
        console.log("busapi",response); 
        
        return response
    };

    const addBus =async (busData) => {
       return await api.post('bus/add', busData);
    };

    const updateBus =async (busData) => {
       return await api.put('bus/update', busData);
    };

    const deleteBus =async (busId) => {
       return await api.delete('bus/delete', { data: { id: busId } });
    };

    return {
        showAllCSVBus,
        showAllBus,
        addBus,
        updateBus,
        deleteBus,
        showOneBus
    };
};

export default BusAPI;
