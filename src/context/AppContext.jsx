import { createContext, useState, useContext } from 'react';

const AppContext = createContext({
  currentUser: {},
});

export function AppProvider({ children }) {
  const [state, setState] = useState({
    currentUser: {
      username: 'user_1',
      fullName: 'Anyul Rey Moreno',
      role: 'employee',
    },
  });

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
export const useAppContext = () => useContext(AppContext);
