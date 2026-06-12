import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';

interface AppContextValue {
  sidebar: boolean;
  setSidebar: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  category: number;
  setCategory: Dispatch<SetStateAction<number>>;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [sidebar, setSidebar] = useState(true);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(0);

  return (
    <AppContext.Provider value={{ sidebar, setSidebar, input, setInput, category, setCategory }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
