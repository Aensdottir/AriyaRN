import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

interface CounterContextType {
  alertOpen: boolean;
  setAlertOpen: (value: boolean) => void;
}

interface Props {
  children: ReactNode;
}

const CommonContext = createContext({} as CounterContextType);

export const useCommon = () => useContext(CommonContext);

const CommonProvider: FunctionComponent<Props> = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <CommonContext.Provider value={{ alertOpen, setAlertOpen }}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonProvider;
