import { createContext, useContext } from "react";

export const CurrentUserContext = createContext(null);
export const SetCurrentUserContext = createContext(null);

// Hook do korzystania z CurrentUserContext w komponentach
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);