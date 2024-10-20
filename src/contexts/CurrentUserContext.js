import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import axios from "axios"; // Dodaj ten import

// Tworzenie kontekstu dla bieżącego użytkownika i funkcji ustawiania użytkownika
export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);

// Hook do korzystania z CurrentUserContext w komponentach
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider zarządzający stanem użytkownika i jego aktualizacją
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.error("Error while fetching current user:", err);
      }
    };

    handleMount();
  }, []);

  useMemo(() => {
    axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            return axiosRes(error.config);
          } catch (err) {
            setCurrentUser(null);
            history.push("/signin");
          }
        }
        return Promise.reject(error);
      }
    );

    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
          return config;
        } catch (err) {
          setCurrentUser(null);
          history.push("/signin");
          return Promise.reject(err);
        }
      },
      (error) => Promise.reject(error)
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
