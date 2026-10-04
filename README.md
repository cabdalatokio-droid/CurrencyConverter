# Currency Converter

A responsive currency converter built with **React** and **Vite**. The app allows users to enter an amount, select a source currency and a target currency, and see the converted amount using exchange-rate data fetched from an external API.

## About the App

This project is a simple React application focused on learning how a frontend application works with an external API.

The app:

* Accepts an amount from the user.
* Allows the user to select a currency to convert **from**.
* Allows the user to select a currency to convert **to**.
* Fetches exchange-rate data from the ExchangeRate API.
* Calculates the converted amount using the received rates.
* Displays the result immediately in the UI.
* Uses a responsive layout for different screen sizes.

### Supported Currencies

Currently, the interface provides:

* USD — US Dollar
* EUR — Euro
* GBP — British Pound
* JPY — Japanese Yen

## How It Works

When the component loads, `useEffect` makes a request to the ExchangeRate API:

```js
const response = await fetch(
  "https://api.exchangerate-api.com/v4/latest/USD"
);

const data = await response.json();

setRates(data.rates);
```

The returned exchange rates are stored in React state:

```js
const [rates, setRates] = useState({});
```

The application then uses the selected currencies to look up their rates:

```js
rates[from]
rates[to]
```

The conversion is calculated with:

```js
(amount / rates[from]) * rates[to]
```

For example, when the user selects:

```text
Amount: 100
From: USD
To: EUR
```

the application gets the USD and EUR rates from the `rates` object and calculates the converted amount.

## Main React Concepts Used

This project demonstrates several important React concepts:

### `useState`

Used to store values that can change during interaction:

```js
const [amount, setAmount] = useState(0);
const [from, setFrom] = useState("USD");
const [to, setTo] = useState("EUR");
const [rates, setRates] = useState({});
```

### `useEffect`

Used to perform the API request when the component first loads:

```js
useEffect(() => {
  async function getRates() {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const data = await response.json();
    setRates(data.rates);
  }

  getRates();
}, []);
```

### Derived Data

The converted amount is calculated from existing state instead of being stored separately:

```js
const converted =
  amount > 0 && from && to
    ? ((amount / rates[from]) * rates[to]).toFixed(2)
    : "0.00";
```

### Dynamic Object Property Access

The selected currency is used as a key:

```js
rates[from]
rates[to]
```

For example:

```js
from = "USD";
```

means:

```js
rates[from]
```

becomes:

```js
rates["USD"]
```

and returns the USD exchange rate.

## Technologies

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **ExchangeRate API**

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Project Structure

A typical structure for this project can look like:

```text
src/
├── components/
├── App.jsx
├── main.jsx
└── index.css
```

The `CurrencyConverter` component contains the main converter logic and UI.

## React + Vite

This project uses Vite to provide a fast development environment for React, including Hot Module Replacement (HMR).

For more information:

* [Vite](https://vitejs.dev/)
* [React](https://react.dev/)

## React Compiler

The React Compiler is not enabled in this project.

To learn more, see the [React Compiler documentation](https://react.dev/learn/react-compiler/installation).

## ESLint

ESLint can be used to identify problems and maintain code quality during development.

For larger production applications, consider using TypeScript together with type-aware ESLint rules.

## Future Improvements

Possible improvements for the project include:

* Adding more currencies.
* Adding a currency swap button.
* Showing loading and error states while fetching rates.
* Handling unavailable API responses.
* Formatting currencies with currency symbols.
* Adding automatic refresh of exchange rates.
* Moving API logic into a separate service file.
* Improving accessibility and form validation.
