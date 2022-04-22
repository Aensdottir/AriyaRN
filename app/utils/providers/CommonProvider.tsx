import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

interface CounterContextType {
  counter: number;
}

interface Props {
  children: ReactNode;
}

const CommonContext = createContext({} as CounterContextType);

export const useCommon = () => useContext(CommonContext);

const CommonProvider: FunctionComponent<Props> = ({ children }) => {
  const [counter, setCounter] = useState(10);

  return (
    <CommonContext.Provider value={{ counter }}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonProvider;
