import axios from "axios";
import queryString from "query-string"; // FIXED: typo qureyString → queryString
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) =>
        queryString.stringify({ ...params, api_key: apiConfig.apiKey }), // FIXED: typo
});

axiosClient.interceptors.request.use((config) => {
    console.log('Making API call to:', config.url);
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message
        });
        throw error;
    }
);

export default axiosClient;