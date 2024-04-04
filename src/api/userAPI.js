import { useAPI } from './apiInstance'; 

const UserAPI = () => {
    const { api } = useAPI();
    console.log("api");

    const showAllUser = async ({page, size, search, keyword}) => {
        
        console.log("showallblauserapi",page,size,search,keyword)
        const response = await api.get(`user/showall?page=${page}&size=${size}&search=${search ? search : 'name'}&keyword=${keyword ? keyword : ''}`);
        return response
    };

    const showAllCSVUser = async () => {
        console.log("Userapi");
        const response = await api.get(`user/showAll`);
        return response
    };

    const showOneUser = async (payload) => {
        console.log("Userapi");
        const response = await api.get(`user/showOne?id=${payload}`,payload);
        return response
    };
    const addUser =async (UserData) => {
        const response = await api.post('user/add', UserData);
      return response  
    };
    const updateUser =async (UserData) => {
        return await api.put('user/update', UserData);
    };

    const deleteUser =async (UserId) => {
        const response = await api.delete('user/delete', { data: { id: UserId } });
      return response  
    };
    return {
        showAllCSVUser,
        showAllUser,
        addUser,
        updateUser,
        deleteUser,
        showOneUser
    };
};

export default UserAPI;
