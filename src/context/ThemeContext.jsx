import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'dark' });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={{ theme: 'dark' }}>
    {children}
  </ThemeContext.Provider>
);
