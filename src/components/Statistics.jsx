import { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await axios.get(`https://roxilers-backend-rajuyadav.vercel.app/statistics/?month=${selectedMonth}`);
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    getStatistics();
  }, [selectedMonth]);

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Statistics - {selectedMonth}</h2>
      <div className="bg-yellow-200 p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Sale</span>
            <span className="text-xl font-bold">{statistics.totalSaleAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Sold Item</span>
            <span className="text-xl font-bold">{statistics.totalSoldItems}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Not Sold Item</span>
            <span className="text-xl font-bold">{statistics.totalNotSoldItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
