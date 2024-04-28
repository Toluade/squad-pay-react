<p align="center">
    <img title="Squad" height="200" src="https://squadco.com/assets/squadbyhabari.svg" width="50%"/>
</p>

# Squad Pay React

[![NPM](https://img.shields.io/npm/v/@toluade/squad-pay-react.svg)](https://www.npmjs.com/package/@toluade/squad-pay-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Integrate Squad Payment Modal with your react app.

## Introduction

Introducing "Squad Pay": Your Gateway to Effortless Payment Integration in React!

Elevate your React application's payment capabilities with Squad Pay – the ultimate solution for crafting a seamless payment journey within your mobile or web app. With Squad Pay, you're empowered to effortlessly integrate the Squad Payment Modal into your application, unlocking a world of hassle-free transactions for your users.

Say goodbye to the complexities of payment integration – Squad Pay streamlines the process, allowing you to start accepting payments in record time. Whether you're a seasoned developer or diving into the world of React for the first time, Squad Pay simplifies the integration process, ensuring a smooth and intuitive experience every step of the way.

### Key Features

- **Versatile Payment Options**: Enable transactions with ease using a variety of payment methods, including Card, Bank Account, Bank Transfers, and USSD. With Squad Pay, flexibility is at your fingertips, catering to the diverse needs of your users.

See more information on the [Squad Docs](https://squadinc.gitbook.io/squad-api-documentation)

Experience the power of SquadPay today and revolutionize the way you handle payments in your React applications. Seamlessly blend cutting-edge technology with user-centric design, and embark on a journey towards unparalleled payment excellence with SquadPay.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [useSquadPay](#usesquadpay)
   - [SquadProvider](#squadprovider)
3. [License](#license)

## Installation

npm

```sh npm
npm i @toluade/squad-pay-react --save
```

yarn

```sh yarn
yarn add @toluade/squad-pay-react
```

## Usage

You can add Squad Pay to your projects as a react hook or as a context provider and use the context in components under the provider tree:

### useSquadPay

```ts
import { useSquadPay } from "@toluade/squad-pay-react";

const publicKey = env_variable;

const App = () => {
  const squadPay = useSquadPay({
    publicKey,
  });

  const pay = () => {
    squadPay({
      amount: 500,
      email: "example@email.com",
      currency_code: "NGN",
      redirect_link: "https://squadco.com",
    });
  };

  return <button onClick={pay}>Make Payment</button>;
};

export default App;
```

<hr />

### SquadProvider

```ts
import { SquadProvider } from "@toluade/squad-pay-react";
import PaymentPage from "./PaymentPage";

const publicKey = env_variable;

const App = () => {
  return (
    <SquadProvider publicKey={publicKey}>
      <PaymentPage />
    </SquadProvider>
  );
};

export default App;
```

```ts
import { useSquadContext } from "@toluade/squad-pay-react";

const PaymentPage = () => {
  const { squadPay } = useSquadContext();

  const pay = () => {
    squadPay({
      amount: 500,
      email: "example@email.com",
      currency_code: "NGN",
      redirect_link: "https://squadco.com",
    });
  };

  return (
    <div>
      <p>Kindly click on the button below to make your payment</p>
      <button onClick={pay}>Make Payment</button>
    </div>
  );
};

export default PaymentPage;
```

### Parameters

Read more about the parameters and how they can be used [here](https://squadinc.gitbook.io/squad-api-documentation/payments/accept-payments).

| Parameter            | Required | Description                                                                                                                                                                     |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey            | True     | Your API public key                                                                                                                                                             |
| amount               | True     | Amount to charge the customer.                                                                                                                                                  |
| currency_code        | False    | currency to charge in. Defaults to NGN                                                                                                                                          |
| redirect_url         | False    | URL to redirect to when a transaction is completed. This is useful for redirecting your customer back to a custom page you want to show them. Defaults to 'https://squadco.com' |
| onLoad (function)    | False    | This is a callback for when the payment widget loads.                                                                                                                           |
| onClose (function)   | False    | This is a callback for when the payment widget closes.                                                                                                                          |
| onSuccess (function) | False    | This is a callback for when payment is successful.                                                                                                                              |

## License

MIT © [Toluade](https://github.com/Toluade)
