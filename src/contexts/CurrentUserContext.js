import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Tworzenie kontekstu dla bieżącego użytkownika i funkcji ustawiania użytkownika
export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);

// Hook do korzystania z CurrentUserContext w komponentach
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider zarządzający stanem użytkownika i jego aktualizacją
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axios.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        console.error("Błąd podczas pobierania bieżącego użytkownika:", err);
      }
    };

    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};