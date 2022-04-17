import { Chart as ChartJs, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJs.register(ArcElement);

export const Chart2 = ({ chartData }) => {
  return (
    <>
      <Doughnut
        data={chartData}
        opciones={{
          responsive: true,
        }}
      />
    </>
  );
};
