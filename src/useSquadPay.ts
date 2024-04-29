import { useEffect } from "react";

interface CustomWindow extends Window {
  squad?: any;
}

declare var window: CustomWindow;

export type SquadOtherParams = {
  currency_code?: "NGN" | "USD" | string;
  redirect_link?: string;
  params?: Record<string, any>;
  onLoad?: () => void;
  onClose?: () => void;
  onSuccess?: () => void;
};

type SquadPayProps = SquadOtherParams & {
  publicKey: string;
};

const useSquadPay = ({
  publicKey,
  currency_code: parent_currency_code,
  redirect_link: parent_redirect_link,
  params: parent_params = {},
  onLoad: parentOnLoad,
  onClose: parentOnClose,
  onSuccess: parentOnSuccess,
}: SquadPayProps) => {
  function squadPay({
    amount,
    email,
    currency_code = "NGN",
    redirect_link = "",
    params = {},
    onLoad = () => null,
    onClose = () => null,
    onSuccess = () => null,
  }: {
    amount: number;
    email: string;
  } & SquadOtherParams) {
    const squadInstance = new window.squad({
      onClose: () => (parentOnClose ? parentOnClose() : onClose()),
      onLoad: () => (parentOnLoad ? parentOnLoad() : onLoad()),
      onSuccess: () => (parentOnSuccess ? parentOnSuccess() : onSuccess()),
      key: publicKey,
      email: email,
      amount: amount * 100,
      ...params,
      ...parent_params,
      currency_code: parent_currency_code ?? currency_code,
      redirect_link: parent_redirect_link ?? redirect_link,
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
