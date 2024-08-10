import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const SalesBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    const dateMap = {}; 
    const profitMap = {}; 
    const today = moment().startOf('day');
    const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');
    const profitPercentage = 0.0001; // 0.01% profit

    data.forEach(order => {
      const date = moment(order.createdAt).format('YYYY-MM-DD');
      const orderDate = moment(order.createdAt).startOf('day');

      
      if (orderDate.isSameOrAfter(sevenDaysAgo) && orderDate.isSameOrBefore(today)) {
        
        order.productDetails.forEach(product => {
          if (!dateMap[date]) {
            dateMap[date] = 0;
            profitMap[date] = 0;
          }
          dateMap[date] += product.quantity;
        });

       
        if (!profitMap[date]) {
          profitMap[date] = 0;
        }
        profitMap[date] += order.totalAmount * profitPercentage; 
      }
    });

    
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      last7Days.push({
        date,
        totalQuantity: dateMap[date] || 0, 
        totalProfit: profitMap[date] || 0, 
      });
    }

    
    return last7Days.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
  }, [data]);

  return (
    <div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalQuantity" name="Total Items Sold" fill="#8884d8" />
          <Bar dataKey="totalProfit" name="Total Profit" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBarChart;
