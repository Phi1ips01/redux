import { useAPI } from './apiInstance'; 

const TripAPI = () => {
    const { api } = useAPI(); 
    console.log("api"); 

    const showAllTrip = async (page, size, search, keyword) => {
        console.log("pagesize",page,size,search,keyword)
        const response = await api.get(`trip/showall?page=${page}&size=${size}&search=${search ? search : 'name'}&keyword=${keyword ? keyword : ''}`);
        console.log("responseapi",response)
        return response
    };

    const showAllCSVTrip = async () => {
        console.log("Tripapi");
        const response = await api.get(`trip/showAll`);
        return response
    };

    const showOneTrip = async (id) => {
        console.log("Tripapi",id);
        const response = await api.get(`trip/showOne?id=${id}`);
        return response
    };

    const addTrip =async (TripData) => {
        await api.post('trip/add', TripData);
    };

    const updateTrip =async (TripData) => {
    return await api.put('trip/update', TripData);
    };

    const deleteTrip =async (TripId) => {
        console.log("tripid",TripId)
         await api.delete('trip/delete', { data: { id: TripId } });
         return TripId
    };

    return {
        showAllCSVTrip,
        showAllTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        showOneTrip
    };
};

export default TripAPI;
