import { useEffect } from "react";

interface CustomWindow extends Window {
  squad?: any;
}

declare var window: CustomWindow;

export type SquadOtherParams = {
  currency_code?: "NGN" | "USD" | string;
  pass_charge?: boolean;
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
  pass_charge: parent_pass_charge = false,
  redirect_link: parent_redirect_link,
  params: parent_params = {},
  onLoad: parentOnLoad = () => null,
  onClose: parentOnClose = () => null,
  onSuccess: parentOnSuccess = () => null,
}: SquadPayProps) => {
  function squadPay({
    amount,
    email,
    currency_code = "NGN",
    pass_charge = false,
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
      onClose: () => (onClose ? onClose() : parentOnClose()),
      onLoad: () => (onLoad ? onLoad() : parentOnLoad()),
      onSuccess: () => (onSuccess ? onSuccess() : parentOnSuccess()),
      key: publicKey,
      email: email,
      amount: amount * 100,
      ...params,
      ...parent_params,
      currency_code: currency_code ?? parent_currency_code,
      pass_charge: pass_charge !== undefined ? pass_charge : parent_pass_charge !== undefined ? parent_pass_charge : false,
      redirect_link: redirect_link ?? parent_redirect_link,
    });
    squadInstance.setup();
    squadInstance.open();
  }

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const src = "https://checkout.squadco.com/widget/squad.min.js";

    // Avoid injecting the widget script more than once when multiple
    // providers/hooks mount on the same page.
    if (document.querySelector(`script[src="${src}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return squadPay;
};

export default useSquadPay;
