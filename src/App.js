import React from 'react';
import './App.css';
import MeasurementsChart from './components/MeasurementChart';
import MeasurementsChartA from './components/MeasurementsChartA';

function App() {
  return (
    <div className="App">
      <MeasurementsChart/>
      <MeasurementsChartA />
    </div>
  );
}

export default App;
