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
    currency_code?: "NGN" | "USD";
    redirect_link?: string;
    params?: Record<string, any>;
    onLoad?: () => void;
    onClose?: () => void;
    onSuccess?: () => void;
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
  publicKey: string;
  children: React.ReactNode;
};

const SquadProvider = ({ publicKey, children }: SquadProviderProps) => {
  const squadPay = useSquadPay({ publicKey });
  console.log({ API_KEY: publicKey });
  return (
    <SquadContext.Provider value={{ squadPay }}>
      {children}
    </SquadContext.Provider>
  );
};

export { useSquadContext };

export default SquadProvider;
