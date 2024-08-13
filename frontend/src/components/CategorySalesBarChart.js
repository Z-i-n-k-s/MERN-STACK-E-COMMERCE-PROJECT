import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SummaryApi from '../common';

const CategorySalesBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    const categoryMap = {};

    
    data.forEach(order => {
      order.productDetails.forEach(product => {
        const category = product.productId.category;
        if (!categoryMap[category]) {
          categoryMap[category] = 0;
        }
        categoryMap[category] += product.quantity;
      });
    });

    
    const sortedCategories = Object.keys(categoryMap)
      .map(category => ({
        category,
        totalQuantity: categoryMap[category],
      }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity); 

    const topCategories = sortedCategories.slice(0, 6);

    return topCategories;
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalQuantity" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategorySalesBarChart;
