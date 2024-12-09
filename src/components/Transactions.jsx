import { useEffect, useState } from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import BarChartComponent from './BarChart';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Transactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(
          `https://roxilers-backend-rajuyadav.vercel.app/transactions?month=${selectedMonth}&page=${page}&search=${searchInput}&perPage=10`
        );
        setTransactionList(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };  
    getTransactions();
  }, [page, searchInput, selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <h1 className="text-sm font-bold text-black bg-white w-36 h-36 flex items-center justify-center rounded-full shadow-lg text-center">
            Transaction Dashboard
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 text-black">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Search transactions..."
            className="px-4 bg-[#f0b762] py-2  rounded-lg  flex-1 text-black w-1"
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 bg-[#f0b762] py-2 border text-black"
          >
            {months.map(month => (
              <option key={month} value={month} className="text-black">{month}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 text-black">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-black">
              <thead className="bg-[#f0b762]">
                <tr>
                  {['ID', 'Title', 'Description', 'Price', 'Category', 'Sold', 'Image'].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-black"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-[#f0b762]">
                {transactionList.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 text-black">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border border-black">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border border-black">
                      {transaction.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-black border border-black">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border border-black">
                      ${transaction.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black border border-black">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-black">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.sold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.sold ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-black">
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow px-6 py-4 text-black">
          <span className="text-sm text-black">Page {page}</span>
          <div className="flex gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
          <span className="text-sm text-black">Per Page: 10</span>
        </div>

        <Statistics selectedMonth={selectedMonth} />
        <BarChartComponent selectedMonth={selectedMonth} />
      </div>
    </div>
  );
};

export default Transactions;
