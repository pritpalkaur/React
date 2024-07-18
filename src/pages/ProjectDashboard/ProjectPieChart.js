import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const PieChartComponent = () => {
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7169/api/graph/GetUserTaskStatusCounts/1');
        const responseData = response.data;

        if (responseData && responseData.pieChart) {
          const formattedData = [
            ['Assignee', 'Hours per Day'],
            ...responseData.pieChart.map(item => [item.assigneeName, item.count])
          ];

          setPieChartData(formattedData);
        } else {
          console.error('Invalid pieChart data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching pieChart data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: 'Assignee Task Distribution', // Updated chart title
  };

  return (
    <div style={{ width: '900px', height: '500px' }}>
      {pieChartData ? (
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={pieChartData}
          options={options}
        />
      ) : (
        <div>Loading Chart...</div>
      )}
    </div>
  );
};

export default PieChartComponent;
