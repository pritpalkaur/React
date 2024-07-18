import React, { useEffect } from 'react';
import { Chart } from 'react-google-charts';

const ComboChartComponent = () => {
  const data = [
    ['Month', 'CO Suite 2.0', 'CO Suite 3.0', 'CO Suite 4.0', 'CO Suite 5.0', 'CO Suite 6.0', 'CO Suite 7.0'],
    ['2004/05', 165, 938, 522, 998, 450, 614.6],
    ['2005/06', 135, 1120, 599, 1268, 288, 682],
    ['2006/07', 157, 1167, 587, 807, 397, 623],
    ['2007/08', 139, 1110, 615, 968, 215, 609.4],
    ['2008/09', 136, 691, 629, 1026, 366, 569.6]
  ];

  const options = {
    title: 'Monthly Project Overview ',
    vAxis: { title: 'Projects' },
    hAxis: { title: 'Month' },
    seriesType: 'bars',
    series: { 5: { type: 'line' } },
  };

  return (
    <div id="chart_div" style={{ width: '100%', height: '500px' }}>
      <Chart
        chartType="ComboChart"
        width="100%"
        height="500px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ComboChartComponent;
