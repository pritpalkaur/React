import React from 'react';
import { Chart } from 'react-google-charts';

const OrgChartComponent = () => {
  const data = [
    [{ type: 'string', label: 'Name' }, { type: 'string', label: 'Manager' }, { type: 'string', label: 'ToolTip' }],
    [{ v: 'Mike', f: 'Srinvas<div style="color:red; font-style:italic">President</div>' }, '', 'The President'],
    [{ v: 'Jim', f: 'Jim<div style="color:red; font-style:italic">Vice President</div>' }, 'Mike', 'VP'],
    ['Alice', 'Mike', ''],
    ['Bob', 'Jim', 'Bob Sponge'],
    ['Carol', 'Bob', '']
  ];

  const options = {
    allowHtml: true,
  };

  return (
    <div>
      <Chart
        chartType="OrgChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        loader={<div>Loading Chart...</div>}
      />
    </div>
  );
};

export default OrgChartComponent;
