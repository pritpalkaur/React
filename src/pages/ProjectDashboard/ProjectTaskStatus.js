import React, { useEffect, useState, useRef } from 'react'; // Import useRef
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const ProjectTaskStatus = () => {
  const { projectID } = useParams(); 
  const [chartData, setChartData] = useState(null);
  const fetchCounter = useRef(0); // Ref for tracking fetch count

  useEffect(() => {
    console.log('Fetching data for projectID:', projectID);

    const fetchData = async () => {
      fetchCounter.current += 1; // Increment fetch counter
      const currentFetch = fetchCounter.current; // Store current fetch count

      try {
        const response = await axios.get(`https://localhost:7169/api/graph/GetUserTaskStatusCounts/${projectID}`);
        const data = response.data.userBarChart;
        console.log(`Received data (Fetch ${currentFetch}):`, data);

        const formattedData = [
          ['Task Name', 'Start', 'End'],
          ...data.map(d => [
            d.taskName,
            new Date(d.dueDate),
            d.completedDate ? new Date(d.completedDate) : new Date(d.dueDate)
          ])
        ];

        // Check if this is the latest fetch result
        if (fetchCounter.current === currentFetch) {
          setChartData(formattedData);
        }
      } catch (error) {
        console.error(`Error fetching data (Fetch ${currentFetch}):`, error);
      }
    };

    fetchData();
  }, [projectID]);

  return (
    <div className="h-100">
      {chartData ? (
        <Chart
          width={'100%'}
          height={400}
          chartType="Timeline"
          loader={<div>Loading Chart...</div>}
          data={chartData}
          options={{
            title: 'Project Task Status', // Set the title for the chart
            timeline: {
              groupByRowLabel: false,
            },
          }}
        />
      ) : (
        <div>Loading Chart...</div>
      )}
    </div>
  );
};

export default ProjectTaskStatus;
