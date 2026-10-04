import { useEffect, useState } from 'react';

const CurrencyConverter = () => {
  const[amount,setAmount]=useState(0);
  const [from, setFrom] = useState("USD");
const [to, setTo] = useState("EUR");
const [rates, setRates] = useState({});
//  const rates = {
//   USD: 1,
//   EUR: 0.85,
//   GBP: 0.74,
//   JPY: 146.5,
// };
const converted =
  amount > 0 && from && to
    ? ((amount /   rates[from]) * rates[to]).toFixed(2)
    : "0.00";

    useEffect(()=>{
      async function getRates(){
        const response=await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data=await response.json();
        setRates(data.rates)
      }
      getRates();
    },[])


  return (
    // Added p-4 for mobile spacing
    <div className='flex min-h-screen items-center justify-center bg-[#0a0a23] text-white p-4'>
      
      {/* Changed w-[600px] to w-full max-w-lg for responsiveness, adjusted padding */}
      <div className='flex flex-col bg-[#1b1b32] px-8 py-12 w-full max-w-lg rounded-xl gap-5 shadow-lg text-left'>
        
        <div className='text-center mb-2'>
          <h1 className='text-3xl font-bold mb-2'>Currency Converter</h1>
          <h3 className='text-gray-400'>Convert between major currencies</h3>
        </div>

        {/* Amount Input */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="amount" className='text-lg font-semibold text-gray-200'>Amount:</label>
          <input 
            id="amount" 
            value={amount}
            type="number" 
            placeholder="Enter amount..."
            className='w-full bg-white text-black p-3 rounded outline-none focus:ring-2 focus:ring-blue-500' onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {/* Start Currency Select */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="start-currency" className='text-lg font-semibold text-gray-200'>From:</label>
          <select 
          value={from}
          onChange={(e)=>setFrom(e.target.value)}
            id="start-currency" 
            className='w-full bg-white text-black p-3 rounded outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        {/* Target Currency Select */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="target-currency" className='text-lg font-semibold text-gray-200'>To:</label>
          <select 
          value={to} 
          onChange={(e)=>setTo(e.target.value)}
            id="target-currency" 
            className='w-full bg-white text-black p-3 rounded outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>

        {/* Result Area */}
        <div className='mt-4 p-4 bg-[#2a2a45] rounded-lg text-center'>
          <span className='text-xl font-medium text-gray-300'>Converted Amount: </span>
          <span className='text-2xl font-bold text-green-400'>{converted}{to}</span>
        </div>

      </div>
    </div>
  );
}

export default CurrencyConverter;