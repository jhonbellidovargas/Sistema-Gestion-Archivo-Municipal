import { Chart as ChartJs, ArcElement, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJs.register(ArcElement, PointElement, LineElement);

export const Chart3 = ({ chartData }) => {
  return (
    <>
      <Line
        data={chartData}
        opciones={{
          responsive: true,
        }}
      />
    </>
  );
};
