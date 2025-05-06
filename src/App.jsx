import { useState, useEffect } from "react";
import InputBox from "./components/Input";
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('sar');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(() => {
    if (!currencyInfo[to] || !amount) return;
    setConvertedAmount(amount * currencyInfo[to]);
  }, [amount, from, to, currencyInfo]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 tracking-tight">
            Currency Converter
          </h2>

          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(Number(amount))}
            />
          </div>

          <div className="relative text-center mb-4">
            <button
              type="button"
              className="inline-block border border-blue-600 bg-blue-600 text-white px-4 py-1 rounded-md font-medium hover:bg-white hover:text-blue-600 transition duration-200"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 tracking-wider uppercase"
          >
            Convert {from} to {to}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
