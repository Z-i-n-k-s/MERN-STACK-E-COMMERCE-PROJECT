import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SummaryApi from '../common';

const CategorySalesBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    const categoryMap = {};

    // Aggregate quantities by category
    data.forEach(order => {
      order.productDetails.forEach(product => {
        const category = product.productId.category;
        if (!categoryMap[category]) {
          categoryMap[category] = 0;
        }
        categoryMap[category] += product.quantity;
      });
    });

    // Convert to array and sort alphabetically
    const sortedCategories = Object.keys(categoryMap)
      .map(category => ({
        category,
        totalQuantity: categoryMap[category],
      }))
      .sort((a, b) => a.category.localeCompare(b.category)); // Alphabetical sorting

    // Limit to top 6 categories
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