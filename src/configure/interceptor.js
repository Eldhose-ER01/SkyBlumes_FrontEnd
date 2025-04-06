import axios from'axios';
import {userApi,adminApi}from "./api"

const TIMEOUT_DURATION = 110000;
const createAxiosInstanceWithInterceptor=(baseUrl,tokenName)=>{
    const axiosInstance=axios.create({
        baseURL:baseUrl,
        timeout:TIMEOUT_DURATION
    });

    axiosInstance.interceptors.request.use(
        (config)=>{
            const details=localStorage.getItem(tokenName)
                if(details){
                    config.headers["Authorization"]=`Bearer ${details}`;
                
            }
            return config
        },
        (error)=>{
            return Promise.reject(error)
        }
    );
    axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response) {
            if (error.response.status === 404) {
              window.location.href = "/error404";
            } else if (error.response.status === 500) {
              window.location.href = "/error500";
            } 
            else {
              console.log("HTTP ERROR CODE:", error.response.status);
            }
          } else if (error.request) {
            console.log("Network Error:", error.message);
          } else {
            console.log("Error:", error.message);
          }
          return Promise.reject(error);
        }
      );
    
      return axiosInstance;
}
const userAxiosInstance=createAxiosInstanceWithInterceptor(userApi,"usertoken")
const adminAxiosInstance=createAxiosInstanceWithInterceptor(adminApi,"admintoken")

export{userAxiosInstance,adminAxiosInstance}

