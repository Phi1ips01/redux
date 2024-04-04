import { KEYS } from '../dataKeys';

export const CommonUtils = {
    isLoggedIn: () => {
        console.log("loca",localStorage.getItem(KEYS.ACCESS_TOKEN))
        return localStorage.getItem(KEYS.ACCESS_TOKEN) ? true : false;
    }
};