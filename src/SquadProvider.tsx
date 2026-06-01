import React from "react";
import useSquadPay, { SquadOtherParams } from "./useSquadPay";

type SquadContextType = {
  squadPay: ({
    amount,
    email,
    currency_code,
    pass_charge,
    params,
    onLoad,
    onClose,
    onSuccess,
  }: {
    amount: number;
    email: string;
  } & SquadOtherParams) => void;
};

export const SquadContext = React.createContext<SquadContextType | undefined>(
  undefined
);

const useSquadContext = () => {
  const context = React.useContext(SquadContext);

  if (!context) {
    throw new Error("useSquadContext must be used inside the SquadProvider");
  }

  return context;
};

type SquadProviderProps = SquadOtherParams & {
  publicKey: string;
  children: React.ReactNode;
};

const SquadProvider = ({
  publicKey,
  children,
  currency_code,
  pass_charge,
  redirect_link,
  params,
  onLoad,
  onClose,
  onSuccess,
}: SquadProviderProps) => {
  const squadPay = useSquadPay({
    publicKey,
    currency_code,
    pass_charge,
    redirect_link,
    params,
    onLoad,
    onClose,
    onSuccess,
  });
  return (
    <SquadContext.Provider value={{ squadPay }}>
      {children}
    </SquadContext.Provider>
  );
};

export { useSquadContext };

export default SquadProvider;
