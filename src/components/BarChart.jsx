import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import axios from 'axios';

const BarChartComponent = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const getBarChartData = async () => {
      try {
        const response = await axios.get(`https://roxilers-backend-rajuyadav.vercel.app/bar-chart?month=${selectedMonth}`);
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    getBarChartData();
  }, [selectedMonth]);

  const DataFormatter = (number) => {
    return number > 1000 ? `${(number / 1000).toString()}k` : number.toString();
  };

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Bar Chart Status - {selectedMonth}</h2>
      <div className="w-full h-[400px] bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="priceRange" stroke="#4B5563" className="text-sm" />
            <YAxis tickFormatter={DataFormatter} stroke="#4B5563" className="text-sm" />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="itemCount" name="Number of Items" fill="#3B82F6" barSize="40%" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;