
import { KEYS } from '../dataKeys';
import { useAPI } from './apiInstance'; 

const Login = () => {
    const { api } = useAPI();
    console.log("api");

const login =async (UserData) => {
    const response =await api.post('user/login', UserData); 
    console.log("login api",response.data.token)
    localStorage.setItem(KEYS.ACCESS_TOKEN, response.data.token);

    console.log("response login api",response.data.token)
    return response
}
return {login}
}

export default Login;
