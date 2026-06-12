import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState(0);

  return (
    <AppContext.Provider value={{ sidebar, setSidebar, input, setInput, category, setCategory }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = { children: PropTypes.node.isRequired };

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
