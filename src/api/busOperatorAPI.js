import { useAPI } from './apiInstance'; 

const BusOperatorAPI = () => {
    const { api } = useAPI();
    console.log("api");

    const showAllBusOperator = async (page, size, search, keyword) => {
        return await api.get(`busOperator/showall?page=${page}&size=${size}&search=${search ? search : 'name'}&keyword=${keyword ? keyword : ''}`);
    };

    const showAllCSVBusOperator = async () => {
        console.log("busoperatorapi");
        const response = await api.get(`busOperator/showAll`);
        return response
    };

    const showOneBusOperator = async (id) => {
        console.log("busoperatorapi",id);
        const response = await api.get(`busOperator/showOne?id=${id}`);
        return response
    };

    const addBusOperator =async (busOperatorData) => {
        const response=await api.post('busOperator/add', busOperatorData);
        return response 
};

    const updateBusOperator =async (busOperatorData) => {
       return await api.put('busOperator/update', busOperatorData);
    };

    const deleteBusOperator =async (busOperatorId) => {
        return await api.delete('busOperator/delete', { data: { id: busOperatorId } });
    };
    const getTotalBusOperator = async ()=>{
        return await api.get('busOperator/getTotal')
    }
    return {
        showAllCSVBusOperator,
        showAllBusOperator,
        addBusOperator,
        updateBusOperator,
        deleteBusOperator,
        showOneBusOperator,
        getTotalBusOperator
    };
};

export default BusOperatorAPI;
