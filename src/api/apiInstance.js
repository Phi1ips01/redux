// apiInstance.js
import axios from 'axios';
import { CONFIG } from '../config';
import { KEYS } from '../dataKeys';
import { ROUTES } from '../Routes.constants';
const CancelToken = axios.CancelToken;

const api = axios.create({
    baseURL: CONFIG.API_VERSION,
});

export const useAPI = () => {
    const updatePending = (config, cancel) => {
        let url = '';
        if (config && config.url) {
            url = `${config.baseURL}${config.url}`;
        }
        if (!config || !config.method) {
            return;
        }
        let flagUrl = '';
        if (config.method) {
            flagUrl = url + '&' + config.method;
        }
        if (config.params) {
            flagUrl += '&' + JSON.stringify(config.params);
        }
        if (cancel) {
            pending[flagUrl] = cancel;
        } else {
            delete pending[flagUrl];
        }
    };

    const cancelPending = () => {
        Object.keys(pending).forEach((e) => {
            if (pending[e]) {
                pending[e]();
                delete pending[e];
            }
        });
    };

    const pending = {};

    api.interceptors.request.use(async (config) => {
        if (config.noCancel) {
            return config;
        }
        
        const token = localStorage.getItem(KEYS.ACCESS_TOKEN);
        
        if (token) {
            
            config.headers['Authorization'] = `${token}`;
        }
        config.cancelToken = new CancelToken((cancel) => {
            updatePending(config, cancel);
        });
        return config;
    });

    api.interceptors.response.use(
        (response) => {
            updatePending(response.config);
            return response;
        },
        (error) => {
            const { response } = error;
            if ((response && response.status === 401) || (response && response.status === 403)) {
                localStorage.clear();
                window.location = ROUTES.LOGIN;
            }
            updatePending(error.config);
            return Promise.reject(error);
        }
    );

    return { api, cancelPending };
};
