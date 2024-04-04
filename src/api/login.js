
import { useAPI } from './apiInstance'; 

const Login = () => {
    const { api } = useAPI();
    console.log("api");

const login =async (UserData) => {
    await api.post('user/login', UserData);
}
return login
}

export default Login;
