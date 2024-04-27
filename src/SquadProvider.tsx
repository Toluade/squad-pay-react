import React from "react";
import useSquadPay from "./useSquadPay";

type SquadContextType = {
  squadPay: ({
    amount,
    email,
    currency_code,
    params,
    onLoad,
    onClose,
    onSuccess,
  }: {
    amount: number;
    email: string;
    currency_code: "NGN" | "USD";
    params: Record<string, any>;
    onLoad: () => void;
    onClose: () => void;
    onSuccess: () => void;
  }) => void;
};

export const SquadContext = React.createContext<SquadContextType>({
  squadPay: () => null,
});

const useSquadContext = () => {
  const context = React.useContext(SquadContext);

  if (context) {
    return context;
  } else {
    throw new Error("Squad Context must be use inside the Squad Provider");
  }
};

type SquadProviderProps = {
  key: string;
  children: React.ReactNode;
};

const SquadProvider = ({ key, children }: SquadProviderProps) => {
  const squadPay = useSquadPay({ key });
  return (
    <SquadContext.Provider value={{ squadPay }}>
      {children}
    </SquadContext.Provider>
  );
};

export { useSquadContext };

export default SquadProvider;
