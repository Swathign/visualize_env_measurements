import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const API_URL = "https://api.openaq.org/v1/measurements?country_id=DE";

const MeasurementsChart = () => {
  const [measurements, setMeasurements] = useState([]);
  console.log("measurements", measurements);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setMeasurements(response.data.results);
    });
  }, []);

  const options = {
    title: {
      text: "Environmental Measurements in German Cities"
    },
    xAxis: {
      categories: measurements.map((measurement) => measurement.city)
    },
    yAxis: {
      title: {
        text: "Value"
      }
    },
    tooltip: {
      formatter: function () {
        return `City: ${this.x}<br/>Value: ${this.y} ${
          measurements[0].unit
        }<br/>Date: ${ measurements[0].date.utc}`;
      }
    },
    series: [
      {
        name: "Measurement",
        data: measurements.map((measurement) => measurement.value)
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MeasurementsChart;
