import React from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logout} = useAuth();

  // firebase access token send backend
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // non admin user break
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      // console.log("inside res interceptor error", error);

      if (error.status === 403) {
        navigate("/forbidden");
      }
      if (error.status === 401) {
        logout().then(() => {
          navigate("/signIn");
        });
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;