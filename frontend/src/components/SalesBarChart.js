import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const SalesBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    const dateMap = {};
    const today = moment().startOf('day');
    const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');

    data.forEach(order => {
      const date = moment(order.createdAt).format('YYYY-MM-DD');
      const orderDate = moment(order.createdAt).startOf('day');

      // Only consider orders from the last 7 days
      if (orderDate.isSameOrAfter(sevenDaysAgo) && orderDate.isSameOrBefore(today)) {
        order.productDetails.forEach(product => {
          if (!dateMap[date]) {
            dateMap[date] = 0;
          }
          dateMap[date] += product.quantity;
        });
      }
    });

    // Ensure all days in the last 7 days are represented in the chart
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
      last7Days.push({
        date,
        totalQuantity: dateMap[date] || 0, // Default to 0 if no data for that day
      });
    }

    // Sort data from most recent to oldest
    return last7Days.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalQuantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesBarChart;
