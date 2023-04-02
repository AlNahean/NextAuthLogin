import {
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
const GlobalContext = createContext();

const GlobalContextProvier = ({ children }) => {
  const [test, setTest] = useState("Test Success");

  return (
    <GlobalContext.Provider
      value={{
        test,
        setTest,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContextProvier, useGlobalContext };
