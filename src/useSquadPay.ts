import { useEffect } from "react";

interface CustomWindow extends Window {
  squad?: any;
}

declare var window: CustomWindow;

type SquadPayProps = {
  key: string;
};

const useSquadPay = ({ key }: SquadPayProps) => {
  const publicKey = key;
  function squadPay({
    amount,
    email,
    currency_code = "NGN",
    redirect_link = "https://squadco.com",
    params = {},
    onLoad = () => null,
    onClose = () => null,
    onSuccess = () => null,
  }: {
    amount: number;
    email: string;
    currency_code?: "NGN" | "USD";
    redirect_link?: string;
    params?: Record<string, any>;
    onLoad?: () => void;
    onClose?: () => void;
    onSuccess?: () => void;
  }) {
    const squadInstance = new window.squad({
      onClose: () => onClose(),
      onLoad: () => onLoad(),
      onSuccess: () => onSuccess(),
      key: publicKey,
      email: email,
      amount: amount * 100,
      ...params,
      currency_code: currency_code,
      redirect_link: redirect_link,
    });
    squadInstance.setup();
    squadInstance.open();
  }

  useEffect(() => {
    const base_url = "https://checkout.squadco.com";
    const script = document.createElement("script");
    script.src = `${base_url}/widget/squad.min.js`;
    if (document) {
      document?.head?.appendChild(script);
    } else {
      throw new Error("Unable to access DOM");
    }
  }, []);

  return squadPay;
};

export default useSquadPay;
